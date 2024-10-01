import { removeEmptyTags, variantsClassesToBEM } from '../../scripts/common.js';
import { createVideo, cleanupVideoLink } from '../../scripts/video-helper.js';

const onHoverOrScroll = (element, handler) => {
  let isInViewport = false;
  let isMouseOver = false;
  const onChange = () => {
    handler(isInViewport || isMouseOver);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        isInViewport = entry.intersectionRatio >= 0.5;
        onChange();
      }
    });
  }, {
    threshold: [0.4, 0.5, 0.6],
  });
  observer.observe(element);

  element.addEventListener('mouseover', () => {
    isMouseOver = true;
    onChange();
  });

  element.addEventListener('mouseout', () => {
    isMouseOver = false;
    onChange();
  });
};

const extractAspectRatio = (block) => {
  const aspectRatioRegex = /aspect-ratio-(\d+)-(\d+)/;
  const aspectRatioClass = Array.from(block.classList)
    .find((className) => aspectRatioRegex.test(className));

  const match = aspectRatioClass?.match(aspectRatioRegex);

  return match ? {
    width: parseInt(match[1], 10),
    height: parseInt(match[2], 10),
  } : null;
};

const retrieveVideoConfig = (block, aspectRatio) => {
  const image = block.querySelector('img');
  const poster = image ? new URL(image.getAttribute('src'), window.location.href).href : undefined;

  return {
    ...(aspectRatio ? { aspectRatio: `${aspectRatio.width}:${aspectRatio.height}` } : {}),
    ...(poster ? { poster } : {}),
    autoplay: block.classList.contains('autoplay') ? 'any' : false,
    muted: block.classList.contains('autoplay'),
    loop: block.classList.contains('loop'),
    controls: !block.classList.contains('disable-controls'),
    disablePictureInPicture: block.classList.contains('disable-picture-in-picture'),
    language: document.documentElement.lang,
  };
};

const variantClasses = ['expanding'];

export default async function decorate(block) {
  const blockName = 'v2-video';
  const videoLink = block.querySelector('a');

  variantsClassesToBEM(block.classList, variantClasses, blockName);

  if (!videoLink) {
    // eslint-disable-next-line no-console
    console.warn('Video for v2-video block is required and not provided. The block will not render!');
    block.innerHTML = '';
    return;
  }

  const aspectRatio = extractAspectRatio(block);
  if (aspectRatio) {
    block.style.setProperty('--video-aspect-ratio', `${aspectRatio.width}/${aspectRatio.height}`);
  }

  const config = retrieveVideoConfig(block, aspectRatio);
  const video = createVideo(videoLink, `${blockName}__video`, {
    ...config,
    fill: true,
    usePosterAutoDetection: true,
  });

  cleanupVideoLink(block, videoLink, true);
  removeEmptyTags(block, true);

  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const ctaButtons = block.querySelectorAll('.button-container a');
  const contentWrapper = block.querySelector(':scope > div');
  const content = block.querySelector(':scope > div > div');

  if (contentWrapper) {
    contentWrapper.classList.add(`${blockName}__content-wrapper`);
    content.classList.add(`${blockName}__content`);
    [...headings].forEach((heading) => heading.classList.add(`${blockName}__heading`));
    [...ctaButtons].forEach((button) => {
      button.classList.add(`${blockName}__button`, 'dark');
    });
  }

  block.prepend(video);

  if (block.classList.contains(`${blockName}--expanding`)) {
    onHoverOrScroll(block, (val) => {
      const action = val ? 'add' : 'remove';

      block.classList[action](`${blockName}--full-width`);
    });
  } else {
    block.classList.add(`${blockName}--full-width`);
  }
}
