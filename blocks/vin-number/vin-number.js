import { getTextLabel, createElement, getJsonFromUrl, getPlaceholders } from '../../scripts/common.js';

const docRange = document.createRange();
const isFrench = window.location.href.indexOf('fr') > -1;
const blockName = 'vin-number';

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

// list of things to be display for each recall
const valueDisplayList = [
  {
    key: 'recall_date',
  },
  {
    key: 'mfr_recall_number',
  },
  {
    key: 'nhtsa_recall_number',
  },
  {
    key: 'tc_recall_nbr',
  },
  {
    key: 'mfr_recall_status',
  },
  {
    key: 'recall_description',
    frenchKey: 'recall_description_french',
    class: `${blockName}__detail-item--column`,
  },
  {
    key: 'safety_risk_description',
    frenchKey: 'safety_risk_description_french',
    class: `${blockName}__detail-item--column`,
  },
  {
    key: 'interim_precautions',
    frenchKey: 'interim_precautions_french',
    class: `${blockName}__detail-item--column`,
    displayIfEmpty: true,
  },
  {
    key: 'recall_effective_date',
    frenchKey: 'recall_effective_date_french',
    class: `${blockName}__detail-item--column`,
    text: 'recall_effective_text',
    frenchText: 'recall_effective_text_french',
    displayIfEmpty: true,
  },
  {
    key: 'remedy_description',
    frenchKey: 'remedy_description_french',
    class: `${blockName}__detail-item--column`,
  },
  {
    key: 'mfr_notes',
    frenchKey: 'mfr_notes_french',
    class: `${blockName}__detail-item--column`,
  },
];

// use this to map values from API
const recallStatus = {
  11: 'recall-incomplete',
  0: 'recall-complete',
  12: 'recall-incomplete-no-remedy',
};

