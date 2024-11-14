export const getMainTemplate = (PLACEHOLDERS) => {
  const [relevance, newest, oldest] = PLACEHOLDERS.sortFilter.split(',');
  return `
  <div class="search-input-wrapper">
    <div id="searchInput" class="input-container-custom">
      <div class="sf-header-searchstudio-js mb-5">
        <div class="sf-form">
          <div id="autosuggest" class="form-control-suggest">
            <div role="combobox" aria-expanded="false" aria-haspopup="listbox"
              aria-owns="autosuggest-autosuggest__results">
              <input type="text" autocomplete="off" aria-autocomplete="list" id="searchTerm"
                aria-controls="autosuggest-autosuggest__results"
                placeholder="${PLACEHOLDERS.searchFor}..." autofocus="autofocus">
            </div>
            <div id="autosuggest-autosuggest__results" class="autosuggest__results-container">
              <div aria-labelledby="autosuggest" class="autosuggest__results"> 
                <ul role="listbox"></ul>
              </div>
            </div>
          </div>
          <span>
            <button type="submit" class="btn text-primary search-close-button">
              <span class="fa fa-search search-icon"></span>
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>

  <div class="search-results-summary-options-wrapper">
    <div id="searchResultSummarySection"></div>
    <div id="searchOptionsSection" class="hide">
      <div class="sf-filter-actions-wrapper">
        <div class="ml-auto sf-filter-actions-custom">
          <div class="form-inline justify-content-end">
            <label for="sort-by" class="ml-4 mr-2">${PLACEHOLDERS.sortBy}</label>
            <select id="order-by" class="custom-select-searchstudio-js">
              <option value="BEST_MATCH">${relevance}</option>
              <option value="LAST_MODIFIED_ASC">${newest}</option>
              <option value="LAST_MODIFIED_DESC">${oldest}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="search-results-wrapper">
    <div class="facet-container-wrapper">
      <div id="searchFacetSection" class="facet-wrapper facet-container-holder"></div>
    </div>
    <div class="result-container-wrapper">
      <div id="searchResultsSection"></div>
      <div id="paginationSection">
        <div class="search-pagination-container">
          <ul class="pagination">
            <li class="page-item">
              <a variant="outline-primary" class="page-link-searchstudio-js prev"> &lt; ${PLACEHOLDERS.previous} </a>
            </li>
            <li class="page-item">
              <span class="page-link-searchstudio-js page-number"><strong class="page-range">1 — 25 </strong> of <strong class="count">113</strong></span>
            </li>
            <li class="page-item">
              <a variant="outline-primary" class="page-link-searchstudio-js next">  ${PLACEHOLDERS.next}  &gt; </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
`;
};

export const getNoResultsTemplate = ({ noResults, refine }) => `
  <div class="search-feedback-filters-wrapper">
    <div class="search-feedback-filters-custom">
      <div class="sf-filter-info-custom">
        <span class="no-result-msg">${noResults}</span>
        <br />
        <span class="no-result-msg2">${refine}</span>
      </div>
    </div>
  </div>
`;

const addEmTag = (text, value) => {
  const words = text.split(' ');
  const result = words.map((word) => (word.toLowerCase() === value.toLowerCase()
    ? `<em>${word}</em>`
    : word));
  return result.join(' ');
};

