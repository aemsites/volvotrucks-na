import { isVideoLink, createVideo } from '../../scripts/video-helper.js';
import { createElement } from '../../scripts/common.js';

const blockName = 'v2-key-facts';

const CLASSES = {
  row: `${blockName}__row`,
  row_media: `${blockName}__row--with-media`,
  row_text: `${blockName}__row--with-text`,
  video: `${blockName}__video`,
  image: `${blockName}__image`,
  key_item: `${blockName}__key-item`,
  item_title: `${blockName}__key-title`,
  item_subtitle: `${blockName}__key-subtitle`,
  center_alignment: `${blockName}__center-alignment`,
};

/**
 *  Helper function to check if an element has text nodes as direct children
 * @param {HTMLElement} el The element to check
 * @returns {boolean} True if the element has text nodes, false otherwise
 */
const CheckForTextNodes = (el) => {
  let hasTextNodes = false;
  [...el.childNodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0) {
      hasTextNodes = true;
    }
  });
  return hasTextNodes;
};

/**
 * Build the text section of a key fact item
 * @param {HTMLElement} el The key fact item element
 * @param {boolean} hasMedia True if the block has media, false otherwise
 */
const buildTextsSection = (el, hasMedia) => {
  [...el.querySelectorAll(':scope > p, :scope > h4')].forEach((el, idx) => {
    el.classList.add(`${CLASSES[`item_${idx === 0 ? '' : 'sub'}title`]}`);
    if (el.childNodes.length <= 1) {
      return;
    }
    const hasTextNodes = CheckForTextNodes(el);
    [...el.childNodes].forEach((node) => {
      if (!hasTextNodes || node.nodeType === Node.TEXT_NODE || node.nodeType === Node.BR) {
        return;
      }
      node.classList.add('small');

      if (hasMedia) {
        // wrap non-text nodes in a span to avoid variants compatibility issues if has media like video or image
        const span = createElement('span', { classes: node.className });
        span.innerHTML = node.innerHTML;
        node.replaceWith(span);
      }
    });
  });
};

export default function decorate(block) {
  let hasMedia = false;
  Array.from(block.children).forEach((row) => {
    row.classList.add(CLASSES.row);
    Array.from(row.children).forEach((col) => {
      const videoLinks = [...col.querySelectorAll('a')].filter(isVideoLink);
      const isVideoCell = videoLinks.length;
      const isImageCell = !!col.querySelector('picture');
      row.classList.add(isVideoCell || isImageCell ? CLASSES.row_media : CLASSES.row_text);
      hasMedia = hasMedia || Boolean(isVideoCell) || Boolean(isImageCell);

      if (isVideoCell) {
        const video = createVideo(videoLinks[0].getAttribute('href'), CLASSES.video, {
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
        col.classList.add(CLASSES.image);
        return;
      }

      col.classList.add(CLASSES.key_item);
      buildTextsSection(col, hasMedia);
    });
    if (!hasMedia) {
      row.classList.add(CLASSES.center_alignment);
    }
  });
}
