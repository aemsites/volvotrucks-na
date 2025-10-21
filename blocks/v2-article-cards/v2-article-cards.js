import { createElement, unwrapDivs, getTextLabel, getDateFromTimestamp } from '../../scripts/common.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import { fetchMagazineArticles, parseArticleData } from '../../scripts/services/magazine.service.js';
import createPagination from '../../common/pagination/pagination.js';

const blockName = 'v2-article-cards';
let paginationCssOnce;
const pageDataCache = new Map();

/**
 * Safely extracts the pathname from a URL string.
 *
 * @param {string} u - URL string.
 * @returns {string|null} - Pathname or null if invalid.
 */
const getPathname = (u) => {
  try {
    return u ? new URL(u).pathname : null;
  } catch (e) {
    console.warn(`Invalid URL: ${u}`, e);
    return null;
  }
};

/**
 * Returns the block page size and whether a total-cap limit is present.
 * If a class "limit-x" exists, x is used; otherwise defaults to 9.
 *
 * @param {HTMLElement} block
 * @returns {{ pageSize:number, hasLimitVariant:boolean }}
 */
const getLimitConfig = (block) => {
  const classes = [...block.classList];
  let limitAmount = null;

  classes.forEach((el) => {
    if (el.includes('limit')) {
      const parts = el.split('-');
      limitAmount = Number(parts[parts.length - 1]);
    }
  });

  const hasLimitVariant = Number.isFinite(limitAmount) && limitAmount > 0;
  const pageSize = hasLimitVariant ? limitAmount : 9;

  return { pageSize, hasLimitVariant };
};

/**
 * Generates a stable cache key for the current loader request.
 *
 * @param {Object} baseParams
 * @param {number} pageSize
 * @param {number} pageIndex
 * @param {Set<string>} excludeUrlPaths
 * @returns {string}
 */
const makeCacheKey = (baseParams, pageSize, pageIndex, excludeUrlPaths) => {
  const excludeKey = excludeUrlPaths && excludeUrlPaths.size ? [...excludeUrlPaths].join('|') : '';
  return `${pageSize}:${pageIndex}:${excludeKey}:${JSON.stringify(baseParams)}`;
};

const renderArticleCard = (article) => {
  const { url, image, title, publishDate, button = false } = article;

  const shortTitle = title.split('|')[0];
  const card = createElement('a', { classes: `${blockName}__article-card`, props: { href: url } });
  const picture = createOptimizedPicture(image, shortTitle, false);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);
  const cardContent = document.createRange().createContextualFragment(`
    <div class="${blockName}__image-wrapper">
      ${pictureTag}
    </div>
    <div class="${blockName}__texts-wrapper">
      <p class="${blockName}__card-date">
        ${formattedDate}
      </p>
      <h4 class="${blockName}__card-heading">
        ${shortTitle}
      </h4>
    </div>
  `);
  const textWrapper = cardContent.querySelector(`.${blockName}__texts-wrapper`);

  if (button) {
    button.classList.add(`${blockName}__card-button`);
    textWrapper.appendChild(button);
  } else {
    const newButton = document.createRange().createContextualFragment(`
      <div class="button-container ${blockName}__card-button">
        <a class="button tertiary">
          ${getTextLabel('v2_article_cards:read_more')}
        </a>
      </div>
    `);
    textWrapper.appendChild(newButton);
  }
  card.appendChild(cardContent);
  return card;
};

const renderArticleList = (block, articles = null, amount = null) => {
  const articleList = createElement('div', { classes: `${blockName}__article-list` });
  articles.forEach((art) => {
    const card = renderArticleCard(art);
    articleList.append(card);
  });
  block.append(articleList);
  if (amount) {
    articleList.classList.add(`${blockName}--featured-articles`);
    articleList.classList.add(`${blockName}--${amount}-articles`);
  } else {
    articleList.classList.add(`${blockName}--dynamic-articles`);
  }
};

const getQueryOptionsFromURL = () => {
  const currentURL = new URL(window.location);
  const params = new URLSearchParams(currentURL.search);
  const searchQuery = params.get('search');
  const filters = ['truck', 'category', 'topic'];
  const tags = {};
  const options = { sort: 'PUBLISH_DATE_DESC' };

  if (searchQuery) {
    options.q = searchQuery;
  }

  if (filters.some((filter) => params.get(filter))) {
    filters.forEach((filter) => {
      const filterParam = params.get(filter);
      if (filterParam) {
        tags[filter] = filterParam.split(',').map((item) => item.trim().replaceAll('-', ' '));
      }
    });

    options.tags = tags;
  }

  return options;
};

