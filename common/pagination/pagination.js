import { createElement, decorateIcons, getTextLabel } from '../../scripts/common.js';

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
  const paginationPageAriaLabel = getTextLabel('pagination:page_aria_label');
  const ariaLabel = `${paginationPageAriaLabel} ${pageIndex + 1}`;
  const button = createButton(pageIndex + 1, classes, () => onClick(pageIndex), false, null, ariaLabel);

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
  const ariaLabel = direction === 'prev' ? getTextLabel('pagination:previous_page_aria_label') : getTextLabel('pagination:next_page_aria_label');

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
const appendPageButtons = (paginationList, pages, currentPage, changePage) => {
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
const computeVisiblePages = (currentPage, totalPages) => {
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
const renderPaginationControls = (paginationList, currentPage, totalPages, changePage) => {
  paginationList.innerHTML = '';

  paginationList.appendChild(createArrowButton('prev', currentPage === 0, () => changePage(currentPage - 1)));

  const pages = computeVisiblePages(currentPage, totalPages);
  appendPageButtons(paginationList, pages, currentPage, changePage);

  paginationList.appendChild(createArrowButton('next', currentPage === totalPages - 1, () => changePage(currentPage + 1)));

  decorateIcons(paginationList);
};

/**
 * Ensures a <nav class="pagination-nav"> element exists in the block.
 * Creates and appends one if it does not already exist.
 *
 * @param {HTMLElement} block - Block container where pagination is rendered.
 * @returns {HTMLElement}     - The <nav> element for pagination controls.
 */
const ensurePaginationNav = (block) => {
  let paginationNav = block.querySelector('nav.pagination-nav');
  const paginationNavAriaLabel = getTextLabel('pagination:nav_aria_label');

  if (!paginationNav) {
    paginationNav = createElement('nav', { classes: ['pagination-nav'], props: { 'aria-label': paginationNavAriaLabel } });
    block.appendChild(paginationNav);
  }
  return paginationNav;
};

/**
 * Resets and returns a fresh <ul.pagination> inside the given nav.
 *
 * @param {HTMLElement} paginationNav - The nav container.
 * @returns {HTMLElement} - The <ul> element for pagination controls.
 */
const resetPaginationList = (paginationNav) => {
  const paginationList = createElement('ul', { classes: ['pagination'] });
  paginationNav.innerHTML = '';
  paginationNav.appendChild(paginationList);
  return paginationList;
};

/**
 * Builds a renderPage(pageIndex) function bound to the provided context.
 *
 * @param {HTMLElement} contentArea - The content area where items render.
 * @param {HTMLElement} paginationList - The <ul> container for controls.
 * @param {number} totalPages - Total number of pages.
 * @param {Function} loadPageData - Data loader (pageIndex) => Promise<Array>.
 * @param {Function} renderItems - Renderer (contentArea, items).
 * @param {Function} changePage - Page change invoker (used by controls).
 * @param {() => boolean} shouldFocus - Callback returning whether to focus active button.
 * @returns {Function} - async renderPage(pageIndex).
 */
const makePageRenderer = (contentArea, paginationList, totalPages, loadPageData, renderItems, changePage, shouldFocus) => async (pageIndex) => {
  try {
    const items = await loadPageData(pageIndex);
    contentArea.innerHTML = '';
    renderItems(contentArea, items);
    renderPaginationControls(paginationList, pageIndex, totalPages, changePage);
    const newActiveButton = paginationList.querySelector('.pagination-button.active');
    if (newActiveButton && shouldFocus && shouldFocus() === true) {
      newActiveButton.focus();
    }
  } catch (e) {
    console.error('pagination: failed to render page', e);
  }
};

/**
 * Clamps page index into [0, total-1].
 *
 * @param {number} index - Target page index.
 * @param {number} total - Total pages.
 * @returns {number} - Clamped page index.
 */
const clampPage = (index, total) => Math.max(0, Math.min(index, Math.max(total - 1, 0)));

/**
 * Creates a changePage proxy so we can pass a stable function to controls
 * and assign the real change handler later.
 *
 * @returns {{ proxy: (i:number)=>void, set: (fn: (i:number)=>void)=>void }}
 */
const makePageChangeProxy = () => {
  const ref = { current: null };
  const proxy = (i) => {
    if (ref.current) {
      ref.current(i);
    }
  };
  const set = (fn) => {
    ref.current = fn;
  };
  return { proxy, set };
};

/**
 * Focuses the active pagination button if allowed (a11y without initial scroll).
 *
 * @param {HTMLElement} paginationList - The <ul> for pagination controls.
 * @param {boolean} shouldFocus - Whether to focus the active button.
 */
const focusActiveButton = (paginationList, shouldFocus) => {
  const btn = paginationList.querySelector('.pagination-button.active');
  if (btn && shouldFocus) {
    btn.focus();
  }
};

/**
 * Rebuilds controls for a target page (optimistic UI) and optionally focuses.
 *
 * @param {HTMLElement} paginationList - The <ul> for pagination controls.
 * @param {number} page - Target page index.
 * @param {number} total - Total pages.
 * @param {(i:number)=>void} changeProxy - Stable change handler proxy.
 * @param {boolean} allowFocus - Whether focus should be applied.
 */
const renderControlsOptimistic = (paginationList, page, total, changeProxy, allowFocus) => {
  renderPaginationControls(paginationList, page, total, changeProxy);
  focusActiveButton(paginationList, allowFocus);
};

/**
 * Wraps a renderPage function with a sequence guard to ignore stale responses.
 *
 * @param {(i:number)=>Promise<void>} renderPage - The raw renderer.
 * @param {(i:number)=>void} onSettled - Called after latest render completes.
 * @returns {(i:number)=>Promise<void>} - Guarded renderer.
 */
const makeGuardedRenderer = (renderPage, onSettled) => {
  let seq = 0;
  return async (idx) => {
    const ticket = ++seq;
    await renderPage(idx);
    if (ticket !== seq) {
      return;
    }
    onSettled(idx);
  };
};

/**
 * Internal: wires up pagination state, handlers, optimistic UI, and initial render.
 *
 * @param {PaginationConfig} config - Configuration object.
 * @returns {{ goTo: (pageIndex:number) => void }} Public controller.
 */
const initPaginationController = (config) => {
  const { block, contentArea, totalPages, renderItems, loadPageData, initialPage = 0, onPageChange } = config;

  const totalPagesSafe = Math.max(1, totalPages);
  let activePage = clampPage(initialPage, totalPagesSafe);
  let isLoading = false;
  let shouldFocus = false;

  const paginationNav = ensurePaginationNav(block);
  const paginationList = resetPaginationList(paginationNav);

  const { proxy: pageChangeProxy, set: setPageChangeHandler } = makePageChangeProxy();

  const renderPage = makePageRenderer(contentArea, paginationList, totalPagesSafe, loadPageData, renderItems, pageChangeProxy, () => shouldFocus);

  const renderPageGuarded = makeGuardedRenderer(renderPage, (idx) => {
    activePage = clampPage(idx, totalPagesSafe);
    isLoading = false;
    shouldFocus = true;
    if (typeof onPageChange === 'function') {
      onPageChange(idx, totalPagesSafe);
    }
  });

  /**
   * changePage with optimistic UI:
   * - updates controls immediately for visual feedback,
   * - triggers async render,
   * - guards against out-of-range and spamming.
   */
  const changePage = (newPage) => {
    const next = clampPage(newPage, totalPagesSafe);
    if (next === activePage && !isLoading) {
      return;
    }
    renderControlsOptimistic(paginationList, next, totalPagesSafe, pageChangeProxy, shouldFocus);
    isLoading = true;
    renderPageGuarded(next);
  };

  setPageChangeHandler(changePage);
  renderControlsOptimistic(paginationList, activePage, totalPagesSafe, pageChangeProxy, false);
  renderPageGuarded(activePage);

  return {
    goTo: changePage,
  };
};

/**
 * Creates and initializes dynamic pagination (object signature only).
 *
 * @param {PaginationConfig} config - Configuration object.
 */
const createPagination = (config) => {
  const cfg = config || {};
  if (!cfg.block || !cfg.contentArea || !cfg.renderItems || !cfg.loadPageData || !Number.isInteger(cfg.totalPages)) {
    console.error('pagination: invalid dynamic config');
    return;
  }
  initPaginationController(cfg);
};

export default createPagination;
