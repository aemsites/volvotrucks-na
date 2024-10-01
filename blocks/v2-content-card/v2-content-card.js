import { createOptimizedPicture } from '../../scripts/aem.js';
import {
  adjustPretitle,
  createElement,
  removeEmptyTags,
  variantsClassesToBEM,
} from '../../scripts/common.js';
import {
  createVideo,
  getDynamicVideoHeight,
  isVideoLink,
} from '../../scripts/video-helper.js';

const variantClasses = ['images-grid', 'images-grid-masonry', 'editorial'];

export default async function decorate(block) {
  const blockName = 'v2-content-card';

  // add Hero variant classnames
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  // replace <div> with <ul> to maintain DOM tree depth
  const ul = createElement('ul', { classes: block.classList });
  block.replaceWith(ul);

  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    // If cell contain any element, we add them in the ul
    if (cell.childElementCount) {
      const li = createElement('li', { classes: [`${blockName}__item`] });
      li.append(...cell.childNodes);
      ul.append(li);
    }
    cell.remove();
  });

  // give format to the list items
  [...ul.children].forEach(async (li) => {
    const section = createElement('article');
    const headings = li.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const videoLinks = [...li.querySelectorAll('a')].filter(isVideoLink);
    const video = videoLinks.length;
    let picture = li.querySelector('picture');

    [...headings].forEach((heading) => heading.classList.add(`${blockName}__title`));
    adjustPretitle(li);

    if (picture) {
      const img = picture.lastElementChild;
      // no width provided because we are using object-fit, we need the biggest option
      const newPicture = createOptimizedPicture(img.src, img.alt, false);
      picture.replaceWith(newPicture);
      picture = newPicture;
      picture.querySelector('img').classList.add(`${blockName}__media`);
      section.prepend(picture);
    }

    if (video) {
      const newVideo = createVideo(videoLinks[0].getAttribute('href'), `${blockName}__media`, {
        muted: true,
        autoplay: true,
        loop: true,
        playsinline: true,
      });

      section.prepend(newVideo);
      videoLinks[0].remove();

      getDynamicVideoHeight(newVideo);
    }

    // Add wrapper around the text content
    const container = createElement('div', { classes: `${blockName}__content` });
    container.innerHTML = li.innerHTML;
    li.innerHTML = '';
    section.append(container);
    li.append(section);
  });

  // remove empty tags
  removeEmptyTags(ul);
}
