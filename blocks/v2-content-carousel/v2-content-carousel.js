import { createElement, decorateIcons, adjustPretitle, isMobileViewport } from '../../scripts/common.js';
import { isVideoLink, createVideo, queryVideoEl, playMutedInline, pausePlayback } from '../../scripts/video-helper.js';

const blockName = 'v2-content-carousel';
let desktopCardsPerClick = 1;

/**
 * Compute the index of the left-most slot (card) in a horizontal scroller.
 * Uses the first card’s width plus the container’s CSS gap.
 * @param {HTMLElement} container
 * @param {string} itemSelector - e.g. '.v2-content-carousel__media-item'
 * @returns {number}
 */
const getFirstSlotIndex = (container, itemSelector) => {
  const items = container.querySelectorAll(itemSelector);
  if (!items.length) {
    return 0;
  }

  const firstItem = items[0];
  const gap = parseFloat(getComputedStyle(container).gap) || 0;
  const slotWidth = firstItem.offsetWidth + gap || container.scrollWidth / items.length || 1;
  const rawIndex = Math.floor((container.scrollLeft + Number.EPSILON) / slotWidth);
  const clampedIndex = Math.max(0, Math.min(items.length - 1, rawIndex));
  return clampedIndex;
};

/**
 * Autoplay the video in the left-most slot on mobile/tablet; pause others.
 * @param {HTMLElement} container
 * @param {string} itemSelector
 * @param {string} videoItemClass - e.g. 'v2-content-carousel__media-item--video'
 */
const updateMobileAutoplay = (container, itemSelector, videoItemClass) => {
  const items = container.querySelectorAll(itemSelector);
  if (!items.length) {
    return;
  }

  const activeIndex = getFirstSlotIndex(container, itemSelector);

  items.forEach((item, index) => {
    if (!item.classList.contains(videoItemClass)) {
      return;
    }
    const player = queryVideoEl(item);
    if (!player) {
      return;
    }
    if (index === activeIndex) {
      playMutedInline(player);
    } else {
      pausePlayback(player);
    }
  });
};

/**
 * Bind desktop hover playback: play on pointer enter, pause on pointer leave.
 * Attaches listeners to items matching `${itemSelector}.${videoItemClass}`.
 * Returns a teardown function to remove the listeners, or `undefined` if no targets are found.
 *
 * @param {HTMLElement} root - Container to search within.
 * @param {string} itemSelector - Selector for carousel items (e.g., '.v2-content-carousel__media-item').
 * @param {string} videoItemClass - Modifier class indicating video items (e.g., 'v2-content-carousel__media-item--video').
 * @returns {(() => void) | undefined} Teardown function, or `undefined` when nothing was bound.
 */
const setupDesktopHover = (root, itemSelector, videoItemClass) => {
  const items = root.querySelectorAll(`${itemSelector}.${videoItemClass}`);
  if (!items.length) {
    return;
  }

  const listeners = [];
  items.forEach((item) => {
    const player = queryVideoEl(item);
    if (!player) {
      return;
    }
    const onEnter = () => playMutedInline(player);
    const onLeave = () => pausePlayback(player);
    item.addEventListener('pointerenter', onEnter);
    item.addEventListener('pointerleave', onLeave);
    listeners.push({ item, onEnter, onLeave });
  });

  return () => {
    listeners.forEach(({ item, onEnter, onLeave }) => {
      item.removeEventListener('pointerenter', onEnter);
      item.removeEventListener('pointerleave', onLeave);
    });
  };
};

/**
 * Observe container visibility and invoke handlers.
 * Returns a teardown function to disconnect the observer, or `undefined`
 * if the container is missing or IntersectionObserver is unavailable.
 *
 * @param {HTMLElement} container - Element to observe.
 * @param {() => void} onVisible - Called when container is considered visible.
 * @param {() => void} onHidden - Called when container is considered hidden.
 * @param {{ threshold?: number }} [opts] - Options (visibility ratio).
 * @returns {(() => void) | undefined} Teardown function or `undefined`.
 */
const setupViewportGate = (container, onVisible, onHidden, { threshold = 0.25 } = {}) => {
  if (!container || typeof IntersectionObserver === 'undefined') {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      const visible = entry.isIntersecting && entry.intersectionRatio >= threshold;
      (visible ? onVisible : onHidden)();
    },
    { threshold: [0, threshold, 1] },
  );

  observer.observe(container);
  return () => observer.disconnect();
};

/**
 * Pause all videos in a container.
 * @param {HTMLElement} container
 * @param {string} itemSelector
 */
const pauseAllInContainer = (container, itemSelector) => {
  container.querySelectorAll(itemSelector).forEach((item) => {
    const player = queryVideoEl(item);
    if (player) {
      pausePlayback(player);
    }
  });
};

