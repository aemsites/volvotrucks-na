import { decorateIcons } from '../../scripts/common.js';

const BLOCK_NAME = 'v2-specifications';

/**
 * Normalize text content from a DOM node.
 * Safely handles nullish values by returning an empty string.
 *
 * @param {Element | null | undefined} el
 * @returns {string}
 */
const normalizeTextContent = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();

/**
 * Create a unique id fragment for block-scoped DOM ids.
 * Prefers `crypto.randomUUID()` when available; falls back to a random hex string.
 * @returns {string}
 */
const createStableId = () => {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(16).slice(2);
};

/**
 * Create a unique block id.
 * Used to scope DOM ids (aria-controls / aria-labelledby) per block instance.
 * @returns {string}
 */
const createBlockId = () => `${BLOCK_NAME}-${createStableId()}`;

/**
 * Extract table data from authored markup and transpose into aligned rows.
 *
 * Parses block rows to find Title and Observation labels, then organizes remaining data
 * into rows that align items by column index horizontally.
 *
 * Security note:
 * - HTML content is treated as trusted from the authoring pipeline (EDS).
 * - Sanitize if assumption changes.
 *
 * @param {HTMLElement} block - The DOM block containing labeled rows with data cells
 * @returns {{ accordionTitle: string, accordionObservation: string, rows: Array<Array<{ text: string, html: string }>>, columnCount: number }}
 */
const extractTableItens = (block) => {
  const allRows = [...block.children];

  if (allRows.length < 1) {
    return { title: '<h2></h2>', accordionObservation: '', columns: [] };
  }

  let accordionTitle = '';
  let accordionObservation = '';

  // Build rows directly while iterating — this aligns items by their index across columns
  const rows = [];
  const columnCounts = []; // track how many items we've added per column
  let maxColumnsSeen = 0;

  allRows.forEach((row) => {
    const labelCell = row.children[0];
    const contentCell = row?.children[1];
    const labelText = normalizeTextContent(labelCell);

    if (labelText === 'Title') {
      const titleHeading = contentCell.querySelector('h1, h2, h3, h4, h5, h6, p');
      if (titleHeading) { accordionTitle = titleHeading.outerHTML; }
      return;
    }

    if (labelText === 'Observation') {
      accordionObservation = (contentCell.innerHTML || '').trim();
      return;
    }

    Array.from(row.children).forEach((cell, colIndex) => {
      const text = normalizeTextContent(cell);
      const html = (cell.innerHTML || '').trim();

      // Keep track of how many columns we've seen (colIndex is zero-based)
      maxColumnsSeen = Math.max(maxColumnsSeen, colIndex + 1);

      // initialize counter for this column
      if (typeof columnCounts[colIndex] === 'undefined') { columnCounts[colIndex] = 0; }

      // Determine which output row this cell should go into (append to this column)
      const insertionRowIndex = columnCounts[colIndex];

      // Make sure the target row exists
      if (!rows[insertionRowIndex]) {rows[insertionRowIndex] = [];}

      // Insert the parsed cell into the correct column slot for that row
      rows[insertionRowIndex][colIndex] = text ? { text, html } : { text: '', html: '' };

      // Advance the per-column counter so next cell in this column goes to the next row
      columnCounts[colIndex] += 1;
    });
  });

  // Normalize rows: ensure each row has an entry for every column
  const MIN_COLUMNS = 1;
  const columnCount = Math.max(MIN_COLUMNS, maxColumnsSeen);

  // Ensure every output row has a cell for each column.
  const normalizedRows = rows.map((inputRow) => {
    const emptyCell = { text: '', html: '' };
    const normalized = Array.from({ length: columnCount }, (_unused, columnIndex) => {
      const cellData = inputRow && inputRow[columnIndex] ? inputRow[columnIndex] : emptyCell;
      return cellData;
    });
    return normalized;
  });

  return { accordionTitle, accordionObservation, rows: normalizedRows, columnCount };
};

