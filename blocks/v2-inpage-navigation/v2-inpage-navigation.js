import { getMetadata } from '../../scripts/aem.js';
import { createElement, decorateIcons, getTextLabel, debounce, isMobileViewport } from '../../scripts/common.js';

const blockName = 'v2-inpage-navigation';
const CTA_METADATA_PAIRS = [
  { labelKey: 'inpage-primary-button', urlKey: 'inpage-primary-link', variant: 'marketing' },
  { labelKey: 'inpage-secondary-button', urlKey: 'inpage-secondary-link', variant: 'secondary' },
];
const HERO_CTA_SELECTOR = '.v2-hero--marketing .v2-hero__buttons-wrapper';
const FLOATING_VISIBLE_CLASS = `${blockName}__cta-floating--visible`;
let cachedHeroCTAPromise;

/**
 * Creates a CTA <a> element for the in-page navigation block.
 *
 * @param {string} label   - Text for the button.
 * @param {string} url     - Link target (href).
 * @param {string} variant - Visual style ("marketing", "secondary").
 * @returns {HTMLAnchorElement} The generated CTA element.
 */
const createInpageNavigationButton = (label, url, variant) =>
  createElement('a', {
    classes: [
      'button',
      variant,
      `${blockName}__marketing`,
    ],
    props: { href: url, title: label },
  });

/**
 * Creates CTA buttons for the in-page navigation using configured metadata.
 *
 * @returns {HTMLAnchorElement[]} Array of generated CTA links.
 */
const getInpageNavigationButtons = () =>
  CTA_METADATA_PAIRS
    .map(({ labelKey, urlKey, variant }) => {
      const label = getMetadata(labelKey);
      const url = getMetadata(urlKey);

      if (!label || !url) {return null;}

      const button = createInpageNavigationButton(label, url, variant);
      button.textContent = label;
      return button;
    })
    .filter(Boolean);

/**
 * Determines whether a hero CTA wrapper exists.
 *
 * - Resolves immediately if already in the DOM.
 * - Otherwise waits up to 2s for late DOM injection.
 * - Caches the result, but can refresh if a previous lookup resolved false.
 *
 * @param {boolean} [forceFresh=false] - Re-checks DOM if last result was false.
 * @returns {Promise<boolean>} Resolves true if hero CTA exists, otherwise false.
 */
