import {
  buildBlock,
  decorateSections,
  decorateBlocks,
  decorateBlock,
  decorateTemplateAndTheme,
  createOptimizedPicture,
  getMetadata,
  toClassName,
  loadSections,
  loadCSS,
  loadScript,
} from './aem.js';

import {
  decorateIcons,
  getHref,
  getPlaceholders,
  getTextLabel,
  loadLazy,
  loadTemplate,
  createElement,
  slugify,
  variantsClassesToBEM,
  formatStringToArray,
  TRUCK_CONFIGURATOR_URLS,
  getLocale,
} from './common.js';

import { isVideoLink, isSoundcloudLink, isLowResolutionVideoUrl, addVideoShowHandler, addSoundcloudShowHandler } from './video-helper.js';

import { validateCountries } from './validate-countries.js';

function getCTAContainer(ctaLink) {
  return ['strong', 'em'].includes(ctaLink.parentElement.localName) ? ctaLink.parentElement.parentElement : ctaLink.parentElement;
}

function isCTALinkCheck(ctaLink) {
  const btnContainer = getCTAContainer(ctaLink);
  if (!btnContainer.classList.contains('button-container')) {
    return false;
  }
  const nextSibling = btnContainer?.nextElementSibling;
  const previousSibling = btnContainer?.previousElementSibling;
  const twoPreviousSibling = previousSibling?.previousElementSibling;
  const siblings = [previousSibling, nextSibling, twoPreviousSibling];
  return siblings.some((elem) => elem?.localName === 'h1');
}

/**
 * Returns a picture element with webp and fallbacks / allow multiple src paths for every breakpoint
 * @param {string} src Default image URL (if no src is passed to breakpoints object)
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. src, width, media)
 */
