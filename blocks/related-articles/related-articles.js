import {
  getDateFromTimestamp,
} from '../../scripts/common.js';
import {
  createOptimizedPicture,
  getMetadata,
  toClassName,
} from '../../scripts/aem.js';
import {
  fetchMagazineArticles,
  removeArticlesWithNoImage,
  sortArticlesByDateField,
} from '../../scripts/services/magazine.service.js';

const buildRelatedMagazineArticle = (entry) => {
  const {
    metadata: {
      url,
      image,
      title,
      article: {
        author,
        readTime,
      },
      publishDate,
    },
  } = entry;

  const card = document.createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '380', height: '214' }]);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);
  card.innerHTML = `
    <a href="${url}" class="imgcover">${pictureTag}</a>
    <div class="content">
      <ul><li>${formattedDate}</li></ul>
      <h3><a href="${url}">${title}</a></h3>
      <ul>
        <li>${author}</li>
        <li>${readTime}</li>
      </ul>
    </div>
  `;
  return card;
};

const filterArticles = (articles, filterTags, thisArticleTitle) => {
  const processTags = (article) => {
    const tags = [
      ...(article.metadata.article.category || []),
      ...(article.metadata.article.topic || []),
      ...(article.metadata.article.truck || []),
    ];
    return tags.map((tag) => toClassName(tag.trim()));
  };

  articles.forEach((article) => {
    article.filterTag = processTags(article);
  });

  const sortedArticles = sortArticlesByDateField(articles, 'publishDate');

  const filteredArticles = sortedArticles
    .filter((article) => article.metadata.title !== thisArticleTitle)
    .filter((article) => article.filterTag.some((tag) => filterTags.includes(tag)))
    .slice(0, 3);

  return filteredArticles;
};

const createRelatedMagazineArticles = async (mainEl, magazineArticles) => {
  const metadataTags = ['article-category', 'topic', 'truck'];
  const articleTags = metadataTags.reduce((acc, metaTag) => {
    const metaContent = getMetadata(metaTag);
    if (metaContent) {
      acc.push(...metaContent.split(',').map((tag) => toClassName(tag.trim())));
    }
    return acc;
  }, []);
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
};

export default async function decorate(block) {
  const allArticles = await fetchMagazineArticles({ sort: 'LAST_MODIFIED_DESC' });
  const articles = removeArticlesWithNoImage(allArticles);

  createRelatedMagazineArticles(block, articles);
}
