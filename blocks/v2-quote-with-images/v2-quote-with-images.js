const blockName = 'v2-quote-with-images';

/**
 * Unwrap a <picture> from its parent <p> if necessary.
 * @param {HTMLPictureElement} picture
 * @returns {void}
 */
const unwrapPicture = (picture) => {
  const parent = picture?.parentElement;
  if (!parent || parent.tagName !== 'P') {
    return;
  }
  parent.parentElement.insertBefore(picture, parent);
  if (!parent.textContent.trim()) {
    parent.remove();
  }
};

/**
 * Unwrap all <picture> elements nested directly inside <p> within a container.
 * @param {HTMLElement} container
 * @returns {void}
 */
const unwrapPicturesInParagraphs = (container) => {
  for (const picture of container.querySelectorAll('p > picture')) {
    unwrapPicture(picture);
  }
};

/**
 * Add image classes to top-level <picture> elements in a container.
 * @param {HTMLElement} container
 * @param {"primary"|"secondary"} variant
 * @returns {void}
 */
const applyImageClasses = (container, variant) => {
  for (const picture of container.querySelectorAll(':scope > picture')) {
    picture.classList.add(`${blockName}__image`, `${blockName}__image--${variant}`);
  }
};

/**
 * Convert the last two <p> elements in a column into a semantic blockquote.
 * Assumes: penultimate <p> = quote text, last <p> = attribution.
 * @param {HTMLElement} column
 * @returns {void}
 */
const convertToBlockquote = (column) => {
  const paragraphs = [...column.querySelectorAll(':scope > p')];
  if (paragraphs.length < 2) {
    console.warn('[v2-quote-with-images] Missing quote and attribution. Expected at least two <p> elements in the quote column.');
    return null;
  }

  const quoteText = paragraphs.at(-2)?.textContent?.trim() || '';
  const attributionText = paragraphs.at(-1)?.textContent?.trim() || '';

  if (!quoteText || !attributionText) {
    console.warn('[v2-quote-with-images] Quote or attribution text is empty. Check block authoring.');
  }

  const blockquoteHTML = `
    <blockquote class="${blockName}__quote">
      <p class="${blockName}__text">${quoteText}</p>
      <p class="${blockName}__attribution">${attributionText}</p>
    </blockquote>
  `;

  const template = document.createElement('template');
  template.innerHTML = blockquoteHTML.trim();
  const blockquote = template.content.firstElementChild;
  paragraphs.at(-2).replaceWith(blockquote);
  paragraphs.at(-1).remove();
  return blockquote;
};

/**
 * Enhance a single column with classes, images, and (for content column) blockquote structure.
 * @param {HTMLElement} column
 * @param {boolean} isMediaColumn
 * @returns {void}
 */
const enhanceColumn = (column, isMediaColumn) => {
  column.classList.add(`${blockName}__column`, isMediaColumn ? `${blockName}__column--media` : `${blockName}__column--quote`);

  unwrapPicturesInParagraphs(column);
  applyImageClasses(column, isMediaColumn ? 'secondary' : 'primary');

  if (!isMediaColumn) {
    convertToBlockquote(column);
  }
};

export default async function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) {
    return;
  }

  row.classList.add(`${blockName}__row`);

  const [mediaColumn, quoteColumn] = row.children;
  if (mediaColumn) {
    enhanceColumn(mediaColumn, true);
  }
  if (quoteColumn) {
    enhanceColumn(quoteColumn, false);
  }
}
