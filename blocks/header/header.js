import {
  createElement,
  decorateIcons,
  generateId,
  getTextLabel,
  getLanguagePath,
  HEADER_CONFIGS,
} from '../../scripts/common.js';
import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';

const blockClass = 'header';

// check if the header has to have a login and/or a search button
const { SEARCH_DISABLED } = HEADER_CONFIGS;

const desktopMQ = window.matchMedia('(min-width: 1200px)');

const createLogo = (logoWrapper) => {
  const logoImage = logoWrapper.querySelector('span.icon');
  let logoLink = null;

  if (logoImage.parentElement.tagName === 'A') {
    logoLink = logoImage.parentElement;
    logoLink.classList.add(`${blockClass}__logo-link`);
    const logoLinkText = createElement('span', { classes: ['screenreader'] });
    logoLinkText.append('Go to Volvo Trucks homepage');

    logoLink.append(logoLinkText);
  }

  logoImage.classList.add(`${blockClass}__logo-image`);

  return logoLink || logoImage;
};

const createMainLinks = (mainLinksWrapper) => {
  const list = mainLinksWrapper.querySelector('ul');
  if (list) {
    list.setAttribute('id', 'header-main-nav');
    list.classList.add(`${blockClass}__main-nav`);
    list.querySelectorAll('li').forEach((listItem) => {
      listItem.classList.add(`${blockClass}__main-nav-item`);
      const accordionContainer = document.createRange().createContextualFragment(`
        <div class="${blockClass}__accordion-container">
          <div class="${blockClass}__accordion-content-wrapper">
          </div>
        </div>
      `);
      listItem.append(accordionContainer);
    });

    list.querySelectorAll('li > a').forEach((link) => {
      link.classList.add(`${blockClass}__main-nav-link`, `${blockClass}__link`, `${blockClass}__link-accordion`);
    });
    return list;
  }
  return null;
};

const createActions = (actionsWrapper) => {
  const list = actionsWrapper.querySelector('ul');

  list.setAttribute('id', 'header-actions-list');
  list.classList.add(`${blockClass}__actions-list`);
  list.querySelectorAll('li').forEach((listItem) => {
    listItem.classList.add(`${blockClass}__action-item`);
  });

  list.querySelectorAll('li > a').forEach((link) => {
    link.classList.add(`${blockClass}__action-link`, `${blockClass}__link`);
    // wrapping text nodes into spans &
    // adding aria labels (because text labels are hidden on mobile)
    [...link.childNodes]
      .filter((node) => node.nodeType === Node.TEXT_NODE)
      .forEach((textNode) => {
        const spanWrapper = createElement('span', { classes: [`${blockClass}__action-link-text`] });

        textNode.replaceWith(spanWrapper);
        spanWrapper.append(textNode);
        link.setAttribute('aria-label', textNode.textContent);
      });
  });

  const closeMenuLabel = getTextLabel('Close menu');
  const closeIcon = document.createRange().createContextualFragment(`
    <li class="${blockClass}__action-item ${blockClass}__action-item--close-menu">
      <button
        aria-label="${closeMenuLabel}"
        class="${blockClass}__close-menu"
        aria-expanded="false"
        aria-controls="header-main-nav, header-actions-list"
      >
        <span class="icon icon-close" aria-hidden="true" />
      </button>
    </li>
  `);

  list.append(closeIcon);

  return list;
};

const mobileActions = () => {
  const mobileActionsEl = createElement('div', { classes: [`${blockClass}__mobile-actions`] });
  const searchLabel = getTextLabel('Search');
  const openMenuLabel = getTextLabel('Open menu');
  const searchResults = `${getLanguagePath()}search-results`;

  const searchEl = `<a href="${searchResults}" aria-label="${searchLabel}" class="${blockClass}__search-button ${blockClass}__action-link ${blockClass}__link">
    <span class="icon icon-search-icon" aria-hidden="true"></span>
  </a>`;

  const actions = document.createRange().createContextualFragment(`
    ${!SEARCH_DISABLED || SEARCH_DISABLED.toLowerCase() === 'true' ? '' : searchEl}
    <button
      aria-label="${openMenuLabel}"
      class="${blockClass}__hamburger-menu ${blockClass}__action-link ${blockClass}__link"
      aria-expanded="false"
      aria-controls="header-main-nav, header-actions-list"
    >
      <span class="icon icon-hamburger-icon" aria-hidden="true"></span>
    </button>
  `);

  mobileActionsEl.append(...actions.childNodes);

  return mobileActionsEl;
};

const addHeaderScrollBehaviour = (header) => {
  let prevPosition = 0;

  window.addEventListener('scroll', () => {
    if (window.scrollY > prevPosition && !document.body.classList.contains('disable-scroll')) {
      header.classList.add(`${blockClass}--hidden`);
    } else {
      header.classList.remove(`${blockClass}--hidden`);
    }

    // on Safari the window.scrollY can be negative so `> 0` check is needed
    prevPosition = window.scrollY > 0 ? window.scrollY : 0;
  });
};

