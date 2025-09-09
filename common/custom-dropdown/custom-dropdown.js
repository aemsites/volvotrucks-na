import { getTextLabel, createElement } from '../../../scripts/common.js';
import { loadCSS } from '../../scripts/aem.js';

const componentName = 'custom-dropdown';

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

/**
 * Get the value of an option.
 *
 * @param {string | Object} option - The option to get the value from.
 * @returns {string} - The value of the option.
 */
function getOptionValue(option) {
  return typeof option === 'string' ? option : option.value;
}

/**
 * Get the label of an option.
 *
 * @param {string | Object} option - The option to get the label from.
 * @returns {string} - The label of the option.
 */
function getOptionLabel(option) {
  return typeof option === 'string' ? option : option.label;
}

/**
 * Filter an array of options against an input string.
 *
 * @param {string[]} options - The list of options to filter.
 * @param {string} filter - The search string to filter the options.
 * @param {string[]} [exclude=[]] - The list of options to exclude from the filtered list.
 * @returns {string[]} - Returns an array of options that begin with the filter string, case-independent.
 * @example
 * const options = ['Apple', 'Banana', 'Cherry'];
 * const filter = 'a';
 * const exclude = ['Banana'];
 * const filteredOptions = filterOptions(options, filter, exclude);
 * // expected output: ['Apple']
 */
function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}

/**
 * Map the key pressed to perform an action.
 *
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {boolean} menuOpen - If the dropdown menu is open or not.
 * @returns {SelectActions} - The action to perform based on the key pressed.
 */
function getActionFromKey(event, menuOpen) {
  const { key, altKey, ctrlKey, metaKey } = event;
  // all keys that will trigger the default open action
  const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];
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

/**
 * Get the index of an option from an array of options, based on a search string.
 * if the filter has multiple iterations of the same letter (e.g "aaa"), then cycle through first-letter matches
 *
 * @param {string[]} options - The list of options to search.
 * @param {string} filter - The search string to filter the options.
 * @param {number} [startIndex=0] - The index to start searching from.
 * @returns {number} - The index of the option from the list of options.
 * @example
 * const options = ['Apple', 'Banana', 'Cherry'];
 * const filter = 'a';
 * const startIndex = 0;
 * const index = getIndexByLetter(options, filter, startIndex);
 * // expected output: 0
 */
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

/**
 * Get the updated index of an option after performing an action.
 *
 * @param {number} currentIndex - The current index of the option.
 * @param {number} maxIndex - The maximum index of the options.
 * @param {SelectActions} action - The action to perform.
 * @returns {number} - The updated index of the option.
 * @example
 * const currentIndex = 0;
 * const maxIndex = 2;
 * const action = SelectActions.Next;
 * const updatedIndex = getUpdatedIndex(currentIndex, maxIndex, action);
 * // expected output: 1
 */
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

/**
 * Check if an element is currently in the view port.
 *
 * @param {HTMLElement} element - The element to check if it is in the view port.
 * @returns {boolean} - Returns true if the element is in the view port, otherwise false.
 */
