import { loadBlock, sampleRUM } from '../../scripts/aem.js';
import { getTextLabel, createElement } from '../../scripts/common.js';

const blockName = 'v2-newsletter';

async function handleSubmissionResult({ titleText, messageText, isSuccess }) {
  const form = document.querySelector('form[data-submitting=true]');
  const title = document.querySelector(`.${blockName}__title`);
  const message = document.createRange().createContextualFragment(`<p>${messageText}</p>`);

  if (isSuccess) {
    sampleRUM('form:submit');
  }

  title.textContent = titleText;
  form.setAttribute('data-submitting', 'false');
  form.replaceWith(message);
}

window.logResult = function logResult(json) {
  if (json.result === 'success') {
    handleSubmissionResult({
      titleText: getTextLabel('v2_newsletter:success_title'),
      messageText: getTextLabel('v2_newsletter:success_text'),
      isSuccess: true,
    });
  } else if (json.result === 'error') {
    handleSubmissionResult({
      titleText: getTextLabel('v2_newsletter:error_title'),
      messageText: getTextLabel('v2_newsletter:error_text'),
      isSuccess: false,
    });
  }
};

export default async function decorate(block) {
  const formLink = block.firstElementChild.innerText.trim();
  const html = block.firstElementChild.nextElementSibling.firstElementChild.innerHTML;

  const container = createElement('div', { classes: `${blockName}__container` });

  const textContainer = createElement('div', { classes: `${blockName}__text` });
  textContainer.innerHTML = html;

  const headings = textContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
  [...headings].forEach((heading) => heading.classList.add(`${blockName}__title`));

  const formContainer = createElement('div', { classes: `${blockName}__form-container` });
  const form = document.createRange().createContextualFragment(`
    <div class="v2-forms block" data-block-name="v2-forms" data-block-status="">
      <div>
        <div>subscribe</div>
      </div>
      <div>
        <div>${formLink}</div>
      </div>
    </div>`);

  formContainer.append(...form.children);
  container.appendChild(textContainer);
  container.appendChild(formContainer);

  block.replaceWith(container);

  await loadBlock(formContainer.firstElementChild);
}

// Same form in page is not working.
