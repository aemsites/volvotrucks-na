import { getTextLabel, unwrapDivs, variantsClassesToBEM } from '../../scripts/common.js';

export default async function decorate(block) {
  const blockName = 'v2-social-block';
  const variantClasses = ['black', 'gray'];

  variantsClassesToBEM(block.classList, variantClasses, blockName);

  const headings = block.querySelectorAll('h1, h2, h3, h4, h5, h6');
  [...headings].forEach((heading) => heading.classList.add(`${blockName}__title`));

  const socialWrapper = block.querySelector(':scope > div');
  socialWrapper.classList.add(`${blockName}__list-wrapper`);

  const list = socialWrapper.querySelector('ul');
  let copyAnchor;

  list.classList.add(`${blockName}__list`);
  list.classList.remove('cta-list');

  [...list.children].forEach((item) => {
    item.className = '';

    const anchor = item.querySelector('a');
    if (anchor) {
      anchor.className = `${blockName}__button`;
    }

    const copyLink = item.querySelector('.icon-link');
    if (copyLink) {
      copyAnchor = anchor;
      anchor.dataset.tooltip = getTextLabel('Copied');

      anchor.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          await navigator.clipboard.writeText(`${anchor.href}`);
          anchor.classList.add('show');

          setTimeout(() => {
            anchor.classList.remove('show');
          }, 1000);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
      });
      anchor.classList.add('tooltip', 'tooltip--top');
    }
  });
  unwrapDivs(block);

  const mobileMQ = window.matchMedia('(max-width: 743px)');
  const tabletMQ = window.matchMedia('(min-width: 744px)');

  function onMobileChange() {
    copyAnchor.classList.remove('tooltip--right');
    copyAnchor.classList.add('tooltip--top');
  }

  function onTabletChange() {
    copyAnchor.classList.remove('tooltip--top');
    copyAnchor.classList.add('tooltip--right');
  }

  if (mobileMQ.matches) {
    onMobileChange(mobileMQ);
  }

  if (tabletMQ.matches) {
    onTabletChange(tabletMQ);
  }

  window.addEventListener('resize', () => {
    if (mobileMQ.matches) {
      onMobileChange();
    } else if (tabletMQ.matches) {
      onTabletChange();
    }
  });
}
