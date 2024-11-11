import { isDevHost, SEARCH_CONFIGS } from './common.js';

export const { TENANT, SEARCH_URL_DEV, SEARCH_URL_PROD } = SEARCH_CONFIGS;
const isProd = !isDevHost();
const SEARCH_LINK = !isProd ? SEARCH_URL_DEV : SEARCH_URL_PROD;

export async function fetchData(queryObj) {
  try {
    const response = await fetch(
      SEARCH_LINK,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Content-Length': queryObj.length,
        },
        body: JSON.stringify(queryObj),
      },
    );

    return response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching data:', error);
    throw error;
  }
}

export function sanitizeQueryTerm(query) {
  return query.replace(/[<>]/g, (tag) => {
    const replacements = {
      '<': '&lt;',
      '>': '&gt;',
    };
    return replacements[tag] || tag;
  });
}

export const searchQuery = () => `
query Edssearch($tenant: String!, $language: EdsLocaleEnum!, $q: String, $limit: Int, $offset: Int,
$facets: [EdsFieldEnum], $sort: EdsSortOptionsEnum, $article: ArticleFilter, $category: [String]) {
  edssearch(tenant: $tenant, language: $language, q: $q, limit: $limit, offset: $offset,
  facets: $facets, sort: $sort, article: $article, category: $category) {
    count
    items {
      uuid
      score
      metadata {
        title
        description
        url
        lastModified
        language
        category
        article {
          category
          topic
          truck
        }
      }
    }
    facets {
      field
      items {
        value
        count
      }
    }
  }
}
`;

export const autosuggestQuery = () => `
query Edssuggest($term: String!, $tenant: String!, $locale: EdsLocaleEnum!, $sizeSuggestions: Int) {
  edssuggest(term: $term, tenant: $tenant, locale: $locale, sizeSuggestions: $sizeSuggestions) {
    terms
  }
}
`;

export const magazineSearchQuery = () => `
query Edssearch($tenant: String!, $language: EdsLocaleEnum!, $q: String, $limit: Int, $offset: Int,
$category: [String], $facets: [EdsFieldEnum], $article: ArticleFilter, $sort: EdsSortOptionsEnum) {
  edssearch(tenant: $tenant, language: $language, q: $q, limit: $limit, offset: $offset,
  category: $category, facets: $facets, article: $article, sort: $sort) {
    count
    items {
      uuid
      score
      metadata {
        title
        description
        url
        lastModified
        language
        category
        publishDate
        image
        article {
          author
          category
          topic
          truck
          readTime
        }
      }
    }
    facets {
      field
      items {
        value
        count
      }
    }
  }
}
`;