const createOverviewLink = (linkToCopy, parent) => {
  const overview = linkToCopy.cloneNode(true);
  overview.classList.add(`${blockClass}__overview-link`);
  const link = overview.querySelector('a');
  link.classList.add(`${blockClass}__link`);
  link.textContent = getTextLabel('Overview');
  parent.prepend(overview);
};

const rebuildCategoryItem = (item) => {
  item.classList.add(`${blockClass}__category-item`);

  [...item.childNodes].forEach((el) => {
    // removing new lines
    if (el.tagName === 'BR') el.remove();

    // wrapping orphan text
    if (el.nodeType === Node.TEXT_NODE) {
      const textContent = el.textContent.trim();

      // removing empty text nodes
      if (!textContent.length) {
        el.remove();
        return;
      }

      const textNode = createElement('span', { classes: `${blockClass}__link-description` });
      textNode.textContent = textContent;
      el.replaceWith(textNode);
    }
  });
};

const optimiseImage = (picture) => {
  const img = picture.querySelector('img');
  const newPicture = createOptimizedPicture(img.src, img.alt, false, [{ media: '(min-width: 1200px) and (min-resolution: 2x)', width: '320' }, { media: '(min-width: 1200px)', width: '180' }]);

  picture.replaceWith(newPicture);
};

const buildMenuContent = (menuData, navEl) => {
  menuData.querySelectorAll('picture').forEach(optimiseImage);

  const menus = [...menuData.querySelectorAll('.menu')];
  const navLinks = [...navEl.querySelectorAll(`.${blockClass}__main-nav-link`)];

  menus.forEach((menuItemData) => {
    const tabName = menuItemData.querySelector(':scope > div > div');
    const categories = [...menuItemData.querySelectorAll(':scope > div > div')].slice(1);
    const navLink = navLinks.find((el) => el.textContent.trim() === tabName.textContent.trim());
    const accordionContentWrapper = navLink?.closest(`.${blockClass}__main-nav-item`).querySelector(`.${blockClass}__accordion-content-wrapper`);

    const onAccordionItemClick = (el) => {
      // on desktop only main nav links works as accordions
      if (desktopMQ.matches && !el.target.classList.contains(`${blockClass}__main-nav-link`)) {
        return;
      }

      el.preventDefault();
      const menuEl = el.target.parentElement;
      menuEl.classList.toggle(`${blockClass}__menu-open`);
      const isExpanded = menuEl.classList.contains(`${blockClass}__menu-open`);
      el.target.setAttribute('aria-expanded', isExpanded);

      // closing other open menus - on desktop
      if (desktopMQ.matches && menuEl.classList.contains(`${blockClass}__main-nav-item`)) {
        const openMenus = document.querySelectorAll(`.${blockClass}__menu-open`);
        navEl.parentElement.classList.toggle(`${blockClass}--menu-open`, isExpanded);

        [...openMenus].filter((menu) => menu !== menuEl).forEach((menu) => {
          menu.classList.remove(`${blockClass}__menu-open`);
          menu.querySelector(':scope > a').setAttribute('aria-expanded', false);
        });
      }

      // disabling scroll when menu is open
      document.body.classList[isExpanded ? 'add' : 'remove']('disable-scroll');
      document.querySelectorAll('footer, main').forEach((elmt) => {
        if (isExpanded) {
          elmt.setAttribute('inert', 'inert');
        } else {
          elmt.removeAttribute('inert');
        }
      });
    };
    // creating overview link - visible only on mobile
    createOverviewLink(tabName, accordionContentWrapper);

    categories.forEach((cat) => {
      const title = cat.querySelector(':scope > p > a');
      const list = cat.querySelector(':scope > ul');
      const isImagesList = !!cat.querySelector('img');
      let extraClasses = '';

      if (isImagesList) {
        extraClasses += `${blockClass}__category--images-list`;
        accordionContentWrapper.classList.add(`${blockClass}__accordion-content-wrapper--with-images`);
      }

      title.classList.add(`${blockClass}__link`, `${blockClass}__link-accordion`, `${blockClass}__menu-heading`);
      list.classList.add(`${blockClass}__category-items`);
      [...list.querySelectorAll('li')].forEach(rebuildCategoryItem);
      [...list.querySelectorAll('a')].forEach((el) => el.classList.add(`${blockClass}__link`));

      const menuContent = document.createRange().createContextualFragment(`
        <div class="${blockClass}__menu-content ${extraClasses}">
          ${title.outerHTML}
          <div class="${blockClass}__category-content ${blockClass}__accordion-container">
            <div class="${blockClass}__accordion-content-wrapper inner-accordion">
              ${list.outerHTML}
            </div>
          </div>
        </div>
      `);

      menuContent.querySelector(`.${blockClass}__link-accordion`).addEventListener('click', onAccordionItemClick);
      accordionContentWrapper.append(menuContent);
    });

    navLink?.addEventListener('click', onAccordionItemClick);
  });
};

