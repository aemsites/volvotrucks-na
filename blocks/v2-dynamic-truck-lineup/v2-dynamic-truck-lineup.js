import { buildBlock, decorateBlock } from '../../scripts/aem.js';
import { createElement, decorateIcons } from '../../scripts/common.js';
import { createCustomOptimizedPicture } from '../../scripts/scripts.js';

function getItemsFromBlock(block) {
  const items = [];
  block.querySelectorAll(':scope > div').forEach((item) => {
    const cells = Array.from(item.querySelectorAll(':scope > div'));
    const modelName = cells[0]?.textContent || '';
    const description = cells[1]?.textContent || '';
    const mobileImage = cells[2]?.querySelector('img') || '';
    const desktopImage = cells[3]?.querySelector('img') || '';
    const color = cells[4]?.textContent || '';

    items.push({ modelName, description, mobileImage, desktopImage, color });
  });
  return items;
}

const getTabContentTemplate = ({ modelName, description }) => `
  <div class="default-content-wrapper">
    <p>
      <strong>${modelName}</strong> ${description}
    </p>
  </div>
`;

export default function buildTruckLineupBlock(block) {
  // This data eventually will come from the RI API:
  // The block will instead provide a configuration for the model that needs to be loaded
  const config = getItemsFromBlock(block);

  const models = [];

  config.forEach(({ modelName, description, mobileImage, desktopImage, color }) => {
    const tabContent = createElement('div', { classes: 'v2-truck-lineup__content' });

    tabContent.dataset.truckCarousel = modelName;
    tabContent.dataset.truckColor = color;
    tabContent.innerHTML = getTabContentTemplate({ modelName, description });

    const imageBreakpoints = [
      {
        src: desktopImage?.src,
        width: desktopImage?.width,
        height: desktopImage?.height,
        media: '(min-width: 1200px)',
      },
      {
        src: mobileImage.src,
        width: mobileImage?.width,
        height: mobileImage?.height,
        media: '(min-width: 400px)',
      },
    ];

    tabContent.prepend(createCustomOptimizedPicture(mobileImage?.src, mobileImage?.alt, false, imageBreakpoints));

    models.push(tabContent);
  });

  if (models.length > 0) {
    const lineupWrapper = createElement('div', { classes: 'v2-truck-lineup-wrapper' });
    const truckLineupBlock = buildBlock('v2-truck-lineup', [models]);

    block.replaceWith(lineupWrapper.appendChild(truckLineupBlock));

    decorateIcons(truckLineupBlock);
    decorateBlock(truckLineupBlock);
  }
}
