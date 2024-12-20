import templates from './templates.js';
import { loadScript } from '../../scripts/aem.js';

// Implementation based on searchtax documentation https://www.searchstax.com/docs/searchstudio/searchstax-studio-searchjs-module/
export default async function decorate(block) {
  block.innerHTML = `
  <div class="search-input-wrapper">
    <div id="searchResultInput"></div>
  </div>

  <div class="search-results-summary-options-wrapper">
    <div id="searchResultSummarySection"></div>
    <div id="searchOptionsSection"></div>
  </div>

  <div class="search-results-wrapper">
    <div class="facet-container-wrapper">
      <div id="searchFacetSection"></div>
    </div>
    <div class="result-container-wrapper">
      <div id="external-search-result-container"></div>
      <div id="searchResultsSection"></div>
      <div id="relatedSearchesSection"></div>
      <div id="paginationSection"></div>
    </div>
  </div>
  `;

  function setCookie(name, value, days = 7, path = '/') {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=${path}`;
  }

  function getCookie(name) {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  }

  // generating random value for cookie when value is missing
  function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function getOrSetCookie(name) {
    let cookieID = getCookie(name);
    if (cookieID == null) {
      cookieID = makeid(25);
      setCookie(name, cookieID);
    }
    return cookieID;
  }

  function formatDate(value) {
    if (value != null) {
      if (typeof value === 'undefined') {
        return '';
      }
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(value).toLocaleDateString(undefined, options);
    }
    return value;
  }

  window.studioConfig = {
    connector: {
      url: 'https://ss705916-dy2uj8v7-us-east-1-aws.searchstax.com/solr/productionvolvotrucks-1157/emselect',
      authentication: 'YXBwMTE1Ny1hcGk6Vm9sdm90cnVja3NAMjAyMw==',
      apikey: '3Ixo3pslPZXcRt0PCJXaYSN1evQyD3tERt1RaAUaRNU',
      select_auth_token: 'None',
      suggester_auth_token: 'None',
      search_auth_type: 'basic',
      session: getOrSetCookie('searchcookie'),
      fields: { description: 'meta_description_t', title: '_name', url: 'result_url_creation_s' },
      suggester: 'https://ss705916-dy2uj8v7-us-east-1-aws.searchstax.com/solr/productionvolvotrucks-1157-suggester/emsuggest',
      searchAPIKey: '25c0942a02ba3b11f3b1182ed398c4442d85d115',
      language: 'en',
      fieldFormatters: { date: formatDate },
      searchAdditionalArgs: 'hl.fragsize=200',
      hideUniqueKey: true,
    },
    searchResults: '#searchResultsSection',
    searchInput: '#searchResultInput',
    searchResultSummarySection: '#searchResultSummarySection',
    facetSection: '#searchFacetSection',
    searchOptionsSection: '#searchOptionsSection',
    relatedSearchesSection: '#relatedSearchesSection',
    paginationSection: '#paginationSection',
    customSearchTemplate: '#search-template',
    customSearchFeedbackTemplate: '#searchFeedback-template',
    customPagingTemplate: '#paging-template',
    customPaginationTemplate: '#paging-template',
    customSearchOptionSectionTemplate: '#searchOptionSection-template',
    customNoResultTemplate: '#noresult-template',
    customFacetTemplate: '#facet-template',
    hideBranding: false,
    isGridLayout: true,
    display: 'multi',
    facet_pagination: 3,
    customResultTemplate: '#result-template',
    customRelatedSearchesTemplate: '#customRelatedSearches-template',
    externalSearchResults: '#external-search-result-container',
    customExternalPromotionsTemplate: '#external-search-result-template',
    suggestAfterMinChars: 2,
  };

  // these functions required for searchstax
  const scripts = [
    {
      inline: `
      var _msq = _msq || []; //declare object
      var analyticsBaseUrl = 'https://analytics-us.searchstax.com';
      (function () {
        var ms = document.createElement('script');
        ms.type = 'text/javascript';
        ms.src = 'https://static.searchstax.com/studio-js/v3.20/js/studio-analytics.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ms, s);
      })();
    `,
    },
    {
      inline: `
      (function (w, d, s, o, f) {
        w['sf-widget'] = o;
        w[o] =
          w[o] ||
          function () {
            (w[o].q = w[o].q || []).push(arguments);
          };
        js = d.createElement(s);
        fjs = d.getElementsByTagName(s)[0];
        js.src = f;
        js.async = 1;
        fjs.parentNode.insertBefore(js, fjs);
      })(window, document, 'script', '_sf', 'https://static.searchstax.com/studio-js/v3.20/js/studio-feedback.js');
      _sf('4kKviXTq4zCnoB4SuKAFhZHVRZTAokybcN6uMcS1HQ4');
    `,
    },
  ];

  // adding templates
  const temps = document.createElement('div');
  temps.innerHTML = templates.join('');
  document.body.appendChild(temps);

  // loading scripts one by one to prevent inappropriate script execution order.

  for (const script of scripts) {
    const newScript = document.createElement('script');

    newScript.setAttribute('type', 'text/javascript');

    if (script.inline) {
      newScript.innerHTML = script.inline;
      document.body.append(newScript);
    }
  }

  loadScript('https://static.searchstax.com/studio-js/v3.20/js/studio-app.js', { type: 'text/javascript', charset: 'UTF-8' });
  loadScript('https://static.searchstax.com/studio-js/v3.20/js/studio-vendors.js', { type: 'text/javascript', charset: 'UTF-8' });
}
