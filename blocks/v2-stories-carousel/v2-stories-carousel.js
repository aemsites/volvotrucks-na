import { createOptimizedPicture, getMetadata, decorateIcons } from '../../scripts/aem.js';
import { createElement, getDateFromTimestamp, MAGAZINE_CONFIGS, extractObjectFromArray, getTextLabel } from '../../scripts/common.js';
import {
  clearCurrentArticle,
  fetchMagazineArticles,
  isMagazineTemplate,
  removeArticlesWithNoImage,
  sortArticlesByDateField,
} from '../../scripts/services/magazine.service.js';
import { smoothScrollHorizontal } from '../../scripts/motion-helper.js';

const blockName = 'v2-stories-carousel';
const LOW_LIMIT = 3;
const HIGH_LIMIT = 7;

const updateActiveClass = (elements, targetElement) => {
  elements.forEach((el) => {
    el.classList.toggle('active', el === targetElement);
  });
};

const listenScroll = (carousel) => {
  const elements = carousel.querySelectorAll(':scope > *');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveClass(elements, entry.target);
        }
      });
    },
    {
      root: carousel,
      threshold: 1,
    },
  );

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
  if (carousel.classList.contains('is-animating')) {
    return;
  }

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
  const arrowLeftButtonLabel = getTextLabel('Previous');
  const arrowRightButtonLabel = getTextLabel('Next');
  const arrowControlsContainer = createElement('ul', { classes: `${blockName}-arrowcontrols` });
  arrowControlsContainer.innerHTML = `
    <li>
      <button class="${blockName}-arrowbutton ${blockName}-arrowbutton--left" aria-label="${arrowLeftButtonLabel}">
        <span class="icon icon-arrow-left"></span>
      </button>
    </li>
    <li>
      <button class="${blockName}-arrowbutton ${blockName}-arrowbutton--right" aria-label="${arrowRightButtonLabel}">
        <span class="icon icon-arrow-right"></span>
      </button>
    </li>
  `;

  carousel.insertAdjacentElement('beforebegin', arrowControlsContainer);
  decorateIcons(arrowControlsContainer);

  const arrowLeftButton = arrowControlsContainer.querySelector(`.${blockName}-arrowbutton--left`);
  const arrowRightButton = arrowControlsContainer.querySelector(`.${blockName}-arrowbutton--right`);
  arrowLeftButton.addEventListener('click', () => navigate(carousel, 'left', arrowLeftButton, arrowRightButton));
  arrowRightButton.addEventListener('click', () => navigate(carousel, 'right', arrowLeftButton, arrowRightButton));

  updateArrowButtonsState(carousel, arrowLeftButton, arrowRightButton, 0);

  return arrowControlsContainer;
};

const getArticleTags = (metadata) => [
  ...(metadata?.article?.category || []),
  ...(metadata?.article?.topic || []),
  ...(metadata?.article?.truck || []),
];

const getMagazineArticles = async (limit = 5, tags = []) => {
  const allArticles = await fetchMagazineArticles({ sort: 'PUBLISH_DATE_DESC' });
  const artsWithImage = removeArticlesWithNoImage(allArticles);
  let articles = clearCurrentArticle(artsWithImage);

  if (isMagazineTemplate) {
    articles = clearCurrentArticle(articles);
  }

  // If tags are present, filter the article list using the specified tags.
  if (tags.length > 0) {
    articles = articles.filter((article) => {
      const articleTags = getArticleTags(article.metadata).map((tag) => tag.trim());
      return articleTags.some((articleTag) => tags.includes(articleTag));
    });
  }

  // If the number of articles is less than the limit, complete the list with additional articles.
  if (articles.length < limit) {
    const missingArticles = artsWithImage.filter((art) => {
      const articleTags = getArticleTags(art.metadata).map((tag) => tag.trim());
      return !tags.some((tag) => articleTags.includes(tag));
    });
    const sortedArticles = sortArticlesByDateField(missingArticles, 'publishDate');
    const additionalArticles = sortedArticles.slice(0, limit - articles.length);
    articles = [...articles, ...additionalArticles];
  } else {
    articles = sortArticlesByDateField(articles, 'publishDate');
  }

  return articles.slice(0, limit);
};

const buildStoryCard = (entry) => {
  const {
    metadata: {
      url,
      image,
      title: originalTitle,
      description,
      linkText,
      publishDate,
      article: { readTime },
    },
  } = entry;

  const title = originalTitle.split('|')[0].trim();
  const li = createElement('article', { classes: `${blockName}-item` });
  const picture = createOptimizedPicture(image, title, false);
  const pictureTag = picture.outerHTML;
  const readMore = linkText || 'Read full story';

  const { DATE_OPTIONS } = MAGAZINE_CONFIGS;
  const dateOptions = DATE_OPTIONS ? extractObjectFromArray(JSON.parse(DATE_OPTIONS)) : {};
  const formattedDate = getDateFromTimestamp(publishDate, dateOptions);

  const svgArrowRight = createElement('span', { classes: ['icon', 'icon-arrow-right'] });
  const cardFragment = document.createRange().createContextualFragment(`
    <a href="${url}">
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
          <span>${readTime} read</span>
        </li>
      </ul>
      <a href="${url}" class="${blockName}-cta button tertiary">
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
  let limit = parseFloat(block.textContent.trim()) || HIGH_LIMIT;
  limit = Math.max(limit, LOW_LIMIT);

  block.innerHTML = '';
  let stories;
  if (isRelatedArticles) {
    const metadataTags = ['article-category', 'topic', 'truck'];
    const tags = metadataTags.reduce((acc, metaTag) => {
      const metaContent = getMetadata(metaTag);
      if (metaContent) {
        acc.push(...metaContent.split(',').map((tag) => tag.trim()));
      }
      return acc;
    }, []);
    stories = await getMagazineArticles(limit, tags);
  } else {
    stories = await getMagazineArticles(limit);
  }
  createStoriesCarousel(block, stories);

  const carousel = block.querySelector(`.${blockName}-items`);

  const arrowControls = createArrowControls(carousel);
  const arrowLeftButton = arrowControls.querySelector(`.${blockName}-arrowbutton--left`);
  const arrowRightButton = arrowControls.querySelector(`.${blockName}-arrowbutton--right`);

  listenScroll(carousel);
  requestAnimationFrame(() => {
    setTimeout(() => {
      if (carousel) {
        // Scroll to the second item
        setCarouselPosition(carousel, 1, arrowLeftButton, arrowRightButton);
      }
    }, 500);
  });
}