/**
 * Mobile/Tablet setup: gate by viewport + keep in sync on scroll/resize.
 * Autoplay only when the active (left-most) item is fully visible.
 * Returns teardown.
 * @param {HTMLElement} container
 * @param {string} itemSelector
 * @param {string} videoItemClass
 */
const setupMobileAutoplay = (container, itemSelector, videoItemClass) => {
  const FULLY_VISIBLE = 0.999;
  let containerVisible = false;
  let activeObserver = null;
  let activeItem = null;
  let lastActiveIndex = -1;

  const onVisible = () => {
    containerVisible = true;
    updateMobileAutoplay(container, itemSelector, videoItemClass);
  };

  const onHidden = () => {
    containerVisible = false;
    activeObserver?.disconnect();
    activeObserver = null;
    activeItem = null;
    lastActiveIndex = -1;
    pauseAllInContainer(container, `${itemSelector}.${videoItemClass}`);
  };

  const teardownIO = setupViewportGate(container, onVisible, onHidden, { threshold: 0 });

  const bindActiveItemObserver = () => {
    if (!containerVisible) {
      return;
    }

    const items = container.querySelectorAll(itemSelector);
    if (!items.length) {
      return;
    }

    const activeIndex = getFirstSlotIndex(container, itemSelector);
    if (activeIndex === lastActiveIndex) {
      return;
    }
    lastActiveIndex = activeIndex;

    activeObserver?.disconnect();
    activeItem = items[activeIndex];

    activeObserver = new IntersectionObserver(
      ([entry]) => {
        if (!containerVisible) {
          return;
        }
        if (entry.isIntersecting && entry.intersectionRatio >= FULLY_VISIBLE) {
          updateMobileAutoplay(container, itemSelector, videoItemClass);
        } else {
          const player = queryVideoEl(activeItem);
          if (player) {
            pausePlayback(player);
          }
        }
      },
      { threshold: [FULLY_VISIBLE, 1] },
    );

    activeObserver.observe(activeItem);
  };

  const refreshActive = () => {
    if (!containerVisible) {
      return;
    }
    onVisible();
    bindActiveItemObserver();
  };

  onVisible();
  bindActiveItemObserver();

  container.addEventListener('scroll', refreshActive, { passive: true });
  window.addEventListener('resize', refreshActive);

  return () => {
    teardownIO?.();
    activeObserver?.disconnect();
    container.removeEventListener('scroll', refreshActive);
    window.removeEventListener('resize', refreshActive);
    onHidden();
  };
};

/**
 * Responsive wrapper: bind desktop or mobile behavior and rebind on breakpoint change.
 * Returns teardown.
 * @param {HTMLElement} blockRoot
 * @param {HTMLElement} container
 * @param {string} itemSelector
 * @param {string} videoItemClass
 * @returns {() => void}
 */
const setupResponsivePlayback = (blockRoot, container, itemSelector, videoItemClass) => {
  const computeMode = () => (isMobileViewport() ? 'mobile' : 'desktop');

  let mode = computeMode();
  let unbind =
    mode === 'mobile' ? setupMobileAutoplay(container, itemSelector, videoItemClass) : setupDesktopHover(blockRoot, itemSelector, videoItemClass);

  const onResize = () => {
    const nextMode = computeMode();
    if (nextMode !== mode) {
      unbind?.();
      unbind =
        nextMode === 'mobile'
          ? setupMobileAutoplay(container, itemSelector, videoItemClass)
          : setupDesktopHover(blockRoot, itemSelector, videoItemClass);
      mode = nextMode;
    } else if (nextMode === 'mobile') {
      updateMobileAutoplay(container, itemSelector, videoItemClass);
    }
  };

  window.addEventListener('resize', onResize);

  return () => {
    window.removeEventListener('resize', onResize);
    unbind?.();
  };
};

function numberCardsToNavigate() {
  const isMobile = isMobileViewport();

  if (isMobile) {
    return 1;
  }

  return desktopCardsPerClick;
}

