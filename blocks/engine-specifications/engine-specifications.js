import getPerformanceChart from './performance-chart.js';

// Gets the HP buttons and charts and adds listeners in order to make the carousel work.
const addAnimations = (hpSelector, chartContainer) => {
  const initialButton = hpSelector.querySelector('.rating-item');
  initialButton.dataset.active = true;

  const allButtons = hpSelector.querySelectorAll('.rating-list');

  const initialChart = chartContainer.children[0];
  initialChart.dataset.active = true;
  const chartParent = initialChart.closest('.performance-chart-list');

  allButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const buttonParent = button.closest('ul');
      const selectedNumber = e.target.innerText.split(' ')[0];

      const clickedButton = buttonParent.querySelector(`.title-${selectedNumber}`).closest('.rating-item');
      const activeButton = buttonParent.querySelector('[data-active]');

      const clickedChart = chartParent.querySelector(`.chart-${selectedNumber}`);
      const activeChart = chartParent.querySelector('[data-active]');

      if (activeButton.innerText.split(' ')[0] !== selectedNumber) {
        clickedChart.dataset.active = true;
        delete activeChart.dataset.active;

        clickedButton.dataset.active = true;
        delete activeButton.dataset.active;
      }
    });
  });
};
// Gets the data from the excel chart that should be on the same level as the block.
const getEngineChartData = async () => {
  const response = await fetch('./performance.json');
  const json = await response.json();
  return json.data;
};
// Builds the engine specifications block.
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
// Builds the performance specifications block.
const buildPerformanceSpecifications = (block, engineData) => {
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
    const engineNum = engine.rating;
    ratings.push(engineNum);

    const chart = document.createElement('li');
    chart.classList.add('performance-chart');
    chart.classList.add(`chart-${engineNum}`);
    chart.innerHTML = getPerformanceChart(engine);

    chartListContainer.append(chart);
  });

  const buildSelectors = (powerRating) => {
    const ratingSelector = document.createElement('div');
    ratingSelector.classList.add('engine-rating');

    const ratingTitle = document.createElement('h6');
    ratingTitle.classList.add('rating-title');
    ratingTitle.innerText = 'Engine Ratings';

    const hpList = document.createElement('ul');
    hpList.classList.add('rating-list');

    powerRating.forEach((rating) => {
      const item = document.createElement('li');
      item.classList.add('rating-item');

      item.innerHTML = `
        <h5 class="title-${rating}">
          <a>${rating} HP</a>
        </h5>`;

      hpList.appendChild(item);
    });

    ratingSelector.append(ratingTitle);
    ratingSelector.append(hpList);
    hpSelector.append(ratingSelector);
  };

  buildSelectors(ratings);
  addAnimations(hpSelector, chartListContainer);

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
