import { hideSidebar } from '../../common/sidebar/sidebar.js';
import { getTextLabel, isTargetingAllowed } from '../../scripts/common.js';

// eslint-disable no-console
const addForm = async (block) => {
  // hiding till ready to display
  const displayValue = block.style.display;
  block.style.display = 'none';

  const formName = block.firstElementChild.innerText.trim();
  const thankYou = block.firstElementChild.nextElementSibling;
  const data = await fetch(`${window.hlx.codeBasePath}/blocks/eloqua-form/forms/${formName}.html`);
  if (!data.ok) {
    console.error(`failed to load form: ${formName}`);
    block.innerHTML = '';
    return;
  }

  block.innerHTML = await data.text();

  if (thankYou) {
    const form = block.querySelector('form');
    const oldSubmit = form.onsubmit;
    thankYou.classList.add('eloqua-thank-you');
    form.onsubmit = function handleSubmit() {
      if (oldSubmit.call(this)) {
        const body = new FormData(this);
        const { action, method } = this;
        fetch(action, { method, body, redirect: 'manual' }).then((resp) => {
          if (!resp.ok) {
            console.error(`form submission failed: ${resp.status} / ${resp.statusText}`);
          }
          const firstContent = thankYou.firstElementChild;
          if (firstContent.tagName === 'A') {
            // redirect to thank you page
            window.location.href = firstContent.href;
          } else {
            // show thank you content
            const btn = thankYou.querySelector('a');
            const sidebar = document.querySelector('.get-an-offer-sidebar');
            if (btn && sidebar) {
              btn.setAttribute('href', '#');
              btn.addEventListener('click', (e) => {
                e.preventDefault();
                hideSidebar();
              });
              sidebar?.replaceChildren(thankYou);
            } else {
              block.replaceChildren(thankYou);
            }
          }
        });
      }
      return false;
    };
  }

  const styles = block.querySelectorAll('style');

  styles.forEach((styleSheet) => {
    document.head.appendChild(styleSheet);
  });

  // loading scripts one by one to prevent inappropriate script execution order.

  for (const script of [...block.querySelectorAll('script')]) {
    let waitForLoad = Promise.resolve();
    // the script element added by innerHTML is NOT executed
    // the workaround is to create the new script tag, copy attibutes and content
    const newScript = document.createElement('script');

    newScript.setAttribute('type', 'text/javascript');
    // coping all script attribute to the new one
    script.getAttributeNames().forEach((attrName) => {
      const attrValue = script.getAttribute(attrName);
      newScript.setAttribute(attrName, attrValue);

      if (attrName === 'src') {
        waitForLoad = new Promise((resolve) => {
          newScript.addEventListener('load', resolve);
        });
      }
    });
    newScript.innerHTML = script.innerHTML;
    script.remove();
    document.body.append(newScript);

    await waitForLoad;
  }

  block.querySelectorAll('.form-element-layout').forEach((el) => {
    // displaying label content as input placeholder
    const input = el.querySelector('input[type="text"], select, textarea');
    const label = el.querySelector('label');

    if (input && label) {
      input.setAttribute('placeholder', label.innerText.replace(/\s+/g, ' ').trim());
      label.remove();
    }
  });

  // adding class to the select parent element, so the select's arrow could be displayed.
  block.querySelectorAll('select').forEach((el) => {
    el.parentElement.classList.add('eloqua-select-wrapper');
  });

  block.querySelectorAll('[value^="~~"], [value^="--"], [value^="<eloqua"]').forEach((el) => {
    el.setAttribute('value', '');
  });

  block.style.display = displayValue;
};

const addNoCookieMessage = (messageContainer) => {
  const messageText = getTextLabel('no eloqua message');
  const messageLinkText = getTextLabel('no eloqua link message');

  const messageEl = document.createElement('div');
  messageEl.classList.add(['eloqua-form-no-cookie']);
  messageEl.innerHTML = `
    <span>${messageText}</span>
    <button>${messageLinkText}</button>
  `;

  messageEl.querySelector('button').addEventListener('click', () => {
    window.OneTrust.ToggleInfoDisplay();
  });

  messageContainer.replaceChildren(messageEl);
};

export default async function decorate(block) {
  if (!isTargetingAllowed()) {
    addNoCookieMessage(block);

    return;
  }

  const isMagazineTemplate = document.querySelector('meta[content="magazine"]');
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer.disconnect();
        if (isMagazineTemplate) {
          block.removeAttribute('id');
        }
        addForm(block);
      }
    },
    {
      rootMargin: '300px',
    },
  );
  observer.observe(block);
  if (isMagazineTemplate) {
    block.id = 'form59';
  }
}
