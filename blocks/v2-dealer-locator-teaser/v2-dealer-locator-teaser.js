import { MEDIA_BREAKPOINTS, getImageForBreakpoint } from '../../scripts/scripts.js';
import { variantsClassesToBEM } from '../../scripts/common.js';

const blockName = 'v2-dealer-locator-teaser';
const variantClasses = ['right-align'];

function initBackgroundPosition(classList, breakpoint) {
  const classPrefixes = {
    [MEDIA_BREAKPOINTS.MOBILE]: 's',
    [MEDIA_BREAKPOINTS.TABLET]: 'm',
    [MEDIA_BREAKPOINTS.DESKTOP]: 'l',
  };
  const classPrefix = classPrefixes[breakpoint];
  const backgroudPositionClass = [...classList].find((item) => item.startsWith(`bp-${classPrefix}-`));
  let backgroundPositionValue = 'unset';

  if (backgroudPositionClass) {
    let [, , xPosition, yPosition] = backgroudPositionClass.split('-');

    // workaround, '-' character classes are not supported
    // so for '-45px' we need to put 'm45px'
    xPosition = xPosition.replace('m', '-');
    yPosition = yPosition.replace('m', '-');

    backgroundPositionValue = `${xPosition} ${yPosition}`;
  }

  return backgroundPositionValue;
}

function prepareBackgroundImage(block) {
  const onBackgroundImgChange = (imgEl, backgroundTarget, breakpoint) => {
    const backgroundPostionStyles = initBackgroundPosition(block.classList, breakpoint);
    const backgroundSrc = imgEl.currentSrc;
    backgroundTarget.style.backgroundImage = `url(${backgroundSrc})`;
    backgroundTarget.style.backgroundPosition = backgroundPostionStyles;
  };

  const onBreakpointChange = (pictureEl, breakpoint) => {
    const pictureClone = pictureEl.cloneNode(true);
    const img = pictureClone.querySelector('img');
    pictureClone.classList.add('v2-dlt__picture');

    block.append(pictureClone);

    if (img.currentSrc) {
      onBackgroundImgChange(img, block, breakpoint);
      pictureClone.remove();
    } else {
      img.addEventListener('load', () => {
        onBackgroundImgChange(img, block, breakpoint);
        pictureClone.remove();
      });
    }
  };

  const listOfPictures = block.querySelector('ul');
  // removing from DOM - prevent loading all of provided images
  listOfPictures.remove();
  getImageForBreakpoint(listOfPictures, onBreakpointChange);
}

export default async function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  prepareBackgroundImage(block);
  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');

  [...headings].forEach((heading) => heading.classList.add('v2-dlt__title'));

  block.parentElement.classList.add('full-width');

  const contentElWrapper = block.querySelector(':scope > div');
  contentElWrapper.classList.add('v2-dlt__content-wrapper');
  const contentEl = block.querySelector(':scope > div > div');
  contentEl.classList.add('v2-dlt__content');
}
