import { getTextLabel, createElement } from '../../../scripts/common.js';
import { loadCSS } from '../../scripts/aem.js';

const componentName = 'custom-dropdown';
let optionsList;

// NOTE: the code for this component was adapted from this page:
// https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
// Its here for further changes or reference

// Save a list of named actions, for future readability
const SelectActions = {
  Close: 0,
  CloseSelect: 1,
  First: 2,
  Last: 3,
  Next: 4,
  Open: 5,
  PageDown: 6,
  PageUp: 7,
  Previous: 8,
  Select: 9,
  Type: 10,
};

// filter an array of options against an input string
// returns an array of options that begin with the filter string, case-independent
function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

// map a key press to an action
function getActionFromKey(event, menuOpen) {
  const { key, altKey, ctrlKey, metaKey } = event;
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' ']; // all keys that will do the default open action
  // handle opening when closed
  if (!menuOpen && openKeys.includes(key)) {
    return SelectActions.Open;
  }

  // home and end move the selected option when open or closed
  if (key === 'Home') {
    return SelectActions.First;
  }
  if (key === 'End') {
    return SelectActions.Last;
  }

  // handle typing characters when open or closed
  if (key === 'Backspace' || key === 'Clear' || (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)) {
    return SelectActions.Type;
  }

  // handle keys when open
  if (menuOpen) {
    if (key === 'ArrowUp' && altKey) {
      return SelectActions.CloseSelect;
    } else if (key === 'ArrowDown' && !altKey) {
      return SelectActions.Next;
    } else if (key === 'ArrowUp') {
      return SelectActions.Previous;
    } else if (key === 'PageUp') {
      return SelectActions.PageUp;
    } else if (key === 'PageDown') {
      return SelectActions.PageDown;
    } else if (key === 'Escape') {
      return SelectActions.Close;
    } else if (key === 'Enter' || key === ' ') {
      return SelectActions.CloseSelect;
    }
  }
}

// return the index of an option from an array of options, based on a search string
// if the filter is multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
function getIndexByLetter(options, filter, startIndex = 0) {
  const orderedOptions = [...options.slice(startIndex), ...options.slice(0, startIndex)];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);

  // first check if there is an exact match for the typed string
  if (firstMatch) {
    return options.indexOf(firstMatch);
  }

  // if the same letter is being repeated, cycle through first-letter matches
  else if (allSameLetter(filter.split(''))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  }

  // if no matches, return -1
  else {
    return -1;
  }
}

// get an updated option index after performing an action
function getUpdatedIndex(currentIndex, maxIndex, action) {
  const pageSize = 10; // used for pageup/pagedown

  switch (action) {
    case SelectActions.First:
      return 0;
    case SelectActions.Last:
      return maxIndex;
    case SelectActions.Previous:
      return Math.max(0, currentIndex - 1);
    case SelectActions.Next:
      return Math.min(maxIndex, currentIndex + 1);
    case SelectActions.PageUp:
      return Math.max(0, currentIndex - pageSize);
    case SelectActions.PageDown:
      return Math.min(maxIndex, currentIndex + pageSize);
    default:
      return currentIndex;
  }
}

// check if element is visible in browser view port
function isElementInView(element) {
  const bounding = element.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// check if an element is currently scrollable
function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

// ensure a given child element is within the parent's visible scroll area
// if the child is not visible, scroll the parent
function maintainScrollVisibility(activeElement, scrollParent) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAbove = offsetTop < scrollTop;
  const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isAbove) {
    scrollParent.scrollTo(0, offsetTop);
  } else if (isBelow) {
    scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
  }
}

/*
 * Select Component
 * Accepts a clickable element and an array of string options
 */
const Select = function (el, options = []) {
  // element refs
  this.el = el;
  this.labelEl = el.querySelector(`.${componentName}__label`);
  this.buttonEl = el.querySelector(`[role=${componentName}-button]`);
  this.listEl = el.querySelector(`[role=${componentName}-option-list]`);

  // data
  this.idBase = this.buttonEl.id || componentName;
  this.options = options;

  // state
  this.activeIndex = 0;
  this.open = false;
  this.searchString = '';
  this.searchTimeout = null;

  // init
  if (el && this.buttonEl && this.listEl) {
    this.init();
  }
};

