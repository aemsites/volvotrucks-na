import { decorateIcons, getPlaceholders, getTextLabel, getLocale, variantsClassesToBEM, getLanguagePath } from '../../scripts/common.js';
import { topicSearchQuery, fetchSearchData, TENANT } from '../../scripts/search-api.js';

const blockName = 'v2-article-search';
const filterContainerClass = `${blockName}__filter-container`;
const dropdownClass = `${blockName}__filter-dropdown`;
const dropdownOpen = `${blockName}__filter-dropdown--open`;
const filterListOpen = `${blockName}__filter-list-wrapper--open`;
const searchInputExpanded = `${blockName}__search-input--expanded`;
const blockVariants = ['black', 'gray'];

await getPlaceholders();
const filterDefault = getTextLabel('filterDefault');
const searchPlaceholder = getTextLabel('searchPlaceholder');

const locale = getLocale();
const language = locale.split('-')[0].toUpperCase();
const languagePath = getLanguagePath();
const hasLanguagePath = languagePath !== '/';

const currentURL = new URL(window.location.href);
// Previously:
// const magazinePath = '/news-and-stories/volvo-trucks-stories/';
// TODO: One day define the magazine full path in some config so we don't have this hardcoded logic
// Now we are grabbing the first two parts of the path which will allow for translations if necessary
// but this is still wrong since it has hardcoded paths, should be reviewed
const { pathname } = currentURL;
const currentPath = pathname.split('/').filter((segment) => segment !== '');
if (hasLanguagePath) {
  // If the language path exists, we need to remove it from the current path
  currentPath.shift();
}
const [newsAndStories, mainStories] = currentPath;
const magazinePath = `${languagePath}${newsAndStories}/${mainStories}/`;
const magazineParam = '?search=&category=&topic=&truck=';
currentURL.pathname = magazinePath;
currentURL.search = magazineParam;

const getTopics = async (props = {}) => {
  const { limit = 1, offset = 0, article = {} } = props;
  const variables = {
    tenant: TENANT,
    language,
    limit,
    offset,
    category: 'Magazine',
    article,
    sort: 'BEST_MATCH',
    facets: ['ARTICLE', 'TOPIC', 'TRUCK'],
  };

  try {
    if (!TENANT) {
      throw new Error('TENANT not defined');
    }

    const rawData = await fetchSearchData({
      query: topicSearchQuery(),
      variables,
    });

    const querySuccess = rawData && rawData.data && rawData.data.edsrecommend;

    if (!querySuccess) {
      return [];
    }

    const [trucks, topics, articles] = querySuccess.facets;
    return [
      ...new Set(trucks.items.map((item) => ({ key: 'truck', value: item.value.trim() }))),
      ...new Set(topics.items.map((item) => ({ key: 'topic', value: item.value.trim() }))),
      ...new Set(articles.items.map((item) => ({ key: 'category', value: item.value.trim() }))),
    ].sort((a, b) => a.value.localeCompare(b.value));
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const buildFilterElement = () =>
  document.createRange().createContextualFragment(`
  <div class="${blockName}__filter-container">
    <form class="${blockName}__filter">
      <fieldset class="${blockName}__fieldset">
        <div class="${blockName}__filter-dropdown">
          ${filterDefault} <span class="${blockName}__filter-dropdown-icon">
            <span class="icon icon-chevron-down"></span>
          </span>
        </div>
        <div class="${blockName}__filter-input">
          <span class="icon icon-search-icon"></span>
          <input type="text" id="search" name="search" placeholder="${searchPlaceholder}" />
          <label for="search" class="${blockName}__input-label">${searchPlaceholder}</label>
          <button type="button" class="${blockName}__clear-button">clear</button>
          <span class="icon icon-close"></span>
        </div>
      </fieldset>
    </form>
    <div class="${blockName}__filter-list-wrapper"></div>
  </div>
`);

const buildBulletList = (allTopics) =>
  allTopics
    .map((item) => {
      const param = item.value.replace(/\s/g, '-');
      currentURL.search = magazineParam;
      currentURL.searchParams.set(item.key, param);
      return `<li class="${blockName}__filter-item">
    <a href="${currentURL.href.replace('#', '')}"
      class="${blockName}__filter-link">${item.value}</a>
  </li>`;
    })
    .join('');

const buildFilterList = async () => {
  const allTopics = await getTopics();
  return document.createRange().createContextualFragment(`
    <ul class="${blockName}__filter-list">
      ${buildBulletList(allTopics)}
    </ul>
  `);
};

const addDropdownHandler = (filter) => {
  filter.addEventListener('click', (e) => {
    const dropdown = e.target.tagName === 'svg' ? e.target.closest(`.${dropdownClass}`) : e.target;
    const filterContainer = dropdown.closest(`.${filterContainerClass}`);
    const filterList = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    dropdown.classList.toggle(dropdownOpen);
    filterList.classList.toggle(filterListOpen);
  });
};

/**
 * Adds an event handler to the close icon to collapse the search container
 * and filter list when clicked, hiding the clear button as well.
 *
 * @param {HTMLElement} closeIcon - The close icon element that triggers the collapse.
 */
const addCloseHandler = (closeIcon) => {
  closeIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    const filterContainer = e.target.closest(`.${filterContainerClass}`);
    const filterListWrapper = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    const dropdown = filterContainer.querySelector(`.${dropdownClass}`);
    const searchContainer = filterContainer.closest(`.${blockName}__filter-container`);

    if (filterListWrapper && filterListWrapper.classList.contains(filterListOpen)) {
      filterListWrapper.classList.remove(filterListOpen);
      dropdown.classList.remove(dropdownOpen);
    }

    if (searchContainer) {
      const searchInput = searchContainer.querySelector('input[type="text"]');
      const clearButton = searchContainer.querySelector(`.${blockName}__clear-button`);
      searchContainer.classList.remove(searchInputExpanded);
      searchInput.value = '';
      clearButton.classList.remove('active');
    }
  });
};