export function createCustomOptimizedPicture(
  src,
  alt = '',
  eager = false,
  breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }],
) {
  const url = new URL(src, getHref());
  const picture = document.createElement('picture');
  let { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  breakpoints.forEach((br) => {
    // custom src path in breakpoint
    if (br.src) {
      const customUrl = new URL(br.src, getHref());
      pathname = customUrl.pathname;
    }

    const source = document.createElement('source');
    if (br.media) {
      source.setAttribute('media', br.media);
    }
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) {
        source.setAttribute('media', br.media);
      }
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      img.setAttribute('width', br.width);
      img.setAttribute('height', br.height);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}

function buildHeroBlock(main) {
  // switching off hero autoblock for redesign
  if (document.querySelector('main').classList.contains('redesign-v2')) {
    return;
  }

  // don't create a hero if the first item is a block, except hero block
  const firstSection = main.querySelector('div');
  if (!firstSection) {
    return;
  }
  const firstElement = firstSection.firstElementChild;
  if (firstElement.tagName === 'DIV' && firstElement.classList.length && !firstElement.classList.contains('hero')) {
    return;
  }

  const h1 = firstSection.querySelector('h1');
  const picture = firstSection.querySelector('picture');
  let ctaLink = firstSection.querySelector('a');
  let video = null;

  if (ctaLink && isLowResolutionVideoUrl(ctaLink.getAttribute('href'))) {
    const videoTemp = `
      <video muted loop class="hero-video">
        <source src="${ctaLink.getAttribute('href')}" type="video/mp4"></source>
      </video>
    `;

    const videoWrapper = document.createElement('div');
    videoWrapper.innerHTML = videoTemp;
    video = videoWrapper.querySelector('video');
    ctaLink.parentElement.remove();
    ctaLink = firstSection.querySelector('a');

    // adding video with delay to not affect page loading time
    setTimeout(() => {
      picture.replaceWith(video);

      // TODO: This is just a way of prevent the code to break due to the NotAllowedError error on iOS and Safari
      // For this to work better needs further development and either way it will always be an hack can at any point can stop working
      try {
        video.play();
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          console.error('Playback was prevented by the browser:', error);
        } else {
          console.error('An error occurred while trying to play the video:', error);
        }
      }
    }, 3000);
  }

  // check if the previous element or the previous of that is an h1
  const isCTALink = ctaLink && isCTALinkCheck(ctaLink);
  if (isCTALink) {
    ctaLink.classList.add('cta');
  }

  if (h1 && picture && h1.compareDocumentPosition(picture) & Node.DOCUMENT_POSITION_PRECEDING) {
    const headings = createElement('div', { classes: 'hero-headings' });
    const elems = [picture, headings];
    if (
      h1.nextElementSibling &&
      (h1.nextElementSibling.matches('h2,h3,h4') ||
        // also consider a <p> without any children as sub heading except BR
        (h1.nextElementSibling.matches('p') && ![...h1.nextElementSibling.children].filter((el) => el.tagName !== 'BR').length))
    ) {
      const h4 = document.createElement('h4');
      h4.innerHTML = h1.nextElementSibling.innerHTML;
      h1.nextElementSibling.remove();
      headings.appendChild(h4);
    }
    headings.appendChild(h1);
    if (isCTALink) {
      headings.appendChild(getCTAContainer(ctaLink));
    }
    const section = document.createElement('div');
    const newHeroBlock = buildBlock('hero', { elems });
    newHeroBlock.classList.add(...firstElement.classList);
    section.append(newHeroBlock);
    // remove the empty pre-section to avoid decorate it as empty section
    const containerChildren = firstSection.children;
    const wrapperChildren = containerChildren[0].children;
    if (containerChildren.length <= 1 && wrapperChildren.length === 0) {
      firstSection.remove();
    } else if (wrapperChildren.length === 0) {
      containerChildren[0].remove();
    }

    if (video) {
      section.querySelector('.hero')?.classList.add('hero-with-video');
    }

    // after all are settled, the new section can be added
    main.prepend(section);
  }
}

function buildSubNavigation(main, head) {
  const subnav = head.querySelector('meta[name="sub-navigation"]');
  if (subnav && subnav.content.startsWith('/')) {
    const block = buildBlock('sub-nav', []);
    main.previousElementSibling.prepend(block);
    decorateBlock(block);
  }
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 * @param {Element} head The header element
 */
function buildAutoBlocks(main, head) {
  try {
    buildHeroBlock(main);
    buildSubNavigation(main, head);

    buildTabbedBlock(main);
    buildCtaList(main);

    // redesign
    buildTruckLineupBlock(main);
    buildInpageNavigationBlock(main);
  } catch (error) {
    console.error('Auto Blocking failed', error);
  }
}

function createTabbedSection(tabItems, tabType, { fullWidth }) {
  const tabSection = createElement('div', { classes: ['section', 'tabbed-container'] });
  if (fullWidth) {
    tabSection.classList.add('tabbed-container-full-width');
  }
  tabSection.dataset.sectionStatus = 'initialized';
  const wrapper = document.createElement('div');
  tabSection.append(wrapper);
  const tabBlock = buildBlock(`tabbed-${tabType}`, [tabItems]);
  wrapper.append(tabBlock);
  return tabSection;
}

function buildCtaList(main) {
  [...main.querySelectorAll('ul')].forEach((list) => {
    const lis = [...list.querySelectorAll('li')];
    const isCtaList = lis.every((li) => {
      if (li.children.length !== 1) {
        return false;
      }
      const firstChild = li.firstElementChild;
      if (firstChild.tagName === 'A') {
        return true;
      }
      if (firstChild.children.length !== 1) {
        return false;
      }
      const firstGrandChild = firstChild.firstElementChild;
      return (firstChild.tagName === 'STRONG' || firstChild.tagName === 'EM') && firstGrandChild.tagName === 'A';
    });

    if (isCtaList) {
      list.classList.add('cta-list');
      const primaryLink = lis[0].querySelector('a.primary');
      if (primaryLink) {
        primaryLink.classList.add('dark');
      }
    }
  });
}

function buildTabbedBlock(main) {
  let tabItems = [];
  let tabType;
  let fullWidth = false;
  [...main.querySelectorAll(':scope > div')].forEach((section) => {
    const sectionMeta = section.dataset.carousel || section.dataset.tabs;
    if (sectionMeta) {
      const tabContent = document.createElement('div');
      tabType = tabType || (section.dataset.carousel ? 'carousel' : 'accordion');
      tabContent.dataset[tabType] = sectionMeta;
      tabContent.className = 'tab-content';
      fullWidth = fullWidth || section.matches('.full-width');
      tabContent.innerHTML = section.innerHTML;
      tabContent.querySelectorAll('p > picture').forEach((pic) => {
        if (!pic.nextElementSibling && !pic.previousElementSibling) {
          pic.parentElement.classList.add('picture');
        }
      });
      tabItems.push(tabContent);
      section.remove();
    } else if (tabItems.length > 0) {
      const tabbedSection = createTabbedSection(tabItems, tabType, { fullWidth });
      section.parentNode.insertBefore(tabbedSection, section);
      decorateBlock(tabbedSection.querySelector('.tabbed-carousel, .tabbed-accordion'));
      tabItems = [];
      tabType = undefined;
      fullWidth = false;
    }
  });
  if (tabItems.length > 0) {
    const tabbedCarouselSection = createTabbedSection(tabItems, tabType, { fullWidth });
    main.append(tabbedCarouselSection);
    decorateBlock(tabbedCarouselSection.querySelector('.tabbed-carousel, .tabbed-accordion'));
  }

  async function triggerLoad() {
    await loadSections(main);
  }

  triggerLoad();
}

function createTruckLineupSection(tabItems) {
  const tabSection = createElement('div', { classes: 'section' });
  tabSection.dataset.sectionStatus = 'initialized';
  const wrapper = createElement('div');
  tabSection.append(wrapper);
  const tabBlock = buildBlock('v2-truck-lineup', [tabItems]);
  wrapper.append(tabBlock);
  return tabSection;
}

function buildTruckLineupBlock(main) {
  const tabItems = [];
  let nextElement;
  const BREAKPOINTS = {
    0: '(min-width: 400px)',
    1: '(min-width: 1200px)',
  };
  let inpageMeta;

  const mainChildren = [...main.querySelectorAll(':scope > div')];
  mainChildren.forEach((section, i) => {
    const isTruckCarousel = section.dataset.truckCarousel;
    if (!isTruckCarousel) {
      return;
    }

    // save carousel position
    nextElement = mainChildren[i + 1];
    const sectionMeta = section.dataset.truckCarousel;
    if (!inpageMeta && section.dataset.inpage) {
      inpageMeta = section.dataset.inpage.toLowerCase();
    }

    const tabContent = createElement('div', { classes: 'v2-truck-lineup__content' });
    tabContent.dataset.truckCarousel = sectionMeta;
    tabContent.innerHTML = section.innerHTML;
    const images = tabContent.querySelectorAll('p > picture');

    const imageBreakpoints = [];
    const firstImage = images[0]?.lastElementChild;
    const baseImageObj = {
      src: firstImage?.src,
      alt: firstImage?.alt,
    };

    images.forEach((pic, j) => {
      const img = pic.lastElementChild;
      imageBreakpoints.push({
        src: img.src,
        width: img.width,
        height: img.height,
        media: BREAKPOINTS[j],
      });

      pic.parentNode.remove();
    });
    imageBreakpoints.reverse(); // order first big and then small version
    const newPicture = createCustomOptimizedPicture(baseImageObj.src, baseImageObj.alt, false, imageBreakpoints);

    tabContent.prepend(newPicture);

    tabItems.push(tabContent);
    section.remove();
  });

  if (tabItems.length > 0) {
    const truckLineupSection = createTruckLineupSection(tabItems);

    if (inpageMeta) {
      truckLineupSection.setAttribute('data-inpageid', inpageMeta);
    }

    if (nextElement) {
      // if we saved a position push the carousel in that position if not
      main.insertBefore(truckLineupSection, nextElement);
    } else {
      main.append(truckLineupSection);
    }
    decorateIcons(truckLineupSection);
    decorateBlock(truckLineupSection.querySelector('.v2-truck-lineup'));
  }
}

function decorateSectionBackgrounds(main) {
  const variantClasses = ['black-background', 'gray-background'];

  main.querySelectorAll(':scope > .section').forEach((section) => {
    // transform background color variants into BEM classnames
    variantsClassesToBEM(section.classList, variantClasses, 'section');

    // If the section contains a background image
    const src = section.dataset.background;
    if (src) {
      const picture = createOptimizedPicture(src, '', false);
      section.appendChild(picture);
      section.classList.add('section-with-background');
    }
  });
}

function decorateHyperlinkImages(container) {
  // picture + br + a in the same paragraph
  [...container.querySelectorAll('picture + br + a, picture + a')]
    // link text is an unformatted URL paste
    .filter((a) => a.textContent.trim().startsWith('http'))
    .forEach((a) => {
      const br = a.previousElementSibling;
      let picture = br.previousElementSibling;
      if (br.tagName === 'PICTURE') {
        picture = br;
      }
      picture.remove();
      br.remove();
      a.innerHTML = picture.outerHTML;
      // make sure the link is not decorated as a button
      a.parentNode.classList.remove('button-container');
      a.className = '';
    });

  // with link and image in separate paragraphs
  [...container.querySelectorAll('p > a[href]')]
    // link (in a <p>) has no siblings
    .filter((a) => a.parentNode.childElementCount === 1)
    // is preceded by an image (in a <p>) and image has no other siblings
    .filter((a) => a.parentNode.previousElementSibling?.firstElementChild?.tagName === 'PICTURE')
    .filter((a) => a.parentNode.previousElementSibling?.childElementCount === 1)
    // link text is an unformatted URL paste
    .filter((a) => a.textContent.trim().startsWith('http'))
    .forEach((a) => {
      const picture = a.parentNode.previousElementSibling.firstElementChild;
      picture.parentNode.remove();
      a.innerHTML = picture.outerHTML;
      // make sure the link is not decorated as a button
      a.parentNode.classList.remove('button-container');
      a.className = '';
    });
}

function handleFetchError(statusCode, mainElement) {
  const errorType = statusCode === 404 ? '404' : 'unknown';
  const errorMessage = document.createRange().createContextualFragment(`
    <div class="section">
      <div class="inline-message-wrapper">
        <div class="inline-message block inline-message--error">
          <span class="icon icon-control-remove" aria-hidden="true"></span>
          <h2>${getTextLabel(`modal:error-title-${errorType}`)}</h2>
          <p>${getTextLabel(`modal:error-text-${errorType}`)}</p>
        </div>
      </div>
    </div>
  `);

  decorateIcons(errorMessage);
  mainElement.appendChild(errorMessage);

  const modalEvent = new CustomEvent('open-modal', {
    detail: {
      content: mainElement.children, // Now this refers to the errorContainer which mimics a section
      target: document.activeElement, // might consider the previous active element or a default
    },
  });
  document.dispatchEvent(modalEvent, { bubbles: true });
}

function handleModalLinks(link) {
  if (!modal) {
    loadModalScript();
  }
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    const modalContentLink = link.getAttribute('data-modal-content');
    const resp = await fetch(`${modalContentLink}.plain.html`);
    const main = document.createElement('main');

    if (resp.ok) {
      main.innerHTML = await resp.text();

      decorateMain(main, main);
      await loadSections(main);
      const modalEvent = new CustomEvent('open-modal', {
        detail: {
          content: main.children,
          target: event.target,
        },
      });
      document.dispatchEvent(modalEvent, { bubbles: true });
    } else {
      handleFetchError(resp.status, main);
    }
  });
}