Select.prototype.init = function init() {
  // select first option by default
  this.buttonEl.innerHTML = this.options[0];

  // add event listeners
  this.buttonEl.addEventListener('blur', this.onButtonBlur.bind(this));
  this.listEl.addEventListener('focusout', this.onButtonBlur.bind(this));
  this.buttonEl.addEventListener('click', this.onButtonClick.bind(this));
  this.buttonEl.addEventListener('keydown', this.onButtonKeyDown.bind(this));

  // create options
  this.options.map((option, index) => {
    const optionEl = this.createOption(option, index);
    this.listEl.appendChild(optionEl);
  });
};

Select.prototype.createOption = function createOption(optionText, index) {
  const optionEl = createElement('div');
  optionEl.setAttribute('role', 'option');
  optionEl.id = `${this.idBase}-${index}`;
  optionEl.className = index === 0 ? `${componentName}__option option-current` : `${componentName}__option`;
  optionEl.setAttribute('aria-selected', `${index === 0}`);
  optionEl.innerText = optionText;

  optionEl.addEventListener('click', (event) => {
    event.stopPropagation();
    this.onOptionClick(index);
  });
  optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

  return optionEl;
};

Select.prototype.getSearchString = function getSearchString(char) {
  // reset typing timeout and start new timeout
  // this allows us to make multiple-letter matches, like a native select
  if (typeof this.searchTimeout === 'number') {
    window.clearTimeout(this.searchTimeout);
  }

  this.searchTimeout = window.setTimeout(() => {
    this.searchString = '';
  }, 500);

  // add most recent letter to saved search string
  this.searchString += char;
  return this.searchString;
};

Select.prototype.onButtonBlur = function onButtonBlur(event) {
  // do nothing if relatedTarget is contained within listEl
  if (this.listEl.contains(event.relatedTarget)) {
    return;
  }

  // select current option and close
  if (this.open) {
    this.selectOption(this.activeIndex);
    this.updateMenuState(false, false);
  }
};

Select.prototype.onButtonClick = function onButtonClick() {
  this.updateMenuState(!this.open, false);
};

Select.prototype.onButtonKeyDown = function onButtonKeyDown(event) {
  const { key } = event;
  const max = this.options.length - 1;

  const action = getActionFromKey(event, this.open);

  switch (action) {
    case SelectActions.Last:
    case SelectActions.First:
      this.updateMenuState(true);
    // intentional fallthrough
    case SelectActions.Next:
    case SelectActions.Previous:
    case SelectActions.PageUp:
    case SelectActions.PageDown:
      event.preventDefault();
      return this.onOptionChange(getUpdatedIndex(this.activeIndex, max, action));
    case SelectActions.CloseSelect:
      event.preventDefault();
      this.selectOption(this.activeIndex);
    // intentional fallthrough
    case SelectActions.Close:
      event.preventDefault();
      return this.updateMenuState(false);
    case SelectActions.Type:
      return this.onButtonType(key);
    case SelectActions.Open:
      event.preventDefault();
      return this.updateMenuState(true);
  }
};

Select.prototype.onButtonType = function onButtonType(letter) {
  // open the listbox if it is closed
  this.updateMenuState(true);

  // find the index of the first matching option
  const searchString = this.getSearchString(letter);
  const searchIndex = getIndexByLetter(this.options, searchString, this.activeIndex + 1);

  // if a match was found, go to it
  if (searchIndex >= 0) {
    this.onOptionChange(searchIndex);
  }
  // if no matches, clear the timeout and search string
  else {
    window.clearTimeout(this.searchTimeout);
    this.searchString = '';
  }
};

