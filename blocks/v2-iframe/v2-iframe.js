import { createElement, variantsClassesToBEM } from '../../scripts/common.js';

export default async function decorate(block) {
  let link = block.querySelector('a')?.getAttribute('href') || block.textContent.trim();

  function removeDuplicateParams(queryString) {
    const params = new URLSearchParams(queryString);
    const uniqueParams = new URLSearchParams();

    params.forEach((value, key) => {
      if (!uniqueParams.has(key)) {
        uniqueParams.append(key, value);
      }
    });

    return uniqueParams.toString();
  }

  link += window.location.search ? `#/summary/?${removeDuplicateParams(window.location.search)}` : '';
  if (!window.location.search && window.location.hash) {
    link += window.location.hash;
  }
  const title = block.querySelector('h1, h2, h3, h4, h5, h6').textContent;
  const iframe = createElement('iframe', {
    props: {
      src: link,
      frameborder: 0,
      title,
      allow: 'clipboard-write',
    },
  });
  const fixedHeightClass = [...block.classList].find((el) => /[0-9]+px/.test(el));

  variantsClassesToBEM(block.classList, ['full-viewport'], 'v2-iframe');

  if (fixedHeightClass) {
    iframe.height = fixedHeightClass;
  }

  block.replaceChildren(iframe);
}
