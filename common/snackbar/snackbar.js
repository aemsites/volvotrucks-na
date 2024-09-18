// eslint-disable-next-line import/no-cycle
import {
  createElement,
  decorateIcons,
  getTextLabel,
} from '../../scripts/common.js';

const componentName = 'snackbar';

/**
 * Initializes the snackbar container with the specified position.
 *
 * @param {('left'|'center'|'right')} [positionX='center'] - The horizontal position of the snackbar
 * @param {('top'|'bottom')} [positionY='bottom'] - The vertical position of the snackbar
 * @returns {HTMLElement} The created snackbar container element
 */
const initSnackbarContainer = (positionX, positionY) => {
  const positionMapping = {
    left: 'start',
    center: 'center',
    right: 'end',
    top: 'start',
    bottom: 'end',
  };

  const x = positionMapping[positionX] || 'center';
  const y = positionMapping[positionY] || 'end';

  const container = createElement('section', {
    classes: [`${componentName}-container`],
    props: { style: `--snackbar-position: ${x} ${y}; --snackbar-animation: slide-from-${y};` },
  });
  document.body.appendChild(container);
  return container;
};

const handleCloseButtonClick = (event) => {
  const snackbar = event.target.closest(`.${componentName}`);
  if (snackbar) {
    // eslint-disable-next-line no-use-before-define
    removeSnackbar(snackbar);
  }
};

export const removeSnackbar = (snackbar) => {
  const container = snackbar.parentNode;
  const closeButton = snackbar.querySelector(`.${componentName}__close-button`);
  snackbar.classList.add(`${componentName}--hide`);

  const animationEndHandler = () => {
    container.removeChild(snackbar);
    snackbar.removeEventListener('animationend', animationEndHandler);
  };

  const style = window.getComputedStyle(snackbar);
  const animationDuration = parseFloat(style.animationDuration);

  if (animationDuration > 0) {
    snackbar.addEventListener('animationend', animationEndHandler);
  } else {
    container.removeChild(snackbar);
  }

  if (closeButton) {
    closeButton.removeEventListener('click', handleCloseButtonClick);
  }
};

const createSnackbar = (text, type, buttonsBelow, closeButton) => {
  const getIcon = () => {
    switch (type) {
      case 'error':
        return 'icon-remove';
      case 'success':
        return 'icon-checkmark-circle';
      default:
        return '';
    }
  };

  const icon = getIcon();

  const snackbar = document.createRange().createContextualFragment(`
    <output role="status" class="${componentName} ${type ? `${componentName}--${type}` : ''} ${buttonsBelow ? `${componentName}--buttons-below` : ''}">
      ${type && icon ? `<span class="icon ${icon}"></span>` : ''}
      <p>${text}</p>
      ${closeButton ? `<button
                          aria-label="${getTextLabel('Dismiss message')}"
                          class="${componentName}__close-button"
                          aria-controls="${componentName}"
                        >
                          <span class="icon icon-close" />
                        </button>` : ''}
    </output>
  `);

  if (closeButton) {
    snackbar.querySelector(`.${componentName}__close-button`).addEventListener('click', handleCloseButtonClick);
  }
  decorateIcons(snackbar);
  return snackbar;
};

const addSnackbar = (container, snackbar) => {
  if (container.children.length) {
    removeSnackbar(container.children[0]);
  }
  container.appendChild(snackbar);
};

/**
 * Displays a snackbar notification with the specified text, type, and configuration options.
 *
 * @param {string} text - The text to display in the snackbar
 * @param {(''|'error'|'success')} [type=''] - The type of the snackbar
 * @param {('left'|'center'|'right')} [positionX='center'] - The horizontal position of the snackbar
 * @param {('top'|'bottom')} [positionY='bottom'] - The vertical position of the snackbar
 * @param {boolean} [buttonsBelow=false] - Whether to display buttons below the snackbar
 * @param {boolean} [closeButton=false] - Whether to display a close button on the snackbar
 * @param {number} [duration=5000] - The duration in milliseconds for which the snackbar
 * @param {boolean} [persistent=false] - Whether the snackbar should be stay on screen until closed
 */
export default function showSnackbar(
  text,
  type,
  positionX = 'center',
  positionY = 'bottom',
  buttonsBelow = false,
  closeButton = false,
  duration = 5000,
  persistent = false,
) {
  const container = document.querySelector(`.${componentName}-container`) || initSnackbarContainer(positionX, positionY);
  const snackbar = createSnackbar(text, type, buttonsBelow, closeButton);
  addSnackbar(container, snackbar);

  if (!persistent) {
    setTimeout(() => {
      if (container.children.length) {
        removeSnackbar(container.children[0]);
      }
    }, duration);
  }
}
