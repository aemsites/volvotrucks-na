import { isVideoLink, createVideo } from '../../scripts/video-helper.js';
import { createElement, variantsClassesToBEM, removeEmptyTags } from '../../scripts/common.js';

const checkVideoTime = (event) => {
  const video = event.target;
  if (video.currentTime > 3) {
    video.pause();
    video.removeEventListener('timeupdate', checkVideoTime);
  }
};

const variantClasses = ['top-center', 'left', 'top-left', 'bottom', 'dark'];

export default async function decorate(block) {
  const blockName = 'v2-banner';

  // add variant classnames
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  const picture = block.querySelector('picture');
  const link = block.querySelector('a');
  const isVideo = link ? isVideoLink(link) : false;
  if (isVideo) {
    const video = createVideo(link.getAttribute('href'), `${blockName}__video`, {
      muted: true,
      autoplay: true,
      loop: true,
      playsinline: true,
    });
    block.prepend(video);
    link.remove();

    // prevent video to reproduce more than 3s
    video.addEventListener('timeupdate', checkVideoTime);
  }

  if (picture) {
    const img = picture.querySelector('img');
    img.classList.add(`${blockName}__image`);
    if (picture.parentElement.tagName === 'P') {
      picture.parentElement.remove();
    }
    block.prepend(picture);
  }

  const contentWrapper = block.querySelector(':scope > div:last-of-type');
  contentWrapper.classList.add(`${blockName}__content-wrapper`);

  const content = block.querySelector(':scope > div > div');
  content.classList.add(`${blockName}__content`);

  // convert all headings to h1
  const headings = [...content.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  headings.forEach((heading) => heading.classList.add(`${blockName}__title`));

  const buttonsWrapper = createElement('div', { classes: `${blockName}__buttons-wrapper` });
  const ctaButtons = content.querySelectorAll('.button-container > a');
  [...ctaButtons].forEach((b) => {
    if (block.classList.contains(`${blockName}--dark`)) {
      b.classList.add('dark');
    }

    b.parentElement.remove();
    buttonsWrapper.appendChild(b);
  });
  content.appendChild(buttonsWrapper);

  removeEmptyTags(content);

  block.parentElement.classList.add('full-width');
}
