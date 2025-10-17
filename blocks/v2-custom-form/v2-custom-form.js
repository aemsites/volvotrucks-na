import { loadScript, sampleRUM } from '../../scripts/aem.js';
import { getTextLabel, createElement, variantsClassesToBEM, normalizeUrlText, isHttp, HOLIDAYS } from '../../scripts/common.js';
import { getCustomDropdown } from '../../../common/custom-dropdown/custom-dropdown.js';

const blockName = 'v2-custom-form';
const variantClasses = ['double-column', 'redirect-new-tab'];

const CLASSES = {
  IGNORE_ON_FORM_SUBMIT: 'ignore-on-form-submit',
};

const successMessage = (successTitle, successText) => `<h3 class='${blockName}__title ${blockName}__title--success'>${successTitle}</h3>
<p class='${blockName}__text ${blockName}__text--success'>${successText}</p>
`;

const errorMessage = (errorTitle, errorText) => `<h3 class='${blockName}__title ${blockName}__title--error'>${errorTitle}</h3>
<p class='${blockName}__text ${blockName}__text--error'>${errorText}</p>
`;

window.__activeForms = window.__activeForms || new Set();

/**
 * Get the message text from placeholder.json based on the success and title
 * @param {Boolean} isSuccess get the success message if true, otherwise the error message
 * @param {Boolean} isTitle get the title message if true, otherwise the text message
 * @returns {String} use the fn getTextLabel to get the message from placeholder.json
 */
const getMessageText = (isSuccess, isTitle) => {
  const key = isSuccess ? 'Successful' : 'Error';
  const type = isTitle ? 'Title' : 'Text';
  return getTextLabel(`V2CustomForm:${key}Submission${type}`);
};

// Form Block identifies the submit endpoint via these rules and in order
// 1. action property on the submit button
// 2. SUBMIT_ACTION constant
// 3. the path of the spreadsheet
const SUBMIT_ACTION = '';

/**
 * Fetch the custom message from the thank you page fragment
 * @param {String} url the url of the thank you page fragment
 * @returns {String} the custom message from the thank you page fragment
 */
async function getCustomMessage(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      return resp.text();
    }
  } catch (error) {
    console.error('Error fetching custom message:', error);
    return errorMessage(getMessageText(false, true), getMessageText(false, false));
  }
  return '';
}

function throwFormNotFound(form) {
  console.error('Form with data-submitting=true not found', { form });
}

