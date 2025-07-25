import { getLocale } from '../common.js';
import { fetchSearchData, pressReleaseQuery, TENANT } from '../search-api.js';

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
export const fetchPressReleases = async ({
  tenant = TENANT,
  language = getLocale().split('-')[0].toUpperCase(),
  q = 'Volvo',
  limit = 100,
  offset = 0,
  category = 'Press releases',
  sort,
} = {}) => {
  const variables = {
    tenant,
    language,
    q,
    limit,
    offset,
    category,
    sort,
  };

  try {
    if (!tenant) {
      throw new Error('TENANT not defined');
    }

    const rawData = await fetchSearchData({
      query: pressReleaseQuery(),
      variables,
    });
    return rawData?.data?.edssearch || null;
  } catch (error) {
    console.error('Error fetching magazine articles:', error);
    return null;
  }
};
