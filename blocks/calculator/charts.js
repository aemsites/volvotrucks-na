import buildChartMPG from './charts/buildChartMPG.js';
import buildChartYearSavings from './charts/buildChartYearSavings.js';
import buildChartFuelUsage from './charts/buildChartFuelUsage.js';
import buildChartCumulativeSavings from './charts/buildChartCumulativeSavings.js';

const charts = (data) => {
  // data is what the chart is using to build the SVGs.
  // this gives the data a usable format
  const categories = Object.values(data);

  const chartsSection = document.createElement('div');
  chartsSection.classList.add('calculator-charts-wrapper');

  const chartSelectors = document.createElement('div');
  chartSelectors.classList.add('charts-selectors');

  // create the selector and give the first one the data-active attribute
  categories.forEach((e, idx) => {
    const anchor = document.createElement('a');
    anchor.classList.add('selector');
    anchor.id = idx;
    anchor.innerText = Object.keys(e);
    if (idx === 0) {
      anchor.dataset.active = true;
    }

    chartSelectors.append(anchor);
  });

  const chartsList = document.createElement('ul');
  chartsList.classList.add('charts-wrapper');

  // Build all the charts separately and give the first one the data-active attribute
  data.forEach((e, idx) => {
    const chart = document.createElement('li');
    const buildChartFn = {
      0: buildChartMPG,
      1: buildChartYearSavings,
      2: buildChartFuelUsage,
      3: buildChartCumulativeSavings,
    };
    chart.id = idx;
    chart.classList.add('chart');
    if (idx === 0) {
      chart.dataset.active = true;
    }
    chart.innerHTML = buildChartFn[idx](e);
    chartsList.append(chart);
  });
  chartsSection.append(chartSelectors);
  chartsSection.append(chartsList);

  return chartsSection;
};

export default charts;
