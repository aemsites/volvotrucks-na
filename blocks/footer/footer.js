import { readBlockConfig, getMetadata } from '../../scripts/aem.js';
import { createElement, decorateIcons, getLanguagePath, getTextLabel } from '../../scripts/common.js';

function addScrollToTopButton(mainEl) {
  const label = getTextLabel('footer:go_to_top');

  const scrollToTopButton = document.createRange().createContextualFragment(`
    <div class="scroll-to-top-container">
      <a href="#" class="scroll-to-top" title="${label}" aria-label="${label}">
        <vcdk-system-icon
          icon="arrow-up"
          size="24"
          icon-set="auto">
        </vcdk-system-icon>
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
