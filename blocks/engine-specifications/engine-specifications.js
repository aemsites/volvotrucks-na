import { getTextLabel } from '../../scripts/common.js';
import getPerformanceChart from './performance-chart.js';
import { getCustomDropdown } from '../../common/custom-dropdown/custom-dropdown.js';

/**
 * Gets the data from the excel/json chart that should be on the same level as the block.
 *
 * @returns {Promise<Array>} - A promise that resolves to the engine chart data.
 */
const getEngineChartData = async () => {
  const response = await fetch('./performance.json');
  const json = await response.json();
  return json.data;
};

/**
 * Builds the engine specifications block.
 *
 * @param {HTMLElement} block - The container element where the engine specifications will be appended.
 */
const buildEngineSpecifications = (block) => {
  const children = [...block.children];
  const titleDiv = children.shift();

  const title = titleDiv.querySelector('h2');
  title.classList.add('engine-title');

  const ul = document.createElement('ul');
  ul.classList.add('item-list');

  children.forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('item-wrapper');

    const sectionTitle = row.querySelector('h6');
    sectionTitle.classList.add('item-title');
    const content = row.querySelector('h5');
    content.classList.add('item-content');

    li.append(sectionTitle);
    li.append(content);
    ul.append(li);
  });

  block.textContent = '';

  block.append(title);
  block.append(ul);
};

/**
 * Determines whether to show the chart selection with tabs or a dropdown list.
 * By default, it will show the chart selection with tabs. However, if there are
 * multiple engines with the same horsepower but different torque, it will display
 * the selection with a dropdown list of the engines with a given horsepower.
 * By selecting a given horsepower, it will display the list of engines with that
 * horsepower and torque options.
 *
 * @param {Map<number, Set<number>>} horsepowerMap - A map where the keys are horsepower values and the values are sets of torque values.
 * @returns {boolean} - Returns true if tabs should be shown, false if a dropdown should be shown.
 */
const shouldShowTabs = (horsepowerMap) => {
  for (const torques of horsepowerMap.values()) {
    if (torques.size > 1) {
      return false;
    }
  }
  return true;
};

/**
 * Creates a map of horsepower to sets of torque values.
 *
 * @param {Array<{ horsepower: number, torque: number }>} peaksData - The list of objects representing engine specifications with horsepower and torque.
 * @returns {Map<number, Set<number>>} - A map where the keys are horsepower values and the values are sets of torque values.
 */
const getHorserpowerMap = (peaksData) => {
  const horsepowerMap = new Map();

  peaksData.forEach(({ horsepower, torque, rating }) => {
    if (!horsepowerMap.has(horsepower)) {
      horsepowerMap.set(horsepower, new Set());
    }
    horsepowerMap.get(horsepower).add({
      torque,
      horsepower,
      rating,
    });
  });

  return horsepowerMap;
};

/**
 * Extracts the peaks data from the engine data.
 *
 * @param {Array<{ peaks: string }>} engineData - The list of engine data objects.
 * @returns {Array<{ horsepower: number, torque: number }>} - The list of objects representing engine specifications with horsepower and torque.
 */
const getPeaksData = (engineData) =>
  engineData.reduce((acc, engine) => {
    const [horsepower, torque] = engine.peaks.replace(/\[|\]/g, '').split(',').map(Number);
    const rating = engine.rating;
    acc.push({ horsepower, torque, rating });
    return acc;
  }, []);

/**
 * Build the tabs for engine ratings.
 *
 * @param {HTMLElement} hpSelector - The container element where the tabs will be appended.
 * @param {Array<number>} powerRating - The list of power ratings to create tabs for.
 */
