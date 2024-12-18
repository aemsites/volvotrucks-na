import { createElement, removeEmptyTags, variantsClassesToBEM, unwrapDivs } from '../../scripts/common.js';

const blockName = 'v2-quote';
const variantClasses = ['with-background'];

export default function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  const quote = block.querySelector(':scope > div:nth-child(1) > div');
  const bq = createElement('blockquote', { classes: [`${blockName}__quote-text`] });
  bq.innerHTML = quote.innerHTML;
  quote.parentNode.replaceChild(bq, quote);

  const source = block.querySelector(':scope > div:nth-child(2) > div > p');
  if (source) {
    source.classList.add(`${blockName}__quote-source`);
  }

  unwrapDivs(block, { ignoreDataAlign: true });
  removeEmptyTags(block);
}