function tryRedirect(form, redirectKey, { warnLabel = redirectKey, redirectNewTab = false } = {}) {
  if (!form) {
    return false;
  }

  const redirectValue = normalizeUrlText(form.dataset?.[redirectKey]);
  if (!redirectValue || form.dataset.redirecting === 'true') {
    return false;
  }

  try {
    const resolvedUrl = new URL(redirectValue, window.location.href);
    if (isHttp(resolvedUrl.protocol)) {
      form.dataset.redirecting = 'true';

      if (redirectNewTab) {
        window.open(resolvedUrl.href, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(resolvedUrl.href);
      }
      return true;
    }
  } catch {
    console.warn(`Invalid ${warnLabel} URL`);
  }
  return false;
}

async function submissionSuccess(form, redirectNewTab = false) {
  sampleRUM('form:submit');

  if (!form) {
    throwFormNotFound(form);
    return;
  }

  if (tryRedirect(form, 'successRedirect', { redirectNewTab })) {
    window.__activeForms.delete(form);
    return;
  }

  const successDiv = createElement('div', {
    classes: [`${blockName}--message`, `${blockName}__message--success`],
  });
  successDiv.innerHTML = successMessage(getMessageText(true, true), getMessageText(true, false));

  const customMessageUrl = form.dataset.customMessage;

  if (customMessageUrl) {
    successDiv.innerHTML = await getCustomMessage(customMessageUrl);
  }
  form.setAttribute('data-submitting', 'false');
  form.replaceWith(successDiv);
  window.__activeForms.delete(form);
}

async function submissionFailure(form, redirectNewTab = false) {
  if (!form) {
    throwFormNotFound(form);
    return;
  }

  if (tryRedirect(form, 'errorRedirect', { warnLabel: 'errorRedirect', redirectNewTab })) {
    console.log('redirecting to errorRedirect');
    window.__activeForms.delete(form);
    return;
  } else {
    console.log('no errorRedirect found, showing error message');
  }

  const errorDiv = createElement('div', {
    classes: [`${blockName}--message`, `${blockName}__message--error`],
  });
  errorDiv.innerHTML = errorMessage(getMessageText(false, true), getMessageText(false, false));

  form.setAttribute('data-submitting', 'false');
  form.querySelector('button[type="submit"]').disabled = false;
  form.replaceWith(errorDiv);
  window.__activeForms.delete(form);
}

window.showResult = function showResult(json) {
  const activeForms = Array.from(window.__activeForms);
  const form = activeForms.reverse().find((f) => f.dataset.submitting === 'true');

  if (!form) {
    console.warn('showResult: no active submitting form found');
    return;
  }

  const block = form.closest(`.${blockName}`);
  const redirectNewTab = block?.classList.contains(`${blockName}--redirect-new-tab`) || false;

  if (json.result === 'success') {
    submissionSuccess(form, redirectNewTab);
  } else if (json.result === 'error') {
    submissionFailure(form, redirectNewTab);
  }

  window.__activeForms.delete(form);
  form.dataset.submitting = 'false';
};

function serialize(obj) {
  const str = Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
  return str.join('&');
}

function generateUnique() {
  return new Date().valueOf() + Math.random();
}

function constructPayload(form) {
  const payload = { __id__: generateUnique() };
  [...form.elements].forEach((fe) => {
    if (fe.name && !fe.classList.contains(CLASSES.IGNORE_ON_FORM_SUBMIT)) {
      if (fe.type === 'radio' && fe.checked) {
        payload[fe.name] = fe.value;
      } else if (fe.type === 'checkbox' && fe.checked) {
        payload[fe.name] = payload[fe.name] ? `${payload[fe.name]},${fe.value}` : fe.value;
      } else if (fe.type !== 'file' && fe.type !== 'checkbox' && fe.type !== 'radio') {
        payload[fe.name] = fe.value;
      }
    }
  });
  payload.callback = 'showResult';
  return { payload };
}

async function prepareRequest(form) {
  const { payload } = constructPayload(form);
  const url = form.dataset.action;

  const serializedData = serialize(payload);
  loadScript(`${url}?${serializedData}`, { type: 'text/javascript', charset: 'UTF-8' });
}

async function handleSubmit(form) {
  if (form.getAttribute('data-submitting') !== 'true') {
    form.setAttribute('data-submitting', 'true');
    window.__activeForms.add(form);
    await prepareRequest(form);
  }
}

function setPlaceholder(element, fd) {
  if (fd.Placeholder) {
    element.setAttribute('placeholder', fd.Placeholder);
  }
}

const constraintsDef = Object.entries({
  'email|text|textarea': [
    ['Max', 'maxlength'],
    ['Min', 'minlength'],
    ['Pattern', 'pattern'],
  ],
  'number|range|date': ['Max', 'Min', 'Step'],
  file: ['Accept', 'Multiple'],
  fieldset: ['Max', 'Min'],
}).flatMap(([types, constraintDef]) => types.split('|').map((type) => [type, constraintDef.map((cd) => (Array.isArray(cd) ? cd : [cd, cd]))]));

const constraintsObject = Object.fromEntries(constraintsDef);

function setConstraints(element, fd) {
  const constraints = constraintsObject[fd.Type];
  if (constraints) {
    constraints
      .filter(([nm]) => fd[nm])
      .forEach(([nm, htmlNm]) => {
        element.setAttribute(htmlNm, htmlNm === 'pattern' ? fd[nm].replace(/^\/|\/$/g, '') : fd[nm]);
      });
  }
}

function createLabel(fd, tagName = 'label') {
  const label = createElement(tagName, {
    classes: 'field-label',
    props: {
      for: fd.Id,
    },
  });
  if (fd.tooltip) {
    label.title = fd.tooltip;
  }
  if (fd.Label) {
    label.textContent = fd.Label;
  }
  return label;
}

function createHelpText(fd) {
  const div = createElement('div', {
    classes: 'field-description',
    props: {
      'aria-live': 'polite',
      id: `${fd.Id}-description`,
    },
  });
  div.textContent = fd.Description;
  return div;
}

function kebabName(name) {
  return name
    .replace(/\s+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase();
}

function createFieldWrapper(fd, tagName = 'div') {
  const nameStyle = fd.Name ? `form-${kebabName(fd.Name)}` : '';
  let props = {};

  if (tagName !== 'div') {
    props = {
      id: fd.Id,
      name: fd.Name,
    };
  }

  const fieldWrapper = createElement(tagName, {
    classes: [`form-${fd.Type}-wrapper`, 'field-wrapper'],
    props,
  });
  if (fd.Mandatory && fd.Mandatory.toLowerCase() === 'true') {
    fieldWrapper.setAttribute('required', 'required');
  }
  if (fd.Fieldset) {
    fieldWrapper.dataset.fieldset = fd.Fieldset;
  }
  if (nameStyle) {
    fieldWrapper.classList.add(nameStyle);
  }
  fieldWrapper.append(createLabel(fd));
  return fieldWrapper;
}

function createButton(fd) {
  const wrapper = createFieldWrapper(fd);
  const button = createElement('button', {
    classes: ['button', 'primary'],
    props: {
      type: fd.Type,
      id: fd.Id,
      name: fd.Name,
    },
  });
  if (fd.Type === 'submit' && fd.Action) {
    button.formAction = fd.Action;
  }
  if (fd.Extra) {
    button.dataset.redirect = fd.Extra;
  }
  button.textContent = fd.Label;
  wrapper.replaceChildren(button);
  return wrapper;
}

function createSubmit(fd) {
  const wrapper = createButton(fd);
  return wrapper;
}

function createInput(fd) {
  const input = createElement('input', {
    props: {
      type: fd.Type,
    },
  });
  setPlaceholder(input, fd);
  setConstraints(input, fd);
  return input;
}

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function excelDateToISO(serial) {
  // Excel's day 1 = 1900-01-01, but it wrongly counts 1900 as a leap year
  const excelEpoch = new Date(Date.UTC(1899, 11, 30));
  const jsDate = new Date(excelEpoch.getTime() + serial * 86400000);

  return jsDate.toISOString().split('T')[0]; // returns YYYY-MM-DD
}

function createDateInput(fd) {
  const input = createElement('input', {
    props: {
      type: fd.Type,
    },
  });
  setPlaceholder(input, fd);
  setConstraints(input, fd);

  if (fd['Custom Options'] && fd['Custom Options'] !== '') {
    try {
      const customOptions = fd['Custom Options'];
      const customOptionsObj = JSON.parse(customOptions.replace(/(\w+):/g, '"$1":'));

      if (customOptionsObj.ignoreNonWorkingDays && customOptionsObj.ignoreNonWorkingDays === true) {
        // Implement logic to restrict date picker to working days only
        input.addEventListener('input', (e) => {
          const selectedDate = new Date(e.target.value);
          const day = selectedDate.getUTCDay();

          const holidayDates = Object.values(HOLIDAYS).map((date) => excelDateToISO(date));
          const selectedDateISO = selectedDate.toISOString().split('T')[0];

          // 0 = Sunday, 6 = Saturday
          if (day === 0 || day === 6) {
            const invalidFormWeekendDayLabel = getTextLabel('invalid_form_weekend_day_label');

            e.target.setCustomValidity(invalidFormWeekendDayLabel);
          } else if (holidayDates.includes(selectedDateISO)) {
            const invalidFormHolidayLabel = getTextLabel('invalid_form_holiday_label');
            e.target.setCustomValidity(invalidFormHolidayLabel);
          } else {
            e.target.setCustomValidity('');
          }
        });
      }

      if (customOptionsObj.minDay) {
        const today = new Date();
        const minDate = new Date();

        minDate.setDate(today.getDate() + customOptionsObj.minDay);

        input.min = formatDate(minDate);
      }

      if (customOptionsObj.maxDay) {
        let maxDay = customOptionsObj.maxDay;

        if (customOptionsObj.ignoreNonWorkingDays) {
          // If ignoreNonWorkingDays is true, we need to know how many weekend days there are between today and maxDay
          // or if customOptionsObj.minDay is set, between minDay and maxDay
          // if that is the case we need to add those invalid days to the maxDay
          const today = new Date();
          const startDate = customOptionsObj.minDay ? new Date(today.setDate(today.getDate() + customOptionsObj.minDay)) : today;
          let nonWorkingDays = 0;

          for (let i = 0; i <= maxDay + nonWorkingDays; i++) {
            const checkDate = new Date(startDate);
            checkDate.setDate(startDate.getDate() + i);
            const day = checkDate.getUTCDay();
            const checkDateISO = checkDate.toISOString().split('T')[0];
            const isHoliday = Object.values(HOLIDAYS)
              .map((date) => excelDateToISO(date))
              .includes(checkDateISO);

            if (day === 0 || day === 6 || isHoliday) {
              nonWorkingDays += 1;
            }
          }

          maxDay += nonWorkingDays;
        }
        const today = new Date();
        const maxDate = new Date();

        maxDate.setDate(today.getDate() + maxDay);

        input.max = formatDate(maxDate);
      }
    } catch (error) {
      console.error('Error parsing Custom Options JSON:', error);
    }
  }

  return input;
}

const withFieldWrapper = (element) => (fd) => {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(element(fd));
  return wrapper;
};

const createTextArea = withFieldWrapper((fd) => {
  const textArea = createElement('textarea');
  setConstraints(textArea, fd);
  setPlaceholder(textArea, fd);
  return textArea;
});

const createSelect = withFieldWrapper((fd) => {
  const select = createElement('select');
  if (fd.Placeholder) {
    const ph = createElement('option', {
      props: {
        selected: '',
        disabled: '',
      },
    });
    ph.textContent = fd.Placeholder;
    select.append(ph);
  }
  fd.Options.split(',').forEach((o) => {
    const oTrimed = o.trim();
    const option = createElement('option', {
      props: {
        value: oTrimed,
      },
    });
    option.textContent = oTrimed;
    select.append(option);
  });
  return select;
});

function checkboxHandler(e) {
  if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') {
    return;
  }
  e.preventDefault();
  const wrapper = e.currentTarget.closest('.field-wrapper');
  const checkbox = wrapper.querySelector('input[type="checkbox"]');
  checkbox.checked = !checkbox.checked;
  checkbox.dispatchEvent(new Event('change'));
}

function createCheckbox(fd) {
  const wrapper = createElement('div', {
    classes: [`form-${fd.Type}-wrapper`, 'field-wrapper', `form-${kebabName(fd.Name)}`],
    props: {
      id: fd.Id,
      name: fd.Name,
    },
  });

  if (fd.Mandatory?.toLowerCase() === 'true') {
    wrapper.setAttribute('required', 'required');
  }

  const input = createElement('input', {
    props: {
      type: 'checkbox',
      id: fd.Id,
      name: fd.Name,
      value: fd.Value || 'on',
      tabindex: '-1',
      ...(fd.Mandatory?.toLowerCase() === 'true' ? { required: true } : {}),
    },
  });

  const label = createElement('label', {
    props: {
      for: fd.Id,
      tabindex: '0',
    },
  });

  const circle = createElement('span', {
    classes: ['form-checkbox-circle'],
  });

  label.append(circle, document.createTextNode(fd.Label || fd.Name));
  label.addEventListener('click', checkboxHandler);
  label.addEventListener('keydown', checkboxHandler);
  wrapper.append(input, label);
  return wrapper;
}

function createRadio(fd) {
  const wrapper = createRadioWrapper(fd);

  const options = getRadioOptions(fd);
  if (!options || options.length === 0) {
    return wrapper;
  }

  options.forEach((option, index) => {
    const radioOption = createRadioOption(option, index, fd);
    wrapper.append(radioOption);
  });

  appendHelpText(wrapper, fd);

  return wrapper;
}

function createRadioWrapper(fd) {
  const isButtonVariant = fd.Type === 'buttons';
  const classes = ['form-radio-wrapper', 'field-wrapper'];
  if (isButtonVariant) {
    classes.push('form-radio-wrapper--buttons');
  }

  const wrapper = createElement('fieldset', {
    classes,
    props: { name: fd.Name },
  });

  if (fd.Mandatory?.toLowerCase() === 'true') {
    wrapper.setAttribute('required', 'required');
  }

  if (fd.Name) {
    wrapper.classList.add(`form-${kebabName(fd.Name)}`);
  }

  const legend = createElement('legend', {
    classes: ['form-radio-legend'],
  });
  legend.textContent = fd.Label || fd.Name;
  wrapper.append(legend);

  return wrapper;
}

function getRadioOptions(fd) {
  if (!fd.Options) {
    console.warn(`Missing "Options" for radio field: ${fd.Name}`);
    return null;
  }

  const options = fd.Options.split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  if (options.length === 0) {
    console.warn(`No valid options parsed for radio field: ${fd.Name}`);
  }

  return options;
}

function createRadioOption(option, index, fd) {
  const radioId = `${fd.Id}-${index}`;
  const radioWrapper = createElement('div', {
    classes: ['form-radio-option'],
  });

  const input = createElement('input', {
    classes: ['form-radio-input'],
    props: {
      type: 'radio',
      id: radioId,
      name: fd.Name,
      value: option,
      required: fd.Mandatory?.toLowerCase() === 'true',
    },
  });

  const label = createElement('label', {
    classes: ['form-radio-label'],
    props: { for: radioId },
  });

  const visualCircle = createElement('span', {
    classes: ['form-radio-circle'],
  });

  label.append(visualCircle, document.createTextNode(option));
  radioWrapper.append(input, label);
  return radioWrapper;
}

function appendHelpText(wrapper, fd) {
  if (fd.Description) {
    wrapper.append(createHelpText(fd));
  }
}

const createOutput = withFieldWrapper((fd) => {
  const output = createElement('output', {
    props: {
      name: fd.Name,
    },
  });
  if (fd.Fieldset) {
    output.dataset.fieldset = fd.Fieldset;
  }
  output.textContent = fd.Value;
  return output;
});

function createHidden(fd) {
  const input = createElement('input', {
    props: {
      type: 'hidden',
      id: fd.Id,
      name: fd.Name,
      value: fd.Value,
    },
  });
  return input;
}

function createHiddenMeta(fd) {
  let value = '';

  // get the value from the head meta tag with the name === fd.Name
  const meta = document.querySelector(`head meta[name="${fd.Name}"]`);

  if (meta) {
    value = meta.content;
  } else {
    // if the meta tag doens't exist, create it and append it to the head
    const newMeta = createElement('meta', {
      props: {
        name: fd.Name,
        content: fd.Value || '',
      },
    });

    document.head.append(newMeta);
    value = fd.Value || '';
  }

  const inputField = createElement('input', {
    props: {
      type: 'hidden',
      id: fd.Id,
      name: fd.Name,
      value,
    },
  });

  // observe the head meta tag with the name === fd.Name and everytime the value changes, update the hidden input value
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'content') {
        const newValue = mutation.target.content;
        if (inputField) {
          inputField.value = newValue;
        }
      }
    }
  });

  if (meta) {
    observer.observe(meta, { attributes: true });
  }

  return inputField;
}

