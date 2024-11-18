import { createElement } from '../../scripts/common.js';
import { smoothScrollHorizontal } from '../../scripts/motion-helper.js';

const blockName = 'v2-truck-lineup';

function stripEmptyTags(main, child) {
  if (child !== main && child.innerHTML.trim() === '') {
    const parent = child.parentNode;
    child.remove();
    stripEmptyTags(main, parent);
  }
}

const moveNavigationLine = (navigationLine, activeTab, tabNavigation) => {
  const { x: navigationX } = tabNavigation.getBoundingClientRect();
  const { x, width } = activeTab.getBoundingClientRect();
  Object.assign(navigationLine.style, {
    left: `${x + tabNavigation.scrollLeft - navigationX}px`,
    width: `${width}px`,
  });
};

function buildTabNavigation(tabItems, clickHandler) {
  const tabNavigation = createElement('ul', { classes: `${blockName}__navigation` });
  const navigationLine = createElement('li', { classes: `${blockName}__navigation-line` });
  let timeout;

  [...tabItems].forEach((tabItem, i) => {
    const listItem = createElement('li', { classes: `${blockName}__navigation-item` });
    const button = createElement('button');
    button.addEventListener('click', () => clickHandler(i));
    button.addEventListener('mouseover', (e) => {
      clearTimeout(timeout);
      moveNavigationLine(navigationLine, e.currentTarget, tabNavigation);
    });

    button.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        const activeItem = document.querySelector(`.${blockName}__navigation-item.active`);
        moveNavigationLine(navigationLine, activeItem, tabNavigation);
      }, 600);
    });

    const tabContent = tabItem.querySelector(':scope > div');
    button.innerHTML = tabContent.dataset.truckCarousel;
    listItem.append(button);
    tabNavigation.append(listItem);
  });

  tabNavigation.append(navigationLine);

  return tabNavigation;
}

const updateActiveItem = (index) => {
  const images = document.querySelector(`.${blockName}__images-container`);
  const descriptions = document.querySelector(`.${blockName}__description-container`);
  const navigation = document.querySelector(`.${blockName}__navigation`);
  const navigationLine = document.querySelector(`.${blockName}__navigation-line`);

  [images, descriptions, navigation].forEach((c) => c.querySelectorAll('.active').forEach((i) => {
    i.classList.remove('active');

    // Remove aria-hidden and tabindex from previously active items
    i.setAttribute('aria-hidden', 'true');
    i.querySelectorAll('a').forEach((link) => link.setAttribute('tabindex', '-1'));
  }));

  images.children[index].classList.add('active');
  descriptions.children[index].classList.add('active');
  navigation.children[index].classList.add('active');

  // Make links of current item are accessible by keyboard
  descriptions.children[index].setAttribute('aria-hidden', 'false');
  descriptions.children[index].querySelectorAll('a').forEach((link) => link.setAttribute('tabindex', '0'));

  const activeNavigationItem = navigation.children[index];
  moveNavigationLine(navigationLine, activeNavigationItem, navigation);

  // Center navigation item
  const navigationActiveItem = navigation.querySelector('.active');

  if (navigation && navigationActiveItem) {
    const { clientWidth: itemWidth, offsetLeft } = navigationActiveItem;
    // Calculate the scroll position to center the active item
    const scrollPosition = offsetLeft - (navigation.clientWidth - itemWidth) / 2;
    navigation.scrollTo({
      left: scrollPosition,
      behavior: 'smooth',
    });
  }

  // Update description position
  const descriptionWidth = descriptions.offsetWidth;

  setTimeout(() => {
    descriptions.scrollTo({
      left: descriptionWidth * index,
      behavior: 'smooth',
    });
  }, 50);
};

const listenScroll = (carousel) => {
  const imageLoadPromises = Array.from(carousel.querySelectorAll('picture > img'))
    .filter((img) => !img.complete)
    .map((img) => new Promise((resolve) => {
      img.addEventListener('load', resolve);
    }));

  Promise.all(imageLoadPromises).then(() => {
    const elements = carousel.querySelectorAll(':scope > *');

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
          const activeItem = entry.target;
          const currentIndex = Array.from(activeItem.parentNode.children).indexOf(activeItem);
          updateActiveItem(currentIndex);
        }
      });
    }, {
      root: carousel,
      threshold: 0.9,
    });

    elements.forEach((el) => io.observe(el));

    // Force to go to the first item on load
    carousel.scrollTo({
      left: 0,
      behavior: 'instant',
    });
  });
};

const setCarouselPosition = (carousel, index) => {
  const scrollOffset = carousel.firstElementChild.getBoundingClientRect().width;
  const targetX = index * scrollOffset;

  smoothScrollHorizontal(carousel, targetX, 1200);
};

const navigate = (carousel, direction) => {
  if (carousel.classList.contains('is-animating')) return;

  const activeItem = carousel.querySelector(`.${blockName}__image-item.active`);
  let index = [...activeItem.parentNode.children].indexOf(activeItem);
  if (direction === 'left') {
    index -= 1;
    if (index === -1) {
      index = carousel.childElementCount - 1;
    }
  } else {
    index += 1;
    if (index > carousel.childElementCount - 1) {
      index = 0;
    }
  }

  setCarouselPosition(carousel, index);
};

