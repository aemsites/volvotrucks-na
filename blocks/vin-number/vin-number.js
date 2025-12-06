import { readBlockConfig } from '../../scripts/aem.js';
import { getTextLabel, createElement, getJsonFromUrl, getPlaceholders, getLocale } from '../../scripts/common.js';

const docRange = document.createRange();
const blockName = 'vin-number';
let configUrl;

// All placeholder labels centralized
const LABELS = {
  resultText: getTextLabel('vin_number:result_text'),
  modelYear: getTextLabel('vin_number:model_year'),
  make: getTextLabel('vin_number:make'),
  model: getTextLabel('vin_number:model'),
  recalls: getTextLabel('vin_number:recalls'),
  oldestInfo: getTextLabel('vin_number:recall_oldest_info'),
  format: getTextLabel('vin_number:format'),
  formatLength: getTextLabel('vin_number:format_length'),
  availableInfo: getTextLabel('vin_number:recall_available_info'),
  loadingRecalls: getTextLabel('vin_number:loading_recalls'),
  noRecalls: getTextLabel('vin_number:no_recalls'),
  publishedInfo: getTextLabel('vin_number:published_info'),
  label: getTextLabel('vin_number:label'),
  submit: getTextLabel('vin_number:submit'),
};

const apiConfig = {
  dev: {
    url: 'https://vinlookup-dev-euw-ase-01.azurewebsites.net/v1/api/',
    key: '0e13506b59674706ad9bae72d94fc83c',
  },
  qa: {
    url: 'https://vinlookup-qa-euw-ase-01.azurewebsites.net/v1/api/',
    key: '0e13506b59674706ad9bae72d94fc83c',
  },
  prod: {
    url: 'https://vinlookup-prod-euw-ase-01.azurewebsites.net/v1/api/',
    key: '0e13506b59674706ad9bae72d94fc83c',
  },
};

// For the 'mfr_recall_status' field, these are the 3 possible responses
const recallStatusCodes = {
  0: { arrayPosition: 0, status: 'complete' },
  11: { arrayPosition: 1, status: 'incomplete' },
  12: { arrayPosition: 2, status: 'incomplete-no-remedy' },
};

/**
 * Fetches configuration data for recall fields from a remote JSON file.
 * This function assumes 'configUrl' is a string variable defined in the outer scope
 * which holds the URL to the block's configuration file.
 *
 * @async
 * @function fetchRecallFields
 * @returns {Promise<Object|undefined>} A Promise that resolves with the parsed JSON object
 * @throws {Error} Errors are logged to the console.
 */
const fetchRecallFields = async () => {
  try {
    const { pathname } = new URL(configUrl);
    const response = await fetch(pathname);

    if (response.ok) {
      return response.json();
    } else {
      console.error('Error fetching recall fields file', response.statusText);
    }
  } catch (error) {
    console.error('Error with recall fields file', error);
  }
};

/**
 * Formats a date string into a localized format (e.g., "Aug 25, 2023").
 * Uses 'getLocale()' function to determine the current locale like 'en-US' or 'fr-FR'.
 *
 * @param {string | Date} date - The date value to format (e.g., "2023-08-25" or a Date object).
 * @returns {string} The formatted date string in the local format (e.g., 'en' or 'fr').
 */
const formatDateWithLocale = (date) => {
  const language = getLocale().split('-')[0] || 'en';
  const formattedDate = new Date(date).toLocaleDateString(language, { year: 'numeric', month: 'short', day: 'numeric' });
  return formattedDate;
};

/**
 * Determines the appropriate API configuration based on the current hostname
 * environment (dev, qa, or prod).
 * 
 * @function getAPIConfig
 * @returns {Object} The configuration object corresponding to the current environment.
 */
const getAPIConfig = () => {
  let env = 'prod';

  if (window.location.host.includes('aem.page')) {
    env = 'qa';
  } else if (window.location.host.includes('localhost')) {
    env = 'dev';
  }

  return apiConfig[env];
};

/**
 * Retrieves an item from localStorage, checks for expiration, removes it if expired,
 * and formats the data using the utility function formatDateWithLocale.
 *
 * It is assumed that items are stored as JSON objects with the structure:
 * { data: '...', expireTime: <timestamp> }.
 *
 * @function getStorageItem
 * @param {string} key - The localStorage key to look up.
 * @returns {string | null} The formatted date string if the item is found and not expired,
 * otherwise returns null.
 */
const getStorageItem = (key) => {
  const result = JSON.parse(window.localStorage.getItem(key));
  if (result) {
    if (result.expireTime <= Date.now()) {
      window.localStorage.removeItem(key);
      return null;
    }
    return formatDateWithLocale(result.data);
  }
  return null;
};

