const blockName = 'v2-quote-with-images';

/**
 * Unwrap a <picture> from its parent <p> if necessary.
 * @param {HTMLPictureElement} pictureEl
 * @returns {void}
 */
const unwrapPicture = (pictureEl) => {
  const parentEl = pictureEl?.parentElement;
  if (parentEl?.tagName !== 'P') {
    return;
  }
  parentEl.parentElement.insertBefore(pictureEl, parentEl);
  if (!parentEl.textContent.trim()) {
    parentEl.remove();
  }
};

/**
 * Unwrap all <picture> elements nested directly inside <p> within a container.
 * @param {HTMLElement} containerEl
 * @returns {void}
 */
const unwrapPicturesInParagraphs = (containerEl) => {
  for (const pictureEl of containerEl.querySelectorAll('p > picture')) {
    unwrapPicture(pictureEl);
  }
};

/**
 * Add image classes to top-level <picture> elements in a container.
 * @param {HTMLElement} containerEl
 * @param {"primary"|"secondary"} variant
 * @returns {void}
 */
const applyTopLevelImageClasses = (containerEl, variant) => {
  for (const pictureEl of containerEl.querySelectorAll(':scope > picture')) {
    pictureEl.classList.add(`${blockName}__image`, `${blockName}__image--${variant}`);
  }
};

/**
 * Convert the last two <p> elements in a column into a semantic blockquote.
 * @param {HTMLElement} columnEl
 * @returns {void}
 */
const convertToBlockquote = (columnEl) => {
  if (columnEl.querySelector(`:scope > .${blockName}__quote`)) {
    return;
  }

  const paragraphs = columnEl.querySelectorAll(':scope > p');
  const count = paragraphs.length;
  if (count < 2) {
    console.warn('[v2-quote-with-images] Missing quote and attribution. Expected at least two <p> elements in the quote column.');
    return;
  }

  const quoteText = paragraphs[count - 2].textContent.trim();
  const attributionText = paragraphs[count - 1].textContent.trim();
  if (!quoteText || !attributionText) {
    console.warn('[v2-quote-with-images] Quote or attribution text is empty. Check block authoring.');
    return;
  }

  const template = document.createElement('template');
  template.innerHTML = `
    <blockquote class="${blockName}__quote">
      <p class="${blockName}__text">${quoteText}</p>
      <p class="${blockName}__attribution">${attributionText}</p>
    </blockquote>`.trim();

  const blockquoteEl = template.content.firstElementChild;
  paragraphs[count - 2].replaceWith(blockquoteEl);
  paragraphs[count - 1].remove();
};

/**
 * Enhance a single column with classes, images, and (for content column) blockquote structure.
 * @param {HTMLElement} columnEl
 * @param {boolean} isMediaColumn
 * @returns {void}
 */
const enhanceColumn = (columnEl, isMediaColumn) => {
  columnEl.classList.add(`${blockName}__column`, isMediaColumn ? `${blockName}__column--media` : `${blockName}__column--quote`);
  unwrapPicturesInParagraphs(columnEl);
  applyTopLevelImageClasses(columnEl, isMediaColumn ? 'secondary' : 'primary');
  if (!isMediaColumn) {
    convertToBlockquote(columnEl);
  }
};

export default async function decorate(block) {
  const rowEl = block.querySelector(':scope > div');
  if (!rowEl) {
    return;
  }

  rowEl.classList.add(`${blockName}__row`);

  const [mediaColumnEl, quoteColumnEl] = rowEl.children;
  if (mediaColumnEl) {
    enhanceColumn(mediaColumnEl, true);
  }
  if (quoteColumnEl) {
    enhanceColumn(quoteColumnEl, false);
  }
}
