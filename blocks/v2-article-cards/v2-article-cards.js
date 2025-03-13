import { createElement, unwrapDivs, getTextLabel, getDateFromTimestamp } from '../../scripts/common.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import { fetchMagazineArticles, removeArticlesWithNoImage, sortArticlesByDateField } from '../../scripts/services/magazine.service.js';
import createPagination from '../../common/pagination/pagination.js';

const blockName = 'v2-article-cards';

const createCard = (article) => {
  const {
    metadata: { url, image, title, publishDate },
    button = false,
  } = article;

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
    articleList.classList.add(`${blockName}--${amount}-articles`);
  } else {
    articleList.classList.add(`${blockName}--dynamic-articles`);
  }
};

/**
 * Waits until at least one article heading (`h4.${blockName}__card-heading`) is rendered on the page.
 * If articles are already present, it resolves immediately. Otherwise, it waits for them to appear using MutationObserver.
 *
 * @returns {Promise<NodeListOf<HTMLHeadingElement>>} A promise that resolves with a list of `h4` elements when they are found.
 */
const waitForArticlesToRender = () => {
  return new Promise((resolve) => {
    const existingArticles = document.querySelectorAll(`h4.${blockName}__card-heading`);
    if (existingArticles.length > 0) {
      return resolve(existingArticles);
    }

    const observer = new MutationObserver(() => {
      const articles = document.querySelectorAll(`h4.${blockName}__card-heading`);
      if (articles.length > 0) {
        observer.disconnect();
        resolve(articles);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  });
};

/**
 * Filters out articles that are already displayed on the page.
 * Ensures only unique articles (not present in previous blocks) are returned.
 *
 * @param {Array<Object>} articles - List of fetched articles, each containing metadata including a title.
 * @returns {Promise<Array<Object>>} A promise resolving to an array of articles that are not already displayed on the page.
 */
const removeArtsInPage = async (articles) => {
  const existingArticles = await waitForArticlesToRender();
  console.log(existingArticles);

  if (existingArticles.length === 0) {
    return articles;
  }

  const displayedTitles = new Set([...existingArticles].map((article) => article.textContent?.trim().toLowerCase()).filter(Boolean));

  return articles.filter((article) => {
    const title = article?.metadata?.title?.split('|')[0].trim().toLowerCase();
    return title && !displayedTitles.has(title);
  });
};

export default async function decorate(block) {
  const allArticles = await fetchMagazineArticles({ limit: 100 });
  const articles = removeArticlesWithNoImage(allArticles);

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

  const selectedArticles = [];

  if (amountOfLinks !== 0) {
    const buttons = block.querySelectorAll('.button-container');
    buttons.forEach((button) => {
      const buttonHref = button.querySelector('a')?.href;
      const buttonPath = buttonHref ? new URL(buttonHref).pathname : null;
      articles.forEach((article) => {
        const articlePath = article?.metadata?.url ? new URL(article.metadata.url).pathname : null;
        if (buttonPath === articlePath) {
          article.button = button;
          selectedArticles.push(article);
        }
      });
    });
  }
  if (selectedArticles.length > 0) {
    block.querySelector('.pagination-content')?.remove();
    createArticleCards(block, selectedArticles, amountOfLinks);
  } else {
    const uniqueArticles = await removeArtsInPage(articles);
    const sortedArticles = sortArticlesByDateField(uniqueArticles, 'publishDate');
    // After sorting articles by date, set the chunks of the array for future pagination
    const chunkedArticles = sortedArticles?.reduce((resultArray, item, index) => {
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
  }
  unwrapDivs(block);
}
