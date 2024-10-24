import {
  getLanguagePath,
  getOrigin,
  getDateFromTimestamp,
} from '../../scripts/common.js';
import {
  ffetch,
} from '../../scripts/lib-ffetch.js';
import {
  splitTags,
} from '../../scripts/magazine-press.js';
import {
  createOptimizedPicture,
  getMetadata,
  toClassName,
} from '../../scripts/aem.js';

function buildRelatedMagazineArticle(entry) {
  const {
    path,
    image,
    title,
    author,
    readingTime,
    publishDate,
  } = entry;

  const card = document.createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '380', height: '214' }]);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);
  card.innerHTML = `<a href="${path}" class="imgcover">
  ${pictureTag}
  </a>
  <div class="content">
  <ul><li>${formattedDate}</li></ul>
  <h3><a href="${path}">${title}</a></h3>
  <ul>
  <li>${author}</li>
  <li>${readingTime}</li>
  </ul>
  </div>`;
  return card;
}

function filterArticles(articles, filterTags, thisArticleTitle) {
  articles.forEach((n) => {
    n.filterTag = splitTags(n.tags).map((m) => toClassName(m.trim()));
  });
  const filteredArticles = articles.filter((item) => item.title !== thisArticleTitle)
    .filter((item) => item.filterTag.some((tag) => filterTags.includes(tag))).slice(0, 3);
  return filteredArticles;
}

async function createRelatedtMagazineArticles(mainEl, magazineArticles) {
  const articleTags = getMetadata('article:tag').split(',').map((m) => toClassName(m.trim()));
  const articleTitle = getMetadata('og:title');
  const filteredData = filterArticles(magazineArticles, articleTags, articleTitle);

  mainEl.textContent = '';
  const articleCards = document.createElement('div');
  articleCards.classList.add('related-magazine-articles');
  mainEl.appendChild(articleCards);
  filteredData.forEach((entry) => {
    const articleCard = buildRelatedMagazineArticle(entry);
    articleCards.appendChild(articleCard);
  });
}

async function getRelatedMagazineArticles() {
  const indexUrl = new URL(`${getLanguagePath()}magazine-articles.json`, getOrigin());
  const articles = ffetch(indexUrl).all();
  return articles;
}

export default async function decorate(block) {
  const magazineArticles = await getRelatedMagazineArticles();
  createRelatedtMagazineArticles(block, magazineArticles);
}
