import { createElement } from '../../scripts/common.js';

const blockname = 'v2-feature-carousel';

export default function decorate(block) {
  const cardsWraper = block.querySelector('ul');
  cardsWraper.classList.add(`${blockname}__cards-list`);
  block.innerHTML = '';
  block.append(cardsWraper);

  [...cardsWraper.querySelectorAll('li')].forEach((el) => {
    el.classList.add(`${blockname}__card`);
    const text = el.lastChild;
    const textwrapper = createElement('span', { classes: `${blockname}__text` });
    textwrapper.textContent = text.textContent;
    el.append(textwrapper);
    text.remove();
  });
}
