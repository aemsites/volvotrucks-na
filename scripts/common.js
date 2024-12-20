import { sampleRUM, loadCSS, loadBlock, loadBlocks, loadHeader, buildBlock, decorateBlock, getMetadata } from './aem.js';
import { createVideo, isVideoLink } from './video-helper.js';

let placeholders = null;

/**
 * loads a block named 'footer' into footer
 */
function loadFooter(footer) {
  if (footer) {
    const footerBlock = buildBlock('footer', '');
    footer.append(footerBlock);
    decorateBlock(footerBlock);
    loadBlock(footerBlock);
  }
}

/**
 * Returns the true origin of the current page in the browser.
 * If the page is running in a iframe with srcdoc, the ancestor origin is returned.
 * @returns {String} The true origin
 */
export function getOrigin() {
  return window.location.href === 'about:srcdoc' ? window.parent.location.origin : window.location.origin;
}

export function getHref() {
  if (window.location.href !== 'about:srcdoc') {
    return window.location.href;
  }

  const urlParams = new URLSearchParams(window.parent.location.search);
  return `${window.parent.location.origin}${urlParams.get('path')}`;
}

export const getLanguagePath = () => {
  const { pathname } = new URL(window.location.href);
  const langCodeMatch = pathname.match('^(/[a-z]{2}(-[a-z]{2})?/).*');
  return langCodeMatch ? langCodeMatch[1] : '/';
};

export async function getPlaceholders() {
  const url = `${getLanguagePath()}placeholder.json`;
  placeholders = await fetch(url).then((resp) => resp.json());
}

export function getTextLabel(key) {
  return placeholders?.data.find((el) => el.Key === key)?.Text || key;
}

/**
 * Create an element with the given id and classes.
 * @param {string} tagName the tag
 * @param {Object} options the element options
 * @param {string[]|string} [options.classes=[]] the class or classes to add
 * @param {Object} [options.props={}] any other attributes to add to the element
 * @returns {HTMLElement} the element
 */
export function createElement(tagName, options = {}) {
  const { classes = [], props = {} } = options;
  const elem = document.createElement(tagName);
  const isString = typeof classes === 'string';
  if (classes || (isString && classes !== '') || (!isString && classes.length > 0)) {
    const classesArr = isString ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (!isString && classes.length === 0) {
    elem.removeAttribute('class');
  }

  if (props) {
    Object.keys(props).forEach((propName) => {
      const value = propName === props[propName] ? '' : props[propName];
      elem.setAttribute(propName, value);
    });
  }

  return elem;
}

/**
 * Create a new section with the specific name.
 * Append the given node to this section.
 * @param {string} blockName - Block name.
 * @param {string} sectionName - Name of the section
 *  (content-section, media-section etc...).
 * @param {HTMLElement} node - HTML element that represents
 *  the node to append to the section.
 * @returns {HTMLElement} - Returns an HTML element representing
 *  the new section with appended cell.
 */
export function createNewSection(blockName, sectionName, node) {
  const section = createElement('div', { classes: `${blockName}__${sectionName}-section` });
  section.append(node);
  return section;
}

/**
 * Provides the functionality to add a video
 * to the provided section if the link corresponds to a video.
 * @param {string} blockName - Name of the block.
 * @param {HTMLElement} section - Represents the section to which the video should be added.
 * @param {HTMLAnchorElement} link - Anchor link
 * @returns {HTMLElement} - Section with added video
 */
export function addVideoToSection(blockName, section, link) {
  const isVideo = link ? isVideoLink(link) : false;
  if (isVideo) {
    const video = createVideo(link.getAttribute('href'), `${blockName}__video`, {
      muted: true,
      autoplay: true,
      loop: true,
      playsinline: true,
    });
    link.remove();
    section.append(video);
  }
  return section;
}
/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = createElement('link', { props: { rel: 'icon', type: 'image/svg+xml', href } });
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

const ICONS_CACHE = {};
/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} [element] Element containing icons
 */
