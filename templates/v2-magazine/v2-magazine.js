import { getMetadata, createOptimizedPicture, buildBlock, decorateBlock, loadBlock } from '../../scripts/aem.js';
import { createElement, getTextLabel, getPlaceholders, extractObjectFromArray, MAGAZINE_CONFIGS, getLocale } from '../../scripts/common.js';

const templateName = 'v2-magazine';
const articleHero = `${templateName}-article-hero`;
const MQ = window.matchMedia('(width < 1200px)');
const dateValues = {
  mobileDateOptions: null,
  desktopDateOptions: null,
  pubDate: null,
  locale: null,
  pubDateEl: null,
};

const dateFormatter = (date, locale, options) => new Intl.DateTimeFormat(locale, options).format(new Date(date));

const buildHeroTitle = () => {
  let title = getMetadata('og:title');
  if (title.includes('|')) {
    [title] = title.split(' |');
  }
  const heroTitle = createElement('h1', { classes: `${articleHero}__title` });
  heroTitle.innerText = title;
  return heroTitle;
};

const buildHeroImage = () => {
  const headPic = getMetadata('og:image');
  const headAlt = getMetadata('og:image:alt');
  const headImg = createOptimizedPicture(headPic, headAlt);
  headImg.classList.add(`${articleHero}__img-container`);
  return headImg;
};

// Build the 1st element of the metadata row
const buildMetaAuthor = () => {
  const author = getMetadata('author');
  const authorSpan = createElement('span', {
    classes: `${articleHero}--author`,
    props: { itemprop: 'author' },
  });
  authorSpan.innerText = author;
  return authorSpan;
};

// Build the 2nd element of the metadata row
const buildMetaPubDate = () => {
  const { DATE_OPTIONS, DATE_OPTIONS_MOBILE } = MAGAZINE_CONFIGS;
  let pubDate = getMetadata('publish-date');
  const locale = getLocale();
  const mobileDateOptions = DATE_OPTIONS_MOBILE ? extractObjectFromArray(JSON.parse(DATE_OPTIONS_MOBILE)) : {};
  const desktopDateOptions = DATE_OPTIONS ? extractObjectFromArray(JSON.parse(DATE_OPTIONS)) : {};
  const formatDateOptions = MQ.matches ? mobileDateOptions : desktopDateOptions;
  const pubDateEl = createElement('date', {
    classes: `${articleHero}__pubdate`,
    props: {
      datetime: new Date(pubDate).toISOString(),
      itemprop: 'datePublished',
    },
  });
  pubDate = dateFormatter(pubDate, locale, formatDateOptions);
  pubDateEl.innerText = pubDate;
  // Set values to be used in resizeObserver
  dateValues.mobileDateOptions = mobileDateOptions;
  dateValues.desktopDateOptions = desktopDateOptions;
  dateValues.pubDate = pubDate;
  dateValues.locale = locale;
  dateValues.pubDateEl = pubDateEl;
  return pubDateEl;
};

// Build the 3rd element of the metadata row
const buildMetaReadTime = () => {
  const readTime = getMetadata('readingtime');
  const readTimeSpan = createElement('span', { classes: `${articleHero}__readtime` });
  readTimeSpan.innerText = `${readTime.split(' ').join('')} ${getTextLabel('v2_magazine:read_time')}`;
  return readTimeSpan;
};

const buildHeroMetadata = () => {
  const textContainer = createElement('div', { classes: `${articleHero}__metadata-container` });
  const authorSpan = buildMetaAuthor();
  const pubDateEl = buildMetaPubDate();
  const readTimeSpan = buildMetaReadTime();
  textContainer.append(authorSpan, pubDateEl, readTimeSpan);
  return textContainer;
};

const splitTags = (tags) => tags.split(',').map((tag) => tag.trim());

const buildHeroTags = () => {
  const articleCategory = splitTags(getMetadata('article-category'));
  const topic = splitTags(getMetadata('topic'));
  const truck = splitTags(getMetadata('truck'));
  const tags = [...articleCategory, ...topic, ...truck].filter((tag) => tag !== '').sort((a, b) => a.localeCompare(b));
  if (tags.length > 0 && tags[0] !== '') {
    const tagList = createElement('ul', { classes: `${articleHero}__tags` });
    tags.forEach((tag) => {
      const tagLi = createElement('li', { classes: `${articleHero}__tag` });
      tagLi.innerText = tag.trim();
      tagList.append(tagLi);
    });
    return tagList;
  }
  return null;
};

const buildArticleHero = (doc, articleSearchWrapper) => {
  const main = doc.querySelector('main');
  const heroContainer = createElement('div', { classes: `${articleHero}__container` });
  const heroTitle = buildHeroTitle();
  const headImg = buildHeroImage();
  const textContainer = buildHeroMetadata();
  const tagList = buildHeroTags();

  heroContainer.append(heroTitle, headImg, textContainer);
  if (tagList) {
    heroContainer.append(tagList);
  }

  main.setAttribute('itemscope', '');
  main.setAttribute('itemtype', 'https://schema.org/Article');

  if (articleSearchWrapper) {
    articleSearchWrapper.insertAdjacentElement('afterend', heroContainer);
  } else {
    main.prepend(heroContainer);
  }

  const resizeObserver = new ResizeObserver((entries) => {
    const { mobileDateOptions, desktopDateOptions, pubDate, locale, pubDateEl } = dateValues;
    entries.forEach(() => {
      const dateOptions = MQ.matches ? mobileDateOptions : desktopDateOptions;
      pubDateEl.innerText = dateFormatter(pubDate, locale, dateOptions);
    });
  });
  resizeObserver.observe(main);
};

const loadArticleSearchBlock = (main) => {
  const variantClasses = ['default', 'black', 'gray'];
  const variant = getMetadata('article-search').toLowerCase();
  const hasArticleSearch = variantClasses.includes(variant);

  if (hasArticleSearch) {
    const blockName = 'v2-article-search';
    const isVariant = variantClasses.slice(1).includes(variant);
    const articleSearchWrapper = createElement('div');
    const articleSearch = buildBlock(blockName, []);
    articleSearch.classList.toggle(variant, isVariant);
    articleSearchWrapper.append(articleSearch);
    decorateBlock(articleSearch);
    loadBlock(articleSearch);
    main.prepend(articleSearchWrapper);
  }
};

export default async function decorate(doc) {
  await getPlaceholders();
  const main = doc.querySelector('main');
  loadArticleSearchBlock(main);
  const articleSearchWrapper = document.querySelector('.v2-article-search-wrapper');
  buildArticleHero(doc, articleSearchWrapper);
}
