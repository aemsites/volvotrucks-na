import {
  debounce,
  decorateIcons,
  getPlaceholders,
  getTextLabel,
  getLocale,
  variantsClassesToBEM,
  getLanguagePath,
  MAGAZINE_CONFIGS,
} from '../../scripts/common.js';
import { topicSearchQuery, fetchSearchData, TENANT } from '../../scripts/search-api.js';
import { fetchAutosuggest, handleArrowDown, handleArrowUp } from '../search/autosuggest.js';

const blockName = 'v2-article-search';
const filterContainerClass = `${blockName}__filter-container`;
const dropdownClass = `${blockName}__filter-dropdown`;
const dropdownOpen = `${blockName}__filter-dropdown--open`;
const filterListOpen = `${blockName}__filter-list-wrapper--open`;
const searchInputExpanded = `${blockName}__search-input--expanded`;
const blockVariants = ['black', 'gray'];

await getPlaceholders();
const filterDefault = getTextLabel('filterDefault');
const searchPlaceholder = getTextLabel('searchPlaceholder');
const clearPlaceholder = getTextLabel('clear');

const locale = getLocale();
const language = locale.split('-')[0].toUpperCase();
const languagePath = getLanguagePath();
const currentURL = new URL(window.location.href);
const { MAGAZINE_PATH } = MAGAZINE_CONFIGS;
const magazinePath = `${languagePath}${MAGAZINE_PATH}`;
const magazineParam = '?search=&category=&topic=&truck=';
currentURL.pathname = magazinePath;
currentURL.search = magazineParam;

const getTopics = async (props = {}) => {
  const { limit = 1, offset = 0, article = {} } = props;
  const variables = {
    tenant: TENANT,
    language,
    limit,
    offset,
    category: 'Magazine',
    article,
    sort: 'BEST_MATCH',
    facets: ['ARTICLE', 'TOPIC', 'TRUCK'],
  };

  try {
    if (!TENANT) {
      throw new Error('TENANT not defined');
    }

    const rawData = await fetchSearchData({
      query: topicSearchQuery(),
      variables,
    });

    const querySuccess = rawData && rawData.data && rawData.data.edsrecommend;

    if (!querySuccess) {
      return [];
    }

    const [trucks, topics, articles] = querySuccess.facets;
    return [
      ...new Set(trucks.items.map((item) => ({ key: 'truck', value: item.value.trim() }))),
      ...new Set(topics.items.map((item) => ({ key: 'topic', value: item.value.trim() }))),
      ...new Set(articles.items.map((item) => ({ key: 'category', value: item.value.trim() }))),
    ].sort((a, b) => a.value.localeCompare(b.value));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const buildFilterElement = () =>
  document.createRange().createContextualFragment(`
  <div class="${blockName}__filter-container">
    <form class="${blockName}__filter">
      <fieldset class="${blockName}__fieldset">
        <div class="${blockName}__filter-dropdown">
          ${filterDefault} <span class="${blockName}__filter-dropdown-icon">
            <span class="icon icon-chevron-down"></span>
          </span>
        </div>
        <div class="${blockName}__filter-input">
          <div id="autosuggest-magazine"  aria-expanded="false" class="${blockName}__input-container">
            <span class="icon icon-search-icon"></span>
            <input aria-haspopup="listbox" autocomplete="off" aria-autocomplete="list" 
              aria-controls="autosuggest-autosuggest__results" type="text" id="search"
              name="search" placeholder="${searchPlaceholder}" />
            <label for="search" class="${blockName}__input-label">${searchPlaceholder}</label>
            <button type="button" class="${blockName}__clear-button" aria-label="${clearPlaceholder}">${clearPlaceholder}</button>
            <span class="icon icon-close"></span>
          </div>
          <div id="autosuggest-autosuggest__results" class="autosuggest__results-container">
            <div aria-labelledby="autosuggest-magazine" class="autosuggest__results"> 
              <ul role="listbox"></ul>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
    <div class="${blockName}__filter-list-wrapper"></div>
  </div>
`);

const buildBulletList = (allTopics) =>
  allTopics
    .map((item) => {
      const param = item.value.replace(/\s/g, '-');
      currentURL.search = magazineParam;
      currentURL.searchParams.set(item.key, param);
      return `<li class="${blockName}__filter-item">
    <a href="${currentURL.href.replace('#', '')}"
      class="${blockName}__filter-link">${item.value}</a>
  </li>`;
    })
    .join('');

const buildFilterList = async () => {
  const allTopics = await getTopics();
  return document.createRange().createContextualFragment(`
    <ul class="${blockName}__filter-list">
      ${buildBulletList(allTopics)}
    </ul>
  `);
};

const addDropdownHandler = (filter) => {
  filter.addEventListener('click', (e) => {
    const dropdown = e.target.tagName === 'svg' ? e.target.closest(`.${dropdownClass}`) : e.target;
    const filterContainer = dropdown.closest(`.${filterContainerClass}`);
    const filterList = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    dropdown.classList.toggle(dropdownOpen);
    filterList.classList.toggle(filterListOpen);
  });
};

/**
 * Adds an event handler to the close icon to collapse the search container
 * and filter list when clicked, hiding the clear button as well.
 *
 * @param {HTMLElement} closeIcon - The close icon element that triggers the collapse.
 */
const addCloseHandler = (closeIcon) => {
  closeIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const filterContainer = e.target.closest(`.${filterContainerClass}`);
    const filterListWrapper = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    const dropdown = filterContainer.querySelector(`.${dropdownClass}`);
    const searchContainer = filterContainer.closest(`.${blockName}__filter-container`);

    if (filterListWrapper && filterListWrapper.classList.contains(filterListOpen)) {
      filterListWrapper.classList.remove(filterListOpen);
      dropdown.classList.remove(dropdownOpen);
    }

    if (searchContainer) {
      const searchInput = searchContainer.querySelector('input[type="text"]');
      const clearButton = searchContainer.querySelector(`.${blockName}__clear-button`);
      searchContainer.classList.remove(searchInputExpanded);
      searchInput.value = '';
      clearButton.classList.remove('active');
    }
  });
};

