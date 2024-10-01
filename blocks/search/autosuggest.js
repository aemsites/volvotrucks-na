import { createElement } from '../../scripts/common.js';
import { autosuggestQuery, fetchData } from '../../scripts/search-api.js';

const autoSuggestClass = 'autosuggest-results-item-highlighted';
const tenant = 'franklin-vg-volvotrucks-us';

export function fetchAutosuggest(term, autosuggestEle, rowEle, func) {
  const fragmentRange = document.createRange();

  fetchData({
    query: autosuggestQuery(),
    variables: {
      tenant,
      term,
      locale: 'EN',
      sizeSuggestions: 5,
    },
  }).then(({ errors, data }) => {
    if (errors) {
      // eslint-disable-next-line no-console
      console.log('%cSomething went wrong', errors);
    } else {
      const {
        volvosuggest: {
          terms,
        } = {},
      } = data;
      autosuggestEle.textContent = '';
      autosuggestEle.classList.remove('show');

      if (terms.length) {
        terms.forEach((val) => {
          const row = createElement(rowEle.tag, { classes: rowEle.class, props: rowEle.props });
          const suggestFragment = fragmentRange
            .createContextualFragment(`<b>
            ${val}
          </b>`);
          row.appendChild(suggestFragment);

          row.onclick = () => func(val);

          autosuggestEle.appendChild(row);
          autosuggestEle.classList.add('show');
        });
      }
    }
  });
}

export function handleArrowUp(props) {
  let { liSelected, next, index } = props;
  const { list } = props;
  const listLen = list.length - 1;

  if (liSelected) {
    liSelected.classList.remove(autoSuggestClass);
    index -= 1;

    next = list[index];
    if (next && index >= 0) {
      liSelected = next;
    } else {
      index = list.length - 1;
      liSelected = list[index];
    }
  } else {
    index = 0;
    liSelected = list[listLen];
  }

  liSelected.classList.add(autoSuggestClass);
  return { liSelected, index, next };
}

export function handleArrowDown(props) {
  let { index, liSelected, next } = props;
  const { list } = props;

  index += 1;

  if (liSelected) {
    liSelected.classList.remove(autoSuggestClass);

    next = list[index];
    if (next && index < list.length) {
      liSelected = next;
    } else {
      index = 0;
      [liSelected] = list;
    }
  } else {
    index = 0;
    [liSelected] = list;
  }

  liSelected.classList.add(autoSuggestClass);
  return { index, liSelected, next };
}
