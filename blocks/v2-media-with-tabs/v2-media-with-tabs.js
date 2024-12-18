import { addClassIfChildHasClass, createElement, removeEmptyTags, unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';

const variantClasses = ['media-right', 'expanded-width'];
const blockName = 'v2-media-with-tabs';

const handleChangeTab = (e) => {
  const parentBlock = e.target.closest(`.${blockName}`);
  const activeClassList = e.target.classList;
  if (activeClassList.contains('active')) {
    return;
  }

  let activeNumber;
  activeClassList.forEach((cl) => {
    if (cl.substring(0, 4) === 'tab-') {
      activeNumber = Number(cl.split('-').pop());
    }
  });

  parentBlock.querySelector(`.${blockName}__tab.active`).classList.remove('active');
  parentBlock.querySelector(`.${blockName}__image.active`).classList.remove('active');

  parentBlock.querySelector(`.${blockName}__image.img-${activeNumber}`).classList.add('active');
  e.target.classList.add('active');
  if (window.innerWidth < 1200) {
    e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
};

export default function decorate(block) {
  variantsClassesToBEM(block.classList, variantClasses, blockName);
  addClassIfChildHasClass(block, 'expanded-width');

  const content = block.querySelectorAll(':scope > div > div');
  const [header, list] = content;

  const imageSection = createElement('div', { classes: `${blockName}__images-section` });
  const tabsSection = createElement('div', { classes: `${blockName}__tabs-section` });

  const items = list.querySelectorAll('li');

  const headerSection = createElement('div', { classes: `${blockName}__header-section` });
  const headingTypes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const heading = header.querySelector(headingTypes);
  heading.classList.add(`${blockName}__heading`);
  const subtitle = heading.nextElementSibling;
  subtitle.classList.add(`${blockName}__subtitle`);

  headerSection.append(header, subtitle);

  const textSection = createElement('div', { classes: `${blockName}__texts-section` });

  items.forEach((el, idx) => {
    const image = el.querySelector('picture');
    image.classList.add(`${blockName}__image`, `img-${idx}`);

    const tab = createElement('button', { classes: [`${blockName}__tab`, `tab-${idx}`] });
    tab.classList.add(`${blockName}__tab`, `tab-${idx}`);
    tab.textContent = el.innerText;
    tab.onclick = (e) => handleChangeTab(e);

    if (idx === 0) {
      image.classList.add('active');
      tab.classList.add('active');
    }

    imageSection.append(image);
    tabsSection.append(tab);
  });
  items[0].parentNode.remove();

  textSection.append(tabsSection, headerSection);
  block.append(imageSection, textSection);

  unwrapDivs(block, { ignoreDataAlign: true });
  removeEmptyTags(block);
}
