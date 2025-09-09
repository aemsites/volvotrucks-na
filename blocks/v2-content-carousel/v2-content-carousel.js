import { createElement, decorateIcons, adjustPretitle, isMobileViewport } from '../../scripts/common.js';

const blockName = 'v2-content-carousel';

function numberCardsToNavigate() {
  const isMobile = isMobileViewport();

  if (isMobile) {
    return 1;
  }

  return 2;
}

const navigate = (carousel, direction) => {
  const isMobile = isMobileViewport();
  const numberCardsToNavigatePerClick = numberCardsToNavigate();

  const scrollContainer = carousel;
  let newScrollLeft = 0;
  const numberItems = carousel.querySelectorAll('.v2-content-carousel__images-list-item')?.length;
  const scrollContainerScrollWidth = scrollContainer.scrollWidth;
  const itemWidth = scrollContainerScrollWidth / numberItems;
  const style = window.getComputedStyle(scrollContainer);
  const gap = parseFloat(style.gap) || 0;
  const paddingLeft = parseFloat(style.paddingLeft);
  const marginLeft = parseFloat(style.marginLeft);

  if (isMobile) {
    // logic to loop the carousel

    if (direction === 'left') {
      if (scrollContainer.scrollLeft <= paddingLeft + marginLeft + gap) {
        newScrollLeft = scrollContainerScrollWidth;
      } else {
        newScrollLeft = scrollContainer.scrollLeft - itemWidth * numberCardsToNavigatePerClick;
      }
    } else {
      if (Math.round(scrollContainer.clientWidth + scrollContainer.scrollLeft) >= scrollContainerScrollWidth) {
        newScrollLeft = 0;
      } else {
        newScrollLeft = scrollContainer.scrollLeft + itemWidth * numberCardsToNavigatePerClick;
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
};

const createArrowControls = (carousel) => {
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

  if (!isMobile) {
    // disable prev button on load
    prevButton.setAttribute('disabled', 'true');
  }

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
}
