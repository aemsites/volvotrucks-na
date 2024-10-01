import { SEARCH_URLS, isDevHost } from './common.js';

const { SEARCH_URL_DEV, SEARCH_URL_PROD } = SEARCH_URLS;
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

export const searchQuery = (hasFilters) => `
query Volvosearch($tenant: String!, $q: String, $offset: Int, $limit: Int, $language: VolvoLocaleEnum!,
$facets: [VolvoFacet], $sort: [VolvoSortOptionsEnum]${hasFilters ? ', $filters: [VolvoFilterItem]' : ''}) {
  volvosearch(tenant: $tenant, q: $q, offset: $offset, limit: $limit, language: $language,
  facets: $facets, sort: $sort${hasFilters ? ', filters: $filters' : ''}) {
    count
    items {
      uuid
      score
      metadata {
        title
        description
        url
        lastModified
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
query Volvosuggest($term: String!, $tenant: String!, $locale: VolvoLocaleEnum!, $sizeSuggestions: Int) {
  volvosuggest(term: $term, tenant: $tenant, locale: $locale, sizeSuggestions: $sizeSuggestions) {
    terms
  }
}`;

export const magazineSearchQuery = () => `
query Volvosearch($tenant: String!, $language: VolvoLocaleEnum!, $q: String, $facets: [VolvoFacet], $filters: [VolvoFilterItem], $limit: Int, $offset: Int) {
  volvosearch(tenant: $tenant, language: $language, q: $q, facets: $facets, filters: $filters, limit: $limit, offset: $offset) {
    count
    facets {
      field
      items {
        value
        count
      }
    }
    items {
      uuid
      metadata {
        title
        description
        url
        lastModified
        language
        articleAuthor {
          name
          profileImage
        }
        locale
        readTime
        location
        media
        contentPath
        resourceType
        displayDate
        tags
        publishDate
        articleImage
      }
      score
    }
  }
}
`;