/**
 * Saves a value to the browser's localStorage, wrapping it in a structure
 * that includes an expiration timestamp.
 *
 * The stored object structure is: { data: value, expireTime: <timestamp> }.
 * The expiration time is currently set to 1 hour (60 * 60 * 1000 milliseconds)
 * from the time the function is called.
 *
 * @function setStorageItem
 * @param {string} key - The key under which to store the item in localStorage.
 * @param {*} value - The data to be stored. This value will be JSON stringified.
 * @returns {void}
 */
const setStorageItem = (key, value) => {
  const result = {
    data: value,
    expireTime: Date.now() + 60 * 60 * 1000,
  };
  window.localStorage.setItem(key, JSON.stringify(result));
};

/**
 * Fetches the latest data refresh date, prioritizing a cached version from 
 * localStorage that has not yet expired.
 * * If the cached item is missing or expired, it fetches the date from the API,
 * stores it in localStorage with a new expiration time, and then formats it.
 * @async
 * @function fetchRefreshDate
 * @returns {Promise<string|undefined>} A promise that resolves with the formatted
 * date string (e.g., "Aug 25, 2023"). Returns undefined if the API call fails.
 */
const fetchRefreshDate = async () => {
  const refreshDate = getStorageItem('refreshDate');
  if (!refreshDate) {
    const { url, key } = getAPIConfig();
    try {
      const response = await getJsonFromUrl(`${url}refreshdate?api_key=${key}`);
      setStorageItem('refreshDate', response.refresh_date);
      return formatDateWithLocale(response.refresh_date);
    } catch (error) {
      console.error('Error fetching refresh date:', error);
    }
  }
  return refreshDate;
};

/**
 * Checks if a value is a valid date string (e.g., 'Aug 25, 2023', '9/11/2024', '17 févr. 2016')
 * This function explicitly excludes simple numeric inputs (like 0, 11, or 12) 
 * which could be the value for 'mfr_recall_status' field
 * 
 * * @param {string} value - The value to test. Expected to be a date string.
 * @returns {boolean} True if the value is a valid date string, false otherwise.
 */
function isValidDateString(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return false;
  }
  const date = new Date(value);
  return !isNaN(date.getTime());
}

/**
 * Processes and transforms field values based on the field key and a configurable
 * text string. 
 * It handles two major transformations: 
 * - Mapping 'mfr_recall_status' numeric code to descriptive text 
 * - Formatting/labeling 'recall_effective_date'
 *
 * @function handleConfigurableFields
 * @param {string} key - The key identifying the field being processed (e.g., 'mfr_recall_status').
 * @param {*} value - The raw value of the field (e.g., a number for status, or a date string).
 * @param {string} text - A configurable string containing delimited text labels (expected to use '//' as delimiter).
 * @returns {string | * | undefined} The transformed string (status text or date label), the original
 * value (if lookup fails or input is invalid), or undefined if the key is unmatched.
 */
const handleConfigurableFields = (key, value, text) => {
  const textArray = text?.split('//');

  // MFR RECALL STATUS
  if (key === 'mfr_recall_status') {
    if (!textArray || textArray.length < 3) {
      console.warn(`Recall configurable text format invalid or inexistent. Input: "${text}"`);
      return value;
    }
    const statusObject = recallStatusCodes[value];
    const recallStatus = textArray[statusObject.arrayPosition];
    if (recallStatus !== undefined) {
      return recallStatus;
    }
    console.warn(`Recall status code "${value}" not found in map.`);
    return value;
  }

  // RECALL EFFECTIVE DATE
  if (key === 'recall_effective_date') {
    const recallDate = new Date(value).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return recallDate > today ? `${textArray[1]} ${formatDateWithLocale(value)}.` : textArray[0];
  }

  return undefined;
};

