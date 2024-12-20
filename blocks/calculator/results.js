import charts from './charts.js';

const indexData = {
  id1: '1_baseline_powertrain',
  id2: '2_price_of_fuel',
  id3: '3_current_MPG',
  id4: '4_miles/Truck/Year',
  id5: '5_annual_fuel_price_increase',
  id6: '6_price_of_DEF',
  id7: '7_DEF%_usage',
  id8: '8_next-gen_D13TC_powertrain',
  id9: '9_number_of_new_trucks',
};

export const resetData = [];
let percentages;
// this variable was created in order to check that whenever it changes,
// a new table+chart is created
export const updatedData = []; // [charts, results, dataContainer]

const nth = (num) => {
  // a function just to add the correct suffix
  const suffix = { 1: 'st', 2: 'nd', 3: 'rd' };
  return num <= 3 ? suffix[num] : 'th';
};

export const formatNum = (num, options = {}) => {
  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(num);
};

export const getNumberFormat = (num, idx) => {
  let tempValue = num;
  const isNumeric = idx === 4;
  const isPercentage = [5, 7].some((n) => n === idx);
  const isCurrency = [2, 6].some((n) => n === idx);
  if (isNumeric) {
    tempValue = formatNum(num);
  } else if (isPercentage) {
    const options = { style: 'percent', maximumFractionDigits: 2 };
    tempValue = formatNum(+num / 100, options);
  } else if (isCurrency) {
    const options = { currency: 'USD', style: 'currency' };
    tempValue = formatNum(num, options);
  }
  return tempValue;
};

export const reverseFormatNumber = (val, locale = 'en-US') => {
  const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
  const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
  let reversedVal = val.replace(new RegExp(`\\${group}`, 'g'), '');
  reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, 'g'), '.');
  reversedVal = reversedVal.replace(/[$%]/, '');
  return Number.isNaN(+reversedVal) ? null : reversedVal;
};

export const addAnimations = (component) => {
  // add the functionality to the charts / selectors
  const wrapper = component.querySelector('.calculator-charts-wrapper');
  const selectors = wrapper.querySelectorAll('.selector');

  selectors.forEach((button) => {
    button.addEventListener('click', (e) => {
      const parent = button.closest('.calculator-charts-wrapper');
      const inactiveButton = parent.querySelector('[data-active]');
      delete inactiveButton.dataset.active;

      const selectedId = e.target.id;
      button.dataset.active = true;

      const chartParent = parent.querySelector('ul');
      const inactiveChart = chartParent.querySelector('[data-active]');
      delete inactiveChart.dataset.active;

      const selectedChart = chartParent.querySelectorAll('.chart');
      selectedChart[selectedId].dataset.active = true;
    });
  });
};

const getPercentageAndTable = (data) => {
  // creating the result component with the percentage value and the table
  const resultsSection = document.createElement('div');
  resultsSection.classList.add('calculator-result-wrapper');

  const title = document.createElement('h3');
  title.innerText = 'Results';
  title.classList.add('calculator-results-title');

  const percentageResult = document.createElement('div');
  percentageResult.innerHTML = `
    <p class='percentage-label'>Fuel economy efficiency improvement</p>
    <p class='percentage-result'>${data.percentage}%</p>`;
  percentageResult.classList.add('percentage-wrapper');

  let table = `
    <tr>
      <th></th>
      <th>Per truck</th>
      <th>Total savings</th>
    </tr>
    ${data.savings.map(
      (e, idx) => `
        <tr>
          <td>${idx + 1}${nth(idx + 1)} Year</td>
          <td>$${formatNum(e[0])}</td>
          <td>$${formatNum(e[1])}</td>
        </tr>`,
    )}`;
  table = table.replaceAll('</tr>,', '</tr>');

  const savingsTable = document.createElement('table');
  savingsTable.innerHTML = table;
  savingsTable.classList.add('calculator-savings-table');

  resultsSection.append(title);
  resultsSection.append(percentageResult);
  resultsSection.append(savingsTable);

  return resultsSection;
};

const calculateChartData = (data) => {
  const { currentMPG, milesTruckYear, percentage, savings } = data;
  const mpgNew = +currentMPG + +currentMPG * (percentage / 100);
  const fuelUsageCurrent = Math.round(+milesTruckYear / currentMPG);
  const fuelUsageNew = Math.round(+milesTruckYear / mpgNew);
  const perTruckTable = savings.map((row) => row[0]);
  const totalSavings = savings.map((row) => row[1]);

  return [
    {
      'MPG Improvement': {
        'Cumulative MPG': +currentMPG,
        '2021 D13TC I-Torque': mpgNew.toFixed(2),
      },
    },
    {
      'Savings Each Year': {
        'Per 2021 D13TC I-Torque Truck': perTruckTable,
        'Cumulative 2021 D13TC I-Torque': totalSavings,
      },
    },
    {
      'Fuel Usage': {
        'Current Truck': fuelUsageCurrent,
        '2021 D13TC I-Torque': fuelUsageNew,
      },
    },
    {
      'Cumulative Savings': {
        'Cumulative 2021 D13TC I-Torque': totalSavings,
      },
    },
  ];
};

