import { addVideoShowHandler, isVideoLink, selectVideoLink, wrapImageWithVideoLink } from '../../scripts/video-helper.js';

export default function decorate(block) {
  // apply modifiers to the wrapper as well
  const gapCls = [...block.classList].filter((cls) => cls.indexOf('gap') >= 0);
  if (gapCls.length) {
    block.parentElement.classList.add(gapCls);
  }
  // Formats a table and applies background images. Generally, each item should be in a table cell.
  // When a cell is empty, the cells are merged vertically.
  const columns = [...block.firstElementChild.children];

  // convert new format to old format: cells in each column are moved into the first row as <li>
  block.querySelectorAll(':scope > div').forEach((row, rowIndex) => {
    row.querySelectorAll(':scope > div').forEach((cell, columnIndex) => {
      wrapContentInList(cell);

      // make sure it's not rendered as a button
      cell.querySelector('a')?.classList.remove('button');

      if (rowIndex > 0) {
        // move to first row
        cell.querySelectorAll('li').forEach((li) => {
          if (li.childElementCount) {
            columns[columnIndex].querySelector('ul').append(li);
          }
        });
        cell.remove();
      }
    });
    if (rowIndex > 0) {
      row.remove();
    }
  });
  removeEmptyLi(block);

  const grid = document.createElement('ul');

  const colCount = columns.length;
  // get the max of list items per column, remove empty ones
  const rowCount = columns
    .map(
      (col) =>
        [...col.querySelectorAll('li')].filter((li) => {
          if (li.innerHTML.trim() === '') {
            li.remove();
          }
          return !!li.parentElement;
        }).length,
    )
    .reduce((l, r) => Math.max(l, r), 0);

  grid.style.setProperty('--grid-row-count', rowCount);
  grid.style.setProperty('--grid-col-count', colCount);

  columns.forEach((column) => {
    const lis = column.querySelectorAll(':scope > ul > li');
    const liCount = lis.length;
    lis.forEach((li, i) => {
      const contentContainer = document.createElement('div');
      contentContainer.innerHTML = li.innerHTML;
      li.innerHTML = '';

      const links = contentContainer.querySelectorAll('a');
      const image = contentContainer.querySelector('picture');
      let selectedLink = links[0];

      if (links.length && isVideoLink(links[0])) {
        selectedLink = selectVideoLink(links);

        // remove other video links
        links.forEach((link) => link !== selectedLink && link.remove());
      }

      if (image && selectedLink) {
        // wrap the image with the link, remove the link from the content container
        selectedLink.innerText = '';
        selectedLink.appendChild(image);
        selectedLink.remove();
      }

      li.appendChild(selectedLink ?? image);

      const textItems = contentContainer.innerHTML.split('<br>').filter((text) => text.trim() !== '');
      if (textItems.length) {
        let html = `<h3>${textItems[0]}</h3>`;
        if (textItems.length > 1) {
          html += `<p>${textItems.slice(1).join('</p><p>')}</p>`;
        }
        contentContainer.innerHTML = html;
        li.appendChild(contentContainer);
      }

      // first item spans multiple rows
      if (i === 0 && liCount < rowCount) {
        li.style.setProperty('--grid-row-span', rowCount - liCount + 1);
      }

      grid.appendChild(li);
    });
  });

  block.innerHTML = grid.outerHTML;

  // iterating through the list after the HTML manipulation
  const links = [...block.querySelectorAll('a')];

  links
    .filter((link) => isVideoLink(link))
    .forEach((link) => {
      addVideoShowHandler(link);
      wrapImageWithVideoLink(link, link.querySelector('picture'));
    });
}

/**
 * make sure there is an <ul>, move any content into an <li>
 */
function wrapContentInList(cell) {
  const nonListContent = [...cell.childNodes].filter((el) => el.nodeName !== 'UL');

  let ul = cell.querySelector(':scope > ul');
  if (!ul) {
    ul = document.createElement('ul');
    cell.append(ul);
  }

  if (nonListContent.length) {
    const li = document.createElement('li');
    if (cell.dataset.align) {
      li.dataset.align = cell.dataset.align;
    }
    li.append(...nonListContent);
    ul.append(li);
  }
}

function removeEmptyLi(cell) {
  cell.querySelectorAll('li').forEach((li) => {
    if (li.innerHTML.trim() === '') {
      li.remove();
    }
  });
}