function createLegend(fd) {
  return createLabel(fd, 'legend');
}

function createFieldSet(fd) {
  const wrapper = createFieldWrapper(fd, 'fieldset');
  wrapper.name = fd.Name;
  wrapper.replaceChildren(createLegend(fd));
  if (fd.Repeatable && fd.Repeatable.toLowerCase() === 'true') {
    setConstraints(wrapper, fd);
    wrapper.dataset.repeatable = 'true';
  }
  return wrapper;
}

function groupFieldsByFieldSet(form) {
  const fieldsets = form.querySelectorAll('fieldset');
  fieldsets?.forEach((fieldset) => {
    const fields = form.querySelectorAll(`[data-fieldset="${fieldset.name}"`);
    fields?.forEach((field) => {
      fieldset.append(field);
    });
  });
}

function createPlainText(fd) {
  const nameStyle = fd.Name ? `form-${kebabName(fd.Name)}` : '';
  const paragraph = createElement('p', {
    classes: nameStyle,
  });
  if (fd.Fieldset) {
    paragraph.dataset.fieldset = fd.Fieldset;
  }
  paragraph.textContent = fd.Label;
  return paragraph;
}

async function createCustomDropdown(fd) {
  const configFd = {
    optionList: fd.Options.split(',').map((o) => o.trim()),
    placeholder: fd.Placeholder,
    id: fd.Id,
    name: fd.Name,
    mandatory: fd.Mandatory,
  };

  if (fd.onChangeCallback) {
    configFd.onChangeCallback = (value) => fd.onChangeCallback({ value, name: fd.Name });
  }

  const customDropdown = await getCustomDropdown(configFd);
  const select = customDropdown.querySelector('select');
  // since dropdown is async, it replaces a temporary select
  // we need to set again the invalid listener
  select.addEventListener('invalid', showError);
  return customDropdown;
}