const decorateCTA = (wrapper) => {
  const anchorTags = wrapper.querySelectorAll('a');
  anchorTags.forEach((link) => {
    link.classList.add(`${blockClass}__custom-button`);
    wrapper.appendChild(link);
  });
  wrapper.firstElementChild.remove();
  return wrapper;
};

/**
 * decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // clear the block
  block.textContent = '';

  // fetch nav content
  let navPath = `${getLanguagePath()}nav`;
  const isCustomHeader = getMetadata('custom-header');
  if (isCustomHeader) {
    navPath = `${getLanguagePath()}${isCustomHeader}`;
    block.classList.add(`${blockClass}__custom`);
  }
  const resp = await fetch(`${navPath}.plain.html`);

  if (!resp.ok) {
    // eslint-disable-next-line no-console
    console.error(`Header is not loaded: ${resp.status}`);
  }

  // get the navigation text, turn it into html elements
  const content = document.createRange().createContextualFragment(await resp.text());
  const [
    logoContainer,
    navigationContainer,
    actionsContainer,
    menuContent,
  ] = content.children;
  const nav = createElement('nav', { classes: [`${blockClass}__nav`] });
  const navContent = document.createRange().createContextualFragment(`
    <div class="${blockClass}__menu-overlay"></div>
    ${createLogo(logoContainer).outerHTML}
    ${navigationContainer.children.length ? `<div class="${blockClass}__main-links">
      ${createMainLinks(navigationContainer).outerHTML}
    </div>` : ''}
    <div class="${blockClass}__actions">
      ${isCustomHeader ? '' : mobileActions().outerHTML}
      ${isCustomHeader ? decorateCTA(actionsContainer).outerHTML : createActions(actionsContainer).outerHTML}
    </div>
  `);

  decorateIcons(navContent);

  const setAriaForMenu = (isMenuVisible) => {
    nav.querySelectorAll(`.${blockClass}__close-menu, .${blockClass}__hamburger-menu`).forEach((control) => {
      control.setAttribute('aria-expanded', isMenuVisible);
    });
    nav.querySelectorAll('#header-main-nav, #header-actions-list').forEach((item) => {
      item.setAttribute('aria-hidden', !isMenuVisible);
    });
  };

  const initAriaForAccordions = () => {
    const menuPrefix = 'menu-accordion';
    const accordionContainers = block.querySelectorAll(`.${blockClass}__link-accordion ~ .${blockClass}__accordion-container`);

    [...accordionContainers].forEach((container) => {
      const id = generateId(menuPrefix);
      const accordionLink = container.parentElement.querySelector(`.${blockClass}__link-accordion`);

      container.setAttribute('id', id);
      accordionLink.setAttribute('aria-controls', id);
      accordionLink.setAttribute('aria-expanded', false);
    });
  };

  const closeHamburgerMenu = () => {
    block.classList.remove(`${blockClass}--menu-open`, `${blockClass}--hamburger-open`);
    block.querySelectorAll(`.${blockClass}__menu-open`).forEach((el) => {
      el.classList.remove(`${blockClass}__menu-open`);
      el.querySelector(':scope [aria-expanded="true"]').setAttribute('aria-expanded', false);
    });
    document.body.classList.remove('disable-scroll');
    document.querySelectorAll('footer, main').forEach((el) => el.removeAttribute('inert'));
    setAriaForMenu(false);
  };

  // add action for hamburger
  navContent.querySelector(`.${blockClass}__hamburger-menu`)?.addEventListener('click', () => {
    block.classList.add(`${blockClass}--menu-open`, `${blockClass}--hamburger-open`);
    document.body.classList.add('disable-scroll');

    setAriaForMenu(true);
  });

  navContent.querySelectorAll(`.${blockClass}__menu-overlay, .${blockClass}__close-menu`).forEach((el) => {
    el.addEventListener('click', closeHamburgerMenu);
  });

  // hide the hamburger menu when switching to desktop
  desktopMQ.addEventListener('change', closeHamburgerMenu);

  addHeaderScrollBehaviour(block);

  nav.append(navContent);
  block.append(nav);

  setAriaForMenu(false);

  if (menuContent) {
    buildMenuContent(menuContent, nav);
    initAriaForAccordions();
  }

  // hide nav when clicking outside the menu on desktop
  document.addEventListener('click', (event) => {
    if (!desktopMQ.matches) return;

    const isTargetOutsideMenu = !event.target.closest(`.${blockClass}__main-nav`);
    const openMenu = block.querySelector(`.${blockClass}__main-nav-item.${blockClass}__menu-open`);

    if (isTargetOutsideMenu && openMenu) {
      block.classList.remove(`${blockClass}--menu-open`);
      openMenu.classList.remove(`${blockClass}__menu-open`);
      openMenu.querySelector(':scope > a').setAttribute('aria-expanded', false);
      document.body.classList.remove('disable-scroll');
    }
  });
}
