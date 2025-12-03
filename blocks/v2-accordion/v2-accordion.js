/**
 * Builds a <vcdk-accordion> item.
 * Compliant with Volvo VCDK slot structure.
 * @param {string} title
 * @param {string} bodyHTML
 * @returns {DocumentFragment}
 */
const renderAccordionItem = (title, bodyHTML) => {
  const html = `
    <vcdk-accordion>
      <span slot="title" class="accordion__title">${title}</span>
      <div class="accordion__content">${bodyHTML}</div>
    </vcdk-accordion>
  `;
  return document.createRange().createContextualFragment(html);
};

/**
 * Returns authoring rows with [title, content].
 * @param {HTMLElement} block
 * @returns {HTMLElement[]}
 */
const getRows = (block) =>
  [...block.children].filter((row) => row.children?.length >= 2);

/**
 * Enables single-open mode:
 * When one accordion opens, all others close.
 * @param {HTMLElement} block
 */
const enableSingleOpenBehavior = (block) => {
  const items = [...block.querySelectorAll('vcdk-accordion')];
  if (items.length <= 1) {return;}

  items.forEach((item) => {
    item.addEventListener('vcdk-toggle', () => {
      const willOpen = !item.open;
      if (!willOpen) {return;}

      items.forEach((other) => {
        if (other !== item && other.open) {
          other.open = false;
        }
      });
    });
  });
};

export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  getRows(block).forEach((row) => {
    const [titleEl, bodyEl] = row.children;
    const item = renderAccordionItem(
      titleEl.textContent.trim(),
      bodyEl.innerHTML.trim(),
    );
    fragment.append(item);
  });

  block.innerHTML = '';
  block.append(fragment);

  enableSingleOpenBehavior(block);
}
