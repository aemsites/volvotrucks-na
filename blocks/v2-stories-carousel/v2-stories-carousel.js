import {
  createOptimizedPicture,
  getMetadata,
  decorateIcons,
} from '../../scripts/aem.js';
import {
  createElement,
  getDateFromTimestamp,
  MAGAZINE_CONFIGS,
  extractObjectFromArray,
} from '../../scripts/common.js';
import {
  clearCurrentArticle,
  fetchMagazineArticles,
  isMagazineTemplate,
  removeArticlesWithNoImage,
  sortArticlesByDateField,
} from '../../scripts/services/magazine.service.js';
import { smoothScrollHorizontal } from '../../scripts/motion-helper.js';

const blockName = 'v2-stories-carousel';
const lowLimit = 3;
const highLimit = 7;

const updateActiveClass = (elements, targetElement) => {
  elements.forEach((el) => {
    if (el === targetElement) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
};

const listenScroll = (carousel) => {
  const elements = carousel.querySelectorAll(':scope > *');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateActiveClass(elements, entry.target);
      }
    });
  }, {
    root: carousel,
    threshold: 1,
  });

  elements.forEach((el) => io.observe(el));
};

const getScrollOffset = (carousel) => {
  const first = carousel.firstElementChild;
  const second = first.nextElementSibling;
  return second.getBoundingClientRect().x - first.getBoundingClientRect().x;
};

const updateArrowButtonsState = (carousel, arrowLeftButton, arrowRightButton, index) => {
  const isAtStart = index === 0;
  const isAtEnd = index === carousel.childElementCount - 1;

  arrowLeftButton.disabled = isAtStart;
  arrowRightButton.disabled = isAtEnd;
};

const setCarouselPosition = (carousel, index, arrowLeftButton, arrowRightButton) => {
  const elements = carousel.querySelectorAll(':scope > *');
  const scrollOffset = getScrollOffset(carousel);
  const targetX = index * scrollOffset;

  smoothScrollHorizontal(carousel, targetX, 500);
  updateActiveClass(elements, elements[index]);
  updateArrowButtonsState(carousel, arrowLeftButton, arrowRightButton, index);
};

const navigate = (carousel, direction, arrowLeftButton, arrowRightButton) => {
  if (carousel.classList.contains('is-animating')) return;

  const activeItem = carousel.querySelector(`.${blockName}-item.active`);
  let index = [...activeItem.parentNode.children].indexOf(activeItem);

  if (direction === 'left') {
    index -= 1;
    if (index === -1) {
      index = 0;
    }
  } else {
    index += 1;
    if (index > carousel.childElementCount - 1) {
      index = carousel.childElementCount - 1;
    }
  }

  setCarouselPosition(carousel, index, arrowLeftButton, arrowRightButton);
};

const createArrowControls = (carousel) => {
  const arrowControls = createElement('ul', { classes: [`${blockName}-arrowcontrols`] });

  const arrowLeftButton = createElement('button', {
    classes: [`${blockName}-arrowbutton`],
    props: { 'aria-label': 'Previous' },
  });
  const leftIcon = createElement('span', { classes: ['icon', 'icon-arrow-left'] });
  arrowLeftButton.append(leftIcon);

  const arrowRightButton = createElement('button', {
    classes: [`${blockName}-arrowbutton`],
    props: { 'aria-label': 'Next' },
  });
  const rightIcon = createElement('span', { classes: ['icon', 'icon-arrow-right'] });
  arrowRightButton.append(rightIcon);

  const leftArrowListItem = createElement('li');
  leftArrowListItem.append(arrowLeftButton);

  const rightArrowListItem = createElement('li');
  rightArrowListItem.append(arrowRightButton);

  arrowControls.append(leftArrowListItem, rightArrowListItem);
  carousel.insertAdjacentElement('beforebegin', arrowControls);

  decorateIcons(arrowControls);

  arrowLeftButton.addEventListener('click', () => navigate(carousel, 'left', arrowLeftButton, arrowRightButton));
  arrowRightButton.addEventListener('click', () => navigate(carousel, 'right', arrowLeftButton, arrowRightButton));

  updateArrowButtonsState(carousel, arrowLeftButton, arrowRightButton, 0);

  return arrowControls;
};

