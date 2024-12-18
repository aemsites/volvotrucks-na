import { results, resetForm, updatedData, addAnimations, resetData, getNumberFormat, reverseFormatNumber } from './results.js';
import { getTextLabel } from '../../scripts/common.js';

const calculatorPath = './calculator.json';
const percentagesPath = './percentages.json';

const getInitialData = async (path = calculatorPath) => {
  // get data from spreadsheet in json format
  const response = await fetch(path);
  const json = await response.json();
  return json.data;
};

const formatData = (data) => {
  // get the values from the json
  const values = data.pop();
  const dataEntries = Object.entries(values).map(([key, value], i) => ({
    idx: i + 1,
    label: key,
    value,
    type: [2, 8].some((id) => id === i) ? 'number' : 'text',
  }));

  // get the last element of the excel as the disclaimer that goes on the middle
  const disclaimer = dataEntries.length === 10 ? dataEntries.pop().value : '';
  const divider = 7;

  const [, priceFuel, currentMPG, milesTruckYear, priceIncrease, defPrice, defUsage, , trucksNum] = dataEntries;
  const formData = {
    '1_baseline_powertrain': 0,
    '2_price_of_fuel': priceFuel.value,
    '3_current_MPG': currentMPG.value,
    '4_miles/Truck/Year': milesTruckYear.value,
    '5_annual_fuel_price_increase': priceIncrease.value,
    '6_price_of_DEF': defPrice.value,
    '7_DEF%_usage': defUsage.value,
    '8_next-gen_D13TC_powertrain': 0,
    '9_number_of_new_trucks': trucksNum.value,
  };

  // divides into 2 sections, 'current' and 'new'
  const firstSection = dataEntries.slice(0, divider);
  const lastSection = dataEntries.slice(divider, dataEntries.length);

  // turn the string into an array
  const splitValues = (completeString) => completeString[0].value.split(',');

  firstSection[0].value = splitValues(firstSection);
  lastSection[0].value = splitValues(lastSection);

  firstSection[0].type = 'select';
  lastSection[0].type = 'select';

  return [firstSection, lastSection, formData, disclaimer];
};

const buildPercentages = (rawPercentages) => {
  const tempData = {};
  rawPercentages.forEach((row) => {
    tempData[row.sumproduct] = row.result;
  });
  return tempData;
};

const createButton = (type) => {
  // create the reset button
  const button = document.createElement('button');
  button.classList.add(`calculator-${type}-button`);
  button.id = `calculator-${type}-button`;
  button.innerText = `${type} calculator`;
  button.setAttribute('type', 'submit');

  return button;
};

const getInputType = (e) => {
  const errorMessage = getTextLabel('Please enter valid value');
  // identify and return if the input is a number input or a select
  const inputLabel = e.label.slice(2).replaceAll('_', ' ');
  if (e.type === 'select') {
    return `
      <label for="input-${e.idx}" class="label-input-${e.idx}">${inputLabel}</label>
      <select name="input-${e.idx}" class="form-control" id="input-${e.idx}">
        ${e.value.map(
          (value, idx) => `
        <option data-value="${idx + 1}" value="${value}">${value}</option>`,
        )}
      </select>`;
  }
  return `
    <label class="label-input-${e.idx}" for="input-${e.idx}">${inputLabel}</label>
    <input
      type="${e.type}"
      id="input-${e.idx}"
      class="form-control"
      value="${getNumberFormat(e.value, e.idx)}"
      ${e.idx === 9 ? 'min="1"' : ''}
      ${e.idx === 3 ? 'min="0.01" step="0.01"' : ''}/>
    <span class="error-message">${errorMessage}</span>`;
};

const createInputs = (data, type) => {
  // build the list of inputs with their corresponding title
  const truckSection = document.createElement('div');
  truckSection.classList.add('calculator-inputs-section');

  const truckTitle = document.createElement('h3');
  truckTitle.classList.add('calculator-inputs-title');
  truckTitle.innerText = `${type} trucks`;

  const inputList = document.createElement('ul');
  inputList.classList.add('calculator-input-list');

  data.forEach((input) => {
    const listItem = document.createElement('li');
    listItem.classList.add('calculator-item');
    listItem.innerHTML = getInputType(input);
    inputList.append(listItem);
  });

  truckSection.append(truckTitle);
  truckSection.append(inputList);

  return truckSection;
};

const focusNextField = (e, form) => {
  if (e.key === 'Enter') {
    if (e.target.localName === 'button') {
      resetForm(e);
      return;
    }
    const formElements = [...form];
    const idx = e.target.id.split('-')[1];
    const nextId = idx === '9' ? 0 : +idx;
    formElements[nextId].focus();
  }
};

const formatDataField = (e) => {
  if (['select', 'button'].some((field) => field === e.target.localName)) {
    return;
  }
  const { target } = e;
  const { value } = target;
  const idx = +target.id.split('-')[1];
  const fn = {
    focus: reverseFormatNumber(value, 'en-US'),
    blur: getNumberFormat(value, idx),
  };
  let hasError = false;
  if (e.type === 'blur') {
    target.classList.toggle('error', !reverseFormatNumber(value));
    hasError = target.classList.contains('error');
  }
  if (!hasError) {
    target.value = fn[e.type] ? fn[e.type] : value;
  }
};

export default async function decorate(block) {
  // the final disclaimer comes from the index.doc file in order to make it editable
  const finalDisclaimer = block.innerText;

  // this data acts a placeholder and is also the one used to make the first calculations
  const rawData = await getInitialData();
  const initialData = formatData(rawData);
  const [, , formData, dataText] = initialData;
  const rawPercentages = await getInitialData(percentagesPath);
  const percentages = buildPercentages(rawPercentages);
  resetData.push(formData);

  const middleDisclaimerText = document.createElement('p');
  middleDisclaimerText.classList.add('disclaimer');
  middleDisclaimerText.classList.add('calculator-inputs-disclaimer');
  middleDisclaimerText.innerText = dataText;

  const currentInputsSection = createInputs(initialData[0], 'current');
  const newInputsSection = createInputs(initialData[1], 'new');

  const resetButton = createButton('reset');
  resetButton.onclick = (e) => resetForm(e);

  const allInputs = document.createElement('form');
  allInputs.classList.add('calculator-inputs-form');
  allInputs.id = 'calculator';
  allInputs.oninput = (e) => resetForm(e);
  allInputs.onkeydown = (e) => focusNextField(e, allInputs);
  allInputs.addEventListener('focus', (e) => formatDataField(e), true);
  allInputs.addEventListener('blur', (e) => formatDataField(e), true);

  const finalDisclaimerText = document.createElement('p');
  finalDisclaimerText.classList.add('disclaimer');
  finalDisclaimerText.classList.add('results-disclaimer');
  finalDisclaimerText.innerText = finalDisclaimer;

  // empties the block
  block.innerText = '';

  const selectorsAndCharts = results(formData, percentages);
  addAnimations(selectorsAndCharts);

  allInputs.append(currentInputsSection);
  allInputs.append(middleDisclaimerText);
  allInputs.append(newInputsSection);
  allInputs.append(resetButton);

  block.append(allInputs);
  block.append(selectorsAndCharts);

  block.append(finalDisclaimerText);
  updatedData.push(selectorsAndCharts);
}
