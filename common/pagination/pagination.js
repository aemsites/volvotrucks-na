import {
  createElement,
  debounce,
  decorateIcons,
  getTextLabel,
} from '../../scripts/common.js';

/**
 * Creates an icon element.
 *
 * @param {string} iconClass - The class for the icon.
 * @returns {HTMLElement} - The created icon element.
 */
const createIcon = (iconClass) => createElement('span', { classes: ['icon', iconClass] });

/**
 * Creates a button element with specified text, classes, click handler,
 * disabled state, and aria-label.
 *
 * @param {string} text - The text content of the button.
 * @param {string|string[]} classes - The CSS class or classes to apply to the button.
 * @param {Function} onClick - The click event handler function for the button.
 * @param {boolean} [isDisabled=false] - Whether the button should be disabled.
 * @param {HTMLElement} [icon] - Optional icon to append to the button.
 * @param {string} [ariaLabel=''] - The aria-label for accessibility purposes.
 * @returns {HTMLElement} The created button element.
 */
const createButton = (text, classes, onClick, isDisabled = false, icon = null, ariaLabel = '') => {
  const classList = Array.isArray(classes) ? classes : [classes];

  const button = createElement('button', {
    classes: classList,
    props: { type: 'button', 'aria-label': ariaLabel },
  });

  if (isDisabled) {
    button.setAttribute('disabled', 'disabled');
  }

  if (!isDisabled && typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }

  if (text) {
    const span = createElement('span');
    span.textContent = text;
    button.appendChild(span);
  }

  if (icon) {
    button.appendChild(icon);
  }

  return button;
};

/**
 * Creates a pagination button for a specific page with an appropriate aria-label
 * and aria-current for the active page.
 *
 * @param {number} pageIndex - The index of the page (0-based).
 * @param {number} currentPage - The current active page index.
 * @param {Function} onClick - The function to call when the page button is clicked.
 * @returns {HTMLElement} - The created pagination button element with an aria-label.
 */
const createPageButton = (pageIndex, currentPage, onClick) => {
  const isActive = pageIndex === currentPage;
  const classes = isActive ? ['pagination-button', 'active'] : ['pagination-button'];
  const paginationPageAriaLabel = getTextLabel('paginationPageAriaLabel');
  const ariaLabel = `${paginationPageAriaLabel} ${pageIndex + 1}`;
  const button = createButton(
    pageIndex + 1,
    classes,
    () => onClick(pageIndex),
    false,
    null,
    ariaLabel,
  );

  if (isActive) {
    button.setAttribute('aria-current', 'page');
  }

  return button;
};

/**
 * Creates an arrow button for pagination navigation (previous or next)
 * with an appropriate aria-label.
 *
 * @param {'prev'|'next'} direction - The direction of the arrow (previous or next).
 * @param {boolean} isDisabled - Whether the arrow button should be disabled.
 * @param {Function} onClick - The function to call when the arrow button is clicked.
 * @returns {HTMLElement} - The created arrow button element with an aria-label for accessibility.
 */
const createArrowButton = (direction, isDisabled, onClick) => {
  const icon = direction === 'prev' ? createIcon('icon-chevron-left') : createIcon('icon-chevron-right');
  const ariaLabel = direction === 'prev' ? getTextLabel('paginationPreviousPageAriaLabel') : getTextLabel('paginationNextPageAriaLabel');

  return createButton(null, ['pagination-arrow', direction], onClick, isDisabled, icon, ariaLabel);
};

/**
 * Creates an ellipsis element (...) for use in the pagination
 * when there is a gap between page numbers.
 *
 * @returns {HTMLElement} - The created ellipsis element.
 */
const createEllipsis = () => {
  const ellipsis = createElement('li', { classes: ['pagination-dots'] });
  ellipsis.textContent = '...';
  return ellipsis;
};

/**
 * Appends page buttons to the pagination container for the specified range of pages.
 *
 * @param {HTMLElement} paginationList - The container where pagination buttons will be appended.
 * @param {Array<string|number>} pages - Array of page numbers and ellipses to display.
 * @param {number} currentPage - The current active page index.
 * @param {Function} changePage - The function to call when a page button is clicked.
 */