export const getResultsItemsTemplate = ({ items, queryTerm }) => {
  let result = '';
  items.forEach((item) => {
    const { description, title, url } = item.metadata;
    const emDescription = description ? addEmTag(description, queryTerm) : '';
    const emTitle = title ? addEmTag(title, queryTerm) : '';
    result += `
      <div class="list-wrapper">
        <div class="card-searchstudio-js-custom">
          <div class="card-searchstudio-jsClass">
            <div class="card-searchstudio-js-body p-0">
              <div class="card-searchstudio-js-title">
                <a href="${url}" target="_blank" class="stretched-link">
                  <h4>${emTitle}</h4>
                </a>
              </div>
              <div class="card-searchstudio-js-body p-0">
                <div class="card-searchstudio-js-text article_promo_short_overview_t">
                  <p class="Find">${emDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  return `
    <div id="searchContainer">
      <div class="container">
        <div class="result-edit">
          <div class="sf-lists active layout-list">
            <div class="row reset-row">
              <div class="sf-list w-100 p-0 d-flex flex-wrap position-relative">
                ${result}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const getShowingResultsTemplate = (text) => `
  <div class="search-feedback-filters-wrapper-container">
    <div class="search-feedback-filters-wrapper">
      <div class="search-feedback-filters-custom align-items-center333">
        <div class="sf-filter-info">
          <span>${text}</span>
        </div>
      </div>
    </div>
  </div>
`;

const sanitizeString = (string) => string.replaceAll(' ', '-');

const getItemsList = (items, filter) => items.map((item, i) => {
  const sanitizedValue = sanitizeString(item.value);
  return `
    <li ${i > 2 ? 'class="d-none"' : ''}>
      <input type="checkbox" id="${sanitizedValue}" data-filter="${filter}" value="${item.value}" />
      <label for="${sanitizedValue}" class="ml-1">
      <span class="facet-name" title="${sanitizedValue}"> ${item.value} </span> (${item.count}) </label>
    </li>
  `;
}).join('');

export const getFacetsTemplate = (facets) => {
  const [truck, topic, article, category] = facets;
  const categoryItemsText = getItemsList(category.items, 'CATEGORY');
  const articleItemsText = getItemsList(article.items, 'ARTICLE');
  const topicItemsText = getItemsList(topic.items, 'TOPIC');
  const truckItemsText = getItemsList(truck.items, 'TRUCK');

  return `
    <div class="facet-template-container-custom">
      <div class="pill-container">
        <div class="pill">Filter By <span class="pill-close filter-by"></span></div>
      </div>
      <div class="sidebar-background"></div>
      <div class="sf-sidebar-container">
        <div class="sf-mobile-header">
          <div class="sf-mobile-header-text">Filter By</div>
          <button type="button" class="btn btn-custom text-primary search-close-button fa fa-close">
          </button>
        </div>
        <div class="sf-sidebar">
          <ul id="search-facets" class="list-group accordion">
            <li class="list-group-item-searchstudio-js">
              <div id="collapse-topics" data-parent="#search-facets" class="collapse show">
                <ul class="list-unstyled">
                  <div id="ss-search-results">
                    <div class="filters">
                      <form id="facetsFilters">
                        ${category.items.length > 0 ? `
                        <div class="facet-list mb-4">
                          <h4 class="sidebar-heading">
                            <a href="#" class="text-uppercase active">Page Categories </a>
                          </h4>
                          <div class="collapse show">
                            <ul class="list-unstyled pl-3">
                              ${categoryItemsText}
                            </ul>
                            ${category.items.length > 3 ? `
                            <div class="more-less">
                              <a href="#">More</a>
                            </div>` : ''}
                          </div>
                        </div>` : ''}
                        ${article.items.length > 0 ? `
                        <div class="facet-list mb-4">
                          <h4 class="sidebar-heading">
                            <a href="#" class="text-uppercase active">Article Categories </a>
                          </h4>
                          <div class="collapse show">
                            <ul class="list-unstyled pl-3">
                              ${articleItemsText}
                            </ul>
                            ${article.items.length > 3 ? `
                            <div class="more-less">
                              <a href="#">More</a>
                            </div>` : ''}
                          </div>
                        </div>` : ''}
                        ${topic.items.length > 0 ? `
                        <div class="facet-list mb-4">
                          <h4 class="sidebar-heading">
                            <a href="#" class="text-uppercase active">Topics </a>
                          </h4>
                          <div class="collapse show">
                            <ul class="list-unstyled pl-3">
                              ${topicItemsText}
                            </ul>
                            ${topic.items.length > 3 ? `
                            <div class="more-less">
                              <a href="#">More</a>
                            </div>` : ''}
                          </div>
                        </div>` : ''}
                        ${truck.items.length > 0 ? `
                        <div class="facet-list mb-4">
                          <h4 class="sidebar-heading">
                            <a href="#" class="text-uppercase active">Trucks </a>
                          </h4>
                          <div class="collapse show">
                            <ul class="list-unstyled pl-3">
                              ${truckItemsText}
                            </ul>
                            ${truck.items.length > 3 ? `
                            <div class="more-less">
                              <a href="#">More</a>
                            </div>` : ''}
                          </div>
                        </div>` : ''}
                      </form>
                    </div>
                  </div>
                </ul>
              </div>
            </li>
          </ul>
          <button type="button" class="btn btn-custom close-button">Done</button>
        </div>
      </div>
    </div>
  `;
};