const getId = (function getId() {
  const ids = {};
  return (name) => {
    ids[name] = ids[name] || 0;
    const idSuffix = ids[name] ? `-${ids[name]}` : '';
    ids[name] += 1;
    return `${name}${idSuffix}`;
  };
})();

const fieldRenderers = {
  radio: createRadio,
  buttons: createRadio,
  checkbox: createCheckbox,
  textarea: createTextArea,
  select: createSelect,
  button: createButton,
  submit: createSubmit,
  output: createOutput,
  hidden: createHidden,
  fieldset: createFieldSet,
  plaintext: createPlainText,
  date: createDateInput,
  'custom-dropdown': createSelect, // create a select as a placeholder for the custom dropdown
};

function renderField(fd) {
  const renderer = fieldRenderers[fd.Type];
  let field;
  if (fd.Type === 'date' && typeof renderer === 'function') {
    field = createFieldWrapper(fd);
    field.append(renderer(fd));
  } else if (typeof renderer === 'function') {
    field = renderer(fd);
  } else {
    field = createFieldWrapper(fd);
    field.append(createInput(fd));
  }
  if (fd.Description) {
    field.append(createHelpText(fd));
  }
  return field;
}

function renderTitle(config) {
  const text = config.Label || '';
  const tag = config.Name && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(config.Name.toLowerCase()) ? config.Name.toLowerCase() : 'h2';
  const title = createElement(tag, {
    classes: [`${blockName}__subtitle`],
  });
  title.textContent = text;

  return title;
}