const appendPages = (paginationList, pages, currentPage, changePage) => {
  pages.forEach((page) => {
    const listItem = createElement('li', { classes: ['pagination-item'] });
    if (page === 'ellipsis') {
      listItem.appendChild(createEllipsis());
    } else {
      listItem.appendChild(createPageButton(page, currentPage, changePage));
    }
    paginationList.appendChild(listItem);
  });
};

/**
 * Determines which pages and ellipses should be displayed in the pagination,
 * depending on the current page.
 *
 * @param {number} currentPage - The current active page index.
 * @param {number} totalPages - The total number of pages.
 * @returns {Array<string|number>} - An array of page numbers and ellipses to be displayed.
 */
const getPageRange = (currentPage, totalPages) => {
  const pages = [];
  const addPageRange = (start, end) => {
    for (let i = start; i <= end; i += 1) {
      pages.push(i);
    }
  };

  pages.push(0); // Always show the first page

  if (totalPages <= 7) {
    addPageRange(1, totalPages - 1); // Show all pages if total pages <= 7
  } else if (currentPage <= 3) {
    addPageRange(1, 4);
    pages.push('ellipsis', totalPages - 1);
  } else if (currentPage >= totalPages - 4) {
    pages.push('ellipsis');
    addPageRange(totalPages - 5, totalPages - 1);
  } else {
    pages.push('ellipsis');
    addPageRange(currentPage - 1, currentPage + 1);
    pages.push('ellipsis', totalPages - 1);
  }

  return pages;
};

/**
 * Creates and appends the pagination controls (arrows, page buttons, ellipses)
 * to the pagination container, with aria-labels for accessibility.
 *
 * @param {HTMLElement} paginationList - The container where pagination controls will be appended.
 * @param {number} currentPage - The currently active page index.
 * @param {number} totalPages - The total number of pages.
 * @param {Function} changePage - The function to call when changing the page.
 */
const createPaginationControls = (paginationList, currentPage, totalPages, changePage) => {
  paginationList.innerHTML = '';

  paginationList.appendChild(
    createArrowButton('prev', currentPage === 0, () => changePage(currentPage - 1)),
  );

  const pages = getPageRange(currentPage, totalPages);
  appendPages(paginationList, pages, currentPage, changePage);

  paginationList.appendChild(
    createArrowButton('next', currentPage === totalPages - 1, () => changePage(currentPage + 1)),
  );

  decorateIcons(paginationList);
};

/**
 * Creates and appends the pagination controls (arrows, page buttons, ellipses) to the block.
 *
 * @param {Array} chunkedItems - Array of paginated items (each entry is a page of items).
 * @param {HTMLElement} block - The container where items and pagination controls will be displayed.
 * @param {Function} renderItems - The function to call to render items for the given page.
 * @param {HTMLElement} contentArea - The content area where items are rendered.
 * @param {number} [currentPage=0] - The currently active page index (default is 0).
 */
const createPagination = (chunkedItems, block, renderItems, contentArea, currentPage = 0) => {
  const totalPages = chunkedItems.length;
  let paginationNav = block.querySelector('nav.pagination-nav');
  const paginationNavAriaLabel = getTextLabel('paginationNavAriaLabel');

  if (!paginationNav) {
    paginationNav = createElement('nav', { classes: ['pagination-nav'], props: { 'aria-label': paginationNavAriaLabel } });
    block.appendChild(paginationNav);
  }

  const paginationList = createElement('ul', { classes: ['pagination'] });
  paginationNav.innerHTML = '';
  paginationNav.appendChild(paginationList);

  const changePage = debounce((newPage) => {
    if (newPage < 0 || newPage >= totalPages) return;
    contentArea.innerHTML = '';
    renderItems(contentArea, chunkedItems[newPage]);
    createPaginationControls(paginationList, newPage, totalPages, changePage);

    const newActiveButton = paginationList.querySelector('.pagination-button.active');
    if (newActiveButton) {
      newActiveButton.focus();
    }
  }, 200);

  createPaginationControls(paginationList, currentPage, totalPages, changePage);
  renderItems(contentArea, chunkedItems[currentPage]);
};

export default createPagination;