const navigate = (carousel, direction) => {
  const isMobile = isMobileViewport();
  let numberCardsToNavigatePerClick = numberCardsToNavigate();

  if (isMobile) {
    numberCardsToNavigatePerClick = 1;
  } else {
    const isInteractive = carousel.closest(`.${blockName}`)?.classList.contains('interactive');
    numberCardsToNavigatePerClick = isInteractive ? 2 : 1;
  }

  const scrollContainer = carousel;
  let newScrollLeft = scrollContainer.scrollLeft;
  const numberItems = carousel.querySelectorAll(`.${blockName}__media-item`)?.length || 1;
  const scrollContainerScrollWidth = scrollContainer.scrollWidth;
  const itemWidth = scrollContainerScrollWidth / numberItems;
  const style = window.getComputedStyle(scrollContainer);
  const gap = parseFloat(style.gap) || 0;
  const paddingLeft = parseFloat(style.paddingLeft);
  const marginLeft = parseFloat(style.marginLeft);

  if (isMobile) {
    const isInteractiveVariant = carousel.closest(`.${blockName}`)?.classList.contains('interactive');
    const atStart = newScrollLeft <= paddingLeft + marginLeft + gap;
    const atEnd = scrollContainer.clientWidth + scrollContainer.scrollLeft >= scrollContainerScrollWidth;

    if (isInteractiveVariant) {
      // logic to loop the carousel (interactive only)
      if (direction === 'left') {
        if (atStart) {
          newScrollLeft = scrollContainerScrollWidth;
        } else {
          newScrollLeft = scrollContainer.scrollLeft - itemWidth * numberCardsToNavigatePerClick;
        }
      } else {
        if (atEnd) {
          newScrollLeft = 0;
        } else {
          newScrollLeft = scrollContainer.scrollLeft + itemWidth * numberCardsToNavigatePerClick;
        }
      }
    } else {
      // default variant on mobile: clamp + update arrows
      if (direction === 'left') {
        newScrollLeft = atStart ? scrollContainer.scrollLeft : scrollContainer.scrollLeft - itemWidth * numberCardsToNavigatePerClick;
      } else {
        newScrollLeft = atEnd ? scrollContainer.scrollLeft : scrollContainer.scrollLeft + itemWidth * numberCardsToNavigatePerClick;
      }

      if (scrollContainer.clientWidth + newScrollLeft >= scrollContainerScrollWidth) {
        carousel.nextElementSibling?.querySelector(`button.${blockName}__button-next`)?.setAttribute('disabled', 'true');
      } else {
        carousel.nextElementSibling?.querySelector(`button.${blockName}__button-next`)?.removeAttribute('disabled');
      }

      if (newScrollLeft <= paddingLeft + marginLeft + gap) {
        carousel.nextElementSibling?.querySelector(`button.${blockName}__button-prev`)?.setAttribute('disabled', 'true');
      } else {
        carousel.nextElementSibling?.querySelector(`button.${blockName}__button-prev`)?.removeAttribute('disabled');
      }
    }
  } else {
    if (direction === 'left') {
      newScrollLeft = scrollContainer.scrollLeft - itemWidth * numberCardsToNavigatePerClick;
    } else {
      newScrollLeft = scrollContainer.scrollLeft + itemWidth * numberCardsToNavigatePerClick;
    }

    if (scrollContainer.clientWidth + newScrollLeft >= scrollContainerScrollWidth) {
      // disable next button
      carousel.nextElementSibling?.querySelector(`button.${blockName}__button-next`)?.setAttribute('disabled', 'true');
    } else {
      carousel.nextElementSibling?.querySelector(`button.${blockName}__button-next`)?.removeAttribute('disabled');
    }

    if (newScrollLeft <= paddingLeft + marginLeft + gap) {
      // disable prev button
      carousel.nextElementSibling?.querySelector(`button.${blockName}__button-prev`)?.setAttribute('disabled', 'true');
    } else {
      carousel.nextElementSibling?.querySelector(`button.${blockName}__button-prev`)?.removeAttribute('disabled');
    }
  }

  scrollContainer.scrollLeft = newScrollLeft;
  if (isMobileViewport()) {
    updateMobileAutoplay(scrollContainer, `.${blockName}__media-item`, `${blockName}__media-item--video`);
  }
};

const createArrowControls = (carousel, isInteractive) => {
  const isMobile = isMobileViewport();
  const arrowControls = createElement('ul', { classes: [`${blockName}__arrowcontrols`] });
  const arrows = document.createRange().createContextualFragment(`
    <li>
      <button aria-label="Previous" class="${blockName}__button ${blockName}__button-prev">
        <span class="icon icon-arrow-left" aria-hidden="true" />
      </button>
    </li>
    <li>
      <button aria-label="Next" class="${blockName}__button ${blockName}__button-next">
        <span class="icon icon-arrow-right" aria-hidden="true" />
      </button>
    </li>
  `);
  arrowControls.append(...arrows.children);
  decorateIcons(arrowControls);
  carousel.insertAdjacentElement('afterend', arrowControls);

  const [prevButton, nextButton] = arrowControls.querySelectorAll(':scope button');
  prevButton.addEventListener('click', () => navigate(carousel, 'left'));
  nextButton.addEventListener('click', () => navigate(carousel, 'right'));

  if (!isMobile || (isMobile && !isInteractive)) {
    // disable prev button on load
    prevButton.setAttribute('disabled', 'true');
  }

  return arrowControls;
};

/**
 * Collect caption nodes from a figure (after its picture), excluding given nodes.
 *
 * @param {HTMLElement} figureEl
 * @param {HTMLPictureElement|null} pictureEl
 * @param {Node[]} [exclude=[]]
 * @returns {DocumentFragment}
 */