const setupTabs = (container, itemsToList, displayHp = true) => {
  const hpLabel = getTextLabel('HP');
  const torqueLabel = getTextLabel('lb/ft');
  let engineRatingContainer = container.querySelector('.engine-rating');
  let hpList = container.querySelector('.rating-list');

  if (!engineRatingContainer) {
    engineRatingContainer = document.createElement('div');
    engineRatingContainer.classList.add('engine-rating');

    hpList = document.createElement('ul');
    hpList.classList.add('rating-list');
  } else {
    hpList.innerHTML = '';
  }

  itemsToList.forEach(({ torque, horsepower, rating }) => {
    const itemEl = document.createElement('li');
    itemEl.classList.add('rating-item');

    itemEl.innerHTML = `
      <h5 class="title-${rating}">
        <button data-rating="${rating}">${displayHp ? `${horsepower} ${hpLabel}` : `${torque} ${torqueLabel}`}</button>
      </h5>`;

    hpList.appendChild(itemEl);
  });
  engineRatingContainer.innerHTML = '';
  engineRatingContainer.append(hpList);

  container.append(engineRatingContainer);
};

/**
 * Builds the headers for the engine ratings.
 *
 * @param {HTMLElement} hpSelector - The container element where the headers will be appended.
 */
const buildHeaders = (hpSelector) => {
  const ratingTitle = document.createElement('h6');
  ratingTitle.classList.add('rating-title');
  ratingTitle.innerText = getTextLabel('Engine Ratings');

  hpSelector.append(ratingTitle);
};

/**
 * Builds the dropdown options for engine ratings.
 *
 * @param {HTMLElement} dropdownContainer - The container element where the dropdown will be appended.
 * @param {Map<number, Set<number>>} horsepowerMap - A map where the keys are horsepower values and the values are sets of torque values.
 * @param {HTMLElement} chartOptionsContainer - The container element where the chart options will be appended.
 * @param {HTMLElement} hpSelector - The container element that holds the HP buttons.
 * @param {HTMLElement} chartListContainer - The container element that holds the charts.
 */
const buildDrodownOptions = async (dropdownContainer, horsepowerMap, chartOptionsContainer, hpSelector, chartListContainer) => {
  const hpLabel = getTextLabel('HP');
  const horsepowerOptions = Array.from(horsepowerMap.keys()).map((hp) => ({ value: hp, label: `${hp} ${hpLabel}` }));

  const dropdownConfig = {
    optionList: horsepowerOptions,
    variants: ['adjust-width-to-content'],
    onChangeCallback: (selected) => {
      const chartParent = chartListContainer.closest('.performance-chart-list');
      const allCharts = chartParent.querySelectorAll('.performance-chart');
      allCharts.forEach((item) => {
        delete item.dataset.active;
      });

      const selectedHp = horsepowerMap.get(selected.value);
      const firstItemOfSelectedHp = horsepowerMap.get(selected.value).values().next().value;

      setupTabs(chartOptionsContainer, selectedHp, false);
      setChartUpponSelection(firstItemOfSelectedHp.rating, chartParent, hpSelector, allCharts);
    },
  };

  const customDropdown = await getCustomDropdown(dropdownConfig);

  dropdownContainer.append(customDropdown);
};

const setChartUpponSelection = (selectedNumber, chartParent, hpSelector, allCharts) => {
  const clickedChart = chartParent.querySelector(`.chart-${selectedNumber}`);
  const firstBbutton = hpSelector.querySelector(`.title-${selectedNumber}`).closest('.rating-item');

  if (clickedChart) {
    allCharts.forEach((item) => {
      delete item.dataset.active;
    });

    clickedChart.dataset.active = true;
    firstBbutton.dataset.active = true;
  }
};

/**
 * Sets up event listeners for the HP buttons and charts to handle interactions.
 * This function adds click event listeners to the buttons, which update the active
 * state of the buttons and the corresponding charts.
 *
 * @param {HTMLElement} hpSelector - The container element that holds the HP buttons.
 * @param {HTMLElement} chartContainer - The container element that holds the charts.
 */
