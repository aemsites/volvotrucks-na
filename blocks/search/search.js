/* eslint-disable no-use-before-define */
import { debounce, getLocale, getTextLabel } from '../../scripts/common.js';
import {
  getFacetsTemplate,
  getNoResultsTemplate,
  getMainTemplate,
  getResultsItemsTemplate,
  getShowingResultsTemplate,
} from './templates.js';

import {
  searchQuery, fetchData, sanitizeQueryTerm, TENANT,
} from '../../scripts/search-api.js';

import { fetchAutosuggest, handleArrowDown, handleArrowUp } from './autosuggest.js';

const PLACEHOLDERS = {
  searchFor: getTextLabel('Search For'),
  noResults: getTextLabel('no results'),
  refine: getTextLabel('refine'),
  showingResults: getTextLabel('Showing results for'), // searchResultSummarySection
  sortBy: getTextLabel('Sort By'), // searchOptionsSection
  sortFilter: getTextLabel('Sort Filter'),
  previous: getTextLabel('Previous'),
  next: getTextLabel('Next'),
};

const SEARCH_PARAMS = {
  _q: 'q',
  _start: 'start',
  _sort: 'sort',
  _article: 'article',
  _topic: 'topic',
  _truck: 'truck',
  _category: 'category',
};

export default function decorate(block) {
  const fragmentRange = document.createRange();
  const locale = getLocale();
  const language = locale.split('-')[0].toUpperCase();

  // check if url has query params
  const {
    _q,
    _start,
    _sort,
    _article,
    _topic,
    _truck,
    _category,
  } = SEARCH_PARAMS;
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get(_q);
  const tenant = TENANT;
  let offset = urlParams.get(_start);
  offset = offset ? Number(offset) : 0;
  let resultCount = 0;
  const limit = 25;
  let nextOffset = offset + limit;
  let hasResults = true;
  let facetsFilters = [];

  const mainTemplate = getMainTemplate(PLACEHOLDERS);
  const mainFragment = fragmentRange.createContextualFragment(mainTemplate);
  block.textContent = '';
  block.appendChild(mainFragment);

  // after insert the main template, these elements are present then
  const searchBtn = block.querySelector('.sf-form > span');
  const input = document.getElementById('searchTerm');
  input.value = searchTerm;
  const facetsWrapper = document.getElementById('searchFacetSection');
  const resultsWrapper = document.getElementById('searchResultsSection');
  const summary = document.getElementById('searchResultSummarySection');
  const sortBy = document.getElementById('searchOptionsSection');
  const listEl = block.querySelector('.autosuggest__results-container ul');

  function searchResults(hideAutoSuggest = true) {
    if (hideAutoSuggest) {
      listEl.textContent = '';
    }
    offset = 0;

    deleteUrlParam(_category);
    insertUrlParam(_q, input.value);
    insertUrlParam(_start, offset);

    fetchResults();
  }

  searchBtn.onclick = () => searchResults();

  const onClickHandler = (val) => {
    input.value = val;
    searchResults();
  };

  const delayFetchData = debounce((term) => fetchAutosuggest(term, listEl, {
    tag: 'li',
    class: 'autosuggest__results-item',
    props: {
      role: 'option',
      'data-section-name': 'default',
    },
  }, onClickHandler));

  let liSelected;
  let next;
  let index = -1;

  input.onkeyup = (e) => {
    const term = e.target.value;
    const list = listEl.getElementsByTagName('li');

    if (e.key === 'Enter') {
      searchResults();
    } else if (e.key === 'Escape') {
      listEl.textContent = '';
    } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      let returnObj;

      if (e.key === 'ArrowUp') {
        returnObj = handleArrowUp({
          list,
          liSelected,
          index,
          next,
        });
      } else {
        returnObj = handleArrowDown({
          list,
          liSelected,
          index,
          next,
        });
      }

      liSelected = returnObj.liSelected;
      index = returnObj.index;
      next = returnObj.next;
      input.value = liSelected.firstElementChild.textContent.replace(/[ ]{2,}/g, '');
      searchResults(false);
    } else {
      delayFetchData(term);
    }
  };

  // pagination events
  const paginationContainer = block.querySelector('.search-pagination-container');
  const countSpan = paginationContainer.querySelector('.count');
  const resRange = paginationContainer.querySelector('.page-range');

  const nextBtn = paginationContainer.querySelector('.next');
  nextBtn.onclick = () => pagination('next');

  const prevBtn = paginationContainer.querySelector('.prev');
  prevBtn.onclick = () => pagination('prev');

  const addMoreBtnToggleEvent = (e) => {
    const facetList = e.target.parentElement.previousElementSibling;
    const isMore = e.target.textContent.toLowerCase() === 'more';
    e.target.textContent = isMore ? 'Less' : 'More';
    [...facetList.children].forEach((li, i) => {
      if (i <= 2) return;
      li.classList.toggle('d-none', !isMore);
    });
  };

  const addFacetTitlesToggleEvent = (e) => {
    const titleList = e.target.closest('.sidebar-heading').nextElementSibling;
    const isShown = titleList.classList.contains('show');
    e.target.classList.toggle('active', !isShown);
    titleList.classList.toggle('show', !isShown);
  };

  const addToggleOverlayEvent = (sidebar, overlay, isOpen = false) => {
    const showClass = 'show-facet-overlay';
    sidebar.classList.toggle(showClass, isOpen);
    overlay.classList.toggle(showClass, isOpen);
  };

  // handle filters
  const addFilterEvent = (e, form) => {
    form.requestSubmit();
  };

  const updateFilterCheckbox = () => {
    const form = block.querySelector('form');
    [...form].forEach((field) => {
      const isChecked = facetsFilters.find(({ value }) => value.includes(field.value));
      if (isChecked) {
        field.checked = true;
      }
    });
  };

  const addFilterSubmitEvent = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputsChecked = [];
    [...form].forEach((field) => {
      inputsChecked.push(field.id);

      const facetIndex = facetsFilters.findIndex((item) => item.field === field.dataset.filter);

      if (facetIndex > -1) {
        facetsFilters[facetIndex].value = facetsFilters[facetIndex].value
          .filter((val) => val !== field.value);

        if (field.checked) {
          facetsFilters[facetIndex].value.push(field.value);
        }
        if (!facetsFilters[facetIndex].value.length) {
          facetsFilters = facetsFilters.filter((item) => item.field !== field.dataset.filter);
        }
      } else if (field.checked) {
        facetsFilters.push({
          field: field.dataset.filter,
          value: [field.value],
        });
      }
    });
    const filterParams = [_article, _topic, _truck, _category];

    filterParams.forEach((item) => {
      const filter = facetsFilters.find(({ field }) => field.toLowerCase() === item);

      if (filter) {
        insertUrlParam(item, filter.value);
        return;
      }
      deleteUrlParam(item);
    });
    facetsFilters = [];
    offset = 0;
    insertUrlParam(_start, offset);
    fetchResults();
  };

  const addFacetsEvents = (facets) => {
    if (!facets) return;
    const facetSidebar = facets.querySelector('.sf-sidebar-container');
    const facetOverlay = facets.querySelector('.sidebar-background');
    const closeBtns = facets.querySelectorAll('.search-close-button, .close-button');
    const titles = facets.querySelectorAll('.sidebar-heading a');
    const filtersForm = facets.querySelector('#facetsFilters');
    if (titles.length > 0) {
      [...titles].forEach((title) => {
        title.onclick = addFacetTitlesToggleEvent;
      });
    }
    const moreBtns = facets.querySelectorAll('.more-less a');
    if (moreBtns.length > 0) {
      [...moreBtns].forEach((btn) => {
        btn.onclick = addMoreBtnToggleEvent;
      });
    }
    const filterByBtn = facets.querySelector('.pill');
    filterByBtn.onclick = () => {
      addToggleOverlayEvent(facetSidebar, facetOverlay, true);
    };

    [...closeBtns].forEach((btn) => {
      btn.onclick = () => addToggleOverlayEvent(facetSidebar, facetOverlay);
    });

    filtersForm.addEventListener('submit', addFilterSubmitEvent);
    filtersForm.onchange = (e) => addFilterEvent(e, filtersForm);

    if (facetsFilters.length) {
      updateFilterCheckbox();
    }
  };

  // handle sort
  const sortResults = block.querySelector('.custom-select-searchstudio-js');
  const sort = urlParams.get(_sort);
  if (sort) sortResults.value = sort;
  sortResults.onchange = (e) => {
    insertUrlParam(_sort, e.target.value);
    fetchResults();
  };

  function showResults(data) {
    const { items, count, facets } = data;
    const queryTerm = sanitizeQueryTerm(input.value);
    let resultsText = '';
    let facetsText = null;
    if (items.length > 0) { // items by query: 25, count has the total
      paginationContainer.classList.add('show');
      summary.parentElement.classList.remove('no-results');
      resultsText = getResultsItemsTemplate({ items, queryTerm });
      facetsText = getFacetsTemplate(facets);
      resultCount = count;
      hasResults = true;
    } else {
      const noResults = PLACEHOLDERS.noResults.replace('$0', `"<span>${
        queryTerm.trim() === '' ? ' ' : queryTerm}</span>"`);
      summary.parentElement.classList.add('no-results');
      resultsText = getNoResultsTemplate({ noResults, refine: PLACEHOLDERS.refine });
      hasResults = false;
    }
    const fragment = fragmentRange.createContextualFragment(resultsText);
    summary.textContent = '';
    resultsWrapper.textContent = '';
    facetsWrapper.textContent = '';
    if (hasResults) {
      const newOffset = nextOffset > count ? count : nextOffset;
      const showingResults = PLACEHOLDERS.showingResults.replace('$0', `${count > 0 ? offset + 1 : 0}`)
        .replace('$1', newOffset).replace('$2', count).replace('$3', queryTerm);
      const showingResultsText = getShowingResultsTemplate(showingResults);
      const summaryFragment = fragmentRange.createContextualFragment(showingResultsText);
      const facetsFragment = fragmentRange.createContextualFragment(facetsText);
      resultsWrapper.appendChild(fragment);
      summary.appendChild(summaryFragment);
      facetsWrapper.appendChild(facetsFragment);
      addFacetsEvents(facetsWrapper);
    } else {
      summary.appendChild(fragment);
      paginationContainer.classList.remove('show');
    }
    sortBy.classList.toggle('hide', !hasResults);
  }

  function deleteUrlParam(key) {
    if (window.history.pushState) {
      const searchUrl = new URL(window.location.href);
      searchUrl.searchParams.delete(key);
      window.history.pushState({}, '', searchUrl.toString());
    }
  }

  function insertUrlParam(key, value) {
    if (window.history.pushState) {
      const searchUrl = new URL(window.location.href);
      searchUrl.searchParams.set(key, value);
      window.history.pushState({}, '', searchUrl.toString());
    }
  }

  function updatePaginationDOM(data) {
    let isPrevDisabled = false;
    let isNextDisabled = false;
    const rangeText = `${offset + 1}-${nextOffset >= resultCount ? resultCount : nextOffset}`;

    // disable the prev , next buttons
    if (offset === 0) {
      isPrevDisabled = 'disabled';
    }
    if ((nextOffset) >= data.count) {
      isNextDisabled = 'disabled';
    }
    prevBtn.setAttribute('disabled', isPrevDisabled);
    nextBtn.setAttribute('disabled', isNextDisabled);
    resRange.innerText = rangeText;
  }

  async function fetchResults() {
    const searchParams = new URLSearchParams(window.location.search);
    const queryTerm = sanitizeQueryTerm(searchParams.get(_q));
    const offsetVal = Number(searchParams.get(_start));
    const sortVal = searchParams.get(_sort) || 'BEST_MATCH';

    const filters = {
      category: { field: 'CATEGORY', value: _category },
      article: { field: 'ARTICLE', value: _article },
      topic: { field: 'TOPIC', value: _topic },
      truck: { field: 'TRUCK', value: _truck },
    };
    const objectFilters = Object.keys(filters);

    const variables = {
      q: queryTerm,
      language,
      limit,
      offset: offsetVal,
      sort: sortVal,
      tenant,
      facets: [...objectFilters.map((key) => filters[key].field)],
      article: {},
    };

    objectFilters.forEach((key) => {
      // check for filters in the url ...
      const value = searchParams.get(filters[key].value);
      // updates the variables object ...
      if (value) {
        const splittedValue = value.split(',');
        if (key === 'category') {
          variables[key] = splittedValue;
        } else {
          const articleKey = key === 'article' ? 'category' : key;
          variables.article[articleKey] = splittedValue;
        }
        // and updates the facetsFilters to be used to update the checkboxes
        facetsFilters.push({
          field: filters[key].field,
          value: splittedValue,
        });
      }
    });

    fetchData({
      query: searchQuery(),
      variables,
    }).then(({ errors, data }) => {
      if (errors) {
        // eslint-disable-next-line no-console
        console.log('%cSomething went wrong', errors);
      } else {
        const { edssearch } = data;
        nextOffset = offset + limit;
        countSpan.innerText = edssearch.count;
        showResults(edssearch);
        updatePaginationDOM(edssearch);
      }
    });
  }

  function getNextOffset(isNext = false) {
    if (isNext) {
      return nextOffset <= resultCount ? nextOffset : offset;
    }
    const temp = offset - limit;
    return temp > 0 ? temp : 0;
  }

  function pagination(type) {
    offset = getNextOffset(type === 'next');
    insertUrlParam(_start, offset);
    fetchResults();
  }

  // hide autocomplete, click was outside container.
  const containingElement = document.querySelector('#searchInput');

  document.body.addEventListener('click', (event) => {
    if (!containingElement.contains(event.target)) {
      listEl.textContent = '';
    }
  });

  if (searchTerm) fetchResults();
}