/**
 * Initializes the search input handlers, including expand/collapse behavior,
 * input clearing, and the clear button visibility toggle.
 * @param {HTMLElement} searchContainer - The main container element that wraps the search input.
 */
const initializeSearchHandlers = (searchContainer) => {
  const searchInputWrapper = searchContainer.querySelector(`.${blockName}__filter-input`);
  const searchInput = searchContainer.querySelector('input[type="text"]');
  const clearButton = searchContainer.querySelector(`.${blockName}__clear-button`);
  const formElement = searchContainer.querySelector('form');

  const toggleClearButton = () => {
    clearButton.classList.toggle('active', !!searchInput.value);
  };

  const clearInput = () => {
    searchInput.value = '';
    toggleClearButton();
    searchInput.focus();
  };

  const handleOutsideClick = (event) => {
    if (!searchContainer.contains(event.target)) {
      collapseSearchContainer();
    }
  };

  const collapseSearchContainer = () => {
    searchContainer.classList.remove(searchInputExpanded);
    searchInput.value = ''; // Clear the input value
    clearButton.classList.remove('active'); // Hide the clear button
    document.removeEventListener('click', handleOutsideClick, { capture: true });
  };

  const expandSearchContainer = () => {
    searchContainer.classList.add(searchInputExpanded);
    searchInput.focus();
    document.addEventListener('click', handleOutsideClick, { capture: true });
  };

  const submitSearchTerm = (event) => {
    event.preventDefault();
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      currentURL.search = magazineParam;
      currentURL.searchParams.set('search', searchTerm);
      window.location.href = currentURL.href;
      collapseSearchContainer();
    }
  };

  if (searchInputWrapper && searchInput && clearButton && formElement) {
    searchInputWrapper.addEventListener('click', expandSearchContainer);
    searchInput.addEventListener('input', toggleClearButton);
    clearButton.addEventListener('click', clearInput);
    formElement.addEventListener('submit', submitSearchTerm);

    // Find the close icon and add its collapse functionality
    const closeIcon = searchContainer.querySelector('.icon-close');
    if (closeIcon) {
      addCloseHandler(closeIcon);
    }
  }
};

const decorateArticleSearch = async (block) => {
  const filter = buildFilterElement();
  const filterList = await buildFilterList();
  variantsClassesToBEM(block.classList, blockVariants, blockName);
  filter.querySelector(`.${blockName}__filter-list-wrapper`).append(filterList);
  block.prepend(filter);
  addDropdownHandler(block.querySelector(`.${blockName}__filter-dropdown`));
  addCloseHandler(block.querySelector('.icon-close'));
  const filterContainer = block.querySelector(`.${blockName}__filter-container`);
  if (filterContainer) {
    initializeSearchHandlers(filterContainer);
  }
  decorateIcons(block);
};

export default async function decorate(block) {
  decorateArticleSearch(block);
}
