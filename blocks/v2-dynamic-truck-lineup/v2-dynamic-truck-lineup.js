import { buildBlock, decorateBlock, readBlockConfig, loadBlock, updateSectionsStatus } from '../../scripts/aem.js';
import { createElement, decorateIcons } from '../../scripts/common.js';
import { createCustomOptimizedPicture } from '../../scripts/scripts.js';
import { getTruckLineupData } from './ri-trucks.service.js';

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

const isApiConfigured = (config) => {
  // TODO: All of these api configs need to be moved to the constants file
  return config.category && config.apioneapplicationurl && config.apioneproducturl && config.apioneproductkey && config.apioneproductkey;
};

export default async function buildTruckLineupBlock(block) {
  const models = [];
  let truckLineupData = getItemsFromBlock(block);

  /// Lets get the config of the block:
  // If the block has the required configurations to load the data from the API
  // Lets load the data from the API, oherwise we revert to the blockContent
  const config = readBlockConfig(block);

  if (isApiConfigured(config)) {
    truckLineupData = await getTruckLineupData(config);
  }

  truckLineupData.forEach(({ modelName, description, mobileImage, desktopImage, color }) => {
    const tabContent = createElement('div', { classes: 'v2-truck-lineup__content' });

    tabContent.dataset.truckCarousel = modelName;
    tabContent.dataset.truckColor = color;
    tabContent.innerHTML = getTabContentTemplate({ modelName, description });

    const imageBreakpoints = [
      {
        src: desktopImage?.src || desktopImage,
        width: desktopImage?.width,
        height: desktopImage?.height,
        media: '(min-width: 1200px)',
      },
      {
        src: mobileImage.src || mobileImage,
        width: mobileImage?.width,
        height: mobileImage?.height,
        media: '(min-width: 400px)',
      },
    ];

    tabContent.prepend(createCustomOptimizedPicture(mobileImage?.src || mobileImage, mobileImage?.alt || modelName, true, imageBreakpoints));

    models.push(tabContent);
  });

  if (models.length > 0) {
    const lineupWrapper = createElement('div', { classes: 'v2-truck-lineup-wrapper' });
    const truckLineupBlock = buildBlock('v2-truck-lineup', [models]);

    block.replaceWith(lineupWrapper.appendChild(truckLineupBlock));

    decorateIcons(truckLineupBlock);
    decorateBlock(truckLineupBlock);

    await loadBlock(truckLineupBlock);

    updateSectionsStatus(document.querySelector('main'));
  }
}
