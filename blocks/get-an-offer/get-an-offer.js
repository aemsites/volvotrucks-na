import { decorateSections, decorateBlocks, loadBlocks, loadCSS } from '../../scripts/aem.js';
import { decorateIcons } from '../../scripts/common.js';
import decorateButtons from '../../scripts/scripts.js';

export async function showOffer(a) {
  const { href, title } = a;
  const module$ = import(`${window.hlx.codeBasePath}/common/sidebar/sidebar.js`);
  const styles$ = loadCSS(`${window.hlx.codeBasePath}/blocks/get-an-offer/get-an-offer.css`);
  const content = await fetch(`${href}.plain.html`);

  async function decorateSidebar(container) {
    decorateButtons(container);
    decorateIcons(container);
    decorateSections(container);
    decorateBlocks(container);

    container.classList.add('get-an-offer-sidebar');
    const [header, details, from] = container.children;
    header.classList.add('header');
    details.classList.add('details');
    from.classList.add('form');

    if (title === 'Details') {
      container.classList.add('show-details');
      const ctaList = a.closest('ul');
      const cta = [...ctaList.querySelectorAll('a')].find(({ href: h }) => h === href);
      // clone the button to show the form
      const fragment = document.createRange().createContextualFragment(`
                <div class="default-content-wrapper">
                    <p class="button-container">
                        ${cta.outerHTML}
                    </p>
                </div>
            `);
      const button = fragment.querySelector('a');
      button.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.remove('show-details');
      });
      details.append(...fragment.children);
    } else {
      container.classList.remove('show-details');
    }

    await loadBlocks(container);
  }

  if (content.ok) {
    const html = await content.text();
    const fragment = document.createRange().createContextualFragment(html);
    const [module] = await Promise.all([module$, styles$]);
    module.showSidebar(fragment.children, decorateSidebar);
  }
}
