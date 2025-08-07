import { createElement, unwrapDivs, getTextLabel, getDateFromTimestamp, getOrigin } from '../../scripts/common.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import { fetchMagazineArticles } from '../../scripts/services/magazine.service.js';
import createPagination from '../../common/pagination/pagination.js';

const blockName = 'v2-article-cards';
let offsetMultiplier = 1;
let temporaryOffset = 0;

const createCard = (article) => {
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
          ${getTextLabel('readMoreBtn')}
        </a>
      </div>
    `);
    textWrapper.appendChild(newButton);
  }
  card.appendChild(cardContent);
  return card;
};

const createArticleCards = (block, articles = null, amount = null) => {
  const articleList = createElement('div', { classes: `${blockName}__article-list` });
  articles.forEach((art) => {
    const card = createCard(art);
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

/**
 * Finds and associates articles with corresponding buttons within a given block.
 *
 * @param {Array} articles - The list of articles to match.
 * @param {HTMLElement} block - The container element containing buttons.
 * @returns {Array} - The list of selected articles with associated buttons.
 */
const getSelectedArticles = (articles, block) => {
  const selectedArticles = [];
  const buttons = block.querySelectorAll('.button-container');

  buttons.forEach((button) => {
    const buttonLink = button.querySelector('a')?.href;
    const buttonPath = buttonLink ? new URL(buttonLink).pathname : null;

    articles.forEach((article) => {
      const articlePath = article?.url ? new URL(article.url).pathname : null;
      if (buttonPath === articlePath) {
        article.button = button;
        selectedArticles.push(article);
      }
    });
  });

  return selectedArticles;
};

/**
 * Filters out articles that are already displayed on the page.
 *
 * @param {Array} articles - The list of articles to filter.
 * @returns {Array} - The list of articles that are not yet displayed.
 */
const filterDisplayedArticles = (articles) => {
  const existingArticleHeadings = new Set(
    [...document.querySelectorAll(`h4.${blockName}__card-heading`)].map((heading) => heading.textContent.trim().toLowerCase()),
  );

  return articles.filter(({ title }) => {
    if (!title) {
      return false;
    }

    const normalizedTitle = title.split('|')[0].trim().toLowerCase();
    return !existingArticleHeadings.has(normalizedTitle);
  });
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

const parseMagazineArticle = (item) => {
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

const processMagazineArticles = async (params) => {
  const rawData = await fetchMagazineArticles(params);

  if (!rawData) {
    console.error('No data returned from fetchMagazineArticles');
    return [];
  }
  const { items, count } = rawData;

  if (!items || items.length === 0) {
    console.error('No items returned in raw data:', rawData);
    return [];
  }

  const magazineArticles = items.map((item) => parseMagazineArticle(item));

  temporaryOffset = temporaryOffset + 100 < count ? 100 * offsetMultiplier : count - temporaryOffset + temporaryOffset;
  offsetMultiplier++;

  if (temporaryOffset < count) {
    const moreMagazineArticles = await processMagazineArticles({
      ...params,
      offset: temporaryOffset,
    });
    return magazineArticles.concat(moreMagazineArticles);
  }

  return magazineArticles;
};

export default async function decorate(block) {
  const options = getQueryOptionsFromURL();
  const hasFilters = hasQueryFilters();

  if (hasFilters) {
    block.innerText = '';
  }

  const articles = await processMagazineArticles(options);

  if (!articles) {
    return;
  }

  const amountOfLinks = block.children.length;
  const blockClassList = [...block.classList];

  // Get the limit set in the block
  let limitAmount = null;
  blockClassList.forEach((el) => {
    if (el.includes('limit')) {
      const limit = el.split('-');
      limitAmount = Number(limit[limit.length - 1]);
    }
  });

  const selectedArticles = amountOfLinks !== 0 ? await getSelectedArticles(articles, block) : [];

  if (selectedArticles.length > 0) {
    block.querySelector('.pagination-content')?.remove();
    createArticleCards(block, selectedArticles, amountOfLinks);
  }

  const uniqueArticles = await filterDisplayedArticles(articles);
  // After sorting articles by date, set the chunks of the array for future pagination
  const chunkedArticles = uniqueArticles?.reduce((resultArray, item, index) => {
    limitAmount = limitAmount || 9;
    const chunkIndex = Math.floor(index / limitAmount);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  if (chunkedArticles && chunkedArticles.length > 0) {
    let contentArea = block.querySelector('.pagination-content');
    if (!contentArea) {
      contentArea = createElement('div', { classes: ['pagination-content'] });
      block.appendChild(contentArea);
    }
    const baseURL = window.location.origin;
    await loadCSS(`${baseURL}/common/pagination/pagination.css`);
    createPagination(chunkedArticles, block, createArticleCards, contentArea, 0);
  } else {
    console.error('No chunked articles created.');
  }
  unwrapDivs(block);
}
