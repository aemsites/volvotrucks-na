/* eslint-disable no-shadow,max-len */
import {
  readBlockConfig,
  toClassName,
} from './aem.js';
import { createElement } from './common.js';

/*
* Common functions for searching the press releases and magazines
*/
function getSelectionFromUrl(field) {
  return (
    toClassName(new URLSearchParams(window.location.search).get(field)) || ''
  );
}

function createInputSearch(name, searchTerm, placeholder) {
  const container = createElement('div', {
    classes: toClassName(`${name}-field`),
  });
  const input = createElement('input', {
    props: {
      type: 'text',
      name,
      placeholder,
    },
  });

  if (searchTerm) {
    input.value = searchTerm;
  }
  const btn = createElement('button');
  btn.innerHTML = `
    <i class="fa fa-search"></i>
  `;
  container.append(input, btn);
  return container;
}

function createDropdown(options, selected, name, placeholder, label) {
  const container = createElement('div', {
    classes: toClassName(`${name}-field`),
  });
  if (label) {
    const labelEl = createElement('label', {
      props: { for: name },
    });
    labelEl.innerText = label;
    container.append(labelEl);
  }
  const input = createElement('select', {
    props: {
      name,
      id: name,
    },
  });
  if (placeholder) {
    const optionTag = createElement('option', { props: { value: '' } });
    optionTag.innerText = placeholder;
    if (!selected) {
      optionTag.selected = true;
    }
    input.append(optionTag);
  }

  if (options) {
    options.forEach((option) => {
      const optionTag = createElement('option', {
        props: { value: toClassName(option) },
      });
      optionTag.innerText = option;
      if (optionTag.value === selected) {
        optionTag.selected = true;
      }
      input.append(optionTag);
    });
  }

  container.append(input);

  return container;
}

function createPaginationLink(page, label) {
  const newUrl = new URL(window.location);
  const listElement = createElement('li');
  const link = createElement('a', { classes: label });
  newUrl.searchParams.set('page', page);
  link.href = newUrl.toString();
  listElement.append(link);
  return listElement;
}

function createPagination(entries, page, limit) {
  const listPagination = createElement('div', { classes: 'pager' });
  const totalResults = createElement('div', { classes: 'total' });
  totalResults.textContent = `${entries.length} results`;
  listPagination.appendChild(totalResults);
  const pagination = createElement('div', { classes: 'pagination' });

  if (entries.length > limit) {
    const maxPages = Math.ceil(entries.length / limit);

    const listSize = createElement('span', { classes: 'size' });
    if (entries.length > limit) {
      listSize.innerHTML = `<strong>Page ${page}</strong> of ${maxPages}`;
    }
    const list = createElement('ol', { classes: 'scroll' });
    if (page === 1) {
      list.append(createPaginationLink(page + 1, 'next'));
      list.append(createPaginationLink(maxPages, 'last'));
    } else if (page > 1 && page < maxPages) {
      list.append(createPaginationLink(1, 'first'));
      list.append(createPaginationLink(page - 1, 'prev'));
      list.append(createPaginationLink(page + 1, 'next'));
      list.append(createPaginationLink(maxPages, 'last'));
    } else if (page === maxPages) {
      list.append(createPaginationLink(1, 'first'));
      list.append(createPaginationLink(page - 1, 'prev'));
    }

    pagination.append(listSize, list);
    listPagination.appendChild(pagination);
  }
  return listPagination;
}

export function splitTags(tags) {
  return tags ? JSON.parse(tags) : [];
}

function getActiveFilters() {
  const result = {};
  [...new URLSearchParams(window.location.search).entries()]
    // eslint-disable-next-line no-unused-vars
    .filter(([_, value]) => value !== '')
    .forEach(([key, value]) => {
      result[key] = value;
    });
  return result;
}

async function renderFilters(data, createFilters) {
  // render filters
  const filter = createElement('div', { classes: 'list-filter' });
  const form = createElement('form', { props: { method: 'get', name: 'list-filter' } });
  const formFieldSet = createElement('fieldset');

  const filters = await createFilters(data, getActiveFilters(), createDropdown, createInputSearch);
  formFieldSet.append(
    ...filters,
  );
  if (filters.length > 0) {
    form.append(formFieldSet);
    filter.append(form);
    return filter;
  }
  return null;
}

async function buildElements(pressReleases, filter, createFilters, buildPressReleaseArticle, limitPerPage, cfg) {
  const elements = {};
  let actFilter = getActiveFilters();
  let relatedPressReleases = false;
  if (cfg.tags) {
    actFilter = {
      ...actFilter,
      ...{ tags: toClassName(cfg.tags) },
    };
    relatedPressReleases = true;
  }

  let filteredData = filter ? await filter(pressReleases, actFilter) : pressReleases;

  let page = parseInt(getSelectionFromUrl('page'), 10);
  page = Number.isNaN(page) ? 1 : page;

  if (!relatedPressReleases && createFilters) {
    const filterElements = await renderFilters(pressReleases, createFilters);
    if (filterElements) {
      elements.filter = filterElements;
    }
    if (limitPerPage > 0) {
      elements.pagination = createPagination(filteredData, page, limitPerPage);
    }
  }
  if (limitPerPage > 0) {
    const start = (page - 1) * limitPerPage;
    filteredData = filteredData.slice(start, start + limitPerPage);
  }
  const articleList = createElement('ul', { classes: 'article-list' });
  filteredData.forEach((pressRelease) => {
    const articleItem = createElement('li');
    const pressReleaseArticle = buildPressReleaseArticle(pressRelease);
    articleItem.appendChild(pressReleaseArticle);
    articleList.appendChild(articleItem);
  });
  elements.list = articleList;
  return elements;
}

export async function createList(pressReleases, filter, createFilters, buildPressReleaseArticle, limitPerPage, mainEl) {
  /* eslint-disable no-use-before-define */
  const cfg = readBlockConfig(mainEl);

  async function reloadList(params) {
    // push the new querystring state
    const url = new URL(window.location);
    [...params.entries()].forEach(([k, v]) => url.searchParams.set(k, v));
    window.history.pushState({}, '', url);
    // rebuild the list
    const elements = await buildElements(pressReleases, filter, createFilters, buildPressReleaseArticle, limitPerPage, cfg);
    renderList(mainEl, elements);
  }

  function reloadFilteredList(event) {
    if (event) event.preventDefault();
    const params = new URLSearchParams(new FormData(this));
    const urlParams = new URL(window.location).searchParams;
    const page = urlParams.get('page');
    if (page && +page > 1) {
      params.set('page', 1);
    }
    reloadList(params);
  }

  function reloadPaginatedList(event) {
    event.preventDefault();
    reloadList(new URL(event.target.href).searchParams);
  }

  function attachSubmitListeners(filter) {
    const form = filter.querySelector('form');
    if (form) {
      form.submit = reloadFilteredList.bind(form);
      form.addEventListener('submit', reloadFilteredList.bind(form));
    }
    return filter;
  }

  function attachClickListeners(pagination) {
    pagination.querySelectorAll('a').forEach((a) => a.addEventListener('click', reloadPaginatedList));
    return pagination;
  }

  function renderList(el, { filter, pagination, list }) {
    const children = [];
    if (filter) children.push(attachSubmitListeners(filter));
    if (pagination) children.push(attachClickListeners(pagination));
    children.push(list);
    if (pagination) children.push(attachClickListeners(pagination.cloneNode(true)));
    el.replaceChildren(...children);
  }

  const elements = await buildElements(pressReleases, filter, createFilters, buildPressReleaseArticle, limitPerPage, cfg);
  renderList(mainEl, elements);
}
