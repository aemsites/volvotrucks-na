import {
  createElement,
  createResponsivePicture,
  stringToElement,
} from '../../scripts/common.js';

const blockName = 'v2-applications-carousel';

/**
 * Creates a card element for carousel navigation.
 * @param {string} cardTitle - The title of the navigation card.
 * @param {number} cardIndex - The index of the card.
 * @param {boolean} isActive - Whether the card is selected.
 * @param {string} [cardIconMarkup] - Optional markup for the icon.
 * @returns {HTMLElement} - The navigation card element.
 */
const createCarouselCard = (cardTitle, cardIndex, isActive, cardIconMarkup) => {
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
  return stringToElement(cardHTML);
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

  carouselCardsData.forEach(({
    mobileImageUrl = '',
    desktopImageUrl = '',
    title = '',
    index,
    isActive = false,
  }) => {
    const imageConfig = createResponsiveImageConfig(mobileImageUrl, desktopImageUrl);
    const responsivePicture = createResponsivePicture(
      imageConfig,
      true,
      title,
      `${blockName}__image-display`,
    );

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
const extractCarouselCardData = (cardElements) => cardElements.map((card, index) => {
  if (!card) return null;

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
  const fragment = document.createDocumentFragment();

  carouselCardsData.forEach(({
    title,
    index,
    isActive,
    iconMarkup,
  }) => {
    const cardItem = createCarouselCard(title, index, isActive, iconMarkup);
    fragment.appendChild(cardItem);
  });

  cardList.appendChild(fragment);
  navigation.appendChild(cardList);
  return navigation;
};

/**
 * Decorates the block element by creating and appending the carousel elements.
 * @param {HTMLElement} block - The block element to decorate.
 */
export default async function decorate(block) {
  const cardElements = [...block.querySelectorAll(':scope > div')];
  const carouselCardsData = extractCarouselCardData(cardElements);
  const fragment = document.createDocumentFragment();
  const navigationContainer = createCarouselCardsContainer(carouselCardsData);
  const imageContainer = createImageCarousel(carouselCardsData);
  fragment.append(navigationContainer, imageContainer);
  block.appendChild(fragment);
  cardElements.forEach((card) => card.remove());
}
