import { createElement, getOrigin, getDateFromTimestamp } from '../../scripts/common.js';
import { createList, splitTags } from '../../scripts/magazine-press.js';
import { createOptimizedPicture, loadCSS } from '../../scripts/aem.js';
import createPagination from '../../common/pagination/pagination.js';
import { fetchPressReleases } from '../../scripts/services/press-release.service.js';

const stopWords = ['a', 'an', 'the', 'and', 'to', 'for', 'i', 'of', 'on', 'into'];

function createPressReleaseFilterFunction(activeFilters) {
  return (pr) => {
    if (activeFilters.search) {
      const terms = activeFilters.search
        .toLowerCase()
        .split(' ')
        .map((e) => e.trim())
        .filter((e) => !!e);
      const text = pr.title.toLowerCase();
      if (!terms.every((term) => !stopWords.includes(term) && text.includes(term))) {
        return false;
      }
    }
    return true;
  };
}

function filterPressReleases(pressReleases, activeFilters) {
  return pressReleases.filter(createPressReleaseFilterFunction(activeFilters));
}

function createFilter(pressReleases, activeFilters, createDropdown, createFullText) {
  const tags = Array.from(new Set(pressReleases.flatMap((n) => n.filterTag).sort()));
  const fullText = createFullText('search', activeFilters.search, 'type here to search');
  const tagFilter = createDropdown(tags, activeFilters.tags, 'tags', 'All', 'filter by tags');
  const tagSelection = tagFilter.querySelector('select');
  tagSelection.addEventListener('change', (e) => {
    e.target.form.submit();
  });
  return [fullText, tagFilter];
}

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

let passes = 1;
let temporaryOffset = 0;

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

  if (pressReleases.length < count) {
    temporaryOffset = temporaryOffset < count ? 100 * passes : count - temporaryOffset;
    passes = passes + 1;

    const morePressReleases = await processPressReleases({
      ...params,
      offset: temporaryOffset,
    });
    return pressReleases.concat(morePressReleases);
  }

  return pressReleases;
};

function getPressReleases() {
  const params = { sort: 'PUBLISH_DATE_DESC' };
  const pressReleases = processPressReleases(params);

  return pressReleases;
}

function buildPressReleaseArticle(entry) {
  const { path, image, title, description, publishDate } = entry;
  const card = document.createElement('article');
  const picture = createOptimizedPicture(image, title, false, [{ width: '414' }]);
  const pictureTag = picture.outerHTML;
  const formattedDate = getDateFromTimestamp(publishDate);
  card.innerHTML = `<a href="${path}">
    ${pictureTag}
  </a>
  <div>
    <span class="date">${formattedDate}</span>
    <h3><a href="${path}">${title}</a></h3>
    <p>${description}</p>
  </div>`;
  return card;
}

function createPressReleaseList(
  block,
  pressReleases,
  { filter = filterPressReleases, filterFactory = createFilter, articleFactory = buildPressReleaseArticle, limit },
) {
  pressReleases = pressReleases.map((pr) => ({ ...pr, filterTag: splitTags(pr.tags) }));
  createList(pressReleases, filter, filterFactory, articleFactory, limit, block);
}

function createAllPressReleases(block, pressReleases) {
  createPressReleaseList(block, pressReleases, { limit: 10 });
}

function reducePressReleaseList(pressReleases, limit) {
  return pressReleases?.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / limit);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
}

export default async function decorate(block) {
  const limitAmount = 10;
  const pressReleases = await getPressReleases();

  // Set the chunks of the array for future pagination
  const chunkedPressReleases = reducePressReleaseList(pressReleases, limitAmount);
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
}
