import { sampleRUM } from './aem.js';
import { getTextLabel, getLanguagePath} from './common.js';

// TODO: Verify why this is needed and also present in the Adobe eds boilerplate:
// https://github.com/adobe/aem-boilerplate/blob/main/404.html
window.isErrorPage = true;
window.errorCode = '404';

sampleRUM('404', { source: document.referrer, target: window.location.href });

if (document.referrer) {
  const { origin, pathname } = new URL(document.referrer);
  if (origin === window.location.origin) {
    const main = document.querySelector('main.error');

    const observer = new MutationObserver((mutations, observer) => {
      const fragmentContainer = document.querySelector('.fragment');
      if (fragmentContainer) {
        const backLinkTitle = getTextLabel('404:back_link_title');
        const btnContainer = document.createElement('p');
        const backBtn = document.createElement('a');
        backBtn.classList.add('button', 'button--primary');
        backBtn.href = pathname;
        backBtn.textContent = backLinkTitle;
        backBtn.title = backLinkTitle;
        btnContainer.append(backBtn);
        fragmentContainer.append(btnContainer);
        observer.disconnect();
      }
    });

    observer.observe(main, {
      childList: true,
      subtree: true,
    });
  }
}

const fragmentBlock = document.querySelector('.fragment');
const link = fragmentBlock.querySelector('a');
const path = link ? link.getAttribute('href') : fragmentBlock.textContent.trim();
const language = getLanguagePath();
const localisedPath = (language + path).replace(/\/+/g, '/');

console.log('404 logic run');
link.href = localisedPath;

import './scripts.js';
