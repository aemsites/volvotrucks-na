import { createOptimizedPicture, readBlockConfig } from '../../scripts/aem.js';
import { getOrigin, getDateFromTimestamp } from '../../scripts/common.js';
import { ffetch } from '../../scripts/lib-ffetch.js';

async function getArticles(path, limit) {
  const indexUrl = new URL(path, getOrigin());
  return ffetch(indexUrl).sheet('sorted').limit(limit).all();
}

function buildNews(elm, releases, quantity) {
  releases.sort((a, b) => {
    if (a.date > b.date) {
      return -1;
    }
    if (a.date < b.date) {
      return 1;
    }
    return 0;
  });
  const newsDivs = releases.map((release) => {
    const div = document.createElement('div');
    div.innerHTML = `<div class="news-list">
      <div class="list-teaser">
          <div class="image-container">
              <a href="">
                  <picture>
                      <img src="" alt="">
                  </picture>
              </a>
          </div>
          <div class="news-item-metadata">
              <span class="news-item-date"></span>
          </div>
          <div class="news-item-content">
              <h3><a href=""></a></h3>
              <p></p>
          </div>
          <p class="readmore">
              <a class='rm' href=''>Read more</a>
          </p>
      </div>
    </div>`;

    div.querySelector('.image-container a').href = release.path;
    div.querySelector('.image-container img').src = release.image;
    div.querySelector('.image-container img').alt = release.title;
    div.querySelector('.news-item-date').textContent = getDateFromTimestamp(release.date);
    div.querySelector('.news-item-content h3 a').innerText = release.title;
    div.querySelector('.news-item-content h3 a').href = release.path;
    div.querySelector('.news-item-content p').textContent = release.description;
    div.querySelector('.readmore a').href = release.path;

    if (quantity === 'max') {
      div.querySelector('.readmore').remove();
    }
    return div;
  });
  elm.innerText = '';
  elm.append(...newsDivs);

  elm.querySelectorAll('img').forEach((img) => {
    img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '370px' }]));
  });
}

export default async function decorate(block) {
  const config = readBlockConfig(block);
  if (config && Object.keys(config).length >= 1) {
    const newsElement = document.createElement('div');
    let limit = 25; // artificial limit set
    if (config.quantity !== 'max') {
      limit = 3;
      newsElement.classList.add('bb-news-list-small');
    } else {
      newsElement.classList.add('bb-news-list');
    }
    const articles = await getArticles(config.source, limit);
    buildNews(newsElement, articles, config.quantity);
    block.replaceWith(newsElement);
  }
}