const setupTabButtonsInteractions = (hpSelector, chartContainer) => {
  const ratingList = hpSelector.querySelectorAll('.rating-list');
  let allButtons = hpSelector.querySelectorAll('.rating-list .rating-item');

  if (allButtons.length === 0) {
    return;
  }

  allButtons[0].dataset.active = true;

  const initialChart = chartContainer.children[0];
  initialChart.dataset.active = true;
  const chartParent = initialChart.closest('.performance-chart-list');

  ratingList.forEach((button) => {
    button.addEventListener('click', (e) => {
      const buttonParent = button.closest('ul');
      const selectedNumber = e.target.dataset.rating;

      const clickedButton = buttonParent.querySelector(`.title-${selectedNumber}`).closest('.rating-item');
      const activeButton = buttonParent.querySelector('[data-active]');
      allButtons = buttonParent.querySelectorAll('.rating-item');

      const clickedChart = chartParent.querySelector(`.chart-${selectedNumber}`);
      const allCharts = chartParent.querySelectorAll('.performance-chart');

      if (clickedChart && activeButton && activeButton.dataset.rating !== selectedNumber) {
        [...allButtons, ...allCharts].forEach((item) => {
          delete item.dataset.active;
        });

        clickedChart.dataset.active = true;
        clickedButton.dataset.active = true;
      }
    });
  });
};

// Builds the performance specifications block.
const buildPerformanceSpecifications = (block, engineData) => {
  const peaksData = getPeaksData(engineData);
  const horsepowerMap = getHorserpowerMap(peaksData);
  const showTabs = shouldShowTabs(horsepowerMap);
  const children = [...block.children];
  const titleDiv = children.shift();

  const title = titleDiv.querySelector('h2');
  title.classList.add('performance-title');

  const hpSelector = document.createElement('div');
  hpSelector.classList.add('performance-selector-wrapper');

  const chartContainer = document.createElement('div');
  chartContainer.classList.add('performance-chart-wrapper');

  const chartListContainer = document.createElement('ul');
  chartListContainer.classList.add('performance-chart-list');

  const ratings = [];

  engineData.forEach((engine) => {
    const rating = engine.rating;
    ratings.push({ rating });

    const chart = document.createElement('li');
    chart.classList.add('performance-chart');
    chart.classList.add(`chart-${rating}`);
    chart.innerHTML = getPerformanceChart(engine);

    chartListContainer.append(chart);
  });

  buildHeaders(hpSelector);

  if (showTabs) {
    const concatenatedTorques = Array.from(horsepowerMap.values()).flatMap((set) => Array.from(set));
    setupTabs(hpSelector, concatenatedTorques, true);
    setupTabButtonsInteractions(hpSelector, chartListContainer);

    const initialButton = hpSelector.querySelector('.rating-item');
    initialButton.dataset.active = true;
  } else {
    const firstHorsepowerSet = horsepowerMap.values().next().value;
    const chartOptionsContainer = document.createElement('div');
    chartOptionsContainer.classList.add('engine-specifications__chart-options-container');

    const dropdownContainer = document.createElement('div');
    dropdownContainer.classList.add('engine-specifications__dropdown-container');
    chartOptionsContainer.append(dropdownContainer);

    setupTabs(chartOptionsContainer, firstHorsepowerSet, false);
    buildDrodownOptions(dropdownContainer, horsepowerMap, chartOptionsContainer, hpSelector, chartListContainer);

    hpSelector.append(chartOptionsContainer);
    setupTabButtonsInteractions(hpSelector, chartListContainer);
  }

  block.textContent = '';

  chartContainer.append(chartListContainer);
  block.append(title);
  block.append(hpSelector);
  block.append(chartContainer);
};

export default async function decorate(block) {
  const blockClassList = [...block.classList];

  // This detects what block needs to be render and calls the corresponding function.
  if (blockClassList.includes('engine')) {
    buildEngineSpecifications(block);
  } else if (blockClassList.includes('performance')) {
    const engineData = await getEngineChartData();
    buildPerformanceSpecifications(block, engineData);
  }
}
