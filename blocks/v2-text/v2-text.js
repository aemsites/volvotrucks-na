import { unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';

const variantClasses = ['double', 'heading-3-5', 'title-small'];

export default function decorate(block) {
  const blockName = 'v2-text';

  variantsClassesToBEM(block.classList, variantClasses, blockName);
  const textRows = block.querySelectorAll(':scope > div');

  textRows.forEach((row) => {
    row.classList.add(`${blockName}__row`);

    const headings = [...row.querySelectorAll('h1, h2, h3, h4, h5, h6')];
    headings.forEach((heading, index) => {
      if (index === 0) {
        heading.classList.add(`${blockName}__title`);
        return;
      }
      heading.classList.add(`${blockName}__sub-title`);
    });

    const info = [...row.querySelectorAll('p')];
    info.forEach((heading) => heading.classList.add(`${blockName}__info`));

    unwrapDivs(row);
  });
}
