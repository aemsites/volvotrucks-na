import {
  getOrigin,
  getTextLabel,
  createElement,
  getDateFromTimestamp,
  getLocale,
} from '../../scripts/common.js';
import {
  createList,
} from '../../scripts/magazine-press.js';
import {
  createOptimizedPicture,
} from '../../scripts/aem.js';
import { fetchData, magazineSearchQuery, TENANT } from '../../scripts/search-api.js';

const locale = getLocale();
const language = locale.split('-')[0].toUpperCase();
const defaultAuthor = getTextLabel('defaultAuthor');
const defaultReadTime = getTextLabel('defaultReadTime');
const filterLists = { category: null, topic: null, truck: null };
let firstLoad = true;

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

  card.innerHTML = `
    <a href="${path}" class="imgcover">
      ${pictureTag}
    </a>
    <div class="content">
      <ul>
        <li>${formattedDate}</li>
      ${(category ? `<li>${category}</li>` : '')}
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
    <a href="${path}" class="imgcover">
      ${pictureTag}
    </a>
    <div class="content">
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="${path}" class="cta">${readMore}</a>
    </div>
  `;
  return card;
}

async function filterArticles(articles, activeFilters) {
  const {
    category, topic, truck, search,
  } = activeFilters;
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

  // Return the promise from getMagazineArticles
  // eslint-disable-next-line no-use-before-define
  return getMagazineArticles(filterOptions);
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
  limit, offset = 0, tags = null, q = 'truck', sort = 'BEST_MATCH',
} = {}) {
  const hasLimit = limit !== undefined;
  const variables = {
    tenant: TENANT,
    language,
    q,
    category: 'magazine',
    limit: hasLimit ? limit : null,
    offset,
    facets: ['ARTICLE', 'TOPIC', 'TRUCK'],
    sort,
    article: {},
  };

  if (tags) {
    variables.article = tags;
  }

  try {
    const rawData = await fetchData({
      query: magazineSearchQuery(),
      variables,
    });

    const querySuccess = rawData && rawData.data && rawData.data.edssearch;

    if (!querySuccess) {
      return tempData;
    }

    const isImageLink = (link) => `${link}`
      .split('?')[0].match(/\.(jpeg|jpg|gif|png|svg|bmp|webp)$/) !== null;

    const getDefaultImage = () => {
      const logoImageURL = '/media/logo/media_10a115d2f3d50f3a22ecd2075307b4f4dcaedb366.jpeg';
      return getOrigin() + logoImageURL;
    };

    const { items, count, facets } = rawData.data.edssearch;
    tempData.push(...items.map((item) => {
      const filterTag = ['category', 'topic', 'truck']
        .map((key) => item.metadata.article[key])
        .filter(Boolean);
      const { article, image } = item.metadata;
      return {
        ...item.metadata,
        filterTag,
        author: article.author || defaultAuthor,
        image: isImageLink(image) ? getOrigin() + image : getDefaultImage(),
        path: item.url,
        readingTime: /\d+/.test(article.readTime) ? article.readTime : defaultReadTime,
        isDefaultImage: !isImageLink(image),
        category: article.category,
      };
    }));

    if (!hasLimit && tempData.length < count) {
      const props = { limit: count, offset: tempData.length };
      if (tags) {
        props.tags = tags;
      }
      return getMagazineArticles(props);
    }
    if (firstLoad) {
      firstLoad = false;
      // to fill the 3 filter dropdowns is needed to get the items from the facets
      facets.forEach((facet) => {
        // article category comes as 'ARTICLE' so it has to be changed to 'category'
        const key = facet.field === 'ARTICLE' ? 'category' : facet.field.toLowerCase();
        const uniqueItems = new Set(facet.items.map((item) => {
          const value = item.value.trim();
          // truck models are uppercase
          if (key === 'truck') {
            return value.toUpperCase();
          }
          // Article categories and topics are capitalized
          return value.charAt(0).toUpperCase() + value.slice(1);
        }));
        filterLists[key] = [...uniqueItems];
      });
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