export async function decorateIcons(element) {
  // Prepare the inline sprite
  let svgSprite = document.getElementById('franklin-svg-sprite');
  if (!svgSprite) {
    const div = document.createElement('div');
    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="franklin-svg-sprite" style="display: none"></svg>';
    svgSprite = div.firstElementChild;
    document.body.append(div.firstElementChild);
  }

  // Download all new icons
  const icons = [...element.querySelectorAll('span.icon')];
  await Promise.all(
    icons.map(async (span) => {
      const iconName = Array.from(span.classList)
        .find((c) => c.startsWith('icon-'))
        .substring(5);
      if (!ICONS_CACHE[iconName]) {
        ICONS_CACHE[iconName] = true;
        try {
          const response = await fetch(`${window.hlx.codeBasePath}/icons/${iconName}.svg`);
          if (!response.ok) {
            ICONS_CACHE[iconName] = false;
            return;
          }
          // Styled icons don't play nice with the sprite approach because of shadow dom isolation
          const svg = await response.text();
          if (svg.match(/(<style | class=)/)) {
            ICONS_CACHE[iconName] = { styled: true, html: svg };
          } else {
            ICONS_CACHE[iconName] = {
              html: svg
                .replace('<svg', `<symbol id="icons-sprite-${iconName}"`)
                .replace(/ width=".*?"/, '')
                .replace(/ height=".*?"/, '')
                .replace('</svg>', '</symbol>'),
            };
          }
        } catch (error) {
          ICONS_CACHE[iconName] = false;

          console.error(error);
        }
      }
    }),
  );

  const symbols = Object.keys(ICONS_CACHE)
    .filter((k) => !svgSprite.querySelector(`#icons-sprite-${k}`))
    .map((k) => ICONS_CACHE[k])
    .filter((v) => !v.styled)
    .map((v) => v.html)
    .join('\n');
  svgSprite.innerHTML += symbols;

  icons.forEach((span) => {
    const iconName = Array.from(span.classList)
      .find((c) => c.startsWith('icon-'))
      .substring(5);
    const parent = span.firstElementChild?.tagName === 'A' ? span.firstElementChild : span;
    // Styled icons need to be inlined as-is, while unstyled ones can leverage the sprite
    if (ICONS_CACHE[iconName].styled) {
      parent.innerHTML = ICONS_CACHE[iconName].html;
    } else {
      parent.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><use href="#icons-sprite-${iconName}"/></svg>`;
    }
  });
}

export async function loadTemplate(doc, templateName) {
  try {
    await loadCSS(`${window.hlx.codeBasePath}/templates/${templateName}/${templateName}.css`);
    const decorationComplete = new Promise((resolve) => {
      (async () => {
        try {
          const mod = await import(`../templates/${templateName}/${templateName}.js`);
          if (mod.default) {
            await mod.default(doc);
          }
        } catch (error) {
          console.log(`failed to load module for ${templateName}`, error);
        }
        resolve();
      })();
    });
    await decorationComplete;
  } catch (error) {
    console.log(`failed to load block ${templateName}`, error);
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
export async function loadLazy(doc) {
  loadCSS(`${window.hlx.codeBasePath}/styles/header-font.css`);
  const main = doc.querySelector('main');
  await loadBlocks(main);

  const { hash } = window.location;
  const element = hash ? doc.getElementById(hash.substring(1)) : false;
  if (hash && element) {
    element.scrollIntoView();
  }
  const header = doc.querySelector('header');

  const disableHeader = getMetadata('disable-header').toLowerCase() === 'true';
  const disableFooter = getMetadata('disable-footer').toLowerCase() === 'true';

  if (!disableHeader) {
    loadHeader(header);
  }

  if (!disableFooter) {
    loadFooter(doc.querySelector('footer'));
  }

  const subnav = header?.querySelector('.block.sub-nav');
  if (subnav) {
    loadBlock(subnav);
    header.appendChild(subnav);
  }

  loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
  addFavIcon(`${window.hlx.codeBasePath}/styles/favicon.svg`);
  sampleRUM('lazy');
  sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
  sampleRUM.observe(main.querySelectorAll('picture > img'));
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
export function loadDelayed() {
  window.setTimeout(() => {
    import('./delayed.js');
  }, 3000);
  // load anything that can be postponed to the latest here
}

export const removeEmptyTags = (block, isRecursive) => {
  const isEmpty = (node) => {
    const tagName = `</${node.tagName}>`;

    // exclude iframes
    if (node.tagName.toUpperCase() === 'IFRAME') {
      return false;
    }
    // checking that the tag is not autoclosed to make sure we don't remove <meta />
    // checking the innerHTML and trim it to make sure the content inside the tag is 0
    return node.outerHTML.slice(tagName.length * -1).toUpperCase() === tagName && node.innerHTML.trim().length === 0;
  };

  if (isRecursive) {
    block.querySelectorAll(':scope > *').forEach((node) => {
      if (node.children.length > 0) {
        removeEmptyTags(node, true);
      }

      if (isEmpty(node)) {
        node.remove();
      }
    });
    return;
  }

  block.querySelectorAll('*').forEach((node) => {
    if (isEmpty(node)) {
      node.remove();
    }
  });
};

export const unwrapDivs = (element, options = {}) => {
  const stack = [element];
  const { ignoreDataAlign = false } = options;

  while (stack.length > 0) {
    const currentElement = stack.pop();

    let i = 0;
    while (i < currentElement.children.length) {
      const node = currentElement.children[i];
      const attributesLength = [...node.attributes].filter((el) => {
        if (ignoreDataAlign) {
          return !(el.name.startsWith('data-align') || el.name.startsWith('data-valign'));
        }

        return el;
      }).length;

      if (node.tagName === 'DIV' && attributesLength === 0) {
        while (node.firstChild) {
          currentElement.insertBefore(node.firstChild, node);
        }
        node.remove();
      } else {
        stack.push(node);
        i += 1;
      }
    }
  }
};

export const variantsClassesToBEM = (blockClasses, expectedVariantsNames, blockName) => {
  expectedVariantsNames.forEach((variant) => {
    if (blockClasses.contains(variant)) {
      blockClasses.remove(variant);
      blockClasses.add(`${blockName}--${variant}`);
    }
  });
};

/**
 * Adds a CSS class to the parent element of a child element
 * if the child element's class list includes the specified class.
 *
 * @param {HTMLElement} child - The child HTML element.
 * @param {string} className - The name of the class to check and add.
 */
export function addClassIfChildHasClass(child, className) {
  if (child.className.includes(className)) {
    child.parentElement.classList.add(className);
  }
}
/**
 *
 * @param {string} blockName - block name with '-' instead of spaces
 * @param {string} blockContent - the content that will be set as block inner HTML
 * @param {object} options - other options like variantsClasses
 * @returns
 */
export async function loadAsBlock(blockName, blockContent, options = {}) {
  const { variantsClasses = [] } = options;
  const blockEl = createElement('div', {
    classes: ['block', blockName, ...variantsClasses],
    props: { 'data-block-name': blockName },
  });
  const wrapperEl = createElement('div');
  wrapperEl.append(blockEl);

  blockEl.innerHTML = blockContent;
  await loadBlocks(wrapperEl);

  return blockEl;
}

export const adjustPretitle = (element) => {
  const headingSelector = 'h1, h2, h3, h4, h5, h6';

  [...element.querySelectorAll(headingSelector)].forEach((heading) => {
    const isNextElHeading = heading.nextElementSibling?.matches(headingSelector);

    if (!isNextElHeading) {
      return;
    }

    const currentLevel = Number(heading.tagName[1]);
    const nextElLevel = Number(heading.nextElementSibling.tagName[1]);

    if (currentLevel > nextElLevel) {
      const pretitle = createElement('span', { classes: ['pretitle'] });
      pretitle.append(...heading.childNodes);

      heading.replaceWith(pretitle);
    }
  });
};

export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    // separate accent from letter
    .normalize('NFD')
    // remove all separated accents
    .replace(/[\u0300-\u036f]/g, '')
    // replace spaces with -
    .replace(/\s+/g, '-')
    // replace & with 'and'
    .replace(/&/g, '-and-')
    // remove all non-word chars
    .replace(/[^\w-]+/g, '')
    // replace multiple '-' with single '-'
    .replace(/--+/g, '-');

/**
 * loads the constants file where configuration values are stored
 */
async function getConstantValues() {
  const url = `${getLanguagePath()}constants.json`;
  let constants;
  try {
    const response = await fetch(url).then((resp) => resp.json());
    if (!response.ok) {
      constants = response;
    }
  } catch (error) {
    console.error('Error with constants file', error);
  }
  return constants;
}

/**
 * Transforms an array of strings in the format 'key: value' into an object.
 * @param {string[]} data - Array of strings in the format 'key: value'.
 * @returns {Object} - Object with keys and values.
 * @throws {TypeError} - If an item in the array is not in the format 'key: value'.
 */
export const extractObjectFromArray = (data) => {
  if (!Array.isArray(data)) {
    return {};
  }
  const obj = {};

  for (const item of data) {
    try {
      if (typeof item !== 'string' || !item.includes(':')) {
        throw new TypeError(`Invalid input: "${item}". Expected a string: "key: value".`);
      }
      const [key, value] = item.split(':', 2);
      obj[key.trim()] = value.trim();
    } catch (error) {
      console.warn(`Error with item: "${item}"`, error);
    }
  }
  return obj;
};

const formatValues = (values) => {
  const obj = {};
  if (values) {
    values.forEach(({ name, value }) => (obj[name] = value));
  }
  return obj;
};

const { searchConfig, cookieValues, magazineConfig, tools, headerConfig, newsFeedConfig, truckConfiguratorUrls } = await getConstantValues();

// This data comes from the sharepoint 'constants.xlsx' file
export const TOOLS_CONFIGS = formatValues(tools?.data);
export const SEARCH_CONFIGS = formatValues(searchConfig?.data);
export const COOKIE_CONFIGS = formatValues(cookieValues?.data);
export const MAGAZINE_CONFIGS = formatValues(magazineConfig?.data);
export const HEADER_CONFIGS = formatValues(headerConfig?.data);
export const NEWS_FEED_CONFIGS = formatValues(newsFeedConfig?.data);
export const TRUCK_CONFIGURATOR_URLS = formatValues(truckConfiguratorUrls?.data);

/**
 * Check if one trust group is checked.
 * @param {String} groupName the one trust croup like: C0002
 */
export function checkOneTrustGroup(groupName) {
  if (typeof groupName !== 'string') {
    return false;
  }
  const oneTrustCookie = decodeURIComponent(document.cookie.split(';').find((cookie) => cookie.trim().startsWith('OptanonConsent=')));
  return oneTrustCookie.includes(`${groupName}:1`);
}

const { PERFORMANCE_COOKIE = false, TARGETING_COOKIE = false, SOCIAL_COOKIE = false } = COOKIE_CONFIGS;

export function isPerformanceAllowed() {
  return checkOneTrustGroup(PERFORMANCE_COOKIE);
}

export function isTargetingAllowed() {
  return checkOneTrustGroup(TARGETING_COOKIE);
}

export function isSocialAllowed() {
  return checkOneTrustGroup(SOCIAL_COOKIE);
}

/**
 * See https://www.aem.live/developer/spreadsheets#arrays
 * Converts a string representation of an array, removing all brackets, backslashes, and quotes,
 * into an actual JavaScript array. Splits on commas, trims each string, and filters out empty
 * strings to ensure all elements contain valid data.
 *
 * @param {string} inputString - The string to be converted. It should mimic a serialized array,
 *                               often found in JSON-like structures where arrays are represented
 *                               as strings due to data transmission constraints.
 * @returns {string[]} An array of strings derived from the cleaned input string. Each element
 *                     is a trimmed, non-empty string that was separated by a comma in the
 *                     original input.
 * @returns {Array} An empty array if the input is not a string
 */
export const formatStringToArray = (inputString) => {
  if (typeof inputString !== 'string') {
    return [];
  }
  const cleanedString = inputString.replace(/[[\]\\'"]+/g, '');
  return cleanedString
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item);
};

/*
  The generateId function should be used only
  for generating the id for UI elements
*/
let idValue = 0;

export const generateId = (prefix = 'id') => {
  idValue += 1;
  return `${prefix}-${idValue}`;
};

/**
 * Helper for delaying a function
 * @param {function} func callback function
 * @param {number} timeout time to debouce in ms, default 200
 */
export function debounce(func, timeout = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

/**
 * Returns a list of properties listed in the block
 * @param {string} route get the Json data from the route
 * @returns {Object} the json data object
 */
export const getJsonFromUrl = async (route) => {
  try {
    const response = await fetch(route);
    if (!response.ok) {
      return null;
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error('getJsonFromUrl:', { error });
  }
  return null;
};

export const deepMerge = (target, source) => {
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === 'object') {
      if (!target[key]) {
        target[key] = {};
      }
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
};

export const isDevHost = () => {
  const devHosts = ['localhost', '127.0.0.1', 'aem.page', 'aem.live'];
  return devHosts.some((url) => window.location.host.includes(url));
};

/**
 * Function that checks for the locale field in metadata an returns it.
 * It defaults to 'en-us'
 * @returns {string} The locale string
 */
export const getLocale = () => getMetadata('locale') || 'en-us';

/**
 * Function that recieves a timestamp in seconds and returns a date
 * in its locale's format. Defaults to US format date (MM/DD/YYYY)
 * @param {string} timestamp The date in seconds as a string
 * @param {object} options The date options obj for a specific format
 */
export const getDateFromTimestamp = (timestamp, options) => {
  const date = new Date(timestamp * 1000 + new Date().getTimezoneOffset() * 60000);
  const localeDate = Intl.DateTimeFormat(getLocale(), options).format(date);

  return localeDate;
};