function renderRecalls(recallsData) {
  const resultTextEle = document.querySelector(`.${blockName}__results-text`);
  let resultContent = getTextLabel('result text')
    .replace(/\${count}/, recallsData.number_of_recalls)
    .replace(/\${vin}/, recallsData.vin);
  let noFrenchInfo = false;

  const recallsOldestDate = isFrench
    ? new Date(recallsData.recalls_since).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' })
    : recallsData.recalls_since;
  const blockEl = document.querySelector(`.${blockName}__recalls-wrapper`);

  const recallsMake = createElement('div', { classes: `${blockName}__recalls-make-wrapper` });
  const makeFragment = docRange.createContextualFragment(`
    <div class="${blockName}__recalls-model-year">
      <span class="${blockName}__recalls-make subtitle-1">${getTextLabel('model year')}</span>
      <span> ${recallsData.year}</span>
    </div>
    <div class="${blockName}__recalls-make">
      <span class="${blockName}__recalls-make subtitle-1">${getTextLabel('make')}</span>
      <span> ${recallsData.make}</span>
    </div>
    <div class="${blockName}__recalls-model">
      <span class="${blockName}__recalls-model subtitle-1">${getTextLabel('model')}</span>
      <span> ${recallsData.model}</span>
    </div>
  `);

  recallsMake.append(...makeFragment.children);
  blockEl.append(recallsMake);

  if (recallsData.recalls_available) {
    const listWrapperFragment = docRange.createContextualFragment(`
      <div class="${blockName}__recalls-heading-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M12.537 2.77441C12.4523 2.60503 12.2792 2.49804 12.0898 2.49805C11.9004 2.49805 11.7273 2.60506 11.6426 2.77445L2.14458 21.7711C2.06709 21.9261 2.07537 22.1102 2.16647 22.2576C2.25758 22.405 2.41851 22.4947 2.5918 22.4947H21.5897C21.7629 22.4947 21.9239 22.405 22.015 22.2576C22.1061 22.1102 22.1144 21.9261 22.0369 21.7711L12.537 2.77441ZM3.4008 21.4947L12.0898 4.11603L20.7806 21.4947H3.4008ZM12.9995 14.6796V15.7512C12.9995 15.8619 12.9046 15.9974 12.7538 15.9974L12.4304 15.9969C12.2549 15.9965 12.0583 15.9961 11.9556 15.9961H11.2484C11.0976 15.9961 11.0027 15.8606 11.0027 15.7499V14.6796L11.0027 8.24501C11.0027 8.13425 11.0976 7.99874 11.2484 7.99874H11.9556C12.0581 7.99874 12.2545 7.99834 12.4299 7.99798H12.43L12.4304 7.99798L12.7538 7.99744C12.9046 7.99744 12.9995 8.13295 12.9995 8.2437L12.9995 14.6796ZM12.9964 18.8443V19.7512C12.9964 19.8619 12.9015 19.9974 12.7507 19.9974L12.4273 19.9969C12.2517 19.9965 12.0551 19.9961 11.9524 19.9961H11.2452C11.0944 19.9961 10.9995 19.8606 10.9995 19.7499V18.8443V18.2437C10.9995 18.1329 11.0944 17.9974 11.2452 17.9974H11.9524C12.0551 17.9974 12.2517 17.997 12.4273 17.9967L12.7507 17.9961C12.9015 17.9961 12.9964 18.1316 12.9964 18.2424L12.9964 18.8443Z" fill="currentColor"/>
        </svg>
        <h4 class="${blockName}__recalls-heading">${getTextLabel('recalls')}  &nbsp; &nbsp;</h4>
        <span> [${getTextLabel('recall_oldest_info')} ${recallsOldestDate}] </span>
      </div>
    `);

    // create each recall
    const list = createElement('ul', { classes: `${blockName}__list` });
    recallsData.recalls.forEach((recall) => {
      const liEl = createElement('li', {
        classes: `${blockName}__list-item`,
      });

      // map the number from api to correct status
      recall.mfr_recall_status = recallStatus[recall.mfr_recall_status];
      const recallDetailsList = createElement('ul', { classes: `${blockName}__detail-list` });
      valueDisplayList.forEach((item) => {
        if (recall[item.key] || item.displayIfEmpty) {
          const recallClass = item.key === 'mfr_recall_status' ? `${blockName}__${recall.mfr_recall_status.replace(/_/g, '-').toLowerCase()}` : '';
          let itemValue = recall[item.key] || '';
          if (recallClass) {
            itemValue = getTextLabel(recall[item.key]);
          } else if (item.key === 'recall_date' && isFrench) {
            itemValue = new Date(recall[item.key]).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
          } else if (isFrench && item.frenchKey) {
            if (recall[item.frenchKey]) {
              itemValue = recall[item.frenchKey];
            } else if (!noFrenchInfo) {
              const noFrenchInoEl = document.querySelector(`.${blockName}__no-french-info`);
              noFrenchInoEl.textContent = getTextLabel('no-french-info');
              noFrenchInfo = true;
            }
          }

          if (item.key === 'recall_effective_date') {
            const recallText = getTextLabel(`recall_effective_text${isFrench ? '_french' : ''}`).split('//');
            const recallDate = new Date(itemValue);
            const today = new Date();
            itemValue = recallDate < today ? recallText[0] : ` ${recallText[1]} ${itemValue} .`;
          }

          const itemFragment = docRange.createContextualFragment(`<li class="${blockName}__detail-item ${item.class ? item.class : ''}" >
            <h5 class="${blockName}__detail-title subtitle-1"> ${getTextLabel(item.key)} </h5>
            <span class="${blockName}__detail-value ${recallClass}">${itemValue}</span>
          </li>`);
          recallDetailsList.append(...itemFragment.children);
        }
      });
      liEl.append(recallDetailsList);
      list.append(liEl);
    });

    blockEl.append(listWrapperFragment);
    blockEl.appendChild(list);
  } else {
    resultContent = `${resultContent} [${getTextLabel('recall_available_info')} ${recallsOldestDate}]`;
  }

  resultTextEle.innerText = resultContent;
}

