import { createElement, createResponsivePicture, unwrapDivs } from '../../scripts/common.js';

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
 * Initializes the carousel scroll functionality for a vertical-to-horizontal scrolling carousel.
 */
const initializeCarouselBehavior = () => {
  const carouselContainer = document.querySelector(`.${blockName}`);
  const cardsList = document.querySelector(`.${blockName}__cards-list`);
  const cards = Array.from(document.querySelectorAll(`.${blockName}__card`));
  const images = Array.from(document.querySelectorAll(`.${blockName}__image`));
  let startX = 0;
  let scrollLeft = 0;

  /**
   * Sets the height of the carousel container dynamically based on viewport and card count.
   */
  const setCarouselHeight = () => {
    const viewportHeight = window.innerHeight;
    const bufferHeight = viewportHeight;
    carouselContainer.style.height = `${viewportHeight * cards.length + bufferHeight}px`;
  };

  /**
   * Updates the active card and its corresponding image based on the provided index.
   * @param {number} activeIndex - The index of the active card.
   */
  const updateActiveCardAndImage = (activeIndex) => {
    cards.forEach((card, index) => {
      card.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
      card.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });

    images.forEach((image, index) => {
      image.setAttribute('aria-hidden', index === activeIndex ? 'false' : 'true');
      image.setAttribute('tabindex', index === activeIndex ? '0' : '-1');
    });
  };

  /**
   * Calculates the active card index based on the current scroll position.
   * @param {number} scrollStart - The current scroll position.
   * @param {number} cardHeight - The height of each card.
   * @returns {number} - The calculated active index.
   */
  const calculateActiveIndex = (scrollStart, cardHeight) =>
    Math.min(cards.length - 1, Math.max(0, Math.floor((scrollStart + cardHeight / 2) / cardHeight)));

  /**
   * Computes the horizontal scroll position based on the current vertical scroll.
   * @param {number} scrollStart - The current scroll position.
   * @param {number} totalHorizontalScroll - The total available horizontal scroll.
   * @param {number} containerHeight - The height of the carousel container.
   * @returns {number} - The computed horizontal scroll position.
   */
  const computeScrollLeft = (scrollStart, totalHorizontalScroll, containerHeight) =>
    (scrollStart / (containerHeight - window.innerHeight)) * totalHorizontalScroll;

  /**
   * Handles the scroll event to update the carousel's active card and scroll position.
   */
  const handleScroll = () => {
    const containerRect = carouselContainer.getBoundingClientRect();
    const scrollStart = window.scrollY - carouselContainer.offsetTop;

    if (containerRect.top < window.innerHeight && containerRect.bottom > 0) {
      const cardHeight = window.innerHeight;
      const activeIndex = calculateActiveIndex(scrollStart, cardHeight);
      const totalHorizontalScroll = cardsList.scrollWidth - cardsList.clientWidth;
      const targetScrollLeft = computeScrollLeft(scrollStart, totalHorizontalScroll, carouselContainer.offsetHeight);

      cardsList.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
      updateActiveCardAndImage(activeIndex);
    }
  };

  /**
   * Handles touchstart event for swipe gestures.
   * @param {TouchEvent} e - The touch event.
   */
  const handleTouchStart = (e) => {
    startX = e.touches[0].pageX;
    scrollLeft = cardsList.scrollLeft;
  };

  /**
   * Handles touchmove event for swipe gestures.
   * @param {TouchEvent} e - The touch event.
   */
  const handleTouchMove = (e) => {
    const deltaX = startX - e.touches[0].pageX;
    cardsList.scrollLeft = scrollLeft + deltaX;
  };

  /**
   * Initializes the carousel by setting up dynamic height, event listeners, and default states.
   */
  const initializeCarousel = () => {
    setCarouselHeight();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', setCarouselHeight);
    cardsList.addEventListener('touchstart', handleTouchStart);
    cardsList.addEventListener('touchmove', handleTouchMove);
    updateActiveCardAndImage(0);
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
  initializeCarouselBehavior();
}