const waitForHeroCTA = (forceFresh = false) => {
  if (forceFresh && cachedHeroCTAPromise) {
    return cachedHeroCTAPromise.then((value) => {
      if (value === false) {
        cachedHeroCTAPromise = null;
        return waitForHeroCTA(false);
      }
      return value;
    });
  }

  if (cachedHeroCTAPromise) { return cachedHeroCTAPromise; }

  cachedHeroCTAPromise = new Promise((resolve) => {
    if (document.querySelector(HERO_CTA_SELECTOR)) {
      resolve(true);
      return;
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(HERO_CTA_SELECTOR)) {
        observer.disconnect();
        resolve(true);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    setTimeout(() => {
      observer.disconnect();
      resolve(false);
    }, 2000);
  });

  return cachedHeroCTAPromise;
};

/**
 * Returns true only if this page needs a floating CTA container.
 * Floating CTAs are required only when:
 * - 1 or 2 CTAs exist AND
 * - A hero CTA exists (hero marketing variant)
 *
 * @param {number} ctaCount
 * @returns {Promise<boolean>}
 */
const shouldUseFloatingCtas = async (ctaCount) => {
  if (ctaCount === 0) { return false; }
  return waitForHeroCTA();
};

/**
 * Returns the floating CTA container, creating it if needed.
 *
 * @returns {HTMLElement} The floating CTA wrapper element.
 */
const ensureFloatingCTAContainer = () => {
  const existing = document.querySelector(`.${blockName}__cta-floating`);
  if (existing) {return existing;}

  const container = createElement('div', {
    classes: `${blockName}__cta-floating`,
  });

  document.body.appendChild(container);
  return container;
};

/**
 * Recalculates whether the floating CTA should be visible.
 * Desktop → always hidden.
 * Mobile → visible only when hero CTA is NOT visible.
 */
const recalcHeroCTAVisibility = (floatingContainer) => {
  if (!floatingContainer) {return;}

  if (!isMobileViewport()) {
    floatingContainer.classList.remove(FLOATING_VISIBLE_CLASS);
    return;
  }

  const heroCTAWrapper = document.querySelector(HERO_CTA_SELECTOR);
  if (!heroCTAWrapper) {
    floatingContainer.classList.remove(FLOATING_VISIBLE_CLASS);
    return;
  }

  const rect = heroCTAWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const heroIsIntersecting = rect.top < viewportHeight && rect.bottom > 0;
  updateFloatingCTAVisibility(floatingContainer, heroIsIntersecting);
};

/**
 * Shows or hides the floating CTA container.
 *
 * @param {HTMLElement} container - The floating CTA wrapper.
 * @param {boolean} isVisible - Whether the hero CTA is visible in the viewport.
 */
const updateFloatingCTAVisibility = (container, isVisible) => {
  container.classList.toggle(FLOATING_VISIBLE_CLASS, !isVisible);
};

/**
 * Moves CTA buttons between the top container and the floating container.
 * If floatingContainer is null, CTAs always remain in the top container.
 *
 * @param {HTMLElement[]} ctaButtons
 * @param {HTMLElement} topContainer
 * @param {HTMLElement|null} floatingContainer
 */
const moveCTAButtons = (ctaButtons, topContainer, floatingContainer) => {
  if (!ctaButtons.length) { return; }

  if (!floatingContainer) {
    ctaButtons.forEach((btn) => {
      if (!topContainer.contains(btn)) { topContainer.appendChild(btn); }
    });
    return;
  }

  waitForHeroCTA().then((heroExists) => {
    const isMobile = isMobileViewport();

    if (!heroExists) {
      ctaButtons.forEach((btn) => {
        if (!topContainer.contains(btn)) { topContainer.appendChild(btn); }
      });
      floatingContainer.classList.remove(FLOATING_VISIBLE_CLASS);
      return;
    }

    if (isMobile) {
      ctaButtons.forEach((btn) => {
        if (!floatingContainer.contains(btn)) { floatingContainer.appendChild(btn); }
      });
    } else {
      ctaButtons.forEach((btn) => {
        if (!topContainer.contains(btn)) { topContainer.appendChild(btn); }
      });
      floatingContainer.classList.remove(FLOATING_VISIBLE_CLASS);
    }
  });
};

/**
 * Attaches a new IntersectionObserver to the hero CTA wrapper
 * (mobile only). Replaces any previously active observer.
 *
 * @param {HTMLElement} heroCTAWrapper
 * @param {HTMLElement} floatingContainer
 */
const setupHeroVisibilityObserver = (heroCTAWrapper, floatingContainer) => {
  // Disconnect previous observer, if any
  if (observeHeroCTAVisibility._observer) {
    observeHeroCTAVisibility._observer.disconnect();
  }

  if (!isMobileViewport()) { return; }

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (!floatingContainer.children.length) { return; }
      updateFloatingCTAVisibility(floatingContainer, entry.isIntersecting);
    },
    { threshold: 0.1 },
  );

  observer.observe(heroCTAWrapper);
  observeHeroCTAVisibility._observer = observer;

  // Hide floating CTA until first intersection callback runs
  floatingContainer.classList.remove(FLOATING_VISIBLE_CLASS);
};

/**
 * Sets up an IntersectionObserver immediately if the hero CTA exists.
 *
 * @param {HTMLElement} floatingContainer
 */
const activateHeroObserverIfNeeded = (floatingContainer) => {
  const wrapper = document.querySelector(HERO_CTA_SELECTOR);
  if (wrapper) {
    setupHeroVisibilityObserver(wrapper, floatingContainer);
  }
};

/**
 * Main handler: tracks hero CTA visibility on mobile.
 * Falls back to MutationObserver if the hero block loads late,
 * and re-evaluates on viewport resizing.
 *
 * @param {HTMLElement} floatingContainer
 */