const calculateSavings = (data) => {
  // formula:
  // (((4/3)*(2*("1"+5)^n))+(4/3)*7*6) - (4/((3*%/100)+3)*(2*("1"+5)^n) + 4/((3*%/100)+3)*7*6)
  const results = [];
  const years = 5;
  let power = 0;
  let acc = 0;
  const {
    fuelPrice: f, // 2
    currentMPG: c, // 3
    milesTruckYear: m, // 4
    priceIncrease: pi, // 5 => n%
    defPrice: dp, // 6
    defUsage: du, // 7 => n%
    trucksNum, // 9
    percentage: p, // % => 1+8
  } = data;
  for (; power < years; power += 1) {
    const percentageIncrease = (1 + pi / 100) ** power; // ("1"+5)^n
    const yearIncrease = f * percentageIncrease; // (2*("1"+5)^n)
    const yearPercentage = (c * p) / 100 + c; // ((3*%/100)+3)
    const formulaPart1 = (m / c) * yearIncrease + (m / c) * dp * (du / 100);
    const formulaPart2 = (m / yearPercentage) * yearIncrease;
    const formulaPart3 = (m / yearPercentage) * dp * (du / 100);
    const result = formulaPart1 - (formulaPart2 + formulaPart3);
    acc += result * trucksNum;
    results.push([result.toFixed(0), acc.toFixed(0)]);
  }

  return results;
};

const calculateTableData = (data) => {
  const currentData = {};
  const baseline = data[indexData.id1];
  const nextGen = data[indexData.id8];
  const sumProduct = `${baseline + 1}${nextGen + 1}`;
  currentData.percentage = +percentages[sumProduct];
  currentData.fuelPrice = +data[indexData.id2];
  currentData.currentMPG = +data[indexData.id3];
  currentData.milesTruckYear = +data[indexData.id4];
  currentData.priceIncrease = +data[indexData.id5];
  currentData.defPrice = +data[indexData.id6];
  currentData.defUsage = +data[indexData.id7];
  currentData.trucksNum = +data[indexData.id9];
  const { percentage } = currentData;
  const savings = calculateSavings(currentData);

  return { percentage, savings };
};

const getDataForCharts = (data, table) => ({
  percentage: table.percentage,
  savings: table.savings,
  currentMPG: data['3_current_MPG'],
  milesTruckYear: data['4_miles/Truck/Year'],
});

const formatDataObject = (data) => {
  const [baseline, fuelPrice, currentMPG, milesTruckYear, priceIncrease, defPrice, defUsage, nextGen, trucksNum] = data;
  return {
    '1_baseline_powertrain': baseline.selectedIndex,
    '2_price_of_fuel': reverseFormatNumber(fuelPrice.value),
    '3_current_MPG': currentMPG.value,
    '4_miles/Truck/Year': reverseFormatNumber(milesTruckYear.value),
    '5_annual_fuel_price_increase': reverseFormatNumber(priceIncrease.value),
    '6_price_of_DEF': reverseFormatNumber(defPrice.value),
    '7_DEF%_usage': reverseFormatNumber(defUsage.value),
    '8_next-gen_D13TC_powertrain': nextGen.selectedIndex,
    '9_number_of_new_trucks': trucksNum.value,
  };
};

const resetForm = (e) => {
  e.preventDefault();
  if (e.pointerType === '' && e.type === 'click') {
    return;
  }
  if (!e.srcElement.form) {
    return;
  }
  const { form } = e.srcElement;
  const isButton = e.target.id === 'calculator-reset-button';
  const isSelect = e.target.localName === 'select';
  const validValue = isButton || isSelect || reverseFormatNumber(e.target.value);
  const hasErrors = [...form].some((field) => field.classList.contains('error'));
  const data = isButton ? resetData[0] : formatDataObject(form);
  const [, , dataContainer] = updatedData; // [charts, results, dataContainer]
  // if isButton then reset inputs of the form
  if (isButton) {
    Object.values(data).forEach((value, i) => {
      if ([0, 7].includes(i)) {
        form[i].selectedIndex = value;
      } else {
        form[i].value = getNumberFormat(value, i + 1);
        form[i].classList.remove('error');
      }
    });
  }
  if (!validValue || hasErrors) {
    return;
  }
  const tableData = calculateTableData(data);
  const chartData = calculateChartData(getDataForCharts(data, tableData));

  const builtCharts = charts(chartData);
  const builtTable = getPercentageAndTable(tableData);

  dataContainer.textContent = '';
  dataContainer.append(builtTable, builtCharts);
  updatedData.splice(0, 2);
  updatedData.unshift(builtCharts, builtTable);
  addAnimations(dataContainer);
};

const results = (data, table) => {
  percentages = table;
  // these 2 should make the data into the correct format
  const tableData = calculateTableData(data);
  const chartData = calculateChartData(getDataForCharts(data, tableData));

  const result = document.createElement('div');

  // now format is correct and values calculated, create the charts and table components
  const builtCharts = charts(chartData);
  const builtTable = getPercentageAndTable(tableData);

  updatedData.push(builtCharts, builtTable);

  // this builds the components for the first time
  result.append(builtTable);
  result.append(builtCharts);

  return result;
};

export { results, resetForm };
