import {
  getLanguagePath,
  getOrigin,
  getTextLabel,
  createElement,
  getDateFromTimestamp,
} from '../../scripts/common.js';
import {
  createList,
} from '../../scripts/magazine-press.js';
import {
  createOptimizedPicture,
} from '../../scripts/aem.js';
import { fetchData, magazineSearchQuery } from '../../scripts/search-api.js';

const defaultAuthor = getTextLabel('defaultAuthor');
const defaultReadTime = getTextLabel('defaultReadTime');

function buildMagazineArticle(entry) {
  const {
    path,
    image,
    title,
    description,
    author,
    category,
    readingTime,
    publishDate,
    isDefaultImage,
  } = entry;

  const card = createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '380', height: '214' }]);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);
  const categoryItem = createElement('li');
  card.innerHTML = `
    <a href="${path}" class="imgcover">${pictureTag}</a>
    <div class="content">
      <ul>
        <li>${formattedDate}</li>
      ${(category ? categoryItem.textContent(category) : '')}
      </ul>
      <h3><a href="${path}">${title}</a></h3>
      <p>${description}</p>
      <ul>
        <li>${author}</li>
        <li>${readingTime}</li>
      </ul>
    </div>
  `;
  card.querySelector('picture').classList.toggle('default-image', isDefaultImage);
  return card;
}

function buildLatestMagazineArticle(entry) {
  const {
    path,
    image,
    title,
    description,
    linkText,
  } = entry;
  const card = createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '590', height: '410' }]);
  const pictureTag = picture.outerHTML;
  const readMore = (linkText || 'Read more...');
  card.innerHTML = `
    <a href="${path}" class="imgcover">${pictureTag}</a>
    <div class="content">
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${path}" class="cta">${readMore}</a>
    </div>
  `;
  return card;
}

async function getFilterOptions() {
  const resp = await fetch(`${getLanguagePath()}news-and-stories/tags.plain.html`);
  const markup = await resp.text();
  const div = document.createElement('div');
  div.innerHTML = markup;
  const categoryList = Array.from(div.querySelectorAll('li:nth-child(2) ul:first-child li:first-child li'))
    .map((li) => li.textContent);
  const topicList = Array.from(div.querySelectorAll('li:nth-child(2) ul:first-child li:nth-child(2) li'))
    .map((li) => li.textContent);
  const truckSeriesList = Array.from(div.querySelectorAll('li:nth-child(2) ul:first-child li:last-child li'))
    .map((li) => li.textContent);

  return { categoryList, topicList, truckSeriesList };
}

async function filterArticles(articles, activeFilters) {
  const {
    category, topic, truck, search,
  } = activeFilters;
  const haveFilters = [category, topic, truck].some((filter) => !!filter);
  const hasSearch = !!search;
  if (!haveFilters && !hasSearch) {
    // If no filters are applied, return articles asynchronously
    return Promise.resolve(articles);
  }

  // otherwise do a query again with any of these filters
  const tags = [category, topic, truck].filter(Boolean).map((tag) => tag.replaceAll('-', ' '));
  const filterOptions = {
    ...(tags.length && { tags }),
    ...(search && { q: search }),
  };

  // Return the promise from getMagazineArticles
  // eslint-disable-next-line no-use-before-define
  return getMagazineArticles(filterOptions);
}

async function createFilter(articles, activeFilters, createDropdown, createInputSearch) {
  const searchText = getTextLabel('Search');
  const [tagList, search] = await Promise.all([
    getFilterOptions(),
    createInputSearch(searchText.toLowerCase(), activeFilters.search, searchText),
  ]);

  const categoryFilter = createDropdown(tagList.categoryList, activeFilters.category, 'category', 'All Categories');
  const categorySelection = categoryFilter.querySelector('select');
  categorySelection.addEventListener('change', (e) => e.target.form.submit());

  const topicFilter = createDropdown(tagList.topicList, activeFilters.topic, 'topic', 'All Topics');
  const topicSelection = topicFilter.querySelector('select');
  topicSelection.addEventListener('change', (e) => e.target.form.submit());

  const truckFilter = createDropdown(tagList.truckSeriesList, activeFilters.truck, 'truck', 'All Truck Series');
  const truckSelection = truckFilter.querySelector('select');
  truckSelection.addEventListener('change', (e) => e.target.form.submit());

  return [
    search,
    categoryFilter,
    topicFilter,
    truckFilter,
  ];
}

function createArticleList(block, articles, limit) {
  createList(articles, filterArticles, createFilter, buildMagazineArticle, limit, block);
}

async function createLatestMagazineArticles(mainEl, magazineArticles) {
  mainEl.innerHTML = '';
  const articleCards = document.createElement('div');
  articleCards.classList.add('latest-magazine-articles');
  mainEl.appendChild(articleCards);
  magazineArticles.forEach((entry) => {
    const articleCard = buildLatestMagazineArticle(entry);
    articleCards.appendChild(articleCard);
  });
}

const tempData = [];

async function getMagazineArticles({
  limit, offset = 0, tags = null, q = 'truck',
} = {}) {
  const hasLimit = limit !== undefined;
  const variables = {
    tenant: 'franklin-vg-volvotrucks-us',
    language: 'EN',
    q,
    facets: [
      {
        field: 'TAGS',
      },
    ],
    filters: [{ field: 'CATEGORY', value: 'magazine' }],
    limit: hasLimit ? limit : null,
    offset,
  };

  if (tags && tags.length) {
    tags.forEach((tag) => {
      variables.filters.push({ field: 'TAGS', value: tag });
    });
  }

  try {
    const rawData = await fetchData({
      query: magazineSearchQuery(),
      variables,
    });

    const querySuccess = rawData && rawData.data && rawData.data.volvosearch;

    if (!querySuccess) {
      return tempData;
    }

    const isImageLink = (link) => `${link}`
      .split('?')[0].match(/\.(jpeg|jpg|gif|png|svg|bmp|webp)$/) !== null;

    const getDefaultImage = () => {
      const logoImageURL = '/media/logo/media_10a115d2f3d50f3a22ecd2075307b4f4dcaedb366.jpeg';
      return getOrigin() + logoImageURL;
    };

    const { items, count } = rawData.data.volvosearch;
    tempData.push(...items.map((item) => ({
      ...item.metadata,
      filterTag: item.metadata.tags,
      author: item.metadata.articleAuthor ? item.metadata.articleAuthor.name : defaultAuthor,
      image: isImageLink(item.metadata.articleImage)
        ? getOrigin() + item.metadata.articleImage : getDefaultImage(),
      path: item.uuid,
      readingTime: /\d+/.test(item.metadata.readTime) ? item.metadata.readTime : defaultReadTime,
      isDefaultImage: !isImageLink(item.metadata.articleImage),
    })));

    if (!hasLimit && tempData.length < count) {
      return getMagazineArticles({ limit: count, offset: tempData.length });
    }
    const sortedByDate = [...tempData.sort(
      (a, b) => new Date(b.publishDate) - new Date(a.publishDate),
    )];
    tempData.length = 0;
    return sortedByDate;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching magazine articles:', error);
    return tempData;
  }
}

export default async function decorate(block) {
  const latest = block.classList.contains('latest');
  const limit = latest ? 3 : undefined;
  const limitPerPage = 8;
  const magazineArticles = await getMagazineArticles({ limit });
  if (latest) {
    createLatestMagazineArticles(block, magazineArticles);
  } else {
    createArticleList(block, magazineArticles, limitPerPage);
  }
}
