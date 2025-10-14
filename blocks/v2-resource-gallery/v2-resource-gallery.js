import { wrapImageWithVideoLink, selectVideoLink, isVideoLink, addVideoShowHandler } from '../../scripts/video-helper.js';
import { createElement, decorateIcons, getTextLabel, unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';

const blockName = 'v2-resource-gallery';
const variantClasses = ['no-expand'];

function toggleListEle(block, ariaValue) {
  [...block.querySelectorAll(`li[aria-hidden="${ariaValue}"]`)].forEach((li) => {
    li.setAttribute('aria-hidden', !ariaValue);
  });
}

export default function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);
  const blockHeading = block.querySelector('div:first-child');
  blockHeading.classList.add(`${blockName}__heading-wrapper`);
  const title = blockHeading.querySelector('h1, h2, h3, h4, h5, h6');
  title?.classList.add(`${blockName}__heading`);
  unwrapDivs(blockHeading);

  const videoWrapper = createElement('div', { classes: `${blockName}__video-list` });
  const documentWrapper = createElement('div', { classes: `${blockName}__document-list` });
  const rows = block.querySelectorAll(':scope > div > div');

  rows.forEach((row) => {
    const picture = row.querySelector('picture');
    const document = row.querySelector('.icon-documents');

    if (picture) {
      const listEle = createElement('div', { classes: `${blockName}__video-list-item` });
      listEle.innerHTML = row.innerHTML;

      const videos = [...listEle.querySelectorAll('a')].filter((link) => isVideoLink(link));

      if (videos.length) {
        // display image as link with play icon
        const selectedLink = selectVideoLink(videos);
        if (selectedLink) {
          addVideoShowHandler(selectedLink);
          wrapImageWithVideoLink(selectedLink, picture);
          selectedLink.parentElement.classList.add(`${blockName}__video-image`, 'image');
        }

        if (videoWrapper.children.length > 5) {
          listEle.classList.add(`${blockName}__video-list-item--hide`);
          listEle.setAttribute('aria-hidden', true);
        }

        const videoTitle = listEle.querySelector('h3');
        videoTitle.classList.add(`${blockName}__video-title`);

        // remove all the videos links and exclude the selected one
        videos.forEach((link) => link !== selectedLink && link.parentElement.remove());

        videoWrapper.append(listEle);
        listEle.firstElementChild.remove();
        row.innerHTML = '';
      }
    } else if (document) {
      const item = createElement('div', { classes: `${blockName}__document-list-item` });
      item.innerHTML = row.innerHTML;
      const links = item.querySelectorAll('a');
      [...links].forEach((link) => {
        link.classList.add('standalone-link');
        link.classList.remove('button', 'tertiary');
        const wrapper = link.parentElement;
        wrapper.className = `${blockName}__document-link-wrapper`;
        wrapper.append(wrapper.nextElementSibling);
      });

      if (documentWrapper.children.length > 5) {
        item.classList.add(`${blockName}__document-list-item--hide`);
        item.setAttribute('aria-hidden', true);
      }

      documentWrapper.append(item);
      row.innerHTML = '';
    }
  });

  if (!block.classList.contains(`${blockName}--no-expand`)) {
    const viewAllButton = createElement('button', {
      classes: [`${blockName}__button`, 'tertiary'],
      props: { 'aria-expanded': false },
    });
    viewAllButton.innerHTML = `
      <span class="icon icon-plus"></span>
      <span class="icon icon-minus"></span>
      <span class="${blockName}__button-text">${getTextLabel('v2_resource_gallery:view_all')}</span>
    `;

    decorateIcons(viewAllButton);
    blockHeading.append(viewAllButton);

    viewAllButton.addEventListener('click', () => {
      const buttonText = viewAllButton.lastElementChild;
      if (viewAllButton.ariaExpanded === 'true') {
        viewAllButton.ariaExpanded = 'false';
        buttonText.innerText = getTextLabel('v2_resource_gallery:view_all');
        block.classList.remove(`${blockName}__list--expand`);
        toggleListEle(block, false);
      } else {
        viewAllButton.ariaExpanded = 'true';
        buttonText.innerText = getTextLabel('v2_resource_gallery:view_less');
        block.classList.add(`${blockName}__list--expand`);
        toggleListEle(block, true);
      }
    });
  }

  block.append(videoWrapper);
  block.append(documentWrapper);

  unwrapDivs(block, { ignoreDataAlign: true });
}
