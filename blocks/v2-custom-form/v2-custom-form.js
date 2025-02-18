import { loadScript, sampleRUM } from '../../scripts/aem.js';
import { getTextLabel, createElement } from '../../scripts/common.js';
import { getCustomDropdown } from '../../../common/custom-dropdown/custom-dropdown.js';

const blockName = 'v2-custom-form';

const successMessage = (successTitle, successText) => `<h3 class='${blockName}__title ${blockName}__title--success'>${successTitle}</h3>
<p class='${blockName}__text ${blockName}__text--success'>${successText}</p>
`;

const errorMessage = (errorTitle, errorText) => `<h3 class='${blockName}__title ${blockName}__title--error'>${errorTitle}</h3>
<p class='${blockName}__text ${blockName}__text--error'>${errorText}</p>
`;

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

async function submissionSuccess() {
  sampleRUM('form:submit');
  const successDiv = createElement('div', {
    classes: [`${blockName}--message`, `${blockName}__message--success`],
  });
  successDiv.innerHTML = successMessage(getMessageText(true, true), getMessageText(true, false));
  const form = document.querySelector('form[data-submitting=true]');
  const hasCustomMessage = form.dataset.customMessage;

  if (hasCustomMessage) {
    successDiv.innerHTML = await getCustomMessage(hasCustomMessage);
  }
  form.setAttribute('data-submitting', 'false');
  form.replaceWith(successDiv);
}

async function submissionFailure() {
  const errorDiv = createElement('div', {
    classes: [`${blockName}--message`, `${blockName}__message--error`],
  });
  errorDiv.innerHTML = errorMessage(getMessageText(false, true), getMessageText(false, false));
  const form = document.querySelector('form[data-submitting=true]');
  form.setAttribute('data-submitting', 'false');
  form.querySelector('button[type="submit"]').disabled = false;
  form.replaceWith(errorDiv);
}

// callback
window.logResult = function logResult(json) {
  if (json.result === 'success') {
    submissionSuccess();
  } else if (json.result === 'error') {
    submissionFailure();
  }
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
    if (fe.name) {
      if (fe.type === 'radio' && fe.checked) {
        payload[fe.name] = fe.value;
      } else if (fe.type === 'checkbox' && fe.checked) {
        payload[fe.name] = payload[fe.name] ? `${payload[fe.name]},${fe.value}` : fe.value;
      } else if (fe.type !== 'file') {
        payload[fe.name] = fe.value;
      }
    }
  });
  payload.callback = 'logResult';
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
    await prepareRequest(form);
  }
}

function setPlaceholder(element, fd) {
  if (fd.Placeholder) {
    element.setAttribute('placeholder', fd.Placeholder);
  }
}

const constraintsDef = Object.entries({
  'email|text': [
    ['Max', 'maxlength'],
    ['Min', 'minlength'],
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
        element.setAttribute(htmlNm, fd[nm]);
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
  return name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

function createFieldWrapper(fd, tagName = 'div') {
  const nameStyle = fd.Name ? `form-${kebabName(fd.Name)}` : '';
  const fieldWrapper = createElement(tagName, {
    classes: [`form-${fd.Type}-wrapper`, 'field-wrapper'],
    props: {
      id: fd.Id,
      name: fd.Name,
    },
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

const withFieldWrapper = (element) => (fd) => {
  const wrapper = createFieldWrapper(fd);
  wrapper.append(element(fd));
  return wrapper;
};

const createTextArea = withFieldWrapper((fd) => {
  const textArea = createElement('textarea');
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

function createRadio(fd) {
  const wrapper = createFieldWrapper(fd);
  wrapper.insertAdjacentElement('afterbegin', createInput(fd));
  return wrapper;
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
  const input = createInput('input', {
    props: {
      type: 'hidden',
      id: fd.Id,
      name: fd.Name,
      value: fd.Value,
    },
  });
  return input;
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
  const customDropdown = await getCustomDropdown(configFd);
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
  checkbox: createRadio,
  textarea: createTextArea,
  select: createSelect,
  button: createButton,
  submit: createSubmit,
  output: createOutput,
  hidden: createHidden,
  fieldset: createFieldSet,
  plaintext: createPlainText,
  'custom-dropdown': createSelect, // create a select as a placeholder for the custom dropdown
};

function renderField(fd) {
  const renderer = fieldRenderers[fd.Type];
  let field;
  if (typeof renderer === 'function') {
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
  const field = evnt.target;
  const fieldWrapper = field.parentNode;
  fieldWrapper.classList.add('invalid');
  let errorSpan = fieldWrapper.querySelector('span.error');
  if (!errorSpan) {
    errorSpan = document.createElement('span');
    errorSpan.classList.add('error');
    fieldWrapper.append(errorSpan);
  }
  errorSpan.innerText = field.validationMessage;
  field.addEventListener('blur', hideError);
}

function hideError(evnt) {
  const field = evnt.target;
  const fieldWrapper = field.parentNode;
  // to avoid showing error messages on blur
  if (field.checkValidity()) {
    fieldWrapper.classList.remove('invalid');
  } else {
    fieldWrapper.classList.add('invalid');
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

async function createForm(formURL) {
  const { pathname } = new URL(formURL);
  const data = await fetchForm(pathname);

  if (data.length === 0) {
    return createElement('div', {
      classes: 'custom-form__error',
      content: 'Error fetching form data',
    });
  }
  const form = createElement('form');
  const customDropdowns = [];
  data.forEach(async (fd) => {
    const el = renderField(fd);

    if (fd.Type === 'custom-dropdown') {
      customDropdowns.push(fd);
    }

    const formField = el.querySelector('input,textarea,select');
    if (fd.Mandatory && fd.Mandatory.toLowerCase() === 'true') {
      formField.setAttribute('required', 'required');
    }
    if (formField) {
      formField.id = fd.Id;
      formField.name = fd.Name;
      formField.value = fd.Value;
      if (fd.Description) {
        formField.setAttribute('aria-describedby', `${fd.Id}-description`);
      }
    }
    form.append(el);
  });

  if (customDropdowns.length > 0) {
    customDropdowns.forEach(async (fd, index) => {
      const customDropdownPlaceholder = form.querySelectorAll('.form-custom-dropdown-wrapper')[index];
      const placholderSelect = customDropdownPlaceholder.querySelector('select');
      const customDropdown = await createCustomDropdown(fd);
      placholderSelect.replaceWith(customDropdown);
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
    if (isValid) {
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

export default async function decorate(block) {
  const formLink = block.querySelector('a[href$=".json"]');
  const thankYouPage = [...block.querySelectorAll('a')].filter((a) => a.href.includes('thank-you'));

  if (formLink) {
    decorateTitles(block);
    const form = await createForm(formLink.href);
    if (thankYouPage.length > 0) {
      form.dataset.customMessage = `${thankYouPage[0].href}.plain.html`;
      block.lastElementChild.remove();
    }
    formLink.replaceWith(form);
  }
}
