import { decorateIcons, getPlaceholders, getTextLabel } from '../../scripts/common.js';

const blockName = 'v2-article-search';
const wrapperClass = `${blockName}-wrapper`;
const containerClass = `${blockName}-container`;
const filterContainerClass = `${blockName}__filter-container`;
const dropdownClass = `${blockName}__filter-dropdown`;
const dropdownOpen = `${blockName}__filter-dropdown--open`;
const filterListOpen = `${blockName}__filter-list-wrapper--open`;
const filterActive = `${blockName}__filter-link--active`;

await getPlaceholders();
const filterDefault = getTextLabel('filterDefault');
const searchPlaceholder = getTextLabel('searchPlaceholder');

// const MQDesktop = window.matchMedia('(min-width: 1200px)');
// const MQtablet = window.matchMedia('(min-width: 768px)');

const buildFilterElement = () => document.createRange().createContextualFragment(`
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
          <span class="icon icon-close"></span>
        </div>
      </fieldset>
    </form>
    <div class="${blockName}__filter-list-wrapper"></div>
  </div>
`);

// FIXME: added fake items to simulate the filter list
// TODO: (remove the fake items to be added dynamically)
const buildFilterList = () => document.createRange().createContextualFragment(`
  <ul class="${blockName}__filter-list">
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter 1</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter very long text</a>
    </li>
    <li class="${blockName}__filter-item">
      <a href="#" class="${blockName}__filter-link">Filter short</a>
    </li>
  </ul>
`);

const addDropdownHandler = (filter) => {
  filter.addEventListener('click', (e) => {
    const dropdown = e.target.tagName === 'svg'
      ? e.target.closest(`.${dropdownClass}`) : e.target;
    const filterContainer = dropdown.closest(`.${filterContainerClass}`);
    const filterList = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    dropdown.classList.toggle(dropdownOpen);
    filterList.classList.toggle(filterListOpen);
  });
};

const addFilterListHandler = (itemLink) => {
  itemLink.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') return;
    const filterList = e.target.closest(`.${blockName}__filter-list`);
    const otherItems = [...filterList.querySelectorAll(`.${blockName}__filter-link`)]
      .filter((item) => item !== e.target);
    otherItems.forEach((item) => item.classList.remove(filterActive));
    e.target.classList.toggle(filterActive);
    // do the query to update based on the selected filters
    // TODO: submit the form to update the article

    // close the dropdown
    const filterContainer = filterList.closest(`.${filterContainerClass}`);
    const dropdown = filterContainer.querySelector(`.${dropdownClass}`);
    const filterListWrapper = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    dropdown.classList.remove(dropdownOpen);
    filterListWrapper.classList.remove(filterListOpen);
  });
};

// TODO: check if the close button has to close the filter list or the search input
const addCloseHandler = (closeIcon) => {
  closeIcon.addEventListener('click', (e) => {
    const filterContainer = e.target.closest(`.${filterContainerClass}`);
    const filterList = filterContainer.querySelector(`.${blockName}__filter-list-wrapper`);
    const dropdown = filterContainer.querySelector(`.${dropdownClass}`);
    filterList.classList.remove(filterListOpen);
    dropdown.classList.remove(dropdownOpen);
  });
};

export default async function decorate(block) {
  const main = block.closest('main');
  const wrapper = block.closest(`.${wrapperClass}`);
  const section = block.closest(`.${containerClass}`);
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type !== 'childList') return;
      const blockStatus = block.getAttribute('data-block-status');
      const sectionStatus = section.getAttribute('data-section-status');
      if ([blockStatus, sectionStatus].every((status) => status === 'loaded')) {
        const filter = buildFilterElement();
        const filterList = buildFilterList();
        filter.querySelector(`.${blockName}__filter-list-wrapper`).append(filterList);
        block.prepend(filter);
        addDropdownHandler(block.querySelector(`.${blockName}__filter-dropdown`));
        addFilterListHandler(block.querySelector(`.${blockName}__filter-list`));
        addCloseHandler(block.querySelector('.icon-close'));
        decorateIcons(block);
        section.classList.remove(containerClass);
        main.prepend(wrapper);
        observer.disconnect();
      }
    });
  });

  observer.observe(main, {
    childList: true,
  });
}
