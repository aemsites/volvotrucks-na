import { createElement, createResponsivePicture, unwrapDivs, debounce } from '../../scripts/common.js';

const blockName = 'v2-applications-carousel';

/**
 * Creates a card element for carousel navigation and appends it to a parent.
 * @param {HTMLElement} parentElement - The parent element where the card will be appended.
 * @param {string} cardTitle - The title of the navigation card.
 * @param {number} cardIndex - The index of the card.
 * @param {boolean} isActive - Whether the card is selected.
 * @param {string} [cardIconMarkup] - Optional markup for the icon.
 */
const createCarouselCard = (parentElement, cardTitle, cardIndex, isActive, cardIconMarkup) => {
  const cardHTML = `
    <li class="${blockName}__card"
        role="tab"
        aria-selected="${isActive}"
        tabindex="${isActive ? '0' : '-1'}"
        aria-controls="${blockName}-image-${cardIndex}"
        data-${blockName}-image-index="${cardIndex}">
      ${cardIconMarkup || ''}
      <span class="${blockName}__card-title">${cardTitle}</span>
    </li>
  `;
  parentElement.insertAdjacentHTML('beforeend', cardHTML);
};

/**
 * Creates responsive image configuration for use in picture elements.
 * @param {string} mobileSrc - The mobile image source.
 * @param {string} desktopSrc - The desktop image source.
 * @returns {Array<Object>} - The responsive image configuration.
 */
const createResponsiveImageConfig = (mobileSrc, desktopSrc) => [
  {
    src: mobileSrc,
    breakpoints: [
      {
        media: '(max-width: 767px)',
        width: 750,
      },
    ],
  },
  {
    src: desktopSrc,
    breakpoints: [
      {
        media: '(min-width: 768px)',
        width: 750,
      },
      {
        media: '(min-width: 1200px)',
        width: 1200,
      },
      {
        media: '(min-width: 1440px)',
        width: 1440,
      },
      {
        media: '(min-width: 1920px)',
        width: 1920,
      },
    ],
  },
];

/**
 * Creates the image carousel container.
 * @param {Array<Object>} carouselCardsData - The processed card data.
 * @returns {HTMLElement} - The image carousel container element.
 */
const createImageCarousel = (carouselCardsData) => {
  const imagesContainer = createElement('div', {
    classes: `${blockName}__images`,
  });
  const fragment = document.createDocumentFragment();

  carouselCardsData.forEach(({ mobileImageUrl = '', desktopImageUrl = '', title = '', index, isActive = false }) => {
    const imageConfig = createResponsiveImageConfig(mobileImageUrl, desktopImageUrl);
    const responsivePicture = createResponsivePicture(imageConfig, true, title, `${blockName}__image-display`);

    const imageWrapper = createElement('div', {
      classes: `${blockName}__image`,
      props: {
        id: `${blockName}-image-${index}`,
        [`data-${blockName}-index`]: index,
        'aria-hidden': isActive ? 'false' : 'true',
        role: 'tabpanel',
        tabindex: isActive ? '0' : '-1',
      },
    });

    imageWrapper.appendChild(responsivePicture);
    fragment.appendChild(imageWrapper);
  });

  imagesContainer.appendChild(fragment);
  return imagesContainer;
};

/**
 * Extracts card data for the carousel.
 * @param {NodeListOf<HTMLElement> | HTMLElement[]} cardElements - The card elements.
 * @returns {Array<Object>} - The parsed card data.
 */
const extractCarouselCardData = (cardElements) =>
  cardElements.map((card, index) => {
    if (!card) {
      return null;
    }

    return {
      index,
      title: card.querySelector('div > p')?.textContent?.trim() || '',
      iconMarkup: card.querySelector('.icon')?.outerHTML || '',
      mobileImageUrl: card.querySelector('div > div > p:first-of-type picture img')?.src?.split('?')[0] || '',
      desktopImageUrl: card.querySelector('div > div > p:last-of-type picture img')?.src?.split('?')[0] || '',
      isActive: index === 0,
    };
  });

/**
 * Creates the navigation container for the carousel.
 * @param {Array<Object>} carouselCardsData - The processed card data.
 * @returns {HTMLElement} - The navigation container element.
 */
const createCarouselCardsContainer = (carouselCardsData) => {
  const navigation = createElement('nav', {
    classes: `${blockName}__cards`,
    props: {
      role: 'tablist',
      'aria-label': 'Applications Carousel Navigation',
    },
  });
  const cardList = createElement('ul', {
    classes: `${blockName}__cards-list`,
  });

  carouselCardsData.forEach(({ title, index, isActive, iconMarkup }) => {
    createCarouselCard(cardList, title, index, isActive, iconMarkup);
  });

  navigation.appendChild(cardList);
  return navigation;
};

/**
 * Updates the CSS variable for --inpage-nav-height if the navigation wrapper exists.
 */
const updateInpageNavHeight = () => {
  const inpageNavWrapper = document.querySelector('.v2-inpage-navigation-wrapper');
  const root = document.documentElement;

  if (inpageNavWrapper) {
    const inpageNavHeight = `${inpageNavWrapper.offsetHeight}px`;
    root.style.setProperty('--inpage-nav-height', inpageNavHeight);
  } else {
    root.style.setProperty('--inpage-nav-height', '0px');
  }
};

