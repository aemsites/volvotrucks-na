import { createElement, variantsClassesToBEM } from '../../scripts/common.js';
import { isVideoLink, createVideo } from '../../scripts/video-helper.js';

function stripEmptyTags(main, child) {
  if (child !== main && child.innerHTML.trim() === '') {
    const parent = child.parentNode;
    child.remove();
    stripEmptyTags(main, parent);
  }
}

const blockName = 'key-facts';
const variantClasses = ['trailing-line'];

const keyFactsColumns = (el, v2) => {
  el.classList.add(`${blockName}__key-item`);

  // clearing empty paragraphs
  const paragraphs = el.querySelectorAll('p');
  paragraphs.forEach((paragraph) => {
    stripEmptyTags(el, paragraph);
  });

  // v1 structure:
  // 1st line: pretitle or icon
  // 2nd line: plus/minus sign (optional),
  //           number with units (no space between plus,
  //           number and units) space character subtitle (subtitle is optional)
  //     example: "+8.5% per hour"
  // 3rd line: text (3rd line is optional)
  if (!v2) {
    // adding icon
    const icon = el.querySelector('i, .icon');

    // 1st line:
    if (icon) {
      el.prepend(icon);
      icon.classList.add(`${blockName}__icon`);
    }

    const preSubheading = el.querySelector(':scope > :not(strong, i):first-child');
    preSubheading?.classList.add('subtitle-2');

    // 2nd line:
    // find and split number/unit
    const value = el.querySelector('strong:only-child');
    // separate number and unit. e.g. up | +31% | Freight efficiency, or 120,000 | psi,
    const [, prenumber, number, postnumber, text] = value.innerHTML.match('([\\+,\\-]*)([0-9,\\.,]+)([\\%]*) *(.*)');
    const newValue = `
      <span class="${blockName}__main-text">
        <span class="${blockName}__main-text--small">${prenumber}</span>
        ${number}
        <span class="${blockName}__main-text--small">${postnumber}</span>
      </span>
    `;

    const numberFragment = document.createRange().createContextualFragment(newValue);
    value.innerHTML = '';
    value.append(...numberFragment.childNodes);
    value.classList.add(`${blockName}__main-text-wrapper`);

    // 3rd line:
    if (text) {
      const unit = createElement('strong', { classes: [`${blockName}__unit`, 'subtitle-2'] });
      unit.innerText = text;
      value.parentNode.append(unit);
    }

    // traing line variant
    const div = createElement('div', { classes: `${blockName}__trailing-line` });
    el.append(div);
  }

  // v2 version
  // 1st line: text - what's inside `strong` is renderd with larger font
  // 2nd line: text - styled as subtitle
  if (v2) {
    const FONT_DECREASE_LENGTH = 12;
    const mainText = el.querySelector('p');
    mainText.classList.add(`${blockName}__main-text-wrapper`);

    const text = mainText.textContent.trim();
    if (text.length >= FONT_DECREASE_LENGTH) {
      mainText.classList.add(`${blockName}__main-text-wrapper--small`);
    }

    mainText.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textContent = node.textContent.trim();
        // removing empty text nodes
        if (!textContent.length) {
          node.remove();
          return;
        }

        // wrapping orphan text nodes
        const newNode = createElement('span', { classes: `${blockName}__main-text--small` });
        newNode.textContent = textContent;
        node.replaceWith(newNode);
      }

      if (node.tagName === 'STRONG') {
        node.classList.add(`${blockName}__main-text`);
      }
    });
    const subtitle = el.querySelector('p:nth-child(2)');

    subtitle?.classList.add('subtitle-2');
  }
};

export default async function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  Array.from(block.children).forEach((row) => {
    row.classList.add(`${blockName}__row`);

    Array.from(row.children).forEach(async (col) => {
      const videoLinks = [...col.querySelectorAll('a')].filter(isVideoLink);
      const isVideoCell = videoLinks.length;
      const isImageCell = !!col.querySelector('picture');

      if (isVideoCell) {
        block.classList.add(`${blockName}--with-media`);
        row.classList.add(`${blockName}__row--with-media`);

        const video = createVideo(videoLinks[0].getAttribute('href'), `${blockName}__video`, {
          muted: true,
          autoplay: true,
          loop: 'loop',
          playsinline: true,
        });
        col.replaceWith(video);
        videoLinks[0].remove();

        return;
      }

      if (isImageCell) {
        block.classList.add(`${blockName}--with-media`);
        row.classList.add(`${blockName}__row--with-media`);
        col.classList.add(`${blockName}__image-cell`);

        return;
      }

      const v2 = block.classList.contains(`${blockName}--with-media`);
      keyFactsColumns(col, v2);
    });
  });
}
