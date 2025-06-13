import { SEARCH_CONFIGS } from './common.js';

export const { TENANT = false, SEARCH_URL_PROD = false, SEARCH_URL_DEV = false } = SEARCH_CONFIGS;

// because the dev url has different items is better to use the prod one also in dev
export async function fetchSearchData(queryObj) {
  try {
    if (!SEARCH_URL_PROD) {
      throw new Error('Search link not found');
    }
    const response = await fetch(SEARCH_URL_PROD, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': queryObj.length,
      },
      body: JSON.stringify(queryObj),
    });

    return response.json();
  } catch (error) {
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
query EdsWordPhraseSuggest($term: String!, $tenant: String!, $language: EdsLocaleEnum!, $sizeSuggestions: Int) {
  edsWordPhraseSuggest(term: $term, tenant: $tenant, language: $language, sizeSuggestions: $sizeSuggestions) {
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

export const topicSearchQuery = () => `
  query Edsrecommend($tenant: String!, $language: EdsLocaleEnum!, $limit: Int, $offset: Int, $category: String, $article: ArticleFilter, $sort: EdsSortOptionsEnum, $facets: [EdsFieldEnum]) {
    edsrecommend(tenant: $tenant, language: $language, limit: $limit, offset: $offset, category: $category, article: $article, sort: $sort, facets: $facets) {
      count
      items {
        uuid
        score
        metadata {
          title
          description
          url
          language
          lastModified
          publishDate
          image
          article {
            author
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
