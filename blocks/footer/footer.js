import { readBlockConfig, getMetadata } from '../../scripts/aem.js';
import { createElement, decorateIcons, getLanguagePath, getTextLabel } from '../../scripts/common.js';

function addScrollToTopButton(mainEl) {
  const scrollToTopButton = document.createRange().createContextualFragment(`
    <div class="scroll-to-top-container">
      <a href="#" class="scroll-to-top" title=${getTextLabel('footer:go_to_top')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 20C11.7237 20 11.4999 19.7761 11.4999 19.5L11.4999 5.70711L6.35341 10.8536C6.15815 11.0488 5.84157 11.0488 5.6463 10.8536C5.45104 10.6583 5.45104 10.3417 5.6463 10.1464L11.6463 4.14645C11.8416 3.95119 12.1581 3.95118 12.3534 4.14644L18.3535 10.1464C18.5488 10.3417 18.5488 10.6583 18.3536 10.8535C18.1583 11.0488 17.8417 11.0488 17.6465 10.8536L12.4999 5.70709L12.4999 19.5C12.4999 19.7761 12.276 20 11.9999 20Z" fill="currentColor"/>
        </svg>
      </a>
    </div>
  `);
  mainEl.append(scrollToTopButton);
}

/**
 * loads and decorates the footer
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';
  let footerPath = cfg.footer || `${getLanguagePath()}footer`;
  const isCustomFooter = getMetadata('custom-footer');
  if (isCustomFooter) {
    footerPath = cfg.footer || `${getLanguagePath()}${isCustomFooter}`;
  }

  const resp = await fetch(`${footerPath}.plain.html`);
  const html = await resp.text();
  const footer = createElement('div', { classes: 'footer-container' });
  footer.innerHTML = html.replaceAll('{year}', new Date().getFullYear());

  // for custom footer we don't need the external link section,
  // so check if columns block exist
  const columnsWrapper = footer.querySelector('.columns');
  let footerBar = footer.children[1];
  let footerCopyright = footer.children[2];
  let mainLinkWrapper;

  const headings = footer.querySelectorAll('h1, h2, h3, h4, h5, h6');
  [...headings].forEach((heading) => heading.classList.add('footer__title'));

  openExternalLinksInNewTab(footer);

  if (columnsWrapper) {
    mainLinkWrapper = columnsWrapper.parentElement;
    wrapSocialMediaLinks(mainLinkWrapper);
    mainLinkWrapper.classList.add('footer-links-wrapper');
    // in Word, it is edited like a column block, but we style it differently
    mainLinkWrapper.firstElementChild.classList.remove('columns');
    mainLinkWrapper.querySelectorAll('.footer__title').forEach((title) => {
      const heading = title.firstElementChild;
      const [text, icon] = heading.childNodes;
      const spanEle = createElement('span');
      spanEle.textContent = text.textContent;

      title.append(spanEle);
      title.append(icon);
      heading.remove();

      title.parentElement.classList.add('footer-list');
      title.parentElement.parentElement.classList.add('footer-list-wrapper');
      title.nextElementSibling?.classList.add('footer-list-item');

      title.addEventListener('click', (e) => toggleExpand(e.currentTarget));
    });
  } else {
    [footerBar, footerCopyright] = footer.children;
  }

  const copyrightWrapper = createElement('div', { classes: 'footer-copyright-wrapper' });
  const copyrightContainer = createElement('div', { classes: 'footer-copyright-container' });

  copyrightWrapper.append(copyrightContainer);

  if (footerBar) {
    const list = footerBar.firstElementChild;
    list?.classList.add('footer-bar');
    copyrightContainer.appendChild(list);
    footerBar.remove();
  }

  if (footerCopyright) {
    copyrightContainer.appendChild(footerCopyright);
    footerCopyright?.classList.add('footer-copyright');
  }

  footer.appendChild(copyrightWrapper);
  await decorateIcons(footer);
  block.append(footer);
  const noScrollToTopMobile = getMetadata('no-scroll-to-top-mobile') === 'true';
  if (noScrollToTopMobile) {
    block.classList.add('no-scroll-to-top-mobile');
  }
  addScrollToTopButton(block);
}

function wrapSocialMediaLinks(footer) {
  footer.querySelectorAll('.icon-newtab').forEach((icon) => {
    const textIconWrapper = createElement('span', { classes: 'footer-text-icon-wrapper' });
    const anchor = icon.parentElement;
    textIconWrapper.append(icon.previousSibling);
    textIconWrapper.append(icon);
    anchor.append(textIconWrapper);
  });
}

function openExternalLinksInNewTab(footer) {
  footer.querySelectorAll('a').forEach((anchor) => {
    try {
      const { origin } = new URL(anchor.href, window.location.href);
      if (origin && origin !== window.location.origin) {
        anchor.setAttribute('target', '_blank');
      }
    } catch (e) {
      console.warn(`Invalid link ${anchor.href}: ${e}`);
    }
  });
}

function findList(headingElement) {
  let nextElement = headingElement.nextElementSibling;
  while (nextElement && !nextElement.classList.contains('footer-list-item')) {
    nextElement = nextElement.nextElementSibling;
  }
  return nextElement;
}

function toggleExpand(headingElement) {
  const isExpanded = headingElement.classList.contains('expand');
  const wrapper = headingElement.closest('.footer-list-wrapper');
  const columns = wrapper.querySelectorAll('.footer-list');

  const content = findList(headingElement);

  columns.forEach((column) => {
    const headingElements = column.querySelectorAll('.footer__title');
    headingElements.forEach((heading) => {
      const columnContent = findList(heading);
      if (heading === headingElement && !isExpanded) {
        heading.classList.add('expand');
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else if (heading === headingElement && isExpanded) {
        heading.classList.remove('expand');
        content.style.maxHeight = null;
      } else {
        heading.classList.remove('expand');
        columnContent.style.maxHeight = null;
      }
    });
  });
}
