import { getLocale } from '../common.js';
import { fetchData, magazineSearchQuery, TENANT } from '../search-api.js';

/**
 * Extracts the articles that dont have an image field
 * @param {Array} articles - An array of articles
 * @returns {Array} - The same array of articles but without those that dont have an image field
 */
export const removeArticlesWithNoImage = (articles) => {
  const filteredArray = [...articles.items];
  filteredArray.filter((art) => !art.metadata.image);
  return filteredArray;
};

/**
 * Extracts the values from an array of objects and returns an array of values
 * example: [{ key: 'value' }] => ['value']
 * @param {Array} array - An array of objects
 * @returns {Array} An array of values
 */
export function getValuesFromObjectsArray(array = []) {
  if (!Array.isArray(array) || array.length === 0) return [];
  return array.map((item) => Object.values(item)[0]);
}

/**
 * Extract the classes of a block and in case there is a 'limit-X' set, extract it as a number
 * @param {block} block - The block element
 * @returns {number} - A number representing the limit
 */
export const extractLimitFromBlock = (block) => {
  let limit = null;
  const blockClass = [...block.classList].find((className) => className.startsWith('limit-'));
  if (blockClass) {
    const [, value] = blockClass.split('-');
    limit = Number(value);
  }
  return limit;
};

/**
 * Filters out the current article from the list of articles.
 *
 * @param {Array<Object>} articles - The list of articles to filter.
 * @returns {Array<Object>} - The filtered list of articles excluding the current article.
 */
export const clearCurrentArticle = (articles) => articles.filter((article) => {
  const currentArticlePath = window.location.href.split('/').pop();
  const lastElementInUrl = article.metadata.url.split('/').filter((item) => item.trim() !== '').pop();
  if (lastElementInUrl !== currentArticlePath) return article;
  return null;
});

/**
 * Checks whether the current page is a magazine template.
 */
export const isMagazineTemplate = document.body.classList.contains('v2-magazine') || document.body.classList.contains('magazine');

/**
 * Sorts an array of articles by a specified date field within the `metadata` object.
 * @param {Array<Object>} articles - The array of article objects to be sorted.
 * Each article must have a `metadata` property.
 * @param {string} dateField - The name of the date field within the `metadata` object to sort by
 * (e.g., "lastModified" or "publishDate").
 * @returns {Array<Object>} A new array of articles sorted in descending order by the specified
 * date field. Articles with invalid or missing date fields are excluded from the result.
 */
export const sortArticlesByDateField = (articles, dateField) => {
  const articlesWithTimestamps = articles.map((article) => {
    const rawTimestamp = article.metadata?.[dateField];
    const timestamp = rawTimestamp ? new Date(rawTimestamp * 1000).getTime() : null;

    if (timestamp === null) {
      // eslint-disable-next-line no-console
      console.warn(`Date field "${dateField}" not found or invalid in metadata for article`, article);
    }

    return {
      ...article,
      timestamp,
    };
  });

  const sortedArticles = articlesWithTimestamps
    .filter((article) => article.timestamp !== null)
    .sort((a, b) => b.timestamp - a.timestamp);

  return sortedArticles;
};

/**
 * Fetches magazine articles based on the provided criteria.
 *
 * @param {Object} options - Options for fetching magazine articles.
 * @param {number} options.limit - The maximum number of articles to fetch.
 * @param {number} [options.offset=0] - The starting point for fetching articles (pagination).
 * @param {Array<string>|null} [options.tags=null] - Tags to filter articles.
 * @param {string} [options.q='truck'] - The query term to search for articles.
 * @param {string} [options.sort] - The sorting criteria for articles.
 * @param {string} [options.tenant=TENANT] - The tenant identifier.
 * @param {string} [options.language=getLocale().split('-')[0].toUpperCase()] -
 * The language code for the articles.
 * @param {string} [options.category='magazine'] - The category of articles to fetch.
 * @param {Array<string>} [options.facets=['ARTICLE', 'TOPIC', 'TRUCK']] -
 * The facets to include in the search.
 * @returns {Promise<Object|null>} The fetched articles data, or null if an error occurs.
 *
 * @async
 * @throws {Error} Logs errors to the console and returns null if the fetch fails.
 */
export const fetchMagazineArticles = async ({
  limit,
  offset = 0,
  tags = null,
  q = 'truck',
  sort,
  tenant = TENANT,
  language = getLocale().split('-')[0].toUpperCase(),
  category = 'magazine',
  facets = ['ARTICLE', 'TOPIC', 'TRUCK'],
} = {}) => {
  const variables = {
    tenant,
    language,
    q,
    category,
    limit: limit ?? null,
    offset,
    facets,
    sort,
    article: tags || {},
  };

  try {
    const rawData = await fetchData({
      query: magazineSearchQuery(),
      variables,
    });
    return rawData?.data?.edssearch || null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching magazine articles:', error);
    return null;
  }
};
