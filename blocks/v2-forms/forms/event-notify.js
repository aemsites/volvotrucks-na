import { getTextLabel } from '../../../scripts/common.js';
import { getCustomDropdown, addDropdownInteraction } from '../../../common/custom-dropdown/custom-dropdown.js';

const COUNTRY_CODES = ['united-states', 'canada', 'other'];

const mapCountryCodesToLabels = (countryCodes = []) => {
  return countryCodes.map((code) => getTextLabel(`event-notify:${code}`));
};

const formName = 'event-notify';
const formContent = `
  <div class="${formName}__wrapper">
    <div class="${formName}__field-wrapper">
      <label for="${formName}-name">${getTextLabel('event-notify:first-name')}*</label>
      <input type="text" id="${formName}-name" name="first_name" autocomplete="off" placeholder="" required />
      <span class="${formName}__error-message ${formName}__error-message--hidden"></span>
    </div>
    <div class="${formName}__field-wrapper">
      <label for="${formName}-last-name">${getTextLabel('event-notify:last-name')}*</label>
      <input type="text" id="${formName}-last-name" name="last_name" autocomplete="off" placeholder="" required />
      <span class="${formName}__error-message ${formName}__error-message--hidden"></span>
    </div>
    <div class="${formName}__field-wrapper">
      <label for="${formName}-zip">${getTextLabel('event-notify:zip')}*</label>
      <input type="text" id="${formName}-zip" name="zip" autocomplete="off" placeholder="" required />
      <span class="${formName}__error-message ${formName}__error-message--hidden"></span>
    </div>
    <div class="${formName}__field-wrapper">
      <label for="${formName}-email">${getTextLabel('event-notify:email')}*</label>
      <input type="email" id="${formName}-email" name="email" autocomplete="off" placeholder="" required />
      <span class="${formName}__error-message ${formName}__error-message--hidden"></span>
    </div>
    ${await getCustomDropdown(formName, mapCountryCodesToLabels(COUNTRY_CODES), 'country')}
    <div class="${formName}__field-wrapper">
      <label for="${formName}-company">${getTextLabel('event-notify:company')}*</label>
      <input type="text" id="${formName}-company" name="company" autocomplete="off" placeholder="" required />
      <span class="${formName}__error-message ${formName}__error-message--hidden"></span>
    </div>
  </div>
  <div class="${formName}__agreement-section">
    <div class="checkbox-with-label">
      <input type="checkbox" id="${formName}-agreement" name="marketing_consent" value="true" required/>
      <label for="${formName}-agreement">
        ${getTextLabel('event-notify:agreement')}
      </label>
      <span class="${formName}__error-message ${formName}__error-message--hidden"></span>
    </div>
    <div class="${formName}__policy">
    </div>
  </div>

  <div class="${formName}__buttons">
    <button class="button primary" type="submit">${getTextLabel('event-notify:notify')}</button>
    <a class="button secondary ${formName}__add-event-button">${getTextLabel('event-notify:add-event')}</a>
  </div>
`;

const checkFieldValidity = (field, useUserInvalid = true) => {
  const errorMessageEl = field.parentElement.querySelector(`:scope > .${formName}__error-message`);

  if (errorMessageEl) {
    const isSupportingUserInvalid = CSS.supports('selector(:user-invalid)');
    const invalidSelector = isSupportingUserInvalid && useUserInvalid ? ':user-invalid' : ':invalid';
    const isInvalid = field.parentElement.querySelector(`:scope ${invalidSelector}`) === field;

    errorMessageEl.innerText = isInvalid ? field.validationMessage : '';
    errorMessageEl.classList[isInvalid ? 'remove' : 'add'](`${formName}__error-message--hidden`);
  }
};

export const postLoad = (form) => {
  form.setAttribute('novalidate', 'novalidate');

  const formHasCustomDropdown = form.querySelector('.custom-dropdown');
  if (formHasCustomDropdown) {
    addDropdownInteraction(form);
  }

  const fields = [...form.querySelectorAll('input')];

  fields.forEach((field) => {
    field.addEventListener('input', () => {
      checkFieldValidity(field);
    });

    field.addEventListener('focusout', () => {
      checkFieldValidity(field);
    });

    checkFieldValidity(field);
  });
};

export const onSubmit = async (form, handleSubmit) => {
  const fields = [...form.querySelectorAll('input, select')];

  fields.forEach((el) => checkFieldValidity(el, false));

  if (form.checkValidity()) {
    await handleSubmit(form);
  }
};

export default formContent;