const observeHeroCTAVisibility = (floatingContainer) => {
  if (!floatingContainer) { return; }

  activateHeroObserverIfNeeded(floatingContainer);

  // Observe late hero CTA injection
  const mo = new MutationObserver(() => {
    const wrapper = document.querySelector(HERO_CTA_SELECTOR);
    if (wrapper) {
      mo.disconnect();
      setupHeroVisibilityObserver(wrapper, floatingContainer);
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });

  // Stop mutation observer after a short window
  setTimeout(() => mo.disconnect(), 2000);

  // Re-create observer on viewport changes
  window.addEventListener(
    'resize',
    debounce(() => {
      activateHeroObserverIfNeeded(floatingContainer);
    }),
  );
};

/**
 * Creates and appends the top CTA container inside the block wrapper.
 *
 * @param {HTMLElement} wrapper - The in-page navigation block wrapper.
 * @returns {HTMLElement} The created CTA container.
 */
const createCtaContainer = (wrapper) => {
  const ctaContainer = createElement('div', {
    classes: `${blockName}__cta-container`,
  });

  wrapper.appendChild(ctaContainer);
  return ctaContainer;
};

/**
 * Initializes CTA placement logic for the in-page navigation block.
 * Creates floating CTA behavior only for variants that require it.
 *
 * @param {HTMLAnchorElement[]} ctaButtons - CTA buttons configured via metadata.
 * @param {HTMLElement} ctaContainer - The static CTA container inside the block.
 */
const setupInpageCtas = async (ctaButtons, ctaContainer) => {
  if (!ctaButtons.length) { return; }

  const useFloating = await shouldUseFloatingCtas(ctaButtons.length);
  const floatingContainer = useFloating
    ? ensureFloatingCTAContainer()
    : null;

  // Initial placement (always start at top)
  ctaButtons.forEach((btn) => ctaContainer.appendChild(btn));

  if (!useFloating) { return; }

  moveCTAButtons(ctaButtons, ctaContainer, floatingContainer);
  observeHeroCTAVisibility(floatingContainer);

  window.addEventListener(
    'resize',
    debounce(() => {
      moveCTAButtons(ctaButtons, ctaContainer, floatingContainer);
      recalcHeroCTAVisibility(floatingContainer);
    }),
  );
};

const scrollToSection = (id) => {
  let timeout;

  const container = document.querySelector(`main .section[data-inpageid='${id}']`);
  container?.scrollIntoView({ behavior: 'smooth' });

  // Checking if the height of the main element changes while scrolling (caused by layout shift)
  const main = document.querySelector('main');
  const resizeObserver = new ResizeObserver(() => {
    clearTimeout(timeout);
    container?.scrollIntoView({ behavior: 'smooth' });

    timeout = setTimeout(() => {
      resizeObserver.disconnect();
    }, 500);
  });
  resizeObserver.observe(main);
};

// Retrieve an array of sections with its corresponding intersectionRatio
const wrapSectionItems = (elements) => {
  const elementsData = [];
  const viewportHeight = window.innerHeight;
  elements.forEach((item) => {
    const elementRect = item.getBoundingClientRect();

    // Calculate the vertical space occupied by the element within the viewport
    const verticalSpace = Math.min(elementRect.bottom, viewportHeight) - Math.max(elementRect.top, 0);

    // Calculate the ratio of vertical space to the viewport height
    const spaceRatio = verticalSpace / viewportHeight;

    elementsData.push({
      element: item,
      intersectionRatio: Math.max(0, Math.min(1, spaceRatio)),
    });
  });

  return elementsData;
};

const gotoSection = (event) => {
  const { target } = event;
  const button = target.closest('button');

  if (button) {
    const { id } = button.dataset;

    updateActive(id);
    scrollToSection(id);
  }
};

const updateActive = (id) => {
  const activeItemInList = document.querySelector(`.${blockName}__item--active`);

  // Prevent reassign active value
  if (activeItemInList?.firstElementChild?.dataset.id === id) {
    return;
  }

  // Remove focus position
  document.activeElement.blur();

  // check active id is equal to id don't do anything
  const selectedItem = document.querySelector(`.${blockName}__selected-item`);
  activeItemInList?.classList.remove(`${blockName}__item--active`);
  const itemsButton = document.querySelectorAll(`.${blockName}__items button`);
  const { pathname } = window.location;

  if (id) {
    const selectedButton = [...itemsButton].find((button) => button.dataset.id === id);
    if (!selectedButton) {
      return;
    }
    selectedItem.textContent = selectedButton.textContent;
    selectedButton.parentNode.classList.add(`${blockName}__item--active`);

    window.history.replaceState({}, '', `${pathname}#${id}`);
  } else {
    window.history.replaceState({}, '', `${pathname}`);
  }
};

const addHeaderScrollBehaviour = (header) => {
  let prevPosition = 0;

  window.addEventListener('scroll', () => {
    if (window.scrollY > prevPosition) {
      header.classList.add(`${blockName}--hidden`);
    } else {
      header.classList.remove(`${blockName}--hidden`);
    }

    // on Safari the window.scrollY can be negative so `> 0` check is needed
    prevPosition = window.scrollY > 0 ? window.scrollY : 0;
  });
};

export default async function decorate(block) {
  const ctaButtons = getInpageNavigationButtons();

  const wrapper = block.querySelector(':scope > div');
  wrapper.classList.add(`${blockName}__wrapper`);
  const itemsWrapper = block.querySelector(':scope > div > div > p');

  const dropdownBackground = createElement('div', { classes: `${blockName}__dropdown-background` });
  const dropdownWrapper = createElement('div', { classes: `${blockName}__dropdown` });
  const selectedItemWrapper = createElement('div', { classes: `${blockName}__selected-item-wrapper` });
  const selectedItem = createElement('div', { classes: `${blockName}__selected-item` });

  const listContainer = createElement('div', { classes: `${blockName}__items-container` });
  const dropdownTitle = createElement('span', { classes: `${blockName}__dropdown-title` });

  const sectionTitle = createElement('span', { classes: `${blockName}__title` });
  const inPageTitle = getMetadata('inpage-title');
  sectionTitle.innerText = inPageTitle;

  const listCloseButton = createElement('button', { classes: `${blockName}__items-close` });
  const closeIcon = createElement('span', { classes: ['icon', 'icon-close'] });

  listCloseButton.appendChild(closeIcon);
  listContainer.appendChild(listCloseButton);

  const submenuTitle = getTextLabel('Section');
  dropdownTitle.innerText = submenuTitle;
  listContainer.appendChild(sectionTitle);
  listContainer.appendChild(dropdownTitle);

  const list = createElement('ul', { classes: `${blockName}__items` });

  [...itemsWrapper.children].forEach((item, index) => {
    const classes = [`${blockName}__item`];
    if (index === 0) {
      // Default selected item
      classes.push(`${blockName}__item--active`);
      selectedItem.textContent = item.textContent;
    }
    const listItem = createElement('li', { classes });

    listItem.innerHTML = item.outerHTML;
    list.appendChild(listItem);
  });

  const dropdownArrowIcon = createElement('span', { classes: ['icon', 'icon-chevron-down'] });

  selectedItemWrapper.append(selectedItem);
  selectedItemWrapper.appendChild(dropdownArrowIcon);

  dropdownWrapper.append(selectedItemWrapper);
  listContainer.append(list);
  dropdownWrapper.appendChild(listContainer);

  wrapper.appendChild(dropdownBackground);
  wrapper.appendChild(dropdownWrapper);

  itemsWrapper.remove();

  decorateIcons(wrapper);

  const ctaContainer = createCtaContainer(wrapper);
  setupInpageCtas(ctaButtons, ctaContainer);

  list.addEventListener('click', gotoSection);

  // on load Go to section if defined
  const hash = window.location.hash.substring(1);
  if (hash) {
    updateActive(hash);

    setTimeout(() => {
      scrollToSection(hash);
    }, 1000);
  }

  // Listener to toggle the dropdown (open / close)
  document.addEventListener('click', (e) => {
    const oneTrustButton = document.querySelector('#onetrust-consent-sdk');

    // click on selected item we show the menu
    if (e.target.closest(`.${blockName}__selected-item-wrapper`)) {
      dropdownWrapper.classList.add(`${blockName}__dropdown--open`);
      block.parentNode.classList.add(`${blockName}--open`);
      document.body.classList.add('disable-body-scroll');
      if (oneTrustButton) {
        oneTrustButton.style.display = 'none';
      }
    } else if (
      e.target.closest(`.${blockName}__dropdown-background`) ||
      (e.target.closest(`.${blockName}__items-container`) &&
        (e.target.closest(`.${blockName}__items-close`) || e.target.closest(`.${blockName}__item`)))
    ) {
      // Hide menu:
      // - Click on black background
      // - Click on close button OR menu item
      // - Click outside the menu
      dropdownWrapper.classList.remove(`${blockName}__dropdown--open`);
      block.parentNode.classList.remove(`${blockName}--open`);
      document.body.classList.remove('disable-body-scroll');
      if (oneTrustButton) {
        oneTrustButton.style.display = '';
      }
    }
  });

  const sectionsList = document.querySelectorAll('main .section');
  // listen scroll to change the url + navigation item
  window.addEventListener(
    'scroll',
    debounce(() => {
      // Calculate intersectionRatio from all section items
      const elementsData = wrapSectionItems(sectionsList);

      // Get intersected item that occupies most of the space in the viewport
      const intersectedItem = elementsData.reduce((prev, current) => (prev.intersectionRatio > current.intersectionRatio ? prev : current));

      if (intersectedItem.element.dataset?.inpageid) {
        updateActive(intersectedItem.element.dataset.inpageid);
      } else {
        updateActive();
      }
    }),
  );

  addHeaderScrollBehaviour(block.parentNode);
}
