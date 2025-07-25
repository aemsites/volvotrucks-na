import { getOrigin, getTextLabel, createElement, getDateFromTimestamp } from '../../scripts/common.js';
import { createList } from '../../scripts/magazine-press.js';
import { createOptimizedPicture } from '../../scripts/aem.js';
import { fetchMagazineArticles } from '../../scripts/services/magazine.service.js';

const defaultAuthor = getTextLabel('defaultAuthor');
const defaultReadTime = getTextLabel('defaultReadTime');
const filterLists = { category: null, topic: null, truck: null };
let firstLoad = true;

const parseArticleData = (item) => {
  const isImageLink = (link) => `${link}`.split('?')[0].match(/\.(jpeg|jpg|gif|png|svg|bmp|webp)$/) !== null;

  const getDefaultImage = () => {
    const logoImageURL = '/media/logo/media_10a115d2f3d50f3a22ecd2075307b4f4dcaedb366.jpeg';
    return getOrigin() + logoImageURL;
  };

  const { article, image } = item.metadata;
  const filterTag = ['category', 'topic', 'truck'].map((key) => item.metadata.article[key]).filter(Boolean);

  return {
    ...item.metadata,
    filterTag,
    author: article.author || defaultAuthor,
    image: isImageLink(image) ? getOrigin() + image : getDefaultImage(),
    path: item.metadata?.url,
    readingTime: /\d+/.test(article.readTime) ? article.readTime : defaultReadTime,
    isDefaultImage: !isImageLink(image),
    category: article.category,
  };
};

const extractFilters = (facets) => {
  facets.forEach((facet) => {
    const key = facet.field === 'ARTICLE' ? 'category' : facet.field.toLowerCase();
    const uniqueItems = new Set(
      facet.items.map((item) => {
        const value = item.value.trim();
        return key === 'truck' ? value.toUpperCase() : value.charAt(0).toUpperCase() + value.slice(1);
      }),
    );
    filterLists[key] = [...uniqueItems];
  });
};

const processMagazineArticles = async (params = {}) => {
  const rawData = await fetchMagazineArticles(params);

  if (!rawData) {
    console.error('No data returned from fetchMagazineArticles');
    return [];
  }

  const { items, count, facets: dataFacets } = rawData;

  if (!items || items.length === 0) {
    console.error('No items returned in raw data:', rawData);
    return [];
  }

  const articles = items.map((item) => parseArticleData(item));

  // TODO: fix this since it wont bring all articles if count > 100
  // OpenSearch limit is 100 items. See press.releases.service.js
  if (!params.limit && articles.length < count) {
    const moreArticles = await processMagazineArticles({
      ...params,
      limit: count,
      offset: articles.length,
    });
    return articles.concat(moreArticles);
  }

  if (firstLoad) {
    firstLoad = false;
    extractFilters(dataFacets);
  }

  const sortedArticles = articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  return sortedArticles;
};

function buildMagazineArticle(entry) {
  const { path, image, title, description, author, category, readingTime, publishDate, isDefaultImage } = entry;

  const card = createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '380', height: '214' }]);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);

  card.innerHTML = `
    <a href="${path}" class="imgcover">
      ${pictureTag}
    </a>
    <div class="content">
      <ul>
        <li>${formattedDate}</li>
      ${category ? `<li>${category}</li>` : ''}
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
  const { url, image, title, description, linkText } = entry;
  const card = createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '590', height: '410' }]);
  const pictureTag = picture.outerHTML;
  const readMore = linkText || 'Read more...';
  card.innerHTML = `
    <a href="${url}" class="imgcover">
      ${pictureTag}
    </a>
    <div class="content">
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${url}" class="cta">${readMore}</a>
    </div>
  `;
  return card;
}

async function filterArticles(articles, activeFilters) {
  const { category, topic, truck, search } = activeFilters;
  const filters = { category, topic, truck };
  const haveFilters = [category, topic, truck].some((filter) => !!filter);
  const hasSearch = !!search;

  if (!haveFilters && !hasSearch) {
    // If no filters are applied, return articles asynchronously
    return Promise.resolve(articles);
  }

  // otherwise do a query again with any of these filters
  const tags = {};
  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      // values stored as facets are separated by an space, so if the url filter has a dash
      // it has to be replaced by a space
      tags[key] = value.replaceAll('-', ' ');
    }
  });

  const filterOptions = {
    ...(haveFilters && { tags }),
    ...(search && { q: search }),
  };

  try {
    const filteredArticles = await processMagazineArticles({
      ...filterOptions,
      limit: articles.length,
      offset: 0,
    });
    return filteredArticles;
  } catch (error) {
    console.error('Error filtering articles:', error);
    return [];
  }
}

async function createFilter(articles, activeFilters, createDropdown, createInputSearch) {
  const searchText = getTextLabel('Search');
  const term = activeFilters.search || '';
  const { category, topic, truck } = filterLists;
  const search = await createInputSearch(searchText.toLowerCase(), term, searchText);
  const categoryFilter = createDropdown(category, activeFilters.category, 'category', 'All Categories');
  const topicFilter = createDropdown(topic, activeFilters.topic, 'topic', 'All Topics');
  const truckFilter = createDropdown(truck, activeFilters.truck, 'truck', 'All Truck Series');

  [categoryFilter, topicFilter, truckFilter].forEach((filter) => {
    const select = filter.querySelector('select');
    select.addEventListener('change', (e) => e.target.form.submit());
  });

  return [search, categoryFilter, topicFilter, truckFilter];
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

export default async function decorate(block) {
  const latest = block.classList.contains('latest');
  const limit = latest ? 3 : undefined;
  const magazineArticles = await processMagazineArticles({ limit, sort: 'PUBLISH_DATE_DESC' });
  if (latest) {
    createLatestMagazineArticles(block, magazineArticles);
  } else {
    const limitPerPage = 8;
    createArticleList(block, magazineArticles, limitPerPage);
  }
}
