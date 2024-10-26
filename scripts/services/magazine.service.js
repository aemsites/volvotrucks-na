import {
  getJsonFromUrl,
  getLanguagePath,
  getOrigin,
} from '../common.js';

/**
 * Fetches magazine articles from a given URL.
 * @async
 * @returns {Promise<Array>} - A promise that resolves to an array of article objects or an
 * empty array if the fetch fails.
 */
export const fetchMagazineArticles = async () => {
  try {
    const indexUrl = new URL(`${getLanguagePath()}magazine-articles.json`, getOrigin());
    const response = await getJsonFromUrl(indexUrl);

    if (!response?.data) {
      // eslint-disable-next-line no-console
      console.warn('No data found in response.');
      return [];
    }

    const { data } = response;

    return Array.isArray(data) ? data : [data];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error fetching articles: ${error.message || error}`);
    return [];
  }
};

/**
 * Extracts the articles that dont have an image field
 * @param {Array} articles - An array of articles
 * @returns {Array} - The same array of articles but without those that dont have an image field
 */
export const removeArticlesWithNoImage = (articles) => {
  const filteredArray = [...articles];
  filteredArray.filter((art) => !art.image);
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
 * Checks the current URL to delete the same article from the other lists
 * @param {Array} articles - The articles array
 * @returns {Array} The articles without the opened one
 */
export const clearCurrentArticle = (articles) => articles.filter((e) => {
  const currentArticlePath = window.location.href.split('/').pop();
  const lastElementInUrl = e.path.split('/').filter((item) => item.trim() !== '').pop();
  if (lastElementInUrl !== currentArticlePath) return e;
  return null;
});

/**
 * Check if the actual page is a magazine template
*/
export const isMagazineTemplate = document.body.classList.contains('v2-magazine') || document.body.classList.contains('magazine');

/**
 * Sorts articles by the specified date field in descending order.
 * @param {Array} articles - The array of article objects to be sorted.
 * @param {string} dateField - The date field to sort by (e.g., 'lastModified' or 'date').
 * @returns {Array} - A new array of articles sorted by the most recent date.
 */
export const sortArticlesByDateField = (articles, dateField) => articles
  .map((article) => ({
    ...article,
    timestamp: new Date(article[dateField]).getTime(),
  }))
  .sort((a, b) => b.timestamp - a.timestamp);