function getAPIConfig() {
  let env = 'prod';

  if (['hlx.page', 'aem.page'].some((host) => window.location.host.includes(host))) {
    env = 'qa';
  } else if (window.location.host.includes('localhost')) {
    env = 'dev';
  }
  return apiConfig[env];
}

function getStorageItem(key) {
  // get the parsed value of the given key
  const result = JSON.parse(window.localStorage.getItem(key));

  // if the key has value
  if (result) {
    // if the entry is expired remove the entry and return null
    if (result.expireTime <= Date.now()) {
      window.localStorage.removeItem(key);
      return null;
    }
    // else return the value
    return result.data;
  }
  // if the key does not have value
  return null;
}

function setStorageItem(key, value) {
  // store the value as object along with expiry date
  const result = {
    data: value,
    expireTime: Date.now() + 60 * 60 * 1000, // set the expiry from the current date for a day
  };

  // stringify the result and the data in original storage
  window.localStorage.setItem(key, JSON.stringify(result));
}

async function fetchRefreshDate() {
  const refreshDate = getStorageItem('refreshDate');
  if (!refreshDate) {
    const { url, key } = getAPIConfig();
    try {
      const response = await getJsonFromUrl(`${url}refreshdate?api_key=${key}`);
      setStorageItem('refreshDate', response.refresh_date);
      return response.refresh_date;
    } catch (error) {
      console.error('Error fetching refresh date:', error);
    }
  }
  return refreshDate;
}

function fetchRecalls(e) {
  e.preventDefault();
  if (e && e.target) {
    // disable submit while fetching data
    const submitBtn = e.target.querySelector('button');
    submitBtn.disabled = true;

    const recalls = document.querySelector(`.${blockName}__recalls-wrapper`);
    recalls.innerHTML = '';

    const noFrenchInoEl = document.querySelector(`.${blockName}__no-french-info`);
    noFrenchInoEl.textContent = '';

    const resultText = document.querySelector(`.${blockName}__results-text`);
    resultText.innerText = getTextLabel('loading recalls');

    const formData = new FormData(e.target);
    const vin = formData.get('vin');

    if (vin) {
      const { url, key } = getAPIConfig();
      try {
        getJsonFromUrl(`${url}vin/${vin}?api_key=${key}&mode=company`).then((response) => {
          if (response.error_code) {
            resultText.innerHTML = `${getTextLabel('no recalls')} ${vin}`;
          } else {
            renderRecalls(response);
          }

          const vinInput = document.querySelector(`.${blockName}__input`);
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
}

export default async function decorate(block) {
  await getPlaceholders();
  fetchRefreshDate().then((response) => {
    let refreshDate = response || 'XX-XX-XXXX';
    if (response && isFrench) {
      refreshDate = new Date(response).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' });
    }

    const refresDateWrapper = createElement('div', {
      classes: `${blockName}__refresh-date-wrapper`,
    });
    const refreshFragment = docRange.createContextualFragment(`<span>
      ${getTextLabel('published_info')}:
    </span>
    <span class="${blockName}__refresh-date">
      ${refreshDate}
    </span>`);

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
        <label for="vin_number" class="${blockName}__label">${getTextLabel('vinlabel')}</label>
      </div>
      <button class="button primary ${blockName}__submit" type="submit" name="submit">${getTextLabel('submit')}</button>
    `);

    const vinResultsContainer = createElement('div', { classes: `${blockName}__results-container` });
    const innerContent = docRange.createContextualFragment(`
      <span class="${blockName}__results-text"></span>
      <div class="${blockName}__no-french-info"></div>
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
        e.target.setCustomValidity(getTextLabel('vinformat-length'));
        return;
      }
      e.target.setCustomValidity(getTextLabel('vinformat'));
    };

    vinInput.oninput = (e) => {
      e.target.setCustomValidity('');
    };
  });
}
