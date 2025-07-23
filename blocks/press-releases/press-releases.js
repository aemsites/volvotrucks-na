import { createElement, getOrigin, getDateFromTimestamp, getTextLabel } from '../../scripts/common.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import createPagination from '../../common/pagination/pagination.js';
import { fetchPressReleases } from '../../scripts/services/press-release.service.js';

const blockName = 'press-releases';
let passes = 1;
let temporaryOffset = 0;
let isFirstLoad = true;

const parsePressRelease = (item) => {
  const isImageLink = (link) => `${link}`.split('?')[0].match(/\.(jpeg|jpg|gif|png|svg|bmp|webp)$/) !== null;

  const getDefaultImage = () => {
    const logoImageURL = '/media/logo/media_10a115d2f3d50f3a22ecd2075307b4f4dcaedb366.jpeg';
    return getOrigin() + logoImageURL;
  };

  const { image } = item.metadata;

  return {
    ...item.metadata,
    image: isImageLink(image) ? getOrigin() + image : getDefaultImage(),
    path: item.metadata?.url,
    isDefaultImage: !isImageLink(image),
  };
};

const processPressReleases = async (params = {}) => {
  const rawData = await fetchPressReleases(params);

  if (!rawData) {
    console.error('No data returned from fetchPressReleases');
    return [];
  }
  const { items, count } = rawData;

  if (!items || items.length === 0) {
    console.error('No items returned in raw data:', rawData);
    return [];
  }

  const pressReleases = items.map((item) => parsePressRelease(item));
  temporaryOffset = temporaryOffset + 100 < count ? 100 * passes : count - temporaryOffset + temporaryOffset;
  passes++;

  if (temporaryOffset < count) {
    const morePressReleases = await processPressReleases({
      ...params,
      offset: temporaryOffset,
    });
    return pressReleases.concat(morePressReleases);
  }

  return pressReleases;
};

const getPressReleases = (query) => {
  if (!isFirstLoad) {
    passes = 1;
    temporaryOffset = 0;
  }

  const params = { sort: 'PUBLISH_DATE_DESC' };
  if (query) {
    params.q = query;
  }
  const pressReleases = processPressReleases(params);
  isFirstLoad = false;

  return pressReleases;
};

const buildSearchBar = () => {
  const searchBar = createElement('div', { classes: `${blockName}__search-bar` });
  searchBar.innerHTML = `
    <input type="text" name="search" autocomplete="off" placeholder="${getTextLabel('PressReleases:SearchPlaceholder')}"/>
    <button type="submit"><i class="fa fa-search"></i></button>`;
  return searchBar;
};

const buildPressReleaseArticle = (entry) => {
  const { path, image, title, description, publishDate } = entry;
  const card = createElement('article', { classes: `${blockName}__article` });
  const picture = createOptimizedPicture(image, title, false, [{ width: '414' }]);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);
  card.innerHTML = `
    <a href="${path}">
      ${pictureTag}
    </a>
    <div>
      <span class="date">${formattedDate}</span>
      <h3><a href="${path}">${title}</a></h3>
      <p>${description}</p>
    </div>`;
  return card;
};

const createAllPressReleases = (block, pressReleases) => {
  const prList = createElement('ul', { classes: ['article-list'] });
  pressReleases.forEach((pr) => {
    prList.append(buildPressReleaseArticle(pr));
  });
  block.append(prList);
};

const reducePressReleaseList = (pressReleases, limit) => {
  return pressReleases?.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / limit);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
};

const loadChunkedArticles = async (block, pressReleases, displayLimitAmount) => {
  if (!isFirstLoad) {
    const content = block.querySelector('.pagination-content');
    if (content) {
      content.innerHTML = '';
    }
  }

  // Set the chunks of the array for future pagination
  const chunkedPressReleases = reducePressReleaseList(pressReleases, displayLimitAmount);
  if (chunkedPressReleases && chunkedPressReleases.length > 0) {
    let contentArea = block.querySelector('.pagination-content');
    if (!contentArea) {
      contentArea = createElement('div', { classes: ['pagination-content'] });
      block.appendChild(contentArea);
    }
    const baseURL = window.location.origin;
    await loadCSS(`${baseURL}/common/pagination/pagination.css`);
    createPagination(chunkedPressReleases, block, createAllPressReleases, contentArea, 0);
  } else {
    console.error('No chunked items created.');
  }
};

export default async function decorate(block) {
  block.append(buildSearchBar());

  const contentArea = createElement('div', { classes: ['pagination-content'] });
  block.appendChild(contentArea);

  const displayLimitAmount = 10;
  let pressReleases = await getPressReleases();

  loadChunkedArticles(block, pressReleases, displayLimitAmount);

  const searchInput = block.querySelector(`.${blockName}__search-bar input`);
  const searchButton = block.querySelector(`.${blockName}__search-bar button`);

  searchButton.addEventListener('click', async () => {
    const query = searchInput.value;

    pressReleases = await getPressReleases(query);
    loadChunkedArticles(block, pressReleases, displayLimitAmount);

    if (pressReleases.length === 0) {
      block.querySelector('.pagination-nav').innerHTML = '';
      contentArea.innerHTML = '';
      const noResultsMsg = createElement('p', { classes: `${blockName}__no-results-message` });
      noResultsMsg.textContent = getTextLabel('no results').replace('$0', `"${query}"`);
      contentArea.append(noResultsMsg);
    }
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });
}
