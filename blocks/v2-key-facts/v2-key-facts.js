import { createElement } from '../../scripts/common.js';
import { isVideoLink, createVideo } from '../../scripts/video-helper.js';

const blockName = 'v2-key-facts';

const CLASSES = {
  row: `${blockName}__row`,
  row_media: `${blockName}__row--with-media`,
  row_text: `${blockName}__row--with-text`,
  video: `${blockName}__video`,
  image: `${blockName}__image`,
  key_item: `${blockName}__key-item`,
  item_title: `${blockName}__key-title`,
  item_title_long: `${blockName}__key-title-long`,
  item_subtitle: `${blockName}__key-subtitle`,
};

const buildTextsSection = (el) => {
  el.querySelectorAll('p').forEach((pEl, idx) => {
    if (idx === 0) {
      pEl.classList.add(CLASSES.item_title);
      // If there is a <br> tag in the first paragraph, we need to wrap the text in a span to apply the styles
      if (pEl.querySelector('br')) {
        const span = createElement('span', { classes: CLASSES.item_title_long });
        const childNodes = Array.from(pEl.childNodes).slice(1);
        span.append(...childNodes);
        pEl.append(span);
      }
      return;
    }
    pEl.classList.add(CLASSES.item_subtitle);
  });
};

export default function decorate(block) {
  Array.from(block.children).forEach((row) => {
    row.classList.add(CLASSES.row);
    Array.from(row.children).forEach((col) => {
      const videoLinks = [...col.querySelectorAll('a')].filter(isVideoLink);
      const isVideoCell = videoLinks.length;
      const isImageCell = !!col.querySelector('picture');
      row.classList.add(isVideoCell || isImageCell ? CLASSES.row_media : CLASSES.row_text);

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
      buildTextsSection(col);
    });
  });
}