const collectCaption = (figureEl, pictureEl, exclude = []) => {
  const frag = document.createDocumentFragment();
  const omit = new Set(exclude.filter(Boolean));
  let node = pictureEl ? pictureEl.nextSibling : figureEl.firstChild;

  while (node) {
    const next = node.nextSibling;
    if (!omit.has(node) && !(node.nodeType === Node.TEXT_NODE && !node.nodeValue.trim())) {
      frag.appendChild(node);
    }
    node = next;
  }
  return frag;
};

/**
 * Mounts a video player into the carousel item and appends any remaining caption content.
 * Replaces the video link with the created player (or inserts player at the top of the figure).
 *
 * @param {HTMLElement} el - The <li> media item element.
 * @param {HTMLElement} figure - The <figure> wrapper inside the media item.
 * @param {HTMLPictureElement | null} picture - The poster <picture> (if available).
 * @param {HTMLElement} figCaption - The <figcaption> element to receive caption content.
 * @param {HTMLAnchorElement} videoLink - The anchor element pointing to the video URL.
 * @returns {void}
 */
const mountVideoItem = (el, figure, picture, figCaption, videoLink) => {
  el.classList.add(`${blockName}__media-item--video`);
  const captionFragment = collectCaption(figure, picture, [videoLink, picture]);
  const player = createVideo(videoLink, `${blockName}__video`, { controls: false, playsinline: true, muted: true, autoplay: false, loop: true });

  if (videoLink.parentElement) {
    videoLink.replaceWith(player);
  } else {
    figure.insertBefore(player, figure.firstChild);
  }

  if (captionFragment.hasChildNodes()) {
    figCaption.appendChild(captionFragment);
    figure.appendChild(figCaption);
  }
};

/**
 * Marks the media item as an image variant and appends the caption content (if any).
 *
 * @param {HTMLElement} el - The <li> media item element.
 * @param {HTMLElement} figure - The <figure> wrapper inside the media item.
 * @param {HTMLPictureElement | null} picture - The <picture> element to exclude from caption collection.
 * @param {HTMLElement} figCaption - The <figcaption> element to receive caption content.
 * @returns {void}
 */
const mountImageItem = (el, figure, picture, figCaption) => {
  el.classList.add(`${blockName}__media-item--image`);
  if (!picture) {
    return;
  }

  const captionFragment = collectCaption(figure, picture, [picture]);
  if (captionFragment.hasChildNodes()) {
    figCaption.appendChild(captionFragment);
    figure.appendChild(figCaption);
  }
};

export default async function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const isInteractive = block.classList.contains('interactive');
  desktopCardsPerClick = isInteractive ? 2 : 1;

  rows.forEach((row) => {
    row.classList.add(`${blockName}__row`);
  });

  const cols = [...block.querySelectorAll(':scope > div > div')];
  cols.forEach((col) => {
    col.classList.add(`${blockName}__col`);
    adjustPretitle(col);
  });

  const list = block.querySelector(':scope ul');
  const mediaCol = list.closest(`.${blockName}__col`);
  mediaCol?.classList.add(`${blockName}__media-col`);
  mediaCol?.previousElementSibling?.classList.add(`${blockName}__text-col`);
  list.classList.add(`${blockName}__media-list`);

  [...list.querySelectorAll(':scope > li')].forEach(async (el) => {
    const link = el.querySelector('a[href]');
    const videoLink = link && isVideoLink(link) ? link : null;

    el.classList.add(`${blockName}__media-item`);

    const figure = createElement('figure', { classes: `${blockName}__figure` });
    const figCaption = createElement('figcaption', { classes: `${blockName}__figure-text` });
    const fragment = document.createDocumentFragment();

    while (el.firstChild) {
      fragment.appendChild(el.firstChild);
    }

    figure.appendChild(fragment);
    el.appendChild(figure);

    const picture = figure.querySelector('picture');

    if (videoLink) {
      mountVideoItem(el, figure, picture, figCaption, videoLink);
    } else {
      mountImageItem(el, figure, picture, figCaption);
    }

    if (isInteractive) {
      const modalLink = figCaption.querySelector('a');
      modalLink && el.appendChild(modalLink);
    }
  });

  [...mediaCol.querySelectorAll('ul > li img')].forEach((img) => {
    img.classList.add(`${blockName}__image`);
  });

  block.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => el.classList.add(`${blockName}__heading`));

  block.querySelectorAll('p').forEach((el) => {
    el.classList.add(`${blockName}__text`);
  });

  const carousel = mediaCol.querySelector(`.${blockName}__media-list`);
  createArrowControls(carousel, isInteractive);
  const itemSel = `.${blockName}__media-item`;
  const videoModClass = `${blockName}__media-item--video`;
  setupResponsivePlayback(block, carousel, itemSel, videoModClass);
}