export function decorateLinks(block) {
  [...block.querySelectorAll('a')]
    .filter(({ href }) => !!href)
    .forEach((link) => {
      if (isVideoLink(link)) {
        addVideoShowHandler(link);
        return;
      }
      if (isSoundcloudLink(link)) {
        addSoundcloudShowHandler(link);
      }
      if (link.getAttribute('href').startsWith('/modal-content=')) {
        const href = link.getAttribute('href');
        link.setAttribute('data-modal-content', href.split('modal-content=')[1]);
        // removing the `/modal-content=` so the link can be opened in the other tab by coping link
        link.setAttribute('href', link.getAttribute('href').replace('/modal-content=', ''));
        handleModalLinks(link);
        return;
      }

      const url = new URL(link.href);
      const external =
        !url.host.match('volvotrucks.(us|ca|mx)') && !url.host.match(/\.hlx\.(page|live)|\.aem\.(page|live)/) && !url.host.match('localhost');
      if (url.host.match('build.volvotrucks.(us)') || url.pathname.endsWith('.pdf') || url.pathname.endsWith('.jpeg') || external) {
        link.target = '_blank';
      }
    });
}

function decorateOfferLinks(main) {
  async function openOffer(event) {
    event.preventDefault();
    const module = await import(`${window.hlx.codeBasePath}/blocks/get-an-offer/get-an-offer.js`);
    if (module.showOffer) {
      await module.showOffer(event.target);
    }
  }
  main.querySelectorAll('a[href*="offer"]').forEach((a) => {
    if (a.href.endsWith('-offer')) {
      let list = a.closest('ul');
      if (!list) {
        list = document.createElement('ul');
        const parent = a.parentElement;
        const li = document.createElement('li');
        list.append(li);
        li.append(a);
        parent.after(list);
        if (parent.textContent === '' && parent.children.length === 0) {
          parent.remove();
        }
      }
      list.classList.add('inline');
      const li = document.createElement('li');
      const clone = a.cloneNode(true);
      clone.textContent = 'Details';
      clone.title = clone.textContent;
      li.append(clone);
      list.append(li);
      a.addEventListener('click', openOffer);
      clone.addEventListener('click', openOffer);
    }
  });
}