async function fetchData(url) {
  try {
    const resp = await fetch(url);
    const json = await resp.json();
    return json.data.map((fd) => ({
      ...fd,
      Id: fd.Id || getId(fd.Name),
      Value: fd.Value || '',
    }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function fetchForm(pathname) {
  // get the main form
  try {
    const jsonData = await fetchData(pathname);
    return jsonData;
  } catch (error) {
    console.error('Error fetching form data:', error);
    return [];
  }
}

function showError(evnt) {
  const isHidden = !!evnt.currentTarget.closest('.hidden');
  if (isHidden) {
    return;
  }

  let field = evnt.target;
  const fieldWrapper = field.closest('.field-wrapper');
  fieldWrapper.classList.add('invalid');
  let errorSpan = fieldWrapper.querySelector('span.error');
  if (!errorSpan) {
    errorSpan = createElement('span', { classes: 'error' });
    fieldWrapper.append(errorSpan);
  }
  errorSpan.innerText = field.validationMessage;
  if (fieldWrapper.classList.contains('form-custom-dropdown-wrapper')) {
    field = fieldWrapper.querySelector('.custom-dropdown__button');
  }
  field.addEventListener('blur', hideError);
}

function hideError(evnt) {
  const isCustomDropdown = evnt.target.classList.contains('custom-dropdown__button');
  const field = isCustomDropdown ? evnt.target.parentNode.querySelector('select') : evnt.target;
  const fieldWrapper = field.closest('.field-wrapper');
  const isValid = field.checkValidity();
  // to avoid showing error messages on blur
  fieldWrapper.classList.toggle('invalid', !isValid);
  const errorSpan = fieldWrapper.querySelector('span.error');
  if (errorSpan && isValid) {
    errorSpan.remove();
  }
}

function decorateValidation(form) {
  form.setAttribute('novalidate', '');
  form.querySelectorAll('input,textarea,select').forEach((el) => {
    el.addEventListener('invalid', showError);
  });
}

function cleanErrorMessages(form) {
  const spanErrors = form.querySelectorAll('span.error');
  spanErrors.forEach((span) => {
    const parentEl = span.closest('.field-wrapper.invalid');
    if (!parentEl) {
      span.remove();
    }
  });
}

function toggleNovalidateOnInput(element, novalidate = true) {
  const inputField = element.querySelector('input,select,textarea');
  if (inputField) {
    if (novalidate) {
      element.classList.add('hidden');
      inputField.setAttribute('novalidate', '');
      inputField.classList.add(CLASSES.IGNORE_ON_FORM_SUBMIT);
      inputField.setAttribute('aria-invalid', 'false');
      inputField.classList.remove('invalid');
      inputField.disabled = true;
    } else {
      element.classList.remove('hidden');
      inputField.classList.remove(CLASSES.IGNORE_ON_FORM_SUBMIT);
      inputField.removeAttribute('novalidate');
      inputField.setAttribute('aria-invalid', 'true');
      inputField.classList.add('invalid');
      inputField.disabled = false;
    }
  }
}

function validateSubmitButton(data) {
  let hasAction = true;
  let hasSubmit = false;
  data.forEach((fd) => {
    if (fd.Type === 'submit') {
      hasSubmit = true;
      if (!fd.Action || fd.Action.trim() === '') {
        console.warn('%cSubmit button%c is missing an action attribute.', 'color: red;', 'color: inherit;');
        hasAction = false;
      }
    }
  });
  if (!hasSubmit) {
    console.warn('Form is missing a %csubmit button.%c No submit Type has been found', 'color: red;', 'color: inherit;');
  }
  return hasSubmit && hasAction;
}

async function createForm(formURL) {
  const { pathname } = new URL(formURL);
  const data = await fetchForm(pathname);

  if (data.length === 0) {
    return createElement('div', {
      classes: 'custom-form__error',
      content: 'Error fetching form data',
    });
  } else if (!validateSubmitButton(data)) {
    return;
  }

  const form = createElement('form');
  const customDropdowns = [];
  const dependencies = []; // these will be used to show/hide the fields based on the dependencies
  data.forEach(async (fd) => {
    let el;

    if (fd.Type === 'title') {
      el = renderTitle(fd);
    } else if (fd.Type === 'paragraph') {
      el = createPlainText(fd);
    } else if (fd.Type === 'meta') {
      el = createHiddenMeta(fd);
    } else {
      el = renderField(fd);

      if (fd.Type === 'custom-dropdown') {
        customDropdowns.push(fd);
      }

      const formField = el.querySelector('input,textarea,select');
      if (formField) {
        if (fd.Mandatory && fd.Mandatory.toLowerCase() === 'true') {
          formField.setAttribute('required', 'required');
        }
        if (!formField.id) {
          formField.id = fd.Id;
        }
        formField.name = fd.Name;

        if (fd.Type !== 'radio') {
          formField.value = fd.Value;
        }

        if (fd.Description) {
          formField.setAttribute('aria-describedby', `${fd.Id}-description`);
        }
      }
      if (fd.Dependency) {
        // If it has a dependency, we need to hide it by default
        dependencies.push({
          element: el,
          dependency: fd.Dependency,

          name: (fd.Dependency && fd.Dependency.split(':')[0]) || '',
          value: (fd.Dependency && fd.Dependency.split(':')[1]) || '',
        });
      }
    }
    form.append(el);
  });

  if (customDropdowns.length > 0) {
    customDropdowns.forEach(async (fd, index) => {
      const hasDependency = dependencies.find((d) => d.name === fd.Name);

      if (hasDependency) {
        fd.onChangeCallback = (selected) => {
          const { name, value } = selected;
          dependencies.forEach((d) => {
            if (d.name === name) {
              toggleNovalidateOnInput(d.element, d.value !== value);
            }
          });
        };
      }

      const customDropdownPlaceholder = form.querySelectorAll('.form-custom-dropdown-wrapper')[index];
      const placeholderSelect = customDropdownPlaceholder.querySelector('select');
      const customDropdown = await createCustomDropdown(fd);
      placeholderSelect.replaceWith(customDropdown);

      if (hasDependency) {
        const { value } = hasDependency;

        setTimeout(() => {
          dependencies.forEach((d) => {
            if (d.name === hasDependency.name) {
              toggleNovalidateOnInput(d.element, d.value !== value);
            }
          });
        }, 0);
      }
    });
  }

  groupFieldsByFieldSet(form);
  form.addEventListener('submit', (e) => {
    let isValid = true;
    if (form.hasAttribute('novalidate')) {
      isValid = form.checkValidity();
    }
    // after been submitted, the form needs to clean the error messages if the fields are valid
    cleanErrorMessages(form);
    e.preventDefault();

    const honeypot = form.querySelector('input[name="form_extra_field"]');
    if (honeypot && honeypot.value) {
      console.warn('Form submission blocked: honeypot field was filled (possible bot).');
      return;
    }

    if (isValid) {
      const block = form.closest(`.${blockName}`);
      const formTitle = block.querySelector(`.${blockName}__title`);
      if (formTitle) {
        formTitle.remove();
      }
      e.submitter.setAttribute('disabled', '');
      form.dataset.action = e.submitter.formAction || SUBMIT_ACTION || pathname.split('.json')[0];
      handleSubmit(form);
    }
  });
  decorateValidation(form);
  return form;
}

function decorateTitles(block) {
  const previousSibling = block.parentElement.previousElementSibling;
  if (!previousSibling) {
    return;
  }
  const title = previousSibling.querySelector('h3');
  const subtitle = previousSibling.querySelector('h5');
  if (title) {
    title.classList.add('h3');
  }
  if (subtitle) {
    subtitle.classList.add('h5');
  }
}

function addTitleText(titleText, block) {
  const titleTextContent = createElement('div', {
    classes: [`${blockName}__title`],
  });
  titleTextContent.innerHTML = titleText.innerHTML;
  block.append(titleTextContent);
}

function createHoneypotField() {
  const fragment = document.createRange().createContextualFragment(`
    <div class="field-wrapper visually-hidden" aria-hidden="true">
      <label for="form_extra_field">Comments</label>
      <input
        type="text"
        id="form_extra_field"
        name="form_extra_field"
        tabindex="-1"
        autocomplete="off"
      >
    </div>
  `);
  return fragment.firstElementChild;
}

function getConfigValueCell(block, propName) {
  for (const row of block.querySelectorAll(':scope > div')) {
    const [propCell, valueCell] = row.children || [];
    if (propCell && propCell.textContent.trim() === propName) {
      return valueCell || null;
    }
  }
  return null;
}

export default async function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  const titleCell = getConfigValueCell(block, 'title');
  const linkCell = getConfigValueCell(block, 'link');
  const successFragmentCell = getConfigValueCell(block, 'successFragmentUrl');
  const successRedirectCell = getConfigValueCell(block, 'successRedirectUrl');
  const errorRedirectCell = getConfigValueCell(block, 'errorRedirectUrl');

  const formUrl = linkCell ? (linkCell.querySelector('a')?.href || linkCell.textContent).trim() : '';
  const isJsonUrl = formUrl.toLowerCase().trim().endsWith('.json');
  const thankYouPageUrl = successFragmentCell ? (successFragmentCell.querySelector('a')?.href || successFragmentCell.textContent).trim() : '';
  const successRedirectUrl = successRedirectCell ? (successRedirectCell.querySelector('a')?.href || successRedirectCell.textContent).trim() : '';
  const errorRedirectUrl = errorRedirectCell ? (errorRedirectCell.querySelector('a')?.href || errorRedirectCell.textContent).trim() : '';

  if (!formUrl || !isJsonUrl) {
    console.error('%cForm link%c is missing or not a .json', 'color:red', 'color:inherit', { formUrl });
    block.textContent = '';
    return;
  }

  decorateTitles(block);

  const form = await createForm(formUrl);
  if (!form) {
    console.error('%cForm%c could not be created. No form data found.', 'color:red', 'color:inherit', { formUrl, form });
    block.textContent = '';
    return;
  }

  if (successRedirectUrl) {
    form.dataset.successRedirect = successRedirectUrl;
  }
  if (errorRedirectUrl) {
    form.dataset.errorRedirect = errorRedirectUrl;
  }
  if (!successRedirectUrl && thankYouPageUrl) {
    form.dataset.customMessage = `${thankYouPageUrl}.plain.html`;
  }

  block.textContent = '';
  if (titleCell) {
    addTitleText(titleCell, block);
  }

  form.append(createHoneypotField());
  block.append(form);

  window.addEventListener('unhandledrejection', ({ reason, error }) => {
    console.error('Unhandled rejection. Error submitting form:', { reason, error });

    const activeForms = Array.from(window.__activeForms || []);
    const form = activeForms.reverse().find((f) => f.dataset.submitting === 'true');

    if (!form) {
      throwFormNotFound(form);
      return;
    }

    const block = form.closest(`.${blockName}`);
    const redirectNewTab = block?.classList.contains(`${blockName}--redirect-new-tab`) || false;
    submissionFailure(form, redirectNewTab);
  });
}