/**
 * Initializes the carousel scroll functionality for a vertical-to-horizontal scrolling carousel.
 */
const initializeCarouselScroll = () => {
  const carouselElement = document.querySelector(`.${blockName}`);
  const cardContainer = document.querySelector(`.${blockName}__cards-list`);
  const cardElements = Array.from(document.querySelectorAll(`.${blockName}__card`));
  const imageElements = Array.from(document.querySelectorAll(`.${blockName}__image`));

  if (!carouselElement || !cardContainer || cardElements.length === 0 || imageElements.length === 0) {
    console.warn('Carousel elements are missing or not initialized correctly.');
    return;
  }

  let maxHorizontalScroll;
  let touchStartX = 0;
  let initialScrollLeft = 0;

  /**
   * Dynamically sets the height of the carousel container based on viewport and card count.
   */
  const adjustCarouselHeight = () => {
    const viewportHeight = window.innerHeight;
    carouselElement.style.height = `${viewportHeight * cardElements.length + viewportHeight}px`;
    maxHorizontalScroll = cardContainer.scrollWidth - cardContainer.clientWidth;
  };

  /**
   * Updates the active card and its corresponding image based on the provided index.
   * @param {number} activeIndex - The index of the active card.
   */
  const setActiveCardAndImage = (activeIndex) => {
    cardElements.forEach((card, index) => {
      card.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
      card.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });
    imageElements.forEach((image, index) => {
      image.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
      image.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });
  };

  /**
   * Calculates the active card index based on the current scroll position.
   * @param {number} scrollPosition - The current scroll position.
   * @param {number} cardHeight - The height of each card.
   * @returns {number} - The calculated active index.
   */
  const getActiveCardIndex = (scrollPosition, cardHeight) => {
    const adjustedScroll = Math.max(0, scrollPosition - cardHeight / 2);
    return Math.min(cardElements.length - 1, Math.floor(adjustedScroll / cardHeight));
  };

  /**
   * Handles the scroll event to update the carousel's active card and scroll position.
   */
  const onScrollUpdate = () => {
    const currentScrollY = window.scrollY;
    const containerRect = carouselElement.getBoundingClientRect();
    const scrollPosition = currentScrollY - carouselElement.offsetTop;

    if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
      const cardHeight = window.innerHeight;
      const activeIndex = getActiveCardIndex(scrollPosition, cardHeight);
      const activeCard = cardElements[activeIndex];
      const cardOffset = activeCard.offsetLeft;
      const containerScrollWidth = cardContainer.scrollWidth - cardContainer.clientWidth;
      const targetScrollLeft = Math.max(0, Math.min(cardOffset, containerScrollWidth));
      cardContainer.scrollLeft = targetScrollLeft;
      setActiveCardAndImage(activeIndex);
    }
  };

  /**
   * Handles touchstart event for swipe gestures.
   * @param {TouchEvent} e - The touch event.
   */
  const onTouchStart = (e) => {
    touchStartX = e.touches[0].pageX;
    initialScrollLeft = cardContainer.scrollLeft;
  };

  /**
   * Handles touchmove event for swipe gestures.
   * @param {TouchEvent} e - The touch event.
   */
  const onTouchMove = (e) => {
    const deltaX = touchStartX - e.touches[0].pageX;
    cardContainer.scrollLeft = initialScrollLeft + deltaX;
  };

  /**
   * Initializes the carousel by setting up dynamic height, event listeners, and default states.
   */
  const initializeCarousel = () => {
    adjustCarouselHeight();
    window.addEventListener('scroll', onScrollUpdate, { passive: true });
    window.addEventListener('resize', adjustCarouselHeight);
    cardContainer.addEventListener('touchstart', onTouchStart);
    cardContainer.addEventListener('touchmove', onTouchMove, { passive: true });
    setActiveCardAndImage(0);
  };

  initializeCarousel();
};

/**
 * Decorates the block element by creating and appending the carousel elements.
 * @param {HTMLElement} block - The block element to decorate.
 */
export default async function decorate(block) {
  const allElements = [...block.querySelectorAll(':scope > div')];
  if (!allElements.length) {
    return;
  }
  const header = allElements[0];
  header.classList.add(`${blockName}__header`);
  const cardElements = allElements.slice(1);
  const carouselCardsData = extractCarouselCardData(cardElements);
  const fragment = document.createDocumentFragment();
  const stickyContent = createElement('div', { classes: `${blockName}__sticky-content` });
  const navigationContainer = createCarouselCardsContainer(carouselCardsData);
  const imageContainer = createImageCarousel(carouselCardsData);
  stickyContent.append(navigationContainer, imageContainer);
  fragment.appendChild(stickyContent);
  block.appendChild(fragment);
  cardElements.forEach((card) => card.remove());
  unwrapDivs(block);
  updateInpageNavHeight();
  initializeCarouselScroll();
  window.addEventListener(
    'resize',
    debounce(() => {
      updateInpageNavHeight();
    }, 150),
  );
}