function createInpageNavigation(main) {
  const navItems = [];
  const tabItemsObj = [];

  // Extract the inpage navigation info from sections
  [...main.querySelectorAll(':scope > div')].forEach((section) => {
    const title = section.dataset.inpage;
    if (title) {
      const countDuplicated = tabItemsObj.filter((item) => item.title === title)?.length || 0;
      const order = parseFloat(section.dataset.inpageOrder);
      const anchorID = countDuplicated > 0 ? slugify(`${section.dataset.inpage}-${countDuplicated}`) : slugify(section.dataset.inpage);
      const obj = {
        title,
        id: anchorID,
      };

      if (order) {
        obj.order = order;
      }

      tabItemsObj.push(obj);

      // Set section with ID
      section.dataset.inpageid = anchorID;
    }
  });

  // Sort the object by order
  const sortedObject = tabItemsObj.slice().sort((obj1, obj2) => {
    const order1 = obj1.order ?? Infinity; // Fallback to a large number if 'order' is not present
    const order2 = obj2.order ?? Infinity;

    return order1 - order2;
  });

  // From the array of objects create the DOM
  sortedObject.forEach((item) => {
    const subnavItem = createElement('div');
    const subnavLink = createElement('button', {
      props: {
        'data-id': item.id,
        title: item.title,
      },
    });

    subnavLink.textContent = item.title;

    subnavItem.append(subnavLink);
    navItems.push(subnavLink);
  });

  return navItems;
}

