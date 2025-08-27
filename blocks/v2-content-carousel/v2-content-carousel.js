import { createElement, decorateIcons, adjustPretitle } from '../../scripts/common.js';
import { smoothScrollHorizontal } from '../../scripts/motion-helper.js';

const blockName = 'v2-content-carousel';

const updateActiveClass = (elements, targetElement, carousel) => {
  const isTablet = window.matchMedia('(min-width: 744px)');

  elements.forEach((el, index) => {
    if (el === targetElement) {
      el.classList.add('active');
      let arrowControl = carousel.nextElementSibling.querySelector(`.${blockName}__button:disabled`);

      if (arrowControl) {
        arrowControl.disabled = false;
        arrowControl = null;
      }
      // disable arrow buttons
      if (index === 0) {
        arrowControl = carousel.nextElementSibling.querySelector(`.${blockName}__button-prev`);
      } else if (index === el.parentNode.children.length - 1) {
        arrowControl = carousel.nextElementSibling.querySelector(`.${blockName}__button-next`);
      }
      if (arrowControl && isTablet.matches) {
        arrowControl.disabled = true;
      }
    } else {
      el.classList.remove('active');
    }
  });
};

const listenScroll = (carousel) => {
  const elements = carousel.querySelectorAll(`.${blockName}__images-list-item`);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveClass(elements, entry.target, carousel);
        }
      });
    },
    {
      root: carousel,
      threshold: 1,
    },
  );

  elements.forEach((el) => {
    io.observe(el);
  });
};

const getScrollOffset = (carousel) => {
  const first = carousel.firstElementChild;
  const second = first.nextElementSibling;
  return second.getBoundingClientRect().x - first.getBoundingClientRect().x;
};

const setCarouselPosition = (carousel, index) => {
  const elements = carousel.querySelectorAll(':scope > *');
  const scrollOffset = getScrollOffset(carousel);
  const targetX = index * scrollOffset;

  smoothScrollHorizontal(carousel, targetX, 500);
  updateActiveClass(elements, elements[index], carousel);
};

const navigate = (carousel, direction) => {
  if (carousel.classList.contains('is-animating')) {
    return;
  }

  const activeItem = carousel.querySelector(`.${blockName}__images-list-item.active`);
  let index = [...activeItem.parentNode.children].indexOf(activeItem);

  const isMobile = window.matchMedia('(max-width: 743px)');

  if (direction === 'left') {
    index -= 1;
    if (index === -1) {
      // Go to the last item if at the start
      index = carousel.childElementCount - 1;
    }
  } else {
    index += 1;
    if (index > carousel.childElementCount - 1 || (isMobile.matches && index === carousel.childElementCount)) {
      index = 0; // Go to the first item if at the end
    }
  }

  setCarouselPosition(carousel, index);
};

const createArrowControls = (carousel) => {
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

  return arrowControls;
};

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')];
  const isInteractive = block.classList.contains('interactive');

  rows.forEach((row) => {
    row.classList.add(`${blockName}__row`);
  });

  const cols = [...block.querySelectorAll(':scope > div > div')];
  cols.forEach((col) => {
    col.classList.add(`${blockName}__col`);
    adjustPretitle(col);
  });

  const pictureCol = block.querySelector('ul picture').closest(`.${blockName}__col`);
  pictureCol.classList.add(`${blockName}__images-list-col`);
  pictureCol.previousElementSibling?.classList.add(`${blockName}__text-col`);
  pictureCol.querySelector('ul').classList.add(`${blockName}__images-list`);
  [...pictureCol.querySelectorAll('ul > li')].forEach((el) => {
    el.classList.add(`${blockName}__images-list-item`);

    const figure = createElement('figure', { classes: `${blockName}__figure` });
    const figCaption = createElement('figcaption', { classes: `${blockName}__figure-text` });
    const fragment = document.createDocumentFragment();

    while (el.firstChild) {
      fragment.appendChild(el.firstChild);
    }

    figure.appendChild(fragment);
    el.appendChild(figure);

    const picture = figure.querySelector('picture');

    if (picture) {
      const captionFragment = document.createDocumentFragment();
      let nextNode = picture.nextSibling;

      while (nextNode) {
        const toMove = nextNode;
        nextNode = nextNode.nextSibling;
        captionFragment.appendChild(toMove);
      }

      if (captionFragment.hasChildNodes()) {
        figCaption.appendChild(captionFragment);
        figure.appendChild(figCaption);
      }
    }

    if (isInteractive) {
      const modalLink = figCaption.querySelector('a');
      modalLink && el.appendChild(modalLink);
      // modalLink.remove();

      // const plusButton = document.createRange().createContextualFragment(`
      // <span class="icon icon-plus">
      //   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      //     <path d="M12 3.9502C12.2761 3.9502 12.5 4.17405 12.5 4.4502V12.4502H20.5C20.7761 12.4502 21 12.6741 21 12.9502C21 13.2263 20.7761 13.4502 20.5 13.4502H12.5V21.4502C12.5 21.7263 12.2761 21.9502 12 21.9502C11.7239 21.9502 11.5 21.7263 11.5 21.4502V13.4502H3.5C3.22386 13.4502 3 13.2263 3 12.9502C3 12.6741 3.22386 12.4502 3.5 12.4502H11.5V4.4502C11.5 4.17405 11.7239 3.9502 12 3.9502Z" fill="#141414"/>
      //   </svg>
      // </span>`);
    }
  });

  [...pictureCol.querySelectorAll('ul > li img')].forEach((el) => {
    el.classList.add(`${blockName}__image`);
  });

  block.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => el.classList.add(`${blockName}__heading`));

  block.querySelectorAll('p').forEach((el) => {
    el.classList.add(`${blockName}__text`);
  });

  const carousel = pictureCol.querySelector(`.${blockName}__images-list`);
  createArrowControls(carousel);
  listenScroll(carousel);
}