const getMagazineArticles = async (limit = 5, tags = []) => {
  const allArticles = await fetchMagazineArticles();
  const artsWithImage = removeArticlesWithNoImage(allArticles);
  let articles = clearCurrentArticle(artsWithImage);

  if (isMagazineTemplate) {
    articles = clearCurrentArticle(articles);
  }

  // If there are tags, filter the article list by that tag
  if (tags.length > 0) {
    articles = articles.filter((article) => tags.some((tag) => article.tags.includes(tag)));
  }

  // If there are less articles than the limit complete the list with the rest of articles
  if (articles.length < limit) {
    const missingArts = artsWithImage.filter((art) => !tags.some((tag) => art.tags.includes(tag)));
    const sortedArticles = sortArticlesByDateField(missingArts);
    const missingArticles = sortedArticles.slice(0, limit - articles.length);
    articles = articles.concat(missingArticles);
  }

  return articles.slice(0, limit);
};

const buildStoryCard = (entry) => {
  const {
    path,
    image,
    title: originalTitle,
    description,
    linkText,
    publishDate,
    readingTime,
  } = entry;

  const title = originalTitle.split('|')[0].trim();
  const li = createElement('article', { classes: `${blockName}-item` });
  const picture = createOptimizedPicture(image, title, false);
  const pictureTag = picture.outerHTML;
  const readMore = (linkText || 'Read full story');

  const { DATE_OPTIONS } = MAGAZINE_CONFIGS;
  const dateOptions = DATE_OPTIONS ? extractObjectFromArray(JSON.parse(DATE_OPTIONS)) : {};
  const formattedDate = getDateFromTimestamp(publishDate, dateOptions);

  const svgArrowRight = createElement('span', { classes: ['icon', 'icon-arrow-right'] });
  const cardFragment = document.createRange().createContextualFragment(`
    <a href="${path}">
      ${pictureTag}
    </a>
    <div class="${blockName}-text">
      <h3>${title}</h3>
      <p>${description}</p>
      <ul class="${blockName}-meta">
        <li class="${blockName}-date">
          <time datetime="${formattedDate}" pubdate="pubdate">
            ${formattedDate}
          </time>
        </li>
        <li class="${blockName}-timetoread">
          <span>${readingTime} read</span>
        </li>
      </ul>
      <a href="${path}" class="${blockName}-cta button tertiary">
        ${readMore}
        ${svgArrowRight.outerHTML}
      </a>
    </div>`);

  decorateIcons(cardFragment);
  li.append(...cardFragment.children);
  return li;
};

const createStoriesCarousel = (block, stories) => {
  const storiesSection = createElement('section', { classes: `${blockName}-items` });
  block.appendChild(storiesSection);
  stories.forEach((entry) => {
    const storyArticle = buildStoryCard(entry);
    storiesSection.appendChild(storyArticle);
  });
};

export default async function decorate(block) {
  const isRelatedArticles = block.classList.contains('related-articles');
  let limit = parseFloat(block.textContent.trim()) || highLimit;
  limit = Math.max(limit, lowLimit);

  block.innerHTML = '';
  let stories;
  if (isRelatedArticles) {
    const tags = getMetadata('article:tag').split(',').map((tag) => tag.trim());
    stories = await getMagazineArticles(limit, tags);
  } else {
    stories = await getMagazineArticles(limit);
  }
  createStoriesCarousel(block, stories);

  const carousel = block.querySelector(`.${blockName}-items`);

  const arrowControls = createArrowControls(carousel);
  const arrowLeftButton = arrowControls.querySelector('button[aria-label="Previous"]');
  const arrowRightButton = arrowControls.querySelector('button[aria-label="Next"]');

  listenScroll(carousel);
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (carousel) {
        // Scroll to the second item
        setCarouselPosition(carousel, 1, arrowLeftButton, arrowRightButton);
      }
    });
  });
}