function buildInpageNavigationBlock(main) {
  const inpageClassName = 'v2-inpage-navigation';

  const items = createInpageNavigation(main);

  if (items.length > 0) {
    const section = createElement('div');
    Object.assign(section.style, {
      height: '48px',
      overflow: 'hidden',
    });

    section.append(buildBlock(inpageClassName, { elems: items }));
    main.prepend(section);

    decorateBlock(section.querySelector(`.${inpageClassName}`));
  }
}

const reparentChildren = (element) => {
  const parent = element.parentNode;
  while (element.firstChild) {
    parent.insertBefore(element.firstChild, element);
  }
  element.remove();
};

const shouldDecorateLink = (a) => {
  a.title = a.title || a.textContent;
  return a.href !== a.textContent && !a.querySelector('img');
};

const getButtonClass = (up, twoUp) => {
  if ((up.tagName === 'EM' && twoUp.tagName === 'STRONG') || (up.tagName === 'STRONG' && twoUp.tagName === 'EM')) {
    reparentChildren(up);
    reparentChildren(twoUp);
    return 'marketing';
  }

  if (up.tagName === 'STRONG' || up.tagName === 'EM') {
    reparentChildren(up);
    return up.tagName === 'STRONG' ? 'primary' : 'secondary';
  }

  return 'tertiary';
};

