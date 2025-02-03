import { getTextLabel } from '../../../scripts/common.js';
import { loadCSS } from '../../scripts/aem.js';

loadCSS(`${window.hlx.codeBasePath}/common/dropdown/dropdown.css`);

const createOptionMarkup = (idx, tagElmt, country, defaultValue, isCustomSelect) => {
  return `
      <${tagElmt}
        class="${isCustomSelect ? 'custom-option' : 'native-option'} ${idx === 0 ? 'selected' : ''}"
        id="country-${idx}"
        value="${country}" 
        data-index-number="${idx}"
        tabindex="0"
        ${idx === 0 ? 'selected' : ''}>
          ${country}
      </${tagElmt}>`;
};

const createSelects = (countries, tagElmt, defaultValue) => {
  const isCustomSelect = tagElmt !== 'option';
  return countries.map((country, idx) => createOptionMarkup(idx, tagElmt, country, defaultValue, isCustomSelect)).join('');
};

const toggleDropdown = (e, form) => {
  e.preventDefault();

  const target = e.target;
  const isExpanded = target.classList.contains('open');
  target.setAttribute('aria-expanded', !isExpanded);
  target.classList.toggle('open');

  form.querySelector('.custom-dropdown').classList.toggle('expand');
};

const handleValueChange = (e) => {
  const target = e.target;
  const targetIndex = target.dataset.indexNumber;

  const wrapper = target.closest('.custom-select');
  const select = wrapper.querySelector('.native-select');
  const dropdown = wrapper.querySelector('.custom-dropdown');

  dropdown.classList.toggle('expand');
  const button = wrapper.querySelector('.custom-trigger');
  button.classList.remove('open');
  button.textContent = target.innerText.trim();
  button.setAttribute('aria-expanded', 'false');

  const options = dropdown.querySelectorAll('.custom-option');
  options.forEach((el) => el.classList.remove('selected'));
  options[targetIndex].classList.add('selected');

  select.selectedIndex = targetIndex;
};

const isOutsideClick = (e, dropdown, button) => {
  const outsideClick = !dropdown.contains(e.target) && !button.contains(e.target);
  if (outsideClick && dropdown.classList.contains('expand')) {
    dropdown.classList.remove('expand');
    button.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }
};

const moveFocus = (e) => {
  const currentIndex = e.target.dataset.indexNumber;
  const options = e.target.closest('.custom-dropdown');

  if (e.key === 'ArrowDown') {
    const nextOption = options[currentIndex + 1];
    if (nextOption) {
      nextOption.focus();
    }
  } else if (e.key === 'ArrowUp') {
    const prevOption = options[currentIndex - 1];
    if (prevOption) {
      prevOption.focus();
    }
  } else if (e.key === 'Enter' || e.key === ' ') {
    handleValueChange(e);
  }
};

export const addDropdownListeners = (form) => {
  const customDropdown = form.querySelector('.custom-dropdown');
  const customOptions = customDropdown.querySelectorAll('.custom-option');
  const triggerBtn = form.querySelector('.custom-trigger');

  triggerBtn.addEventListener('click', (e) => toggleDropdown(e, form));
  customOptions.forEach((option) => option.addEventListener('click', (e) => handleValueChange(e)));
  document.addEventListener('click', (e) => isOutsideClick(e, customDropdown, triggerBtn));

  customOptions.forEach((option) => {
    option.addEventListener('keydown', (e) => moveFocus(e));
  });
};

export const getCustomDropdown = (formName, optionsList, type) => {
  const defaultValue = optionsList[0];
  const customSelect = `
    <div class="${formName}__field-wrapper custom-select">
      <label
        id="${formName}-${type}-label">
        ${getTextLabel(`event-notify:${type}`)}*
      </label>

      <select 
        class="native-select"
        type="${type}"
        id="${formName}-${type}"
        name="${type}"
        autocomplete="off"
        required>
        ${createSelects(optionsList, 'option', defaultValue)} 
      </select>

      <button class="custom-trigger" 
        aria-haspopup="listbox" 
        aria-expanded="false" 
        aria-controls="listbox"
        aria-labelledby="${formName}-${type}-label"
        aria-label="Select a ${type}">
        ${defaultValue}
        <span class="icon icon-chevron-down" aria-hidden="true" />
      </button>

      <div 
        class="custom-dropdown"
        id="listbox"
        role="listbox" 
        aria-label="${type}-selection"
        aria-labelledby="${formName}-${type}-label">
        ${createSelects(optionsList, 'div', defaultValue)} 
      </div>
    </div>`;

  return customSelect;
};