/**
 * Build a VCDK accordion component with title, observation, and content.
 *
 * Creates a vcdk-accordion DOM element with semantic slot structure.
 * Includes observation div if provided, and applies column count class for layout.
 *
 * @param {string} title - Accordion heading (HTML-safe, typically a heading tag)
 * @param {string} bodyHTML - Inner accordion content (HTML markup for rows)
 * @param {number} columnCount - Number of columns (applied as class for CSS layout)
 * @param {string} observation - Optional observation text/HTML to display before content
 * @returns {DocumentFragment} Accordion DOM fragment ready to insert
 */
const renderAccordionItem = (title, bodyHTML, columnCount, observation) => {
  const html = `
    <vcdk-accordion class="${BLOCK_NAME}__accordion">
      <span slot="title" class="accordion__title">${title}</span>
      <div class="accordion__content number--columns-${columnCount}">${bodyHTML}</div>
      ${observation !== '' ? `<div class="accordion__observation">${observation}</div>` : ''}
    </vcdk-accordion>
  `;
  return document.createRange().createContextualFragment(html);
};

/**
 * Convert transposed rows into aligned HTML grid markup.
 *
 * Renders each row as a row container with cells.
 * If a row has only one non-empty cell and multiple columns exist, marks it with
 * __only-cell class to span all columns via CSS.
 *
 * @param {Array<Array<{ text: string, html: string }>>} rows - Transposed rows where each row contains cells aligned by column
 * @param {number} columnCount - Total number of columns (used to detect single-cell-span rows)
 * @returns {string} HTML markup for all rows and cells
 */
const columnsToRowsHtml = (rows, columnCount) => (
  (rows || []).map((row) => {
    // Determine non-empty cells in this row
    const nonEmptyCells = (row || []).map((cell, idx) => ({ cell, idx })).filter(({ cell }) => cell && cell.text);

    // If only one non-empty cell, render it as a single cell that spans all columns
    if (nonEmptyCells.length === 1 && columnCount > 1) {
      const single = nonEmptyCells[0].cell;
      return `
        <div class="${BLOCK_NAME}__row">
          <div class="${BLOCK_NAME}__cell ${BLOCK_NAME}__only-cell">${single.html || ''}</div>
        </div>
      `;
    }

    // Otherwise render a cell for each column (empty cells render blank)
    return `
      <div class="${BLOCK_NAME}__row">
        ${(row || []).map((cell) => `<div class="${BLOCK_NAME}__cell">${(cell && cell.html) || ''}</div>`).join('')}
      </div>
    `;
  }).join('')
);

/**
 * Render specifications data into the block as a decorated accordion.
 *
 * Transforms parsed rows into HTML markup and inserts a vcdk-accordion component.
 * Decorates icons within the block and clears previous content.
 *
 * @param {HTMLElement} block - DOM container to render into
 * @param {{ accordionTitle: string, accordionObservation: string, rows: Array, columnCount: number }} specData - Parsed specifications data
 * @param {string} blockId - Unique block instance ID (for scoping)
 * @returns {void}
 */
const renderSpecificationsItems = (block, {accordionTitle, accordionObservation, rows, columnCount}, blockId) => {
  const rowsHtml = columnsToRowsHtml(rows, columnCount);
  const accordionFragment = renderAccordionItem(accordionTitle, rowsHtml, columnCount, accordionObservation);
  block.innerHTML = '';
  block.appendChild(accordionFragment);
  decorateIcons(block);
};

/**
 * Decorate the v2-specifications block with parsed data and render accordion.
 *
 * Main entry point called by the AEM block framework.
 * Extracts data from the block structure and renders the final accordion component.
 *
 * @param {HTMLElement} block - The block DOM element from AEM
 * @returns {void}
 */
export default function decorate(block) {
  const blockId = createBlockId(block);
  const accordeonInformation = extractTableItens(block);
  renderSpecificationsItems(block, accordeonInformation, blockId);
}