const renderRecalls = async (recallsData, recallFields) => {
  const resultText = document.querySelector(`.${blockName}__results-text`);
  let resultContent = LABELS.resultText
    .replace(/\${count}/, recallsData.number_of_recalls)
    .replace(/\${vin}/, recallsData.vin);

  const blockEl = document.querySelector(`.${blockName}__recalls-wrapper`);

  const recallsMake = createElement('div', { classes: `${blockName}__recalls-make-wrapper` });
  const makeFragment = docRange.createContextualFragment(`
    <div class="${blockName}__recalls-md-row">
      <h5 class="${blockName}__recalls-md-title">${LABELS.modelYear}</h5>
      <span> ${recallsData.year}</span>
    </div>
    <div class="${blockName}__recalls-md-row">
      <h5 class="${blockName}__recalls-md-title">${LABELS.make}</h5>
      <span> ${recallsData.make}</span>
    </div>
    <div class="${blockName}__recalls-md-row">
      <h5 class="${blockName}__recalls-md-title">${LABELS.model}</h5>
      <span> ${recallsData.model}</span>
    </div>
  `);

  recallsMake.append(...makeFragment.children);
  blockEl.append(recallsMake);

  if (recallsData.recalls_available) {
    const listWrapperFragment = docRange.createContextualFragment(`
      <div class="${blockName}__recalls-heading-wrapper">
        <span class="${blockName}__recalls-alert-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.537 2.77441C12.4523 2.60503 12.2792 2.49804 12.0898 2.49805C11.9004 2.49805 11.7273 2.60506 11.6426 2.77445L2.14458 21.7711C2.06709 21.9261 2.07537 22.1102 2.16647 22.2576C2.25758 22.405 2.41851 22.4947 2.5918 22.4947H21.5897C21.7629 22.4947 21.9239 22.405 22.015 22.2576C22.1061 22.1102 22.1144 21.9261 22.0369 21.7711L12.537 2.77441ZM3.4008 21.4947L12.0898 4.11603L20.7806 21.4947H3.4008ZM12.9995 14.6796V15.7512C12.9995 15.8619 12.9046 15.9974 12.7538 15.9974L12.4304 15.9969C12.2549 15.9965 12.0583 15.9961 11.9556 15.9961H11.2484C11.0976 15.9961 11.0027 15.8606 11.0027 15.7499V14.6796L11.0027 8.24501C11.0027 8.13425 11.0976 7.99874 11.2484 7.99874H11.9556C12.0581 7.99874 12.2545 7.99834 12.4299 7.99798H12.43L12.4304 7.99798L12.7538 7.99744C12.9046 7.99744 12.9995 8.13295 12.9995 8.2437L12.9995 14.6796ZM12.9964 18.8443V19.7512C12.9964 19.8619 12.9015 19.9974 12.7507 19.9974L12.4273 19.9969C12.2517 19.9965 12.0551 19.9961 11.9524 19.9961H11.2452C11.0944 19.9961 10.9995 19.8606 10.9995 19.7499V18.8443V18.2437C10.9995 18.1329 11.0944 17.9974 11.2452 17.9974H11.9524C12.0551 17.9974 12.2517 17.997 12.4273 17.9967L12.7507 17.9961C12.9015 17.9961 12.9964 18.1316 12.9964 18.2424L12.9964 18.8443Z" fill="var(--color-icon, #000)"/>
          </svg>
        </span>
        <h4 class="${blockName}__recalls-heading" >${LABELS.recalls}  &nbsp; &nbsp;</h4>
        <p class="${blockName}__recalls-refresh-date"> [${LABELS.oldestInfo} ${formatDateWithLocale(recallsData.recalls_since)}] </p>
      </div>
    `);

    // create each recall
    const list = createElement('ul', { classes: `${blockName}__list` });
    recallsData.recalls.forEach((recall) => {
      const liEl = createElement('li', {
        classes: `${blockName}__list-item`,
      });

      const recallDetailsList = createElement('ul', { classes: `${blockName}__detail-list` });
      recallFields.forEach((field) => {
        const { name, api_key, configurable_text, mandatory, display } = field;

        let recallValue = recall[api_key];

        const noRecallValue = recallValue === null || recallValue === undefined || recallValue === '';
        if (noRecallValue && !mandatory) {
          return;
        }

        const isDateValue = isValidDateString(recallValue);
        if (isDateValue) {
          recallValue = formatDateWithLocale(recallValue);
        }

        const hasConfigurableText = configurable_text;
        if (hasConfigurableText && hasConfigurableText.length > 0) {
          recallValue = handleConfigurableFields(api_key, recallValue, configurable_text);
        }

        const directionToDisplay = display && `${blockName}__detail-item--${display}`;
        const statusClass = api_key === 'mfr_recall_status' && `${blockName}__recall-${recallStatusCodes[recall[api_key]].status}`;

        const itemFragment = docRange.createContextualFragment(`
          <li class="${blockName}__detail-item ${directionToDisplay}" >
            <h5 class="${blockName}__detail-title">${name}</h5>
            <span class="${blockName}__detail-value ${statusClass}">
              ${noRecallValue ? '' : recallValue}
            </span>
          </li>
        `);
        recallDetailsList.append(...itemFragment.children);
      });

      liEl.append(recallDetailsList);
      list.append(liEl);
    });

    blockEl.append(listWrapperFragment);
    blockEl.appendChild(list);
  } else {
    resultContent = `${resultContent} [${LABELS.availableInfo} ${formatDateWithLocale(recallsData.recalls_since)}]`;
  }
  resultText.innerText = resultContent;
};