/**
 * Initializes the search input handlers, including expand/collapse behavior,
 * input clearing, and the clear button visibility toggle.
 * @param {HTMLElement} searchContainer - The main container element that wraps the search input.
 */
const initializeSearchHandlers = (searchContainer) => {
  const searchInputWrapper = searchContainer.querySelector(`.${blockName}__filter-input`);
  const searchInput = searchContainer.querySelector('input[type="text"]');
  const clearButton = searchContainer.querySelector(`.${blockName}__clear-button`);
  const formElement = searchContainer.querySelector('form');
  const listEl = searchContainer.querySelector('.autosuggest__results-container ul');
  const input = document.getElementById('search');

  const toggleClearButton = () => {
    clearButton.classList.toggle('active', !!searchInput.value);
  };

  let liSelected;
  let next;
  let index = -1;
  const MAX_SUGGESTIONS = 6;

  const delayFetchData = debounce((term) =>
    fetchAutosuggest(
      term,
      listEl,
      {
        tag: 'li',
        class: 'autosuggest__results-item',
        props: {
          role: 'option',
          'data-section-name': 'default',
        },
      },
      searchArticles,
      true,
      MAX_SUGGESTIONS,
    ),
  );

  const clearAutosuggestions = () => {
    listEl.textContent = '';
  };

  const showAutoSuggestions = (e) => {
    const term = e.target.value;
    const MIN_SEARCH_LENGTH = 2;

    if (term.trim().length < MIN_SEARCH_LENGTH) {
      clearAutosuggestions();
      return;
    }

    const list = listEl.getElementsByTagName('li');
    if (e.key === 'Enter') {
      submitSearchTerm(e);
    } else if (e.key === 'Escape') {
      clearAutosuggestions();
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
      input.value = liSelected.textContent.replace(/[ ]{2,}/g, '');
    } else {
      delayFetchData(term);
    }
  };

  const clearInput = () => {
    searchInput.value = '';
    toggleClearButton();
    searchInput.focus();
    clearAutosuggestions();
  };

  const handleOutsideClick = (event) => {
    if (!searchContainer.contains(event.target)) {
      collapseSearchContainer();
    }
    clearAutosuggestions();
  };

  const collapseSearchContainer = () => {
    searchContainer.classList.remove(searchInputExpanded);
    searchInput.value = ''; // Clear the input value
    clearButton.classList.remove('active'); // Hide the clear button
    document.removeEventListener('click', handleOutsideClick, { capture: true });
  };

  const expandSearchContainer = () => {
    searchContainer.classList.add(searchInputExpanded);
    searchInput.focus();
    document.addEventListener('click', handleOutsideClick, { capture: true });
  };

  const searchArticles = (term) => {
    currentURL.search = magazineParam;
    currentURL.searchParams.set('search', term);
    window.location.href = currentURL.href;
    collapseSearchContainer();
  };

  const submitSearchTerm = (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      searchArticles(searchTerm);
    }
  };

  if (searchInputWrapper && searchInput && clearButton && formElement) {
    searchInputWrapper.addEventListener('click', expandSearchContainer);
    searchInput.addEventListener('input', toggleClearButton);
    searchInput.addEventListener('keyup', showAutoSuggestions);
    clearButton.addEventListener('click', clearInput);
    formElement.addEventListener('submit', submitSearchTerm);

    // Find the close icon and add its collapse functionality
    const closeIcon = searchContainer.querySelector('.icon-close');
    if (closeIcon) {
      addCloseHandler(closeIcon);
    }
  }
};

const decorateArticleSearch = async (block) => {
  const filter = buildFilterElement();
  const filterList = await buildFilterList();
  variantsClassesToBEM(block.classList, blockVariants, blockName);
  filter.querySelector(`.${blockName}__filter-list-wrapper`).append(filterList);
  block.prepend(filter);
  addDropdownHandler(block.querySelector(`.${blockName}__filter-dropdown`));
  addCloseHandler(block.querySelector('.icon-close'));
  const filterContainer = block.querySelector(`.${blockName}__filter-container`);
  if (filterContainer) {
    initializeSearchHandlers(filterContainer);
  }
  decorateIcons(block);
};

export default async function decorate(block) {
  decorateArticleSearch(block);
}
