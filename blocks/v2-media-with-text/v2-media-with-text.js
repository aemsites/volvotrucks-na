import {
  addClassIfChildHasClass,
  createElement,
  createNewSection,
  removeEmptyTags,
  unwrapDivs,
  variantsClassesToBEM,
  waitForElementInDom,
} from '../../scripts/common.js';
import { addMuteControls, createVideoWithPoster, isVideoLink, selectVideoLink, createVideo } from '../../scripts/video-helper.js';

const blockName = 'v2-media-with-text';
const variantClasses = [
  'text-centered',
  'expanded-width',
  'full-width',
  'media-left',
  'media-left',
  'media-right',
  'media-vertical',
  'media-gallery',
  'media-autoplay',
  'mute-controls',
  'title-small',
];

const buildMediaGallery = (section) => {
  const allCaptions = section.querySelectorAll('p:not(:has(picture))');
  const allPictures = section.querySelectorAll('picture');

  allPictures.forEach((picture, idx) => {
    const caption = allCaptions[idx];
    const figureElmt = document.createRange().createContextualFragment(`
      <figure>
        ${picture.outerHTML}
        ${caption ? `<figcaption class="caption">${caption.textContent}</figcaption>` : ''}
      <figure>
    `);
    section.append(figureElmt);
  });
  section.querySelectorAll('p').forEach((p) => (p.outerHTML = ''));
};

export default async function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);
  addClassIfChildHasClass(block, 'full-width');
  addClassIfChildHasClass(block, 'expanded-width');

  const cells = block.querySelectorAll(':scope > div > div');
  let contentSection;
  let mediaSection;
  let subTextSection;
  let containerSection;
  let videoLinks;

  cells.forEach((cell, index) => {
    // First cell for content, second for media and last for the subtext
    const isLastCell = index % 2 === 0 && index === cells.length - 1;
    const isCellNumberEven = index % 2 === 0;
    const isTotalCellsEven = cells.length % 2 === 0;

    if (isLastCell) {
      subTextSection = createNewSection(blockName, 'sub-text', cell);
    } else if (isCellNumberEven) {
      contentSection = createNewSection(blockName, 'content', cell);
      const headings = [...cell.querySelectorAll(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])];
      headings.forEach((heading, idx) => {
        const hasPretitle = headings.length > 1;
        heading.classList.add(`${blockName}__${hasPretitle && idx < 1 ? 'pretitle' : 'heading'}`);
      });
    } else {
      mediaSection = createNewSection(blockName, 'media-section', cell);
      if (block.classList.contains(`${blockName}--media-gallery`)) {
        buildMediaGallery(mediaSection);
      }
      videoLinks = [...mediaSection.querySelectorAll('a')].filter((link) => isVideoLink(link));
      const picture = mediaSection.querySelector('picture');

      if (videoLinks.length) {
        const videoLink = selectVideoLink(videoLinks);

        if (videoLink) {
          if (picture) {
            requestAnimationFrame(() => {
              const videoWithPoster = createVideoWithPoster(videoLink.href, picture, `${blockName}--video-with-poster`, { controls: false });
              videoWithPoster.classList.add(`${blockName}__media`);
              mediaSection.append(videoWithPoster);
            });
          } else {
            waitForElementInDom(block, `.${blockName}__media-section`, (mediaSection) => {
              let container = mediaSection.querySelector(`.${blockName}__video`);
              if (!container) {
                container = document.createElement('div');
                container.classList.add(`${blockName}__video`);
                mediaSection.append(container);
              }
              const videoEl = createVideo(videoLink.getAttribute('href'), `${blockName}__video`, {
                muted: true,
                autoplay: true,
                loop: true,
                playsinline: true,
              });
              videoEl.classList.add(`${blockName}__media`);
              container.appendChild(videoEl);

              if (block.classList.contains(`${blockName}--mute-controls`)) {
                addMuteControls(container);
              }
            });
          }
        }
      }
    }

    // If cell number is odd (i.e., a 'media' cell) and not the last cell
    if (!isLastCell && !isCellNumberEven) {
      // Wrap with a row if the number of cells is more than 2.
      if (cells.length > 2) {
        containerSection = createElement('div', { classes: `${blockName}__container` });
        containerSection.append(mediaSection, contentSection);
        block.append(containerSection);
      } else {
        // Append the media and content sections directly to the block.
        block.append(mediaSection, contentSection);
      }
    }
    // For an odd number of cells, append the remaining subTextSection.
    if (!isTotalCellsEven) {
      if (subTextSection) {
        block.append(subTextSection);
      }
    }
  });

  if (videoLinks) {
    videoLinks.forEach((videoLink) => videoLink.remove());
  }
  unwrapDivs(block, { ignoreDataAlign: true });
  removeEmptyTags(block);
}
