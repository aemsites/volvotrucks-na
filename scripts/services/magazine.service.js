import { getLocale } from '../common.js';
import { fetchSearchData, magazineSearchQuery, TENANT } from '../search-api.js';

/**
 * Extracts the articles that don't have an image field
 * @param {Array} articles - An array of articles
 * @returns {Array} - The same array of articles but without those that don't have an image field
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
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
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
 * Extracts the last folder from a URL.
 *
 * @param {string} url - The URL from which to extract the last folder.
 * @returns {string} The last folder in the URL.
 *
 * @example
 * // Example usage:
 * const url = 'https://example.com/folder1/folder2';
 * const lastFolder = getLastURLFolder(url);
 * console.log(lastFolder); // Output: 'folder2'
 *
 * @description
 * This function splits the URL by '/' and filters out any empty segments.
 * It then returns the last non-empty segment, which represents the last folder in the URL.
 * */
const getLastURLFolder = (url) =>
  url
    .split('/')
    .filter((item) => item.trim() !== '')
    .pop();

/**
 * Filters out the current article from the list of articles.
 *
 * @param {Array<Object>} articles - The list of articles to filter.
 * @returns {Array<Object>} - The filtered list of articles excluding the current article.
 *
 * @example
 * // Example usage:
 * const articles = [
 *  { metadata: { url: 'https://example.com/article1' } },
 *  { metadata: { url: 'https://example.com/article2' } },
 *  { metadata: { url: 'https://example.com/article3' } },
 * ];
 * const filteredArticles = clearCurrentArticle(articles);
 * console.log(filteredArticles);
 * // Output: [{ metadata: { url: 'https://example.com/article1' } }, { metadata: { url: 'https://example.com/article2' } }]
 *
 * @description
 * This function filters out the current article from the list of articles based on the URL.
 * It compares the last folder of the current URL with the last folder of each article's URL.
 * If they match, the article is excluded from the filtered list.
 * The function returns a new array containing only the articles that do not match the current article's URL.
 */
export const clearCurrentArticle = (articles) =>
  articles.filter((article) => {
    const currentArticlePath = getLastURLFolder(window.location.href);
    const lastElementInUrl = getLastURLFolder(article.metadata.url);
    return lastElementInUrl !== currentArticlePath ? article : null;
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
      console.warn(`Date field "${dateField}" not found or invalid in metadata for article`, article);
    }

    return {
      ...article,
      timestamp,
    };
  });

  const sortedArticles = articlesWithTimestamps.filter((article) => article.timestamp !== null).sort((a, b) => b.timestamp - a.timestamp);

  return sortedArticles;
};

/**
 * Fetches magazine articles based on the provided criteria.
 *
 * @param {Object} options - Options for fetching magazine articles.
 * @param {number} options.limit - The maximum number of articles to fetch.
 * @param {number} [options.offset=0] - The starting point for fetching articles (pagination).
 * @param {Object|null} [options.tags=null] - An object with keys "truck", "topic" and/or "category" to filter articles, or null.
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
  limit = 100,
  offset = 0,
  tags = {},
  q = 'truck',
  sort,
  tenant = TENANT,
  language = getLocale().split('-')[0].toUpperCase(),
  category = 'Magazine',
  facets = ['ARTICLE', 'TOPIC', 'TRUCK'],
} = {}) => {
  const variables = {
    tenant,
    language,
    q,
    category,
    limit,
    offset,
    facets,
    sort,
    article: tags,
  };

  try {
    if (!tenant) {
      throw new Error('TENANT not defined');
    }

    const rawData = await fetchSearchData({
      query: magazineSearchQuery(),
      variables,
    });
    return rawData?.data?.edssearch || null;
  } catch (error) {
    console.error('Error fetching magazine articles:', error);
    return null;
  }
};
