import { createElement, adjustPretitle } from '../../scripts/common.js';

export default function decorate(block) {
  const blockName = 'v2-media-gallery';
  const rows = [...block.querySelectorAll(':scope > div')];
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
  pictureCol.querySelector('ul').classList.add(`${blockName}__images-list`);
  [...pictureCol.querySelectorAll('ul > li')].forEach((el) => {
    el.classList.add(`${blockName}__images-list-item`);

    const figure = createElement('figure', { classes: `${blockName}__figure` });
    figure.append(...el.childNodes);
    el.append(figure);

    const figCaption = createElement('figcaption');
    const lastItems = [...figure.childNodes].at(-1);
    if (lastItems.nodeType === Node.TEXT_NODE) {
      figCaption.append(lastItems);
      figure.append(figCaption);
    }
  });
  [...pictureCol.querySelectorAll('ul > li img')].forEach((el) => {
    el.classList.add(`${blockName}__image`);
  });

  block.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => el.classList.add(`${blockName}__heading`));
  block.querySelectorAll('.pretitle').forEach((el) => {
    el.classList.add(`${blockName}__pretitle`);
  });

  block.querySelectorAll('.button').forEach((el) => {
    el.closest('.button-container')?.replaceWith(el);
  });

  block.querySelectorAll('p').forEach((el) => {
    el.classList.add(`${blockName}__text`);
  });
}