const createArrowControls = (carousel) => {
  const arrowControls = createElement('ul', { classes: [`${blockName}__arrow-controls`] });
  const arrows = document.createRange().createContextualFragment(`
    <li>
      <button aria-label="Previous">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.6276 3.03255C15.8458 3.20171 15.8856 3.51578 15.7165 3.73404L9.31099 11.9992L15.7165 20.2643C15.8856 20.4826 15.8458 20.7967 15.6276 20.9658C15.4093 21.135 15.0952 21.0952 14.9261 20.8769L8.2832 12.3055C8.14348 12.1252 8.14348 11.8732 8.2832 11.6929L14.9261 3.12147C15.0952 2.90321 15.4093 2.86339 15.6276 3.03255Z" fill="currentColor"/>
        </svg>
      </button>
    </li>
    <li>
      <button aria-label="Next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8.37245 20.9674C8.15418 20.7983 8.11437 20.4842 8.28353 20.266L14.689 12.0008L8.28353 3.73567C8.11437 3.5174 8.15418 3.20333 8.37245 3.03418C8.59072 2.86502 8.90479 2.90483 9.07394 3.1231L15.7168 11.6945C15.8565 11.8748 15.8565 12.1268 15.7168 12.3071L9.07394 20.8785C8.90479 21.0968 8.59072 21.1366 8.37245 20.9674Z" fill="currentColor"/>
        </svg>
      </button>
    </li>
  `);
  arrowControls.append(...arrows.children);
  carousel.insertAdjacentElement('beforebegin', arrowControls);
  const [prevButton, nextButton] = arrowControls.querySelectorAll(':scope button');
  prevButton.addEventListener('click', () => navigate(carousel, 'left'));
  nextButton.addEventListener('click', () => navigate(carousel, 'right'));
};

export default function decorate(block) {
  const descriptionContainer = block.querySelector(':scope > div');
  descriptionContainer.classList.add(`${blockName}__description-container`);

  const tabItems = block.querySelectorAll(':scope > div > div');

  tabItems.forEach((tabItem) => {
    const firstChildParagraph = tabItem.querySelector(':scope > p');
    if (firstChildParagraph) {
      tabItem.innerHTML = firstChildParagraph.innerHTML;
    }
  });

  const imagesWrapper = createElement('div', { classes: `${blockName}__slider-wrapper` });
  const imagesContainer = createElement('div', { classes: `${blockName}__images-container` });
  descriptionContainer.parentNode.prepend(imagesWrapper);
  imagesWrapper.appendChild(imagesContainer);

  const tabNavigation = buildTabNavigation(tabItems, (index) => {
    setCarouselPosition(imagesContainer, index);
  });

  // Arrows
  createArrowControls(imagesContainer);

  descriptionContainer.parentNode.prepend(tabNavigation);

  tabItems.forEach((tabItem) => {
    tabItem.classList.add(`${blockName}__desc-item`);
    const tabContent = tabItem.querySelector(':scope > div');
    const headings = tabContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
    [...headings].forEach((heading) => heading.classList.add(`${blockName}__title`));

    // Create div for image and append inside image div container
    const picture = tabItem.querySelector('picture');
    const imageItem = createElement('div', { classes: `${blockName}__image-item` });
    imageItem.appendChild(picture);
    imagesContainer.appendChild(imageItem);

    // Remove empty tags
    tabContent.querySelectorAll('p, div').forEach((item) => {
      stripEmptyTags(tabContent, item);
    });

    const descriptions = tabContent.querySelectorAll('p:not(.button-container)');
    [...descriptions].forEach((description) => description.classList.add(`${blockName}__description`));

    // Wrap text in container
    const textContainer = createElement('div', { classes: `${blockName}__text` });
    const text = tabContent.querySelector('.default-content-wrapper')?.querySelectorAll(':scope > *:not(.button-container)');
    if (text) {
      const parentTextContainer = text[0].parentNode;
      textContainer.append(...text);
      parentTextContainer.appendChild(textContainer);
    }

    // Wrap links in container
    const buttonContainer = createElement('div', { classes: `${blockName}__buttons-container` });
    const buttons = tabContent.querySelectorAll('.button-container');

    if (buttons.length) {
      const parentButtonContainer = buttons[0].parentNode;
      buttonContainer.append(...buttons);
      parentButtonContainer.appendChild(buttonContainer);
    }
  });

  // Update the button indicator on scroll
  listenScroll(imagesContainer);

  // Update text position + navigation line when page is resized
  window.addEventListener('resize', () => {
    const activeItem = imagesContainer.querySelector(`.${blockName}__image-item.active, .${blockName}__image-item:first-child`); // The .active or the first item

    if (activeItem) {
      const index = [...activeItem.parentNode.children].indexOf(activeItem);
      updateActiveItem(index);
    }
  });
}
