import { createElement, getOrigin, getDateFromTimestamp, getTextLabel, getPlaceholders } from '../../scripts/common.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import createPagination from '../../common/pagination/pagination.js';
import { fetchPressReleases } from '../../scripts/services/press-release.service.js';

const blockName = 'press-releases';
const PAGE_SIZE = 10;
let paginationCssOnce;
const pageDataCache = new Map();

const parsePressRelease = (item) => {
  const isImageLink = (link) => `${link}`.split('?')[0].match(/\.(jpeg|jpg|gif|png|svg|bmp|webp)$/) !== null;

  const getDefaultImage = () => {
    const logoImageURL = '/media/logo/media_10a115d2f3d50f3a22ecd2075307b4f4dcaedb366.jpeg';
    return getOrigin() + logoImageURL;
  };

  const { image } = item.metadata;

  return {
    ...item.metadata,
    image: isImageLink(image) ? getOrigin() + image : getDefaultImage(),
    path: item.metadata?.url,
    isDefaultImage: !isImageLink(image),
  };
};

const renderSearchBar = () => {
  const searchBar = createElement('div', { classes: `${blockName}__search-bar` });
  console.log('%cgetTextLabel:', 'color: cyan', getTextLabel('PressReleases:SearchPlaceholder'));
  searchBar.innerHTML = `
    <input type="text" name="search" autocomplete="off" placeholder="${getTextLabel('PressReleases:SearchPlaceholder')}"/>
    <button type="submit"><i class="fa fa-search"></i></button>`;
  return searchBar;
};

const renderPressReleaseCard = (entry) => {
  const { path, image, title, description, publishDate } = entry;
  const card = createElement('article', { classes: `${blockName}__article` });
  const picture = createOptimizedPicture(image, title, false, [{ width: '414' }]);
  const formattedDate = getDateFromTimestamp(publishDate);

  card.innerHTML = `
    <a href="${path}">
      ${picture.outerHTML}
    </a>
    <div>
      <span class="date">${formattedDate}</span>
      <h3><a href="${path}">${title}</a></h3>
      <p>${description}</p>
    </div>`;

  return card;
};

const renderPressReleaseList = (block, pressReleases) => {
  const list = createElement('ul', { classes: ['article-list'] });
  pressReleases.forEach((pr) => {
    list.append(renderPressReleaseCard(pr));
  });
  block.append(list);
};

/**
 * Ensures a reusable pagination content area exists on the block.
 *
 * @param {HTMLElement} block
 * @returns {HTMLElement}
 */
const getOrCreateContentArea = (block) => {
  let contentArea = block.querySelector('.pagination-content');
  if (!contentArea) {
    contentArea = createElement('div', { classes: ['pagination-content'] });
    block.appendChild(contentArea);
  }
  return contentArea;
};

/**
 * Loads the pagination CSS exactly once.
 */
const loadPaginationCss = async () => {
  if (!paginationCssOnce) {
    const baseURL = window.location.origin;
    paginationCssOnce = loadCSS(`${baseURL}/common/pagination/pagination.css`);
  }
  await paginationCssOnce;
};

/**
 * Returns a per-page loader function bound to the provided base params,
 * with a tiny in-memory cache to avoid refetching visited pages.
 *
 * @param {Object} baseParams
 * @returns {(pageIndex:number) => Promise<Array>}
 */
const makePageLoader =
  (baseParams = {}) =>
  async (pageIndex) => {
    if (pageDataCache.has(pageIndex)) {
      return pageDataCache.get(pageIndex);
    }
    const { items = [] } = await fetchPressReleases({
      ...baseParams,
      sort: 'PUBLISH_DATE_DESC',
      limit: PAGE_SIZE,
      offset: pageIndex * PAGE_SIZE,
    });
    const parsed = items.map((item) => parsePressRelease(item));
    pageDataCache.set(pageIndex, parsed);
    return parsed;
  };

/**
 * Fetches the first page to compute totals and seed cache.
 *
 * @param {Object} baseParams
 * @returns {{ total:number, totalPages:number }}
 */
const fetchCountAndPrimeCache = async (baseParams = {}) => {
  const first = await fetchPressReleases({
    ...baseParams,
    sort: 'PUBLISH_DATE_DESC',
    limit: PAGE_SIZE,
    offset: 0,
  });

  const total = Number(first?.count || 0);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  if (first?.items?.length) {
    pageDataCache.set(
      0,
      first.items.map((i) => parsePressRelease(i)),
    );
  }

  return { total, totalPages };
};

/**
 * Initializes dynamic pagination with API-backed totalPages and per-page fetching.
 *
 * @param {HTMLElement} block
 * @param {Object} baseParams
 */
const initPressReleasesPagination = async (block, baseParams = {}) => {
  const contentArea = getOrCreateContentArea(block);
  await loadPaginationCss();

  pageDataCache.clear();

  const { total, totalPages } = await fetchCountAndPrimeCache(baseParams);
  const loadPageData = makePageLoader(baseParams);

  createPagination({
    block,
    contentArea,
    totalPages,
    renderItems: renderPressReleaseList,
    loadPageData,
    initialPage: 0,
  });

  if (!total) {
    contentArea.innerHTML = '';
    const noResultsMsg = createElement('p', { classes: `${blockName}__no-results-message` });
    const q = baseParams?.q || '';
    noResultsMsg.textContent = getTextLabel('no results').replace('$0', `"${q}"`);
    contentArea.append(noResultsMsg);
  }
};

const addEventListeners = (block) => {
  const searchInput = block.querySelector(`.${blockName}__search-bar input`);
  const searchButton = block.querySelector(`.${blockName}__search-bar button`);

  const applySearch = async () => {
    const query = searchInput.value?.trim();
    block.querySelector('.pagination-content')?.remove();
    block.querySelector('.pagination-nav')?.remove();
    await initPressReleasesPagination(block, query ? { q: query } : {});
  };

  searchButton.addEventListener('click', applySearch);
  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      applySearch();
    }
  });
};

export default async function decorate(block) {
  await getPlaceholders();
  block.append(renderSearchBar());
  await initPressReleasesPagination(block);
  addEventListeners(block);
}