function isElementInView(element) {
  const bounding = element.getBoundingClientRect();

  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * check if an element is currently scrollable
 *
 * @param {HTMLElement} element - The element to check if it is scrollable.
 * @returns {boolean} - Returns true if the element is scrollable, otherwise false.
 */
function isScrollable(element) {
  return element && element.clientHeight < element.scrollHeight;
}

/**
 * Ensure a given child element is within the parent's visible scroll area.
 * If the child is not visible, scroll the parent.
 *
 * @param {HTMLElement} activeElement - The child element to ensure is visible.
 * @param {HTMLElement} scrollParent - The parent element to scroll if the child is not visible.
 */
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

/**
 * Select Component
 * Accepts a clickable element and an array of string options
 *
 * @param {HTMLElement} el - The element to attach the select component to.
 * @param {string[]} options - The list of options to display in the select.
 * @param {string} placeholder - The placeholder text for the select.
 * @param {function} onChangeCallback - The callback function to be called when the value changes.
 */
const Select = function (el, options = [], placeholder, onChangeCallback) {
  // element refs
  this.el = el;
  this.labelEl = el.querySelector(`.${componentName}__label`);
  this.buttonEl = el.querySelector('[role=button]');
  this.listEl = el.querySelector('[role=listbox]');
  this.initialState = true;

  // data
  this.idBase = this.buttonEl.id || componentName;
  this.placeholder = placeholder;
  this.options = options;
  this.onChangeCallback = onChangeCallback;

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

/**
 * Initialize the select component.
 */
Select.prototype.init = function init() {
  // select first option by default
  this.buttonEl.innerHTML = getOptionLabel(this.placeholder || this.options[0]);

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

/**
 * Create an option element.
 *
 * @param {string} option - The option to create an element for.
 * @param {number} index - The index of the option in the list.
 * @returns {HTMLElement} - The option element.
 */
Select.prototype.createOption = function createOption(option, index) {
  const optionEl = createElement('div');
  optionEl.setAttribute('role', 'option');
  optionEl.id = `${this.idBase}-${index}`;

  if (this.placeholder) {
    optionEl.className = `${componentName}__option`;
  } else {
    optionEl.className = index === 0 ? `${componentName}__option option-current` : `${componentName}__option`;
    optionEl.setAttribute('aria-selected', `${index === 0}`);
  }

  optionEl.innerText = getOptionLabel(option);

  optionEl.addEventListener('click', (event) => {
    event.stopPropagation();
    this.onOptionClick(index);
  });
  optionEl.addEventListener('mousedown', this.onOptionMouseDown.bind(this));

  return optionEl;
};

/**
 * Get the search string by adding the most recent letter to the saved search string.
 *
 * @param {string} char - The most recent letter to add to the search string.
 * @returns {string} - The search string.
 */
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

/**
 * Handle the blur event on the button.
 *
 * @param {FocusEvent} event - The blur event.
 */
Select.prototype.onButtonBlur = function onButtonBlur(event) {
  // do nothing if relatedTarget is contained within listEl
  if (this.listEl.contains(event.relatedTarget)) {
    return;
  }

  // select current option and close
  if (this.open) {
    this.updateMenuState(false, false);
  }
};

/**
 * Handle the click event on the button.
 */
Select.prototype.onButtonClick = function onButtonClick() {
  this.updateMenuState(!this.open, false);
};

/**
 * Handle the keydown event on the button.
 *
 * @param {KeyboardEvent} event - The keydown event.
 */
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

/**
 * Handle the type event on the button.
 *
 * @param {string} letter - The letter to type.
 */
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

/**
 * Handle the change event on an option.
 *
 * @param {number} index - The index of the option that changed.
 */
Select.prototype.onOptionChange = function onOptionChange(index) {
  // update state
  this.activeIndex = index;

  // update aria-activedescendant
  this.buttonEl.setAttribute('aria-activedescendant', `${this.idBase}-${index}`);

  // update active option styles
  const optionsElements = this.el.querySelectorAll('[role=option]');
  [...optionsElements].forEach((optionEl) => {
    optionEl.classList.remove('option-current');
  });
  optionsElements[index].classList.add('option-current');

  // ensure the new option is in view
  if (isScrollable(this.listEl)) {
    maintainScrollVisibility(optionsElements[index], this.listEl);
  }

  // ensure the new option is visible on screen
  // ensure the new option is in view
  if (!isElementInView(optionsElements[index])) {
    optionsElements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
};

/**
 * Handle the click event on an option.
 *
 * @param {number} index - The index of the option that was clicked.
 * @param {MouseEvent} event - The click event.
 */
Select.prototype.onOptionClick = function onOptionClick(index) {
  this.onOptionChange(index);
  this.selectOption(index);
  this.updateMenuState(false);
};

/**
 * Handle the mousedown event on an option.
 */
Select.prototype.onOptionMouseDown = function onOptionMouseDown() {
  // Clicking an option will cause a blur event,
  // but we don't want to perform the default keyboard blur action
  this.ignoreBlur = true;
};

/**
 * create an option item from the select element.
 *
 * @param {number} index - The index of the option to select.
 */
Select.prototype.selectOption = function selectOption(index) {
  // update state
  this.activeIndex = index;

  // update displayed value
  const selected = this.options[index];
  this.buttonEl.innerHTML = getOptionLabel(selected);

  // this updates the value of the select that gets inputed in the forms
  const selectHtml = this.el.closest(`.${componentName}`).querySelector('select');
  selectHtml.selectedIndex = this.placeholder ? index + 1 : index;

  // update aria-selected
  const optionsElements = this.el.querySelectorAll('[role=option]');
  [...optionsElements].forEach((optionEl) => {
    optionEl.setAttribute('aria-selected', 'false');
  });
  optionsElements[index].setAttribute('aria-selected', 'true');

  // call the onChangeCallback if provided
  if (this.onChangeCallback) {
    this.onChangeCallback(selected);
  }
};

/**
 * Update the state of the dropdown menu.
 *
 * @param {boolean} open - If the dropdown menu is open or not.
 * @param {boolean} [callFocus=true] - If the focus should be called on the button.
 */
Select.prototype.updateMenuState = function updateMenuState(open, callFocus = true) {
  if (this.open === open) {
    return;
  }

  // change placeholder text color
  if (this.placeholder !== this.buttonEl.textContent) {
    this.buttonEl.classList.remove('placeholder-state');
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
 * Generates the markup for an HTML option element.
 *
 * @param {number} idx - The index of the option in the list.
 * @param {string|Object} option - The option data, which can be a string or an object with `value` and `label` properties.
 * @returns {string} The HTML markup for the option element.
 */
const createOptionMarkup = (idx, option, hasPlaceholder) => {
  return `
      <option
        value="${getOptionValue(option)}"
        ${idx === 0 && !hasPlaceholder ? 'selected' : ''}>
          ${getOptionLabel(option)}
      </option>`;
};

/**
 * Generates the markup for a list of HTML option elements.
 *
 * @param {string[]|Object[]} list - The list of options to generate the markup for.
 * @param {boolean} hasPlaceholder - If the list has a placeholder option.
 * @returns {string} The HTML markup for the list of option elements.
 */
const createSelectHtml = (list, hasPlaceholder) => {
  return list.map((item, idx) => createOptionMarkup(idx, item, hasPlaceholder)).join('');
};

/**
 * Get the variant classes for the dropdown.
 *
 * @param {Object} options - The options to configure the dropdown.
 * @param {string[]} options.variants - The list of variants to apply to the dropdown.
 * @returns {string} The variant classes for the dropdown.
 */
function getVariantClasses(options) {
  const { variants = [] } = options;
  if (!Array.isArray(variants)) {
    return [];
  }
  return variants.map((variant) => `${componentName}--variant-${variant}`).join(' ');
}

/**
 * Get the custom dropdown component asynchronously because it requires a CSS file to be loaded.
 *
 * @param {Object} options - The options to configure the dropdown.
 * @param {string[] | Object[]} options.optionList - The list of options to display in the dropdown. Each option can be a string or an object with `value` and `label` properties.
 * @param {string} options.label - The label to grab from the placeholder file using getTextLabel function.
 * @param {boolean} options.mandatory - If the dropdown is required or not.
 * @param {string} options.id - The id of the dropdown.
 * @param {string} options.placeholder - The placeholder text for the dropdown to be used as the default option.
 * @param {string} options.name - The name of the hidden select element that will be submitted in the form.
 * @param {string} options.formName - The name of the form that contains the dropdown.
 * @param {function} [options.onChangeCallback] - The callback function to be called when the value changes.
 * @param {string[]} options.variants - "thick", "adjust-width-to-content".
 *
 * Variants:
 * - "thick": Adds thicker appearance.
 * - "adjust-width-to-content": By default the dropdown will have a width of 100% of the container. If this option is set to true, the dropdown will adjust its width to the content.
 *
 * @returns {Promise<HTMLElement>} - The custom dropdown component as an HTMLElement.
 */
export const getCustomDropdown = async (options = {}) => {
  const baseUrl = window.location.origin !== 'null' ? window.location.origin : window.location.ancestorOrigins && window.location.ancestorOrigins[0];
  const { optionList = [], label = '', mandatory = false, id = '', placeholder = '', name = '', formName = '' } = options;
  const dropdownCSS = `${baseUrl}/common/${componentName}/${componentName}.css`;
  const className = options.variants ? [componentName, getVariantClasses(options)] : componentName;
  const el = createElement('div', { classes: className });

  if (formName) {
    el.classList.add(`${formName}__field-wrapper`);
  }

  try {
    await loadCSS(dropdownCSS);
    const labelClass = label ? `${componentName}__label` : 'field-label';
    const innerContent = `

        ${label ? `<label id="${labelClass} class="${labelClass}">${getTextLabel(label)}${mandatory ? '*' : ''}</label>` : ''}
        <div
          ${id ? `id="${id}"` : ''}
          ${labelClass ? `aria-labelledby="${labelClass}"` : ''}
          aria-controls="options"
          aria-expanded="false"
          aria-haspopup="${componentName}"
          class="${componentName}__button placeholder-state"
          role="button"
          tabindex="0"
        ></div>
        <div
          ${labelClass ? `aria-labelledby="${labelClass}"` : ''}
          id="options"
          class="${componentName}__option-list"
          role="listbox"
          tabindex="-1"
        ></div>
        <select
          ${name ? `name="${name}"` : ''}
          aria-hidden="true"
          class="native-select"
          autocomplete="off"
          ${mandatory ? 'required' : ''}>
          ${placeholder ? `<option value="" selected disabled>${placeholder}</option>` : ''}
          ${createSelectHtml(optionList, !!placeholder)}
        </select>
    `;

    el.appendChild(document.createRange().createContextualFragment(innerContent));

    new Select(el, optionList, placeholder, options.onChangeCallback);
    return el;
  } catch (error) {
    console.error(`Failed to load CSS from ${dropdownCSS}:`, error);
    return '';
  }
};
