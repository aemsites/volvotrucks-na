function newId() {
  return (Math.random() + 1).toString(36).substring(7);
}

function calcScrollHeight(rowgroup) {
  return [...rowgroup.children].map((child) => child.clientHeight).reduce((l, r) => l + r, 0);
}

function expand(event) {
  const button = event.target.closest('button');
  const rowgroup = button.nextElementSibling;
  if (button.ariaExpanded === 'true') {
    rowgroup.style.height = 0;
    rowgroup.ariaHidden = true;
    button.ariaExpanded = false;
  } else {
    rowgroup.style.height = `${rowgroup.scrollHeight}px`;
    rowgroup.ariaHidden = false;
    button.ariaExpanded = true;
  }
}

function normalizeCells(cells, rowheaderRole = 'rowheader', cellRole = 'cell') {
  [...cells].forEach((cell, j) => {
    cell.normalize();
    // remove any blank text nodes
    if (cell.firstChild && cell.firstChild.nodeType === 3 && cell.firstChild.nodeValue.trim() === '') {
      cell.firstChild.remove();
    }
    if (cell.lastChild && cell.lastChild.nodeType === 3 && cell.lastChild.nodeValue.trim() === '') {
      cell.lastChild.remove();
    }
    // remove leading or trailing breaks
    if (cell.firstChild && cell.firstChild.tagName === 'BR') {
      cell.firstChild.remove();
    }
    if (cell.lastChild && cell.lastChild.tagName === 'BR') {
      cell.lastChild.remove();
    }
    // wrap text-only cells with a <p>
    if (!cell.querySelector('p') && cell.textContent !== '') {
      cell.innerHTML = `<p>${cell.innerHTML}</p>`;
    }
    if (j === 0 && cells.length > 1) {
      cell.role = rowheaderRole;
    } else {
      cell.role = cellRole;
    }
    cell.className = 'cell';
  });
}

function activateMobileColumn(block, index) {
  block.querySelectorAll('.cell.expand').forEach((cell) => cell.classList.remove('expand'));
  block
    .querySelectorAll(`.image-header .cell:nth-child(${index}),.row .cell:nth-child(${index + 1})`)
    .forEach((cell) => cell.classList.add('expand'));
  // adjust the height of all expanded rowgroups
  block.querySelectorAll('[role="rowgroup"][aria-hidden="false"]').forEach((rowgroup) => {
    rowgroup.style.height = `${calcScrollHeight(rowgroup)}px`;
  });
}

function changeMobileColumn(event) {
  activateMobileColumn(event.target.closest('.block'), parseInt(event.target.value, 10));
}

export default async function decorate(block) {
  block.role = 'table';

  const colCount = block.firstElementChild.children.length;
  block.style.setProperty('--grid-col-count', colCount);
  const header = block.firstElementChild;
  let firstRowIndex = 0;

  // create a table header only if there are multiple columns in the first row
  if (header.children.length > 1) {
    const pictures = header.querySelectorAll('picture');
    if (pictures.length > 0) {
      const row = document.createElement('div');
      row.className = 'image-header';
      pictures.forEach((picture) => {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.appendChild(picture);
        row.appendChild(cell);
      });
      header.insertAdjacentElement('beforebegin', row);
      normalizeCells(row.children, 'cell');
      firstRowIndex += 1;
    }

    header.className = 'column-header';
    normalizeCells(header.children, 'rowheader', 'columnheader');
    const mobileColumnHeader = document.createElement('div');
    mobileColumnHeader.className = 'column-header-mobile';
    mobileColumnHeader.innerHTML = `<select>
      ${[...header.querySelectorAll('[role="columnheader"]')]
        .map((columnHeader, i) => `<option value="${i + 1}">${columnHeader.textContent}</option>`)
        .join('')}
      </select>`;
    mobileColumnHeader.firstElementChild.addEventListener('change', changeMobileColumn);
    header.insertAdjacentElement('afterend', mobileColumnHeader);
    firstRowIndex += 2;
  }

  // rowgroups and rows
  const rows = [...block.children];
  let rowCount = 0;
  // special case: if all rows are single column (accordion style) the rowgroup headings must be
  // bold
  let singleColumn = true;
  for (let i = firstRowIndex; i < rows.length && singleColumn; i += 1) {
    singleColumn = rows[i].children.length === 1;
  }
  for (let i = firstRowIndex, rowgroup = null; i < rows.length; i += 1) {
    const row = rows[i];
    const cells = row.children;
    const firstChild = (cells[0].firstElementChild && cells[0].firstElementChild.firstElementChild) || cells[0].firstElementChild;
    const isWrappedByStrong = cells[0].children.length === 1 && firstChild && firstChild.tagName === 'STRONG';
    const isHeader = cells.length === 1 && (!singleColumn || isWrappedByStrong);

    if (isHeader) {
      const button = document.createElement('button');
      button.className = 'rowgroup-header';
      button.type = 'button';
      button.appendChild(cells[0]);
      button.addEventListener('click', expand);
      button.ariaExpanded = false;
      row.insertAdjacentElement('beforebegin', button);

      rowgroup = row;
      rowgroup.role = 'rowgroup';
      rowgroup.id = newId();
      rowgroup.ariaHidden = true;
      button.setAttribute('aria-controls', rowgroup.id);
    } else {
      row.className = 'row';
      row.role = 'row';
      rowCount += 1;
      if (rowgroup) {
        rowgroup.appendChild(row);
      }
      normalizeCells(cells);
    }
  }

  block.ariaRowCount = rowCount;
  block.ariaColCount = colCount;

  activateMobileColumn(block, 1);
}