const fetchRecalls = async (e) => {
  e.preventDefault();
  if (e && e.target) {
    const submitBtn = e.target.querySelector('button');
    submitBtn.disabled = true;

    const recalls = document.querySelector(`.${blockName}__recalls-wrapper`);
    recalls.innerHTML = '';

    const resultText = document.querySelector(`.${blockName}__results-text`);
    resultText.innerText = LABELS.loadingRecalls;

    const formData = new FormData(e.target);
    const vin = formData.get('vin');

    // Recall fields are now configurable
    const { data: recallFields } = await fetchRecallFields();
    if (vin && recallFields) {
      try {
        const { url, key } = getAPIConfig();
        getJsonFromUrl(`${url}vin/${vin}?api_key=${key}&mode=company`).then((response) => {
          if (response.error_code) {
            resultText.innerHTML = `${LABELS.noRecalls} ${vin}`;
          } else {
            response.recalls.sort((a, b) => b.mfr_recall_status - a.mfr_recall_status || new Date(b.date) - new Date(a.date));
            renderRecalls(response, recallFields);
          }

          const vinInput = document.querySelector('.vin-number__input');
          vinInput.value = '';
          submitBtn.disabled = false;
        });
      } catch (error) {
        console.error('Error fetching Recalls:', error);
      }
      return null;
    }
  }
  return null;
};

export default async function decorate(block) {
  await getPlaceholders();
  try {
    const blockCongfig = readBlockConfig(block);
    configUrl = blockCongfig?.path;

    if (!configUrl) {
      throw new Error('Required configuration path is missing.');
    }
    block.innerHTML = '';

  } catch (error) {
    console.error(
      'Configuration error in vin block:',
      error.message,
      'Attempted Path:', configUrl,
    );
  }

  const refreshDate = getStorageItem('refreshDate-MT') || '';
  const refresDateWrapper = createElement('div', {
    classes: `${blockName}__refresh-date-wrapper`,
  });
  const refreshFragment = docRange.createContextualFragment(`<span>
    ${LABELS.publishedInfo}:
    </span>
    <strong class="${blockName}__refresh-date">${formatDateWithLocale(refreshDate)}</strong>
  `);

  const form = createElement('form', {
    classes: [`${blockName}__form`],
  });
  const formChildren = docRange.createContextualFragment(`
    <div class="${blockName}__input-wrapper">
      <input
        type="text"
        name="vin"
        id="vin_number"
        autocomplete="off"
        placeholder=" "
        minlength="17"
        maxlength="17"
        required
        class="${blockName}__input"
        pattern="^[1,2,3,4][c,C,N,n,R,r,P,p,V,v][1,2,4,5,9,C,c,e,E,K,k,V,v][B-C,E-H,J-N,R-T,V-Y,b-c,e-h,j-n,r-t,v-y][A-Za-z0-9]{13}$"
      />
      <label for="vin_number" class="${blockName}__label">${getTextLabel(LABELS.label)}</label>
    </div>
    <button class="button primary ${blockName}__submit" type="submit" name="submit">${getTextLabel(LABELS.submit)}</button>
  `);

  const vinResultsContainer = createElement('div', { classes: `${blockName}__results-container` });
  const innerContent = docRange.createContextualFragment(`
    <span class="${blockName}__results-text"></span>
    <div class="${blockName}__recalls-wrapper"></div>
  `);

  vinResultsContainer.append(innerContent);

  form.addEventListener('submit', fetchRecalls, false);
  form.append(...formChildren.children);
  refresDateWrapper.append(...refreshFragment.children);
  block.append(form, refresDateWrapper);
  block.append(vinResultsContainer);

  const vinInput = block.querySelector(`.${blockName}__input`);

  vinInput.oninvalid = (e) => {
    if (e.target.value.length < e.target.maxLength) {
      e.target.setCustomValidity(getTextLabel(LABELS.formatLength));
      return;
    }
    e.target.setCustomValidity(getTextLabel(LABELS.format));
  };

  if (!refreshDate) {
    fetchRefreshDate().then((response) => {
      const refreshEle = block.querySelector(`.${blockName}__refresh-date`);
      refreshEle.textContent = response;
    });
  }
}