const addClassToContainer = (element) => {
  if (element.childNodes.length === 1 && ['P', 'DIV', 'LI'].includes(element.tagName)) {
    element.classList.add('button-container');
  }
};

/**
 * Applies button styling to anchor tags within a specified element,
 * decorating them as button-like if they meet certain criteria.
 * @param {Element} element - The container element within which to search and style anchor tags.
 */
const decorateButtons = (element) => {
  element.querySelectorAll('a').forEach((a) => {
    if (shouldDecorateLink(a)) {
      let up = a.parentElement;
      const twoUp = up.parentElement;
      const threeUp = twoUp.parentElement;
      const buttonClass = getButtonClass(up, twoUp);

      up = a.parentElement;
      if (['P', 'DIV', 'LI'].includes(up.tagName)) {
        a.className = `button ${buttonClass}`;
      } else {
        a.className = buttonClass;
      }

      addClassToContainer(up);
      addClassToContainer(twoUp);
      addClassToContainer(threeUp);

      if (![up, twoUp, threeUp].some((el) => el.classList.contains('button-container'))) {
        a.className = '';
      }
    }
  });
};

function decorateConfigurator(main) {
  moveClassToHtmlEl('truck-configurator');

  const currentUrl = window.location.href;
  const isConfiguratorPage = document.documentElement.classList.contains('truck-configurator') || currentUrl.includes('/summary?config=');

  if (isConfiguratorPage) {
    const allowedCountries = getMetadata('allowed-countries');
    const errorPageUrl = getMetadata('redirect-url');
    if (allowedCountries && errorPageUrl) {
      validateCountries(allowedCountries, errorPageUrl);
    }

    const container = createElement('div', { props: { id: 'configurator' } });
    main.innerHTML = '';
    main.append(container);

    const { JS = false, CSS = false } = TRUCK_CONFIGURATOR_URLS;
    const cssUrls = formatStringToArray(CSS);
    const jsUrls = formatStringToArray(JS);
    if (jsUrls.length > 0 && currentUrl.includes('/summary?config=')) {
      document.documentElement.classList.add('external-app');
      const truckConfiguratorBaseUrl = new URL(jsUrls[0]).origin;
      const currentUrlHash = new URL(currentUrl).hash;
      jsUrls.unshift(`${truckConfiguratorBaseUrl}/${currentUrlHash}`);
    }

    // if there are no css files, remove js files as well to avoid a weird animation
    if (cssUrls.length === 0) {
      jsUrls.length = 0;
    }

    jsUrls.forEach((url) => {
      loadScript(url, { type: 'text/javascript', charset: 'UTF-8', defer: 'defer' });
    });

    cssUrls.forEach((url) => {
      loadCSS(url);
    });
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 * @param {Element} head The header element
 */
export function decorateMain(main, head) {
  const pageStyle = head.querySelector('[name="style"]')?.content;
  if (pageStyle) {
    pageStyle
      .split(',')
      .map((style) => toClassName(style.trim()))
      .forEach((style) => main.classList.add(style));
  }
  // hopefully forward compatible button decoration
  decorateButtons(main);
  decorateIcons(main);
  buildAutoBlocks(main, head);
  decorateSections(main);
  decorateBlocks(main);
  decorateHyperlinkImages(main);
  decorateSectionBackgrounds(main);
  decorateLinks(main);
  decorateOfferLinks(main);
  decorateConfigurator(main);
}

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  decorateTemplateAndTheme();

  const main = doc.querySelector('main');
  const { head } = doc;
  if (main) {
    decorateMain(main, head);
    document.body.classList.add('appear');
    const language = getLocale();
    document.documentElement.lang = language;
    const templateName = getMetadata('template');
    if (templateName) {
      await loadTemplate(doc, templateName);
    }
  } else {
    document.documentElement.lang = 'en';
  }

  await getPlaceholders();
}

export const MEDIA_BREAKPOINTS = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

export function getImageForBreakpoint(imagesList, onChange = () => {}) {
  const mobileMQ = window.matchMedia('(max-width: 743px)');
  const tabletMQ = window.matchMedia('(min-width: 744px) and (max-width: 1199px)');
  const desktopMQ = window.matchMedia('(min-width: 1200px)');

  const [mobilePic, tabletPic, desktopPic] = imagesList.querySelectorAll('picture');

  const onBreakpointChange = (mq, picture, breakpoint) => {
    if (mq.matches) {
      onChange(picture, breakpoint);
    }
  };
  const onMobileChange = (mq) => onBreakpointChange(mq, mobilePic, MEDIA_BREAKPOINTS.MOBILE);
  const onTabletChange = (mq) => onBreakpointChange(mq, tabletPic, MEDIA_BREAKPOINTS.TABLET);
  const onDesktopChange = (mq) => onBreakpointChange(mq, desktopPic, MEDIA_BREAKPOINTS.DESKTOP);

  mobileMQ.addEventListener('change', onMobileChange);
  tabletMQ.addEventListener('change', onTabletChange);
  desktopMQ.addEventListener('change', onDesktopChange);

  if (mobileMQ.matches) {
    onMobileChange(mobileMQ);
    return;
  }

  if (tabletMQ.matches) {
    onTabletChange(tabletMQ);
    return;
  }
  onDesktopChange(desktopMQ);
}

const moveClassToHtmlEl = (className, elementSelector = 'main') => {
  if (document.querySelector(elementSelector).classList.contains(className)) {
    document.querySelector('html').classList.add(className);
    document.querySelector(elementSelector).classList.remove(className);
  }
};

/**
 * Loads everything that happens a lot later,
 * without impacting the user experience.
 */
function loadDelayed() {
  window.setTimeout(() => {
    import('./delayed.js');
  }, 3000);
  // load anything that can be postponed to the latest here
}

async function loadPage() {
  await loadEager(document);
  await loadLazy(document);
  loadDelayed();
}

loadPage();

/* REDESIGN CLASS CHECK */
moveClassToHtmlEl('redesign-v2');

/* MODAL */
let modal;

async function loadModalScript() {
  if (!modal) {
    modal = await import('../common/modal/modal.js');
  }

  return modal;
}

document.addEventListener('open-modal', (event) => {
  loadModalScript().then((modal) => {
    const variantClasses = ['black', 'gray', 'reveal'];
    const modalClasses = [...event.detail.target.closest('.section').classList].filter((el) => el.startsWith('modal-'));
    // changing the modal variants classes to BEM naming
    variantClasses.forEach((variant) => {
      const index = modalClasses.findIndex((el) => el === `modal-${variant}`);

      if (index >= 0) {
        modalClasses[index] = modalClasses[index].replace('modal-', 'modal--');
      }
    });

    modal.showModal(event.detail.content, { modalClasses, invokeContext: event.detail.target });
  });
});