Select.prototype.onOptionChange = function onOptionChange(index) {
  // update state
  this.activeIndex = index;

  // update aria-activedescendant
  this.buttonEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

  // update active option styles
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.classList.remove('option-current');
  });
  options[index].classList.add('option-current');

  // ensure the new option is in view
  if (isScrollable(this.listEl)) {
    maintainScrollVisibility(options[index], this.listEl);
  }

  // ensure the new option is visible on screen
  // ensure the new option is in view
  if (!isElementInView(options[index])) {
    options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

Select.prototype.onOptionClick = function onOptionClick(index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
};

Select.prototype.onOptionMouseDown = function onOptionMouseDown() {
  // Clicking an option will cause a blur event,
  // but we don't want to perform the default keyboard blur action
  this.ignoreBlur = true;
};

Select.prototype.selectOption = function selectOption(index) {
  // update state
  this.activeIndex = index;

  // update displayed value
  const selected = this.options[index];
  this.buttonEl.innerHTML = selected;

  // this updates the value of the select that gets inputed in the forms
  const selectHtml = this.el.closest(`.${componentName}`).querySelector('select');
  selectHtml.selectedIndex = index;

  // update aria-selected
  const options = this.el.querySelectorAll('[role=option]');
  [...options].forEach((optionEl) => {
    optionEl.setAttribute('aria-selected', 'false');
  });
  options[index].setAttribute('aria-selected', 'true');
};

Select.prototype.updateMenuState = function updateMenuState(open, callFocus = true) {
  if (this.open === open) {
    return;
  }

  // update state
  this.open = open;

  // update aria-expanded and styles
  this.buttonEl.setAttribute('aria-expanded', `${open}`);
  open ? this.el.classList.add('open') : this.el.classList.remove('open');

  // update activedescendant
  const activeID = open ? `${this.idBase}-${this.activeIndex}` : '';
  this.buttonEl.setAttribute('aria-activedescendant', activeID);

  if (activeID === '' && !isElementInView(this.buttonEl)) {
    this.buttonEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // move focus back to the button, if needed
  callFocus && this.buttonEl.focus();
};

/**
 * Add dropdown interaction to mimic the option list of a select element using the custom dropdown component
 * @param {HTMLElement} form the form element that contains the dropdown
 * @param {string[]} optionsArray the list of options to display in the dropdown (default is the optionsList)
 */
export const addDropdownInteraction = (form, optionsArray = optionsList) => {
  const selectEls = form.querySelectorAll(`.${componentName}`);
  selectEls?.forEach((el) => {
    new Select(el, optionsArray);
  });
};

const createOptionMarkup = (idx, option) => {
  return `
      <option
        value="${option}"
        data-index-number="${idx}"
        ${idx === 0 ? 'selected' : ''}>
          ${option}
      </option>`;
};

const createSelectHtml = (list) => {
  return list.map((item, idx) => createOptionMarkup(idx, item)).join('');
};

export const getCustomDropdown = (formName, list, type) => {
  const baseURL = window.location.origin;
  optionsList = list;

  return loadCSS(`${baseURL}/common/${componentName}/${componentName}.css`)
    .then(() => {
      return `
        <div class="${componentName} ${formName}__field-wrapper">
          <label
            id="${componentName}-label"
            class="${componentName}__label">${getTextLabel(`event-notify:${type}`)}*
          </label>
          <div
            aria-controls="options"
            aria-expanded="false"
            aria-haspopup="${componentName}"
            aria-labelledby="${componentName}-label"
            id="${componentName}"
            class="${componentName}__button"
            role="${componentName}-button"
            tabindex="0"
          ></div>
          <div
            aria-labelledby="${componentName}-label"
            id="options"
            class="${componentName}__option-list"
            role="${componentName}-option-list"
            tabindex="-1"
          ></div>
          <select
            aria-hidden="true"
            name="${type}"
            class="native-select"
            autocomplete="off"
            required>
            ${createSelectHtml(optionsList)}
          </select>
        </div>
      `;
    })
    .catch((error) => {
      console.error('Failed to load CSS:', error);
      return '';
    });
};

export const getAsyncCustomDropdown = async (options = {}) => {
  const baseUrl = window.location.origin;
  const { optionList = [], label = '', mandatory = false, id = '', placeholder = '', name = '' } = options;
  const dropdownCSS = `${baseUrl}/common/${componentName}/${componentName}.css`;
  try {
    await loadCSS(dropdownCSS);
    const labelClass = label ? `${componentName}__label` : 'field-label';
    return `
      <div class="${componentName}">
        ${label ? `<label class="${labelClass}">${getTextLabel(label)}${mandatory ? '*' : ''}</label>` : ''}
        <div
          aria-controls="options"
          aria-expanded="false"
          aria-haspopup="${componentName}"
          aria-labelledby="${labelClass}"
          id="${id ? id : `${componentName}`}"
          class="${componentName}__button"
          role="${componentName}-button"
          tabindex="0"
        >${placeholder || optionList[0]}</div>
        <div
          aria-labelledby="${labelClass}"
          id="options"
          class="${componentName}__option-list"
          role="${componentName}-option-list"
          tabindex="-1"
        ></div>
        <select
          aria-hidden="true"
          name="${name}"
          class="native-select"
          autocomplete="off"
          ${mandatory ? 'required' : ''}>
          ${placeholder ? `<option value="" selected disabled>${placeholder}</option>` : ''}
          ${createSelectHtml(optionList)}
        </select>
      </div>
    `;
  } catch (error) {
    console.error(`Failed to load CSS from ${dropdownCSS}:`, error);
  }
};
