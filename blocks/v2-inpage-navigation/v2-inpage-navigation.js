import { getMetadata } from '../../scripts/aem.js';
import { createElement, decorateIcons, getTextLabel, debounce, isMobileViewport } from '../../scripts/common.js';

const blockName = 'v2-inpage-navigation';

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

/**
 * Creates an in-page navigation button element if both button title and link are provided.
 *
 * @param {string} title - The title of the button.
 * @param {string} url - The URL the button should link to.
 * @returns {HTMLElement|null} The anchor element representing the button, or null if required parameters are missing.
 */
const createInPageButton = (title, url, secondary = false) => {
  if (title && url) {
    const link = createElement('a', {
      classes: ['button', 'marketing', `${blockName}__marketing`],
      props: {
        href: url,
        title,
      },
    });
    if (secondary) {
      link.classList.add(`${blockName}__marketing--secondary`);
    }
    link.textContent = title;

    return link;
  }
  return null;
};

/**
 * Creates an in-page navigation button element if both button title and link metadata are available.
 *
 * @returns {HTMLElement|null} The anchor element representing the button, or null if required metadata is missing.
 */
const inPageNavigationButton = () => {
  // if we have a button title & button link
  const title = getMetadata('inpage-button');
  const url = getMetadata('inpage-link');
  return createInPageButton(title, url);
};

/**
 * Creates an array of in-page navigation buttons based on metadata.
 * Each item in the returned array can be an HTMLElement or null, depending on the presence of metadata.
 *
 * @returns {(HTMLElement|null)[]} An array containing up to two elements: each is either an HTMLElement or null.
 */
const inPageNavigationButtons = () => {
  // if we have primary and secondary inpage buttons
  const primaryButton = getMetadata('inpage-primary-button');
  const primaryLink = getMetadata('inpage-primary-link');
  const secondaryButton = getMetadata('inpage-secondary-button');
  const secondaryLink = getMetadata('inpage-secondary-link');
  return [createInPageButton(primaryButton, primaryLink), createInPageButton(secondaryButton, secondaryLink, true)];
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

const addHeaderScrollBehavior = (header) => {
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

/**
 * Update the in-page navigation factor based on the visibility of the CTA button.
 * @param {HTMLElement} ctaButton
 */
const updateNavFactor = (ctaButton = null) => {
  if (!ctaButton) {
    return;
  }
  const rect = ctaButton.getBoundingClientRect();
  const docStyle = getComputedStyle(document.documentElement);
  const navOpacity = parseFloat(docStyle.getPropertyValue('--inpage-navigation-opacity')) || 1;

  // Calculate visible height of CTA button within viewport
  const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));

  // calculate opacity of the CTA button within viewport
  const opacity = rect.height > 0 ? 1 - Math.max(0, Math.min(1, visible / rect.height)) : navOpacity;

  document.documentElement.style.setProperty('--inpage-navigation-opacity', opacity);
};

/**
 * Add scroll behavior to the bottom sticky CTA.
 */
const addBottomScrollBehavior = (block) => {
  const primaryButton = getMetadata('inpage-primary-button');
  const primaryCta = document.querySelector(`.v2-hero a[title="${primaryButton}"]:not(.${blockName}__marketing`);
  const secondaryButton = getMetadata('inpage-secondary-button');
  const secondaryCta = document.querySelector(`a[title="${secondaryButton}"]:not(.${blockName}__marketing)`);
  const ctaButton = secondaryCta || primaryCta;

  window.addEventListener('scroll', () => updateNavFactor(ctaButton), { passive: true });

  // Add an intersection observer to not hide the footer
  const footer = document.querySelector('footer');
  if (footer && ctaButton) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          block.parentNode.classList.toggle(`${blockName}--hide`, entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.1,
      },
    );

    observer.observe(footer);
  }
};

/**
 * Decorate a single button within the in-page navigation.
 * @param {HTMLElement} block
 */
const decorateSingleButton = (block) => {
  const ctaButton = inPageNavigationButton();

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

  if (ctaButton) {
    wrapper.appendChild(ctaButton);
  }

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

  addHeaderScrollBehavior(block.parentNode);
};

/**
 * Decorate the two buttons within the in-page navigation.
 * @param {HTMLElement} block
 */
const decorateTwoButtons = (block) => {
  const isLargerThanMobile = !isMobileViewport();
  const [primaryButton, secondaryButton] = inPageNavigationButtons();
  const wrapper = createElement('div', { classes: `${blockName}__wrapper` });
  block.innerText = '';

  if (primaryButton) {
    wrapper.appendChild(primaryButton);
  }

  if (secondaryButton) {
    wrapper.appendChild(secondaryButton);
  }

  if (primaryButton || secondaryButton) {
    block.appendChild(wrapper);
  }

  if (isLargerThanMobile) {
    addHeaderScrollBehavior(block.parentNode);
    return;
  }

  addBottomScrollBehavior(block);
};

export default async function decorate(block) {
  // Check if the block is within a bottom sticky CTA variant set in metadata
  const isBottomSticky = block.closest('main')?.classList.contains('bottom-sticky-cta');

  if (isBottomSticky) {
    decorateTwoButtons(block);
    return;
  }

  decorateSingleButton(block);
}
