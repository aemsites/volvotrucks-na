import { createElement } from './common.js';
import { smoothScrollHorizontal } from './motion-helper.js';

/**
 * Listens to scroll events and triggers a function when elements intersect with the viewport
 *
 * @param {HTMLElement} carousel - The carousel container element.
 * @param {HTMLElement[]} elements - The elements to observe for intersection.
 * @param {HTMLElement} navigation - The navigation element.
 * @param {Function} updateFn - Function to be called when an element intersects with the viewport
 * @param {number} [threshold=1] - The threshold at which to trigger the update function.
 */
export const listenScroll = (carousel, elements, navigation, updateFn, threshold = 1) => {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateFn(elements, entry, navigation);
        }
      });
    },
    {
      root: carousel,
      threshold,
    },
  );

  elements.forEach((el) => {
    io.observe(el);
  });
};

/**
 * Sets the position of the carousel to the specified index.
 *
 * @param {HTMLElement} carousel - The carousel element.
 * @param {number} index - The index to set the carousel position to.
 * @param {boolean} [smoothScroll=true] - Whether to use smooth scrolling or not. Default is true.
 * @param {number} [scrollDuration=960] - The duration of the scroll animation. Default is 960ms.
 */
export const setCarouselPosition = (carousel, index, smoothScroll = true, scrollDuration = 960) => {
  const carouselStyle = window.getComputedStyle(carousel);
  const gap = parseFloat(carouselStyle.columnGap || 0);
  const firstEl = carousel.firstElementChild;
  const elementWidth = firstEl.getBoundingClientRect().width;
  const totalWidth = elementWidth + gap;
  const targetX = index * totalWidth;

  if (smoothScroll) {
    smoothScrollHorizontal(carousel, targetX, scrollDuration);
  } else {
    const style = window.getComputedStyle(firstEl);
    const marginLeft = parseFloat(style.marginLeft);

    carousel.scrollTo({
      left: targetX + marginLeft,
      behavior: 'instant',
    });
  }
};

/**
 * Moves the navigation line to the active tab by manipulating CSS custom properties.
 *
 * @param {HTMLElement} activeTab - The active tab element.
 * @param {HTMLElement} tabNavigation - The tab navigation element.
 */
export const moveNavigationLine = (activeTab, tabNavigation) => {
  const { x: navigationX } = tabNavigation.getBoundingClientRect();
  const { x, width } = activeTab.getBoundingClientRect();
  tabNavigation.style.setProperty('--navigation-line-width', `${width}`);
  tabNavigation.style.setProperty('--navigation-line-left', `${x + tabNavigation.scrollLeft - navigationX}px`);
};

/**
 * Creates arrow controls for a carousel.
 *
 * @param {HTMLElement} carousel - The carousel element.
 * @param {string} scrollSelector - The selector for the scrollable items within the carousel.
 * @param {string[]} controlClasses - The classes to apply to the arrow controls.
 * @param {DocumentFragment} arrowFragment - The arrow controls as a document fragment.
 */
export const createArrowControls = (carousel, scrollSelector, controlClasses, arrowFragment) => {
  /**
   * Navigates the carousel in the specified direction.
   *
   * @param {string} direction - The direction to navigate ('left' or 'right').
   */
  function navigate(direction) {
    const activeItem = carousel.querySelector(scrollSelector);
    let index = [...activeItem.parentNode.children].indexOf(activeItem);
    if (direction === 'left') {
      index -= 1;
      if (index === -1) {
        // Go to the last item if at the start
        index = carousel.childElementCount;
      }
    } else {
      index += 1;
      if (index > carousel.childElementCount - 1) {
        index = 0; // Go to the first item if at the end
      }
    }

    setCarouselPosition(carousel, index);
  }

  const arrowControls = createElement('ul', { classes: controlClasses });
  arrowControls.append(...arrowFragment.children);
  carousel.insertAdjacentElement('beforebegin', arrowControls);
  const [prevButton, nextButton] = arrowControls.querySelectorAll(':scope button');
  prevButton.addEventListener('click', () => navigate('left'));
  nextButton.addEventListener('click', () => navigate('right'));
};
