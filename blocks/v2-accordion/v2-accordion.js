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
      <div class="accordion__content">
        ${bodyHTML}
      </div>
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


export default function decorate(block) {
  const fragment = document.createDocumentFragment();

  getRows(block).forEach((row) => {
    const [titleEl, bodyEl] = row.children;
    fragment.append(
      renderAccordionItem(
        titleEl.textContent.trim(),
        bodyEl.innerHTML.trim(),
      ),
    );
  });

  block.innerHTML = '';
  block.append(fragment);
}
