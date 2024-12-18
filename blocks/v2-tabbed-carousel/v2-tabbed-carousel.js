import { createElement, removeEmptyTags, unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';
import { listenScroll, moveNavigationLine, setCarouselPosition } from '../../scripts/carousel-helper.js';

const blockName = 'v2-tabbed-carousel';
const variantClasses = ['fade-in', 'columns', 'media-right'];

const updateActiveItem = (elements, entry, navigation) => {
  elements.forEach((el, index) => {
    if (el === entry.target && entry.intersectionRatio >= 0.75) {
      const carouselItems = el.parentElement;

      [carouselItems, navigation].forEach((c) => c.querySelectorAll('.active').forEach((i) => i.classList.remove('active')));
      carouselItems.children[index].classList.add('active');
      navigation.children[index].classList.add('active');

      const activeNavigationItem = navigation.children[index];
      moveNavigationLine(activeNavigationItem, navigation);

      if (navigation && activeNavigationItem) {
        activeNavigationItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  });
};

export default function decorate(block) {
  const smoothScroll = !block.classList.contains('fade-in');
  const columns = block.classList.contains('columns');
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  const carouselItems = createElement('ul', { classes: `${blockName}__items` });
  const tabNavigation = createElement('ul', { classes: `${blockName}__navigation` });
  let timeout;

  function buildTabNavigation(buttonContent, index) {
    const listItem = createElement('li', { classes: `${blockName}__navigation-item` });
    const button = createElement('button');
    const moveCarousel = () => {
      if (carouselItems.classList.contains('is-animating')) {
        return;
      }
      setCarouselPosition(carouselItems, index, smoothScroll);
    };
    button.addEventListener('click', moveCarousel);
    button.addEventListener('mouseover', (e) => {
      clearTimeout(timeout);
      moveNavigationLine(e.currentTarget, tabNavigation);
    });

    button.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        const activeItem = block.querySelector(`.${blockName}__navigation-item.active`);
        moveNavigationLine(activeItem, tabNavigation);
      }, 600);
    });

    button.innerHTML = buttonContent;
    listItem.append(button);

    return listItem;
  }

  const tabItems = block.querySelectorAll(':scope > div');
  tabItems.forEach((tabItem, index) => {
    const picture = tabItem.querySelector('picture');
    if (picture) {
      const liItem = createElement('li', { classes: `${blockName}__item` });
      const figure = createElement('figure', { classes: `${blockName}__figure` });
      const tabContent = tabItem.querySelector('p');

      figure.append(tabContent.querySelector('picture'));

      const lastItems = [...tabContent.childNodes].at(-1);
      if (columns) {
        const slideContent = createElement('div', { classes: `${blockName}__content` });
        slideContent.innerHTML = tabItem.innerHTML;
        liItem.append(slideContent);
      } else if (lastItems.nodeType === Node.TEXT_NODE && lastItems.textContent.trim() !== '') {
        const figureCaption = createElement('figcaption');
        figureCaption.append(lastItems);
        figure.append(figureCaption);
      }

      liItem.prepend(figure);
      carouselItems.appendChild(liItem);

      // navigation item
      const alternativeTabTitle = liItem.querySelector('h1');
      let tabTitle;
      if (alternativeTabTitle) {
        tabTitle = alternativeTabTitle;
        alternativeTabTitle.remove();
      } else {
        tabTitle = tabItem.querySelector('h3') || tabItem.querySelector('h2') || tabItem.querySelector('h1');
      }
      const navItem = buildTabNavigation(tabTitle.innerHTML, index);
      tabNavigation.append(navItem);
      tabTitle.remove();
      tabItem.innerHTML = '';
    }
  });

  block.append(tabNavigation, carouselItems);

  // update the button indicator on scroll
  const elements = carouselItems.querySelectorAll(':scope > *');
  listenScroll(carouselItems, elements, tabNavigation, updateActiveItem, 0.75);

  // Update slide position + navigation line when page is resized
  window.addEventListener('resize', () => {
    const activeItem = carouselItems.querySelector('.active');
    const index = [...activeItem.parentNode.children].indexOf(activeItem);

    setCarouselPosition(carouselItems, index, smoothScroll);
    moveNavigationLine(tabNavigation.children[index], tabNavigation);
  });

  unwrapDivs(block);
  removeEmptyTags(carouselItems);
}
