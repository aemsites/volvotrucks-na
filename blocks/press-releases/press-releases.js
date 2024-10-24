import {
  getLanguagePath,
  getOrigin,
  getDateFromTimestamp,
} from '../../scripts/common.js';
import {
  ffetch,
} from '../../scripts/lib-ffetch.js';
import {
  createList,
  splitTags,
} from '../../scripts/magazine-press.js';
import {
  createOptimizedPicture,
  readBlockConfig,
  toClassName,
} from '../../scripts/aem.js';

const stopWords = ['a', 'an', 'the', 'and', 'to', 'for', 'i', 'of', 'on', 'into'];

function createPressReleaseFilterFunction(activeFilters) {
  return (pr) => {
    if (activeFilters.tags) {
      if (!toClassName(pr.tags).includes(activeFilters.tags)) return false;
    }
    if (activeFilters.search) {
      const terms = activeFilters.search.toLowerCase().split(' ').map((e) => e.trim()).filter((e) => !!e);
      const text = pr.content.toLowerCase();
      if (!terms.every((term) => !stopWords.includes(term) && text.includes(term))) return false;
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
  return [
    fullText,
    tagFilter,
  ];
}

function getPressReleases(limit, filter) {
  const indexUrl = new URL(`${getLanguagePath()}press-releases.json`, getOrigin());
  let pressReleases = ffetch(indexUrl);
  if (filter) pressReleases = pressReleases.filter(filter);
  if (limit) pressReleases = pressReleases.limit(limit);
  return pressReleases.all();
}

function buildPressReleaseArticle(entry) {
  const {
    path,
    image,
    title,
    description,
    publishDate,
  } = entry;
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

function createPressReleaseList(block, pressReleases, {
  filter = filterPressReleases,
  filterFactory = createFilter,
  articleFactory = buildPressReleaseArticle,
  limit,
}) {
  // eslint-disable-next-line no-param-reassign
  pressReleases = pressReleases.map((pr) => ({ ...pr, filterTag: splitTags(pr.tags) }));
  createList(pressReleases, filter, filterFactory, articleFactory, limit, block);
}

function createFeaturedPressReleaseList(block, pressReleases) {
  createPressReleaseList(block, pressReleases, { filter: null, filterFactory: null });
}

function createLatestPressReleases(block, pressReleases) {
  createPressReleaseList(block, pressReleases, { filterFactory: null });
}

export default async function decorate(block) {
  const isFeatured = block.classList.contains('featured');
  const isLatest = !isFeatured && block.classList.contains('latest');

  if (isFeatured) {
    const links = [...block.firstElementChild.querySelectorAll('a')]
      .map(({ href }) => (href ? new URL(href).pathname : null))
      .filter((pathname) => !!pathname);
    const pressReleases = await getPressReleases(
      links.length,
      ({ path }) => links.indexOf(path) >= 0,
    );
    createFeaturedPressReleaseList(block, pressReleases);
    return;
  }

  if (isLatest) {
    const cfg = readBlockConfig(block);
    const filter = cfg.tags && createPressReleaseFilterFunction({ tags: toClassName(cfg.tags) });
    const pressReleases = await getPressReleases(3, filter);
    createLatestPressReleases(block, pressReleases);
  } else {
    const pressReleases = await getPressReleases();
    createPressReleaseList(block, pressReleases, { limit: 10 });
  }
}