const hasQueryFilters = () => {
  const currentURL = new URL(window.location);
  const params = new URLSearchParams(currentURL.search);
  const searchQuery = params.get('search');
  const filters = ['truck', 'category', 'topic'];
  return Boolean(searchQuery || filters.some((filter) => params.get(filter)));
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
const loadPaginationCssOnce = async () => {
  if (!paginationCssOnce) {
    const baseURL = window.location.origin;
    paginationCssOnce = loadCSS(`${baseURL}/common/pagination/pagination.css`);
  }
  await paginationCssOnce;
};

/**
 * Returns a per-page loader function bound to the provided base params.
 * Excludes any URL paths present in `excludeUrlPaths` and performs a
 * top-up loop to keep pages full (when possible). Uses a stable cache key.
 *
 * @param {Object} baseParams
 * @param {number} pageSize
 * @param {Set<string>} excludeUrlPaths
 * @param {number} totalCount
 * @returns {(pageIndex:number) => Promise<Array>}
 */
const makePageLoader =
  (baseParams = {}, pageSize, excludeUrlPaths, totalCount = Infinity) =>
  async (pageIndex) => {
    const key = makeCacheKey(baseParams, pageSize, pageIndex, excludeUrlPaths);
    if (pageDataCache.has(key)) {
      return pageDataCache.get(key);
    }

    const page = [];
    let fetchOffset = pageIndex * pageSize;
    const maxIterations = 10; // safety guard to avoid excessive loops

    for (let iter = 0; iter < maxIterations && page.length < pageSize; iter += 1) {
      if (fetchOffset >= totalCount) {
        break;
      }

      const { items = [] } = await fetchMagazineArticles({
        ...baseParams,
        sort: 'PUBLISH_DATE_DESC',
        limit: pageSize,
        offset: fetchOffset,
      });

      if (!items.length) {
        break;
      }

      const parsed = items.map((it) => parseArticleData(it)).filter(Boolean);

      parsed.forEach((art) => {
        if (page.length >= pageSize) {
          return;
        }
        const p = getPathname(art?.url);
        if (!p || !excludeUrlPaths || !excludeUrlPaths.has(p)) {
          page.push(art);
        }
      });

      fetchOffset += pageSize;
    }

    pageDataCache.set(key, page);
    return page;
  };

/**
 * Fetches total count (without applying exclusions).
 *
 * @param {Object} baseParams
 * @param {number} pageSize
 * @returns {{ total:number }}
 */
const fetchCountAndPrimeCache = async (baseParams = {}, pageSize) => {
  const first = await fetchMagazineArticles({
    ...baseParams,
    sort: 'PUBLISH_DATE_DESC',
    limit: pageSize,
    offset: 0,
  });

  const total = Number(first?.count || 0);
  return { total };
};

/**
 * Extracts paths from button links within the block and maps path -> button element.
 *
 * @param {HTMLElement} block
 * @returns {{ targets:Set<string>, buttonByPath:Map<string,HTMLElement> }}
 */
const collectFeaturedTargets = (block) => {
  const buttons = block.querySelectorAll('.button-container');
  const targets = new Set();
  const buttonByPath = new Map();

  [...buttons].forEach((btn) => {
    const href = btn.querySelector('a')?.href;
    const path = getPathname(href);
    if (path) {
      targets.add(path);
      buttonByPath.set(path, btn);
    }
  });

  return { targets, buttonByPath };
};

/**
 * Resolves "featured" articles defined via button links in the block.
 * Fetches batches until all targets are found or results are exhausted.
 * Preserves the visual order of buttons in the block.
 *
 * @param {HTMLElement} block
 * @param {Object} baseParams
 * @returns {Promise<Array>}
 */
const resolveFeaturedArticles = async (block, baseParams = {}) => {
  const { targets, buttonByPath } = collectFeaturedTargets(block);

  if (targets.size === 0) {
    return [];
  }

  // Keep the paths in the same order as the buttons appear in the DOM
  const buttonPathsInOrder = [...buttonByPath.keys()];
  const foundByPath = new Map();

  const batchSize = 100; // OpenSearch limit
  let offset = 0;
  let total = Infinity;

  while (offset < total && targets.size > 0) {
    const resp = await fetchMagazineArticles({
      ...baseParams,
      sort: 'PUBLISH_DATE_DESC',
      limit: batchSize,
      offset,
    });

    total = Number(resp?.count || 0);
    const items = (resp?.items || []).map((it) => parseArticleData(it)).filter(Boolean);

    items.forEach((art) => {
      const p = getPathname(art?.url);
      if (p && targets.has(p)) {
        const button = buttonByPath.get(p);
        if (button) {
          art.button = button;
        }
        foundByPath.set(p, art);
        targets.delete(p);
      }
    });

    offset += batchSize;
  }

  // Return in the same order as the buttons appear in the block
  return buttonPathsInOrder.map((p) => foundByPath.get(p)).filter(Boolean);
};

/**
 * Fetches additional non-featured articles until we fill `needed` items
 * or run out of results. Used for total-cap (limit-x) variant.
 *
 * @param {Object} baseParams
 * @param {Set<string>} excludeUrlPaths
 * @param {number} needed
 * @returns {Promise<Array>}
 */
const fetchFillArticles = async (baseParams = {}, excludeUrlPaths, needed) => {
  const result = [];
  const batchSize = 100;
  let offset = 0;
  let total = Infinity;

  while (result.length < needed && offset < total) {
    const resp = await fetchMagazineArticles({
      ...baseParams,
      sort: 'PUBLISH_DATE_DESC',
      limit: batchSize,
      offset,
    });

    total = Number(resp?.count || 0);
    const items = (resp?.items || []).map((it) => parseArticleData(it)).filter(Boolean);

    items.forEach((art) => {
      if (result.length >= needed) {
        return;
      }
      const p = getPathname(art?.url);
      if (!p || !excludeUrlPaths || !excludeUrlPaths.has(p)) {
        result.push(art);
      }
    });

    offset += batchSize;
  }

  return result;
};

/**
 * Removes any existing pagination content and nav (safe no-ops if absent).
 *
 * @param {HTMLElement} block
 */
const removePaginationUI = (block) => {
  block.querySelector('.pagination-content')?.remove();
  block.querySelector('.pagination-nav')?.remove();
};

/**
 * Renders the featured section (if any), replacing any previous content area.
 *
 * @param {HTMLElement} block
 * @param {Array} featuredArticles
 * @param {number} featuredLinkCount
 */
const renderFeaturedSection = (block, featuredArticles, featuredLinkCount) => {
  if (featuredArticles.length > 0) {
    removePaginationUI(block);
    renderArticleList(block, featuredArticles, featuredLinkCount);
  }
};

/**
 * Handles the total-cap (limit-x) variant: featured first, then fill up to cap. No pagination.
 *
 * @param {HTMLElement} block
 * @param {Array} featuredArticles
 * @param {number} pageSize
 * @param {Object} queryOptions
 * @param {number} featuredLinkCount
 */
const renderTotalCapVariant = async (block, featuredArticles, pageSize, queryOptions, featuredLinkCount) => {
  const featuredUrlPaths = new Set(featuredArticles.map((a) => getPathname(a?.url)).filter(Boolean));
  const remaining = Math.max(0, pageSize - featuredArticles.length);
  let filler = [];
  if (remaining > 0) {
    filler = await fetchFillArticles(queryOptions, featuredUrlPaths, remaining);
  }

  removePaginationUI(block);
  renderArticleList(block, [...featuredArticles, ...filler], featuredLinkCount);
  unwrapDivs(block);
};

/**
 * Initializes the paginated (non-limit) variant beneath any featured section.
 *
 * @param {HTMLElement} block
 * @param {Object} queryOptions
 * @param {number} pageSize
 * @param {Array} featuredArticles
 * @param {number} featuredLinkCount
 */
const initPaginatedVariant = async (block, queryOptions, pageSize, featuredArticles, featuredLinkCount) => {
  renderFeaturedSection(block, featuredArticles, featuredLinkCount);

  const contentArea = getOrCreateContentArea(block);
  await loadPaginationCssOnce();

  const featuredUrlPaths = new Set(featuredArticles.map((a) => getPathname(a?.url)).filter(Boolean));

  pageDataCache.clear();
  const { total } = await fetchCountAndPrimeCache(queryOptions, pageSize);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const loadPageData = makePageLoader(queryOptions, pageSize, featuredUrlPaths, total);

  if (total > 0) {
    createPagination({
      block,
      contentArea,
      totalPages,
      renderItems: (area, articles) => renderArticleList(area, articles, null),
      loadPageData,
      initialPage: 0,
    });
  } else if (featuredArticles.length === 0) {
    contentArea.innerHTML = '';
    const noResultsMsg = createElement('p', { classes: `${blockName}__no-results-message` });
    noResultsMsg.textContent = getTextLabel('v2_article_cards:no_results').replace('$0', '');
    contentArea.append(noResultsMsg);
  }

  unwrapDivs(block);
};

export default async function decorate(block) {
  const options = getQueryOptionsFromURL();
  const hasFilters = hasQueryFilters();

  if (hasFilters) {
    block.innerText = '';
  }

  const { pageSize, hasLimitVariant } = getLimitConfig(block);
  const featuredLinkCount = block.children.length;
  const hasFeaturedVariant = featuredLinkCount > 0;
  const featuredArticles = hasFeaturedVariant ? await resolveFeaturedArticles(block, options) : [];

  if (hasLimitVariant) {
    await renderTotalCapVariant(block, featuredArticles, pageSize, options, hasFeaturedVariant ? featuredLinkCount : null);
    return;
  }

  await initPaginatedVariant(block, options, pageSize, featuredArticles, featuredLinkCount);
}
