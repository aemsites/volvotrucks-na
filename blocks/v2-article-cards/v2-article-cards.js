import {
  getJsonFromUrl,
  getLanguagePath,
  getOrigin,
  createElement,
  unwrapDivs,
  getTextLabel,
  getDateFromTimestamp,
} from '../../scripts/common.js';
import {
  createOptimizedPicture,
  loadCSS,
} from '../../scripts/aem.js';
import createPagination from '../../common/pagination/pagination.js';

const blockName = 'v2-article-cards';
const indexUrl = new URL(`${getLanguagePath()}magazine-articles.json`, getOrigin());

const createCard = (article) => {
  const {
    path,
    image,
    title,
    publishDate,
    button = false,
  } = article;

  const shortTitle = title.split('|')[0];
  const card = createElement('a', { classes: `${blockName}__article-card`, props: { href: path } });
  const picture = createOptimizedPicture(image, shortTitle, false, [{ width: '380', height: '214' }]);
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
    articleList.classList.add(`${blockName}--${amount}-articles`);
  } else {
    articleList.classList.add(`${blockName}--dynamic-articles`);
  }
};

// Remove from the list articles that may appear in previous blocks
const removeArtsInPage = (articles) => {
  const existingArticles = document.querySelectorAll(`h4.${blockName}__card-heading`);
  const articleTitles = Array.from(existingArticles).map((article) => article.textContent.trim());
  articles.data = articles.data.filter((art) => {
    const title = art.title.split('|')[0].trim();
    return !articleTitles.includes(title);
  });
  return articles;
};

export default async function decorate(block) {
  const allArticles = await getJsonFromUrl(indexUrl);
  if (!allArticles) return;

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

  const selectedArticles = [];

  if (amountOfLinks !== 0) {
    const buttons = block.querySelectorAll('.button-container');
    buttons.forEach((a) => {
      const link = a.querySelector('a')?.href;
      [...allArticles.data].forEach((el) => {
        if (link?.includes(el.path)) {
          el.button = a;
          selectedArticles.push(el);
        }
      });
    });
  }

  if (selectedArticles.length > 0) {
    block.querySelector('.pagination-content')?.remove();
    createArticleCards(block, selectedArticles, amountOfLinks);
  } else {
    const uniqueArticles = removeArtsInPage(allArticles);
    const sortedArticles = uniqueArticles?.data.sort((a, b) => new Date(b.date) - new Date(a.date));
    // After sorting articles by date, set the chunks of the array for future pagination
    const chunkedArticles = sortedArticles?.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / limitAmount);
      if (!resultArray[chunkIndex]) resultArray[chunkIndex] = [];
      resultArray[chunkIndex].push(item);
      return resultArray;
    }, []);

    if (chunkedArticles && chunkedArticles.length > 0) {
      let contentArea = block.querySelector('.pagination-content');
      if (!contentArea) {
        contentArea = createElement('div', { classes: ['pagination-content'] });
        block.appendChild(contentArea);
      }
      await loadCSS('../../common/pagination/pagination.css');
      createPagination(chunkedArticles, block, createArticleCards, contentArea, 0);
    } else {
      // eslint-disable-next-line no-console
      console.error('No chunked articles created.');
    }
  }
  unwrapDivs(block);
}
