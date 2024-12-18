/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-unused-vars */

const hr = (doc) => doc.createElement('hr');
const span = (doc, text) => {
  const el = doc.createElement('span');
  el.textContent = text;
  return el;
};
const meta = {};

function identifyTemplate(main, document) {
  delete meta.template;
  const pressRelease = document.querySelector('#Form1 > div.container.main-content > div.wb');
  if (pressRelease) {
    meta.template = 'article';
  }
}

function setArticleTags(url) {
  const request = new XMLHttpRequest();
  request.open('GET', '/tools/importer/vtna-pa-tags.json', false);
  request.send(null);
  let inTags = {};
  if (request.status === 200) {
    inTags = JSON.parse(request.responseText);
  }
  const matchUrl = `https://www.volvotrucks.us${url.replaceAll('http://localhost:3001', '').replaceAll('?host=https%3A%2F%2Fwww.volvotrucks.us', '')}`;
  const tags = inTags.data.find((el) => el['Page URL'] === matchUrl);
  if (tags && tags.t1) {
    meta.tags = `${tags.t1}`;
    if (tags.t2) {
      meta.tags = `${meta.tags}, ${tags.t2}`;
      if (tags.t3) {
        meta.tags = `${meta.tags}, ${tags.t3}`;
        if (tags.t4) {
          meta.tags = `${meta.tags}, ${tags.t4}`;
          if (tags.t5) {
            meta.tags = `${meta.tags}, ${tags.t5}`;
            if (tags.t6) {
              meta.tags = `${meta.tags}, ${tags.t6}`;
              if (tags.t7) {
                meta.tags = `${meta.tags}, ${tags.t7}`;
                if (tags.t8) {
                  meta.tags = `${meta.tags}, ${tags.t8}`;
                  if (tags.t9) {
                    meta.tags = `${meta.tags}, ${tags.t9}`;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

const linkToHlxPage = (main, document, url) => {
  main.querySelectorAll('a').forEach((link) => {
    if (new RegExp('^(https?:)?//').test(link.href)) {
      // leave links with domains as is
    } else if (link.href.startsWith('/')) {
      const newUrl = new URL(link.href, 'https://main--vg-volvotrucks-us--hlxsites.hlx.page');
      link.href = newUrl.href;
    }
  });
};

const createMetadata = (main, document, url) => {
  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.innerHTML.replace(/[\n\t]/gm, '');
  }

  const desc = document.querySelector('[property="og:description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  const publishDate = document.querySelector('div.postFullDate');
  if (publishDate) {
    meta['publish-date'] = publishDate.textContent;
    publishDate.remove();
  }

  const img = document.querySelector('[property="og:image"]');
  if (img && img.content) {
    const el = document.createElement('img');
    el.src = img.content;
    meta.Image = el;
  }

  if (meta.template === 'article') {
    setArticleTags(url);
    console.log(meta.tags);
  }

  const { pathname } = new URL(url);
  const languages = ['fr-ca', 'en-ca'];
  if (
    ['/trucks/', '/our-difference/']
      .flatMap((path) => [path, ...languages.map((lang) => `/${lang}${path}`)])
      .find((path) => pathname.startsWith(path))
  ) {
    const styles = meta.Style ? meta.Style.split(', ') : [];
    if (!styles.includes('center')) {
      styles.push('center');
    }
    meta.Style = styles.join(', ');
  }

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

function makeIndexPage(url) {
  const importerURL = new URL(url);
  const newUrl = new URL('index', url);
  return importerURL.pathname.endsWith('/') ? newUrl.toString() : importerURL.pathname;
}

/**
 * Subtitles are marked with italics and then rendered in gray.
 */
const styleSubtitleHeaders = (main, document, url) => {
  document.querySelectorAll(':is(h1, h2, h3, h4, h5, h6):is(.subtitle, .product-grid-subtitle)').forEach((header) => {
    const em = document.createElement('em');
    em.innerHTML = header.innerHTML;

    header.textContent = '';
    header.appendChild(em);
  });
};

const createMagazineArticles = (main, document, url) => {
  const mainContent = document.querySelector('#Form1 > div.container.main-content > section.hubArticle > article > div');
  if (mainContent) {
    const mainImgs = mainContent.querySelectorAll('img');
    mainImgs.forEach((img) => {
      img.src = img.src.replace('.ashx', '.jpg');
      img.src = new URL(url).pathname + img.src;
    });

    const topics = document.querySelector('#Form1 > div.container.main-content > section.hubArticle > aside > div.topics');

    if (topics) {
      const tags = topics.querySelectorAll('ul > li');
      let artTags = '';
      tags.forEach((tag) => {
        if (artTags.length > 0) {
          artTags = `${artTags}, ${tag.textContent}`;
        } else {
          artTags = `${tag.textContent}`;
        }
      });
      meta.tags = artTags;
    }

    const artDetails = document.querySelectorAll('div.details > ul > li');
    artDetails.forEach((detail) => {
      if (detail.classList.contains('author')) {
        meta.author = detail.textContent;
      }
      if (detail.classList.contains('time')) {
        meta.readingTime = detail.textContent;
      }

      if (detail.classList.contains('date')) {
        meta['publish-date'] = detail.textContent;
      }
    });

    const relatedSection = document.querySelector('section.hubTeaser.related');
    const relatedHeader = '<h3 class="MediumTitleSentence">Related Content</h3>';
    const relatedCells = [['Related Articles'], ['']];
    const relatedArticleBlock = WebImporter.DOMUtils.createTable(relatedCells, document);
    relatedSection.replaceWith(relatedArticleBlock);
    relatedArticleBlock.insertAdjacentHTML('beforebegin', relatedHeader);
    relatedArticleBlock.insertAdjacentElement('afterend', hr(document));

    const subscribeSection = document.querySelector('section.hubTextBlock');
    const formHeader = `<div class="default-content-wrapper">
        <h2 id="driving-progress-1">Driving Progress</h2>
        <p>Get the latest product information, Volvo Trucks news and updates delivered. Sign up below.</p>
      </div>`;
    const subscribeCells = [['Eloqua Form'], ['ExceedingExpectationsSignup'], ['Thanks!']];
    const subscribeBlock = WebImporter.DOMUtils.createTable(subscribeCells, document);
    subscribeSection.replaceWith(subscribeBlock);
    subscribeBlock.insertAdjacentHTML('beforebegin', formHeader);

    document.querySelector('aside.sidebar')?.remove();
    document.querySelector('section.hubArticleHero')?.remove();
    document.querySelector('a.yt_play img')?.remove();

    console.log(url);
    if (url.includes('/volvo-trucks-magazine/')) {
      meta.template = 'magazine';
    }

    mainContent.append(hr(document));
  }
};

function createPRDownloadBlock(main, document) {
  const post = document.querySelectorAll('#Form1 > div.container.main-content > div > div > div > div.wb-entry > div.postSummary');
  const cells = [['Download Images']];
  post.forEach((heads) => {
    heads.querySelectorAll('p img').forEach(async (img) => {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      cells.push([newImg]);
    });
    const downloadBlock = WebImporter.DOMUtils.createTable(cells, document);
    heads.after(downloadBlock);
  });
}

function swapHero(main, document) {
  const heroImg = document.querySelector('#Form1 > div.container.main-content > section.hubArticleHero > div > div:nth-child(1)');
  WebImporter.DOMUtils.replaceBackgroundByImg(heroImg, document);
}

function convertTopTenListItem(main, document) {
  [...document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div[data-layout="top-ten"]')].forEach((topTen) => {
    const elements = topTen.querySelectorAll('li.top-ten-item');
    if (elements) {
      let currentRow = [];
      let startNewTable = false;

      elements.forEach((li) => {
        const fullRow = li.classList.contains('full');
        if (fullRow) {
          startNewTable = true;
        }

        if (startNewTable && currentRow.length) {
          // flush the current row, start a new table
          const cells = [['Teaser Grid']];
          cells.push([...currentRow]);
          const table = WebImporter.DOMUtils.createTable(cells, document);
          topTen.append(table);

          currentRow = [];
        }

        const div = document.createElement('div');
        const heroImg = li.querySelector('figure');
        div.append(WebImporter.DOMUtils.replaceBackgroundByImg(heroImg, document));

        div.append(...li.childNodes);
        currentRow.push(div);

        li.remove();
        startNewTable = !!fullRow;
      });

      if (currentRow.length) {
        const cells = [['Teaser Grid']];
        cells.push([...currentRow]);
        const table = WebImporter.DOMUtils.createTable(cells, document);
        topTen.append(table);
      }
    }
  });
}

function makeTruckHero(main, document) {
  const mainHero = document.querySelector('#Form1 > div.container.main-content > div.heroImage');
  if (mainHero) {
    const subhead = mainHero.querySelector('div > div.wrapper > div > div > h4');
    const herohead = mainHero.querySelector('div > div.wrapper > div > div > h1');
    const normal = document.createElement('p');
    if (subhead) {
      normal.innerHTML = subhead.innerHTML;
      subhead.remove();
    }
    mainHero.after(hr(document));
    mainHero.after(normal);
    mainHero.after(herohead);
  }
}

function makeGridItem(teaser) {
  const img = new Image();
  if (teaser.style.backgroundImage) {
    img.src = teaser.style.backgroundImage.replace(/url\(/gm, '').replace(/'/gm, '').replace(/\)/gm, '');
  }
  const anchor = teaser.querySelector('a');
  let newA = '';
  if (anchor) {
    if (anchor.getAttribute('data-video-src')) {
      newA = anchor.getAttribute('data-video-src');
    } else {
      newA = anchor.href;
    }
  }

  const txtH3 = teaser.querySelector('div.text > h3');
  const txtH4 = teaser.querySelector('div.text > h4');
  const gi = document.createElement('div');
  const giInnerItems = [`<img src='${img.src}'>`];
  if (newA) {
    giInnerItems.push(`<a href='${newA}'>${newA}</a>`);
  }
  if (txtH3) {
    giInnerItems.push(txtH3.innerHTML);
  }
  if (txtH4) {
    giInnerItems.push(txtH4.innerHTML);
  }
  gi.innerHTML = giInnerItems.join('<br/>');

  if (newA === '') {
    gi.querySelector('a')?.remove();
  }

  return gi.outerHTML;
}

/**
 * @param div e.g. <div class="generic-grid-col col-sm-8">
 * @return e.g. 8
 */
function getColumnWidth(div) {
  const columns = [...div.classList].filter((name) => name.startsWith('col-')).map((name) => name.match(/\d+/)[0]);

  if (columns) {
    return columns[0];
  }
  return [];
}

function fixAlternatingLeftRightColumns(main, document) {
  const grids = document.querySelectorAll('#Form1 div.container .imageTextGrid .imageTextGrid-1-right .imageText-grid');
  console.log(`alternating grid(s) found: ${grids.length}`);
  grids.forEach((grid) => {
    const childElements = Array.from(grid.children);
    childElements.reverse();

    childElements.forEach((child) => {
      grid.appendChild(child);
    });
  });
}

function makeGenericGrid(main, document) {
  const genericGrids = document.querySelectorAll('#Form1 div.generic-grid.full-width');
  console.log(`generic grid(s) found: ${genericGrids.length}`);

  genericGrids.forEach((grid) => {
    let variation = '';

    const gridColumns = grid.querySelectorAll('div.generic-grid-col');
    const dataCells = [];

    gridColumns.forEach((gridColumn, columnIndex) => {
      Array.from(gridColumn.children).forEach((colContent, rowIndex) => {
        // create new empty rows when needed
        if (!dataCells[rowIndex]) {
          dataCells[rowIndex] = [];
          for (let i = 0; i < gridColumns.length; i++) {
            dataCells[rowIndex][i] = '';
          }
        }

        const div = document.createElement('div');
        div.innerHTML = makeGridItem(colContent);
        dataCells[rowIndex][columnIndex] = div;
      });
    });

    // find column width hints
    const columnLayout = [];
    gridColumns.forEach((gridColumn, columnIndex) => {
      const columnWidth = getColumnWidth(gridColumn);
      if (columnWidth) {
        columnLayout.push(columnWidth);
      }
    });
    if (columnLayout.length >= 2) {
      variation = ` (layout ${columnLayout.join('-')})`;
    }

    const cells = [[`Teaser Grid${variation}`], ...dataCells];
    const teaserGrid = WebImporter.DOMUtils.createTable(cells, document);
    grid.replaceWith(teaserGrid);
  });
}

function distributeItemsInColumns(items, columns) {
  const cells = [];
  while (cells.length < Math.ceil(items.length / columns)) {
    cells.push([]);
  }
  items.forEach((product, index) => {
    const rowIndex = Math.floor(index / columns);
    cells[rowIndex].push(product);
  });

  // If there are multipe rows, fill last row to avoid colspan.
  const lastRow = cells[cells.length - 1];
  while (cells.length > 1 && lastRow.length < columns) {
    lastRow.push('');
  }

  return cells;
}

function makePhotoCarousel(main, document) {
  document.querySelectorAll('#Form1 div.carousel').forEach((car) => {
    const images = car.querySelectorAll('.heroImage:not(.slick-cloned) img');
    const cells = [['Carousel']];
    cells.push(...distributeItemsInColumns(images, 2));
    const carousel = WebImporter.DOMUtils.createTable(cells, document);
    car.replaceWith(carousel);
  });
}

function makeProductCarousel(main, document) {
  const pc = document.querySelectorAll('#Form1 div.productCarousel');
  if (pc) {
    console.log(`product carousel(s) found: ${pc.length}`);
    pc.forEach((car) => {
      const cells = [['Carousel']];
      const items = [];
      const wrap = car.querySelector('div.carousel-wrapper');
      wrap.querySelectorAll('div.product').forEach((it) => {
        const item = document.createElement('div');
        item.append(it.querySelector('img'), document.createElement('br'), it.querySelector('.product-title'));
        items.push(item);
      });
      cells.push(...distributeItemsInColumns(items, 3));

      const carousel = WebImporter.DOMUtils.createTable(cells, document);
      wrap.replaceWith(carousel);
    });
  }
}

function makeProductGrid(main, document) {
  const pc = document.querySelectorAll('#Form1 div.productGrid');
  if (pc) {
    console.log(`product carousel(s) found: ${pc.length}`);
    pc.forEach((car) => {
      const cells = [['Carousel (grid on desktop)']];
      const items = [];
      const wrap = car.querySelector('div.carousel-wrapper');
      car.querySelectorAll('.hidden-xs div.product').forEach((it) => {
        const item = document.createElement('div');
        item.append(it.querySelector('img'), document.createElement('br'), it.querySelector('.wrapper'));
        items.push(item);
      });
      cells.push(...distributeItemsInColumns(items, 3));

      car.querySelectorAll('.visible-xs,.row.hidden-xs').forEach((el) => el.remove());
      if (cells.length > 1) {
        const carousel = WebImporter.DOMUtils.createTable(cells, document);
        car.insertAdjacentElement('beforeend', carousel);
      }
    });
  }
}

function makeVideo(main, document) {
  document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div.embeddedVideo iframe[src]').forEach((video) => {
    const link = document.createElement('a');
    link.href = video.src;
    link.textContent = video.src;
    const embed = WebImporter.DOMUtils.createTable([['Embed'], [link], [span(document, 'PLEASE FIX LINK TO FALLBACK VIDEO')]], document);
    video.replaceWith(embed);
  });
}

function convertArialCapsTitle(main, document) {
  const titles = document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div.newsArticle > .row p span.arialCapsTitle');
  titles.forEach((title) => {
    const h3 = document.createElement('h3');
    h3.innerHTML = title.innerHTML;
    // use copy "center" style from parent
    h3.setAttribute('style', title.parentNode.getAttribute('style'));
    title.replaceWith(h3);
  });
}

function makeImageText(main, document) {
  const it = document.querySelectorAll(
    '#Form1 > div.container.main-content.allow-full-width > div.imageText > div:not(.imageText-fullsize-outsideText,.imageText-only-text)',
  );
  if (it) {
    console.log(`image text(s) found: ${it.length}`);
    it.forEach((its) => {
      const cells = [['Teaser Cards']];
      cells.push([its.innerHTML]);
      const teaserCards = WebImporter.DOMUtils.createTable(cells, document);
      its.replaceWith(teaserCards);
    });
  }

  // small texts in text only
  document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div.imageText > div.imageText-only-text small').forEach((t) => {
    const cells = [['Text (xs)']];
    cells.push([t.innerHTML]);
    const teaserCards = WebImporter.DOMUtils.createTable(cells, document);
    t.replaceWith(teaserCards);
  });
}

function mergeEqualConsecutiveBlocks(main, document) {
  const blocksToAutomerge = ['Teaser Cards', 'Columns', 'Content Hero'];

  main.querySelectorAll('table').forEach((table) => {
    const blockTitle = table.querySelector('th')?.textContent;
    const blockTypeWithoutVariant = blockTitle?.replaceAll(/\(.*$/g, '').trim();
    if (!blocksToAutomerge.includes(blockTypeWithoutVariant)) {
      return;
    }

    // merge if previous element is of the same kind and exact same variation
    const previousTable = table.previousElementSibling;
    if (
      previousTable &&
      previousTable.tagName === 'TABLE' &&
      previousTable.querySelector('th').textContent === table.querySelector('th').textContent
    ) {
      console.log(`merging ${blockTypeWithoutVariant} block`);
      table.childNodes.forEach((row, index) => {
        if (index === 0) {
          return;
        }
        previousTable.appendChild(row);
      });
      table.remove();
    }
  });
}

function makeTabbedFeatures(main, document) {
  const tm = document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div.tabbedFeatures');
  if (tm) {
    console.log(`tabbed features found: ${tm.length}`);
    tm.forEach((panel) => {
      const labels = [...panel.querySelectorAll('.hidden-xs .navigation-container li')].map((li) => li.textContent.trim());
      const contents = [...panel.querySelectorAll('.hidden-xs .content-container .tab-pane')].map((content) => {
        makeImageTextGrid(content, document);
        return content;
      });

      if (contents.length === labels.length) {
        const elements = [hr(document)];
        const titleWrapper = panel.querySelector('.title-wrapper');
        if (titleWrapper) {
          elements.unshift(titleWrapper);
        }
        for (let i = 0; i < contents.length; i++) {
          elements.push(contents[i]);
          const metadata = [['Section Metadata'], ['Tabs', labels[i]]];
          elements.push(WebImporter.DOMUtils.createTable(metadata, document));
          elements.push(hr(document));
        }
        panel.replaceWith(...elements);
      } else {
        console.log('did not import tabbed features, labels do not match content');
      }
    });
  }
}

function makeTabbedCarousel(main, document) {
  const tc = document.querySelectorAll('#Form1 > div.container.main-content > div.tabbedCarousel');
  if (tc) {
    console.log(`tabbed carousel found: ${tc.length}`);
    tc.forEach((c) => {
      const fullWidth = !c.matches('.hasArrows');
      const slides = c.querySelectorAll('.slide:not(.slick-cloned)');
      // create a section with metadata for each slide
      const sections = [...slides].map((slide) => {
        const section = document.createElement('div');
        section.innerHTML = slide.innerHTML;

        // handle videos
        section.querySelectorAll('a[data-video-src]').forEach((a) => {
          const { videoSrc } = a.dataset;
          const ytLink = document.createElement('a');
          ytLink.textContent = videoSrc;
          ytLink.href = videoSrc;
          const fallbackLink = document.createElement('a');
          fallbackLink.textContent = 'Fallback Vide Link Missing';
          fallbackLink.href = 'https://main--vg-volvotrucks-us-rd--netcentric.hlx.page/media_188a071943b60070cb995240235c66862e9ca5e95.mp4';
          const cells = [['Embed (autoplay, loop, full width)'], [fallbackLink], [ytLink]];
          a.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
        });

        const metadata = [['Section Metadata']];
        if (fullWidth) {
          metadata.push(['Style', 'Full Width']);
        }
        metadata.push(['Carousel', slide.getAttribute('tab-title')]);
        section.appendChild(WebImporter.DOMUtils.createTable(metadata, document));
        section.appendChild(hr(document));
        return section;
      });
      if (sections.length) {
        const h2 = c.querySelector('h2');
        if (h2) {
          c.insertAdjacentElement('beforebegin', h2);
        }
        if (c.previousElementSibling?.tagName !== 'HR') {
          c.insertAdjacentElement('beforebegin', hr(document));
        }
        c.replaceWith(...sections);
      }
    });
  }
}

function makeHubTextBlock(main, document) {
  const htb = document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > section.hubTextBlock');
  if (htb) {
    console.log(`hub text block found: ${htb.length}`);
    htb.forEach((block) => {
      const elements = [hr(document)];
      // take the heading and eventually the text after
      const heading = block.querySelector('h2');
      if (heading) {
        elements.push(heading);
        if (heading.nextElementSibling && heading.nextElementSibling.tagName === 'P') {
          elements.push(heading.nextElementSibling);
        }
      }
      const cells = [['Eloqua Form']];
      const img = document.createElement('img');
      img.src = block.querySelector('div.container ').style.backgroundImage.replace(/url\(/gm, '').replace(/'/gm, '').replace(/\)/gm, '');
      const formName = block.querySelector('fieldset > input[name=elqFormName]');
      if (formName) {
        cells.push([formName.value]);
      } else {
        cells.push(['form name not found']);
      }
      const form = WebImporter.DOMUtils.createTable(cells, document);
      elements.push(form);
      elements.push(WebImporter.DOMUtils.createTable([['Section Metadata'], ['Background', img]], document));
      elements.push(hr(document));
      block.replaceWith(...elements);
    });
  }
}

function makeForm(main, document) {
  document.querySelectorAll('.contact-form.ajax').forEach((form) => {
    const formNameField = form.querySelector('input[name=elqFormName]');
    if (formNameField) {
      // title maybe is in previous element https://www.volvotrucks.us/trucks/vnr-electric/vnr-electric-contact/
      if (form.previousElementSibling && form.previousElementSibling.matches('.newsArticle')) {
        const text = form.previousElementSibling.textContent.trim();
        if (text) {
          const h2 = document.createElement('h2');
          h2.textContent = text;
          form.previousElementSibling.replaceWith(h2);
        }
      }
      const { value: formName } = formNameField;
      const cells = [['Eloqua Form'], [formName]];
      form.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
    }
  });
}

function makeNewsFeaturesPanelAndImageTextGrid(main, document) {
  const nfp = document.querySelectorAll('.newsArticle, .newsFeatures, .imageTextGrid');
  if (nfp) {
    console.log(`news features panel found: ${nfp.length}`);
    nfp.forEach((panel) => {
      let columns = -1;
      if (panel.firstElementChild.matches('.newsFeatures-column-3, .imageTextGrid-3')) {
        columns = 3;
      } else if (panel.firstElementChild.matches('.newsFeatures-column-2, .imageTextGrid-2')) {
        columns = 2;
      } else if (panel.firstElementChild.matches('.imageTextGrid-4')) {
        columns = 4;
      } else if (panel.querySelector('.row .col-sm-6')) {
        columns = 2;
      }

      // this should handle the body builder news block - which isn't a Teaser Card
      if (panel.previousElementSibling && panel.previousElementSibling.querySelector('.volvo-bodybuilder-header')) {
        const cells = [['Body Builder News']];
        cells.push(['source', '/body-builder.json']);
        cells.push(['quantity', 'small']);
        const cols = WebImporter.DOMUtils.createTable(cells, document);
        panel.replaceWith(cols);
      } else if (columns > 0) {
        const cells = [['Teaser Cards']];
        const isLinkListOnMobile = panel.querySelector('.imageTextGrid .imageTextGrid-4 .imageText-grid .image-container');
        if (isLinkListOnMobile) {
          cells[0][0] += ' (Link List on mobile)';
        }

        let hasVideos = false;
        let row = [];

        const items = panel.querySelectorAll('div.col-sm-4, div.col-sm-6, div.col-sm-3');
        for (let i = 0; i < items.length; i++) {
          const item = items[i];

          const videoLink = item.querySelector('a[data-video-src]');
          if (videoLink && videoLink.href === 'about:blank#') {
            hasVideos = true;

            // Move image up, and add standalone link below.
            videoLink.parentNode.insertBefore(videoLink.querySelector('img'), videoLink);

            videoLink.href = videoLink.dataset.videoSrc;
            videoLink.textContent = 'YouTube Video';

            // wrap link in paragraph
            const p = document.createElement('p');
            videoLink.parentNode.insertBefore(p, videoLink);
            p.appendChild(videoLink);
          }

          const links = item.querySelector('.news-item-links'); // display: none
          if (links && !links.classList.contains('hasLinks')) {
            links.remove();
          } else if (links) {
            const ul = document.createElement('ul');
            links.querySelectorAll('a').forEach((a) => {
              const li = document.createElement('li');
              li.appendChild(a);
              ul.appendChild(li);
            });
            links.replaceWith(ul);
          }

          item.querySelectorAll('h3,h4').forEach((heading) => {
            // remove empty headings
            if (heading.textContent.trim() === '') {
              heading.remove();
            }
          });

          item.querySelectorAll('a > img').forEach((img) => {
            // unwrap images in links
            const a = img.parentElement;
            a.before(img);
            a.before(document.createElement('br'));
            a.textContent = a.href;
          });

          row.push(item);

          if (row.length === columns) {
            cells.push(row);
            row = [];
          }
        }

        if (cells.length > 1) {
          const cols = WebImporter.DOMUtils.createTable(cells, document);
          const headings = panel.querySelectorAll('h3,h2');
          if (headings && headings.length) {
            headings.forEach((heading) => panel.insertAdjacentElement('beforebegin', heading));
          }
          panel.replaceWith(cols);
        }
      } else {
        console.log(`unknown column count: ${panel.firstElementChild.className}`);
      }
    });
  }
}

// handles only hero-like section within the content.
function makeColumnsFullWidthBackground(main, document) {
  document.querySelectorAll('.heroImage.vtna-fwf').forEach((block) => {
    const cells = [['Content Hero (white text)']];
    const image = block.querySelector('img');
    const text = block.querySelector('.padding-container');
    const isTextRight = block.querySelector('.pull-right');

    if (isTextRight) {
      cells.push([image, text]);
    } else {
      cells.push([text, image]);
    }

    block.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
  });
}

function makeImageTextGrid(main, document) {
  const nfp = document.querySelectorAll('.imageTextGrid');
  if (nfp) {
    console.log(`image text grids found: ${nfp.length}`);
    nfp.forEach((panel) => {
      // use columns only for the image text grid 1
      const imageLeft = panel.firstElementChild.matches('.imageTextGrid-1-left');
      const imageRight = panel.firstElementChild.matches('.imageTextGrid-1-right');
      const threeCol = panel.firstElementChild.matches('.imageTextGrid-3');

      if (threeCol) {
        const cells = [['Teaser Cards']];
        const cards = panel.querySelectorAll('div.col-sm-4');
        const cardArr = [];
        cards.forEach((card) => {
          cardArr.push(card);
        });
        cells.push(cardArr);
        panel.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
      }

      if (imageLeft || imageRight) {
        const cells = [['Columns']];
        const imageContainer = panel.querySelector('.image-container');
        const contentContainer = panel.querySelector('.wrapper');
        if (imageLeft) {
          cells.push([imageContainer, contentContainer]);
        } else {
          cells.push([contentContainer, imageContainer]);
        }

        const links = contentContainer.querySelectorAll('a');
        links.forEach((a) => {
          const text = a.textContent.trim();
          if (text.endsWith('>')) {
            // secondary link
            a.textContent = text.substring(0, text.length - 1).trim();
          }
          if (a.parentElement.tagName !== 'EM') {
            const em = document.createElement('em');
            a.after(em);
            em.append(a);
          }
        });

        if (links.length > 1) {
          const ul = document.createElement('ul');
          links[0].parentElement.before(ul);
          links.forEach((link) => {
            const li = document.createElement('li');
            li.append(link.parentElement); // link wrapped in em
            ul.append(li);
          });
        }

        panel.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
      }
    });
  }
}

function make360Image(main, document) {
  const image360 = document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div._360-view');
  if (image360) {
    console.log(`360 image(s) found: ${image360.length}`);
    image360.forEach((img360) => {
      const cells = [['Image 360']];
      const imgs = img360.querySelectorAll('img.slide');
      if (imgs.length === 0) {
        img360.remove();
        return;
      }
      imgs.forEach((img) => {
        cells.push([img]);
      });
      const block360 = WebImporter.DOMUtils.createTable(cells, document);
      img360.replaceWith(block360);
    });
  }
}

/* this only is works with press-release 'articles' */
function makeNewsArticle(main, document) {
  const newsArticle = document.querySelectorAll('#Form1 div.newsArticle');
  if (newsArticle && meta.template === 'article') {
    console.log(`newsArticle(s) found: ${newsArticle.length}`);

    newsArticle.forEach((article) => {
      // ignore empty divs to prevent duplicate fragments
      if (!article.textContent.trim()) {
        return;
      }

      const cells = [['Fragment']];
      cells.push(['https://main--vg-volvotrucks-us-rd--netcentric.hlx.page/fragments/press-release-boilerplate']);
      const table = WebImporter.DOMUtils.createTable(cells, document);
      article.replaceWith(table);
      table.insertAdjacentElement('afterend', hr(document));
    });
  }
}

function makeSpecificationTable(main, document) {
  const specTable = document.querySelectorAll('#Form1 div.container > div.specificationsTable');
  if (specTable) {
    console.log(`Specification Table(s) found: ${specTable.length}`);
    specTable.forEach((st) => {
      // clean up invalid html
      const ths = st.querySelectorAll('td[colspan="100%"]');
      ths.forEach((th) => {
        th.removeAttribute('colspan');
      });

      // remove mobile versions mobileSpecsContainer
      if (st.nextElementSibling?.matches('.mobileSpecsContainer')) {
        st.nextElementSibling.remove();
      }

      const cells = [['Specifications']];
      let headerTable = st.firstElementChild;
      if (['H2', 'H3', 'H4'].indexOf(headerTable.tagName) >= 0) {
        const heading = headerTable;
        headerTable = headerTable.nextElementSibling;
        st.before(heading);
      }
      if (headerTable.tagName === 'TABLE') {
        const images = [...headerTable.querySelectorAll('img')];
        const [name, ...titles] = [...headerTable.querySelectorAll('.header td')];
        const headerRow = [name.textContent.trim()];
        titles.forEach((title, i) => {
          const div = document.createElement('div');
          if (images[i]) {
            div.append(images[i], document.createElement('br'));
          }
          div.append(...title.childNodes);
          headerRow.push(div);
        });
        cells.push(headerRow);
      }

      function mapRows(content) {
        content.querySelectorAll('tr').forEach((tr, row) => {
          cells.push(
            [...tr.querySelectorAll('td')].map((td) => {
              const div = document.createElement('div');
              div.innerHTML = td.innerHTML;
              return div;
            }),
          );
        });
      }

      // for each collapsible section
      const collapsibleContent = st.querySelectorAll('button');
      collapsibleContent.forEach(({ textContent: label, nextElementSibling: content }) => {
        const button = document.createElement('strong');
        button.textContent = label.trim();
        cells.push([button]);
        mapRows(content);
      });

      if (collapsibleContent.length === 0) {
        // uncollapsible content
        const content = st.querySelector('.content.uncollapsible');
        mapRows(content);
      }

      st.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
    });
  }
}

function makeLinkList(main, document) {
  let linkLists = main.querySelectorAll('ul.links');
  if (linkLists.length) {
    linkLists.forEach((linkList) => {
      linkList.querySelectorAll('li > a').forEach((a) => {
        // wrap <a> into <em> to make them secondary links
        const em = document.createElement('em');
        a.after(em);
        em.appendChild(a);
      });
    });
  }
  linkLists = main.querySelectorAll('.vhd-button-group');
  if (linkLists.length) {
    linkLists.forEach((linkList) => {
      const list = document.createElement('ul');
      linkList.querySelectorAll('a.cta').forEach((a) => {
        // wrap <a> into <em> to make them secondary links
        const li = document.createElement('li');
        li.appendChild(a);
        list.appendChild(li);
      });
      linkList.replaceWith(list);
    });
  }
}

function swapVideoCta(main, document) {
  // set the href for the video cta
  const videoCtas = main.querySelectorAll('a.cta-video[data-video-src]');
  videoCtas.forEach((a) => {
    const { videoSrc } = a.dataset;
    a.href = videoSrc;
  });
}

function markSecondaryCta(main, document) {
  main.querySelectorAll('a.cta-link').forEach((a) => {
    const em = document.createElement('em');
    a.after(em);
    em.appendChild(a);
  });
}

function makeKeyFacts(main, document) {
  main.querySelectorAll('#Form1 > div.container > .threeColumnSpecs').forEach((source) => {
    const row = source.querySelector('.row');
    const [first, second, thrid] = row.children;

    function convertColumnContent(col) {
      const div = document.createElement('div');
      const childen = [...col.firstElementChild.children];
      for (let i = 0; i < childen.length; i += 1) {
        let child = childen[i];
        if (child.matches('.caps-subtitle')) {
          const h4 = document.createElement('h4');
          h4.innerHTML = col.querySelector('.caps-subtitle').innerHTML;
          child = h4;
        }
        if (child.matches('.block-title')) {
          let text = child.textContent.trim();
          if (child.nextElementSibling && child.nextElementSibling.matches('.bold-subtitle')) {
            text += ` ${child.nextElementSibling.textContent.trim()}`;
            i += 1;
          }
          child.innerHTML = `<strong>${text}</strong>`;
        }
        div.appendChild(child);
      }
      return div;
    }

    const cells = [
      ['Key Facts (wide columns, trailing line)'],
      [convertColumnContent(first), convertColumnContent(second), convertColumnContent(thrid)],
    ];
    source.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
  });
}

function makeKeyFactsFromStats(main, document) {
  document.querySelectorAll('#stats').forEach((row) => {
    const [first, second, thrid] = row.children;

    function convertColumnContent(col) {
      const div = document.createElement('div');
      const childen = [...col.children];
      for (let i = 0; i < childen.length; i += 1) {
        let child = childen[i];
        if (child.matches('h2')) {
          let text = child.textContent.trim();
          if (child.nextElementSibling) {
            text += ` ${child.nextElementSibling.textContent.trim()}`;
            i += 1;
          }
          child = document.createElement('p');
          child.innerHTML = `<strong>${text}</strong>`;
        }
        div.appendChild(child);
      }
      return div;
    }

    const cells = [['Key Facts (wide columns)'], [convertColumnContent(first), convertColumnContent(second), convertColumnContent(thrid)]];
    row.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
  });
}

function makeDocumentList(main, document) {
  const docLists = document.querySelectorAll('#Form1 > div.container.main-content.allow-full-width > div.documentList-container');
  if (docLists) {
    console.log(`Document List(s) found: ${docLists.length}`);
    docLists.forEach((dl) => {
      const itemDivs = dl.querySelectorAll('div.inner > a');
      const cells = [['Document List']];
      itemDivs.forEach((doc) => {
        const documentURL = doc.href;
        const ul = document.createElement('ul');
        doc.querySelectorAll('h3, small').forEach((item) => {
          const anchor = document.createElement('a');
          const li = document.createElement('li');
          anchor.href = documentURL;
          anchor.innerHTML = item.innerHTML;
          li.append(anchor);
          ul.appendChild(li);
        });
        doc.replaceWith(ul);
        cells.push([ul]);
      });
      dl.replaceWith(WebImporter.DOMUtils.createTable(cells, document));
    });
  }
}

function makeModelIntroduction(main, document) {
  document.querySelectorAll('.modelIntroduction').forEach((mi) => {
    const elements = [];
    const heading = mi.querySelector('h2');
    if (heading) {
      elements.push(heading);
    }
    const description = mi.querySelector('h2 ~ p.description');
    if (description) {
      elements.push(description);
    }
    const specs = mi.querySelectorAll('.model-spec');
    if (specs.length === 0) {
      mi.remove();
      return;
    }
    const cells = [['Columns (center)']];
    cells.push(
      [...mi].map((ms) => {
        const icon = ms.querySelector('.fa');
        if (icon) {
          const [, iconName] = [...icon.classList];
          icon.innerHTML = `:${iconName}:`;
        }
        return ms;
      }),
    );
    elements.push(WebImporter.DOMUtils.createTable(cells, document));
    mi.replaceWith(...elements);
  });
}

function importBodyBuilderArticle(main, document) {
  const bba = main.querySelector('div.newsIntro');
  if (bba) {
    console.log('body builder article detected');
    if (!meta.template) {
      meta.template = 'body-builder-article';
      meta.index_title = main.querySelector('div.news-article-headline h1').textContent.trim();
      console.log(main.querySelector('div.news-article-headline span.news-article-date').textContent);
      meta.index_date = main.querySelector('div.news-article-headline span.news-article-date').textContent;
    } else {
      console.log('warn: template already set');
    }
  }
}

function fixCtaInBlockQuote(main, document) {
  document.querySelectorAll('blockquote').forEach((bq) => {
    const lastEl = bq.lastElementChild;
    if (lastEl && lastEl.tagName === 'A') {
      bq.after(lastEl);
    }
  });
}

function fixListWithListStyleNone(main, document) {
  document.querySelectorAll('ul').forEach((ul) => {
    if (ul.style.listStyleType === 'none') {
      const elements = [];
      ul.querySelectorAll('li').forEach((li) => {
        const p = document.createElement('p');
        p.append(...li.childNodes);
        elements.push(p);
      });
      ul.after(...elements);
      ul.remove();
    }
  });
}

function isLinkToPdf(href) {
  try {
    return href && !href.startsWith('#') && new URL(href).pathname.endsWith('.pdf');
  } catch (e) {
    return false;
  }
}

function makeEmbedVideoFromYoutubeLink(main, document) {
  // used for broken yt link on https://www.volvotrucks.us/our-difference/safety/active-driver-assist/
  main.querySelectorAll('youtube').forEach((yt) => {
    if (yt.nextElementSibling.matches('iframe')) {
      const link = document.createElement('a');
      link.href = yt.nextElementSibling.src;
      link.textContent = yt.nextElementSibling.src;
      const embed = WebImporter.DOMUtils.createTable([['Embed'], [link], [span(document, 'PLEASE FIX LINK TO FALLBACK VIDEO')]], document);
      yt.closest('div').querySelector('.yt_thumbnail')?.remove();
      yt.closest('div').querySelector('a.yt_play')?.remove();
      yt.closest('p').replaceWith(embed);
    }
  });
}

// e.g.https://www.volvotrucks.us/news-and-stories/press-releases/2015/december/advantage-truck-center-opens-in-greensboro-expanding-volvo-trucks-sales-and-service/
function removeOldNewsCarousel(main, document) {
  main.querySelectorAll('.newsArticle ').forEach((article) => {
    if (article.previousElementSibling?.querySelector("[onclick='getNextArticle()']")) {
      article.previousElementSibling.remove();
    }
  });
}

export default {
  transform: async ({ document, url, html, params }) => {
    // define the main element: the one that will be transformed to Markdown
    const main = document.body;
    const results = [];

    results.push({
      element: main,
      path: new URL(makeIndexPage(url)).pathname,
    });

    // use helper method to remove header, footer, etc.
    WebImporter.DOMUtils.remove(main, [
      'body > #Form1 > header',
      'body > #Form1 > div > header',
      'footer',
      '#onetrust-pc-sdk',
      '#onetrust-consent-sdk',
      'body > img:nth-child(1)',
      'body > img:nth-child(2)',
      'body > img:nth-child(3)',
      'body > img[src="/tcpauth.ashx?"]',
      'body > img[src="/tcpauth.ashx?logout=1"]',
      'body > img[src="https://www.macktrucks.com/tcpauth.ashx?"]',
      'body > img[src="https://www.volvotrucks.us/tcpauth.ashx?"]',
      '.vtna-fwf-mobile',
      'div.modal',
    ]);
    delete meta.image;
    delete meta.template;
    delete meta.index_date;
    delete meta.index_title;

    linkToHlxPage(main, document, url);

    identifyTemplate(main, document);
    swapHero(main, document);
    swapVideoCta(main, document);
    markSecondaryCta(main, document);
    makeEmbedVideoFromYoutubeLink(main, document);
    makeTruckHero(main, document);
    convertTopTenListItem(main, document);
    makeTabbedCarousel(main, document);
    fixAlternatingLeftRightColumns(main, document);
    makeGenericGrid(main, document);
    makePhotoCarousel(main, document);
    makeProductCarousel(main, document);
    makeProductGrid(main, document);
    makeImageText(main, document);
    makeNewsFeaturesPanelAndImageTextGrid(main, document);
    makeColumnsFullWidthBackground(main, document);
    makeImageTextGrid(main, document);
    makeTabbedFeatures(main, document);
    make360Image(main, document);
    makeHubTextBlock(main, document);
    createPRDownloadBlock(main, document);
    removeOldNewsCarousel(main, document);
    makeNewsArticle(main, document);
    createMagazineArticles(main, document, url);
    convertArialCapsTitle(main, document, url);
    makeVideo(main, document, url);
    makeSpecificationTable(main, document);
    mergeEqualConsecutiveBlocks(main, document, url);
    styleSubtitleHeaders(main, document, url);
    makeLinkList(main, document);
    makeKeyFacts(main, document);
    makeKeyFactsFromStats(main, document);
    makeDocumentList(main, document);
    makeModelIntroduction(main, document);
    makeForm(main, document);
    importBodyBuilderArticle(main, document);
    fixCtaInBlockQuote(main, document);
    fixListWithListStyleNone(main, document);
    // create the metadata block and append it to the main element
    createMetadata(main, document, url);

    main.querySelectorAll('a').forEach((a) => {
      const href = a.getAttribute('href');
      if (isLinkToPdf(href)) {
        const u = new URL(`http://localhost:3001${new URL(href).pathname}?host=https%3A%2F%2Fwww.volvotrucks.us`);
        const newPath = WebImporter.FileUtils.sanitizePath(u.pathname).replace(/\//, '');
        // no "element", the "from" property is provided instead
        // importer will download the "from" resource as "path"
        results.push({
          path: newPath,
          from: u.toString(),
        });

        // update the link to new path on the target host
        // this is required to be able to follow the links in Word
        const newHref = new URL(`https://main--vg-volvotrucks-us-rd--netcentric.hlx.page${newPath}`).toString();
        a.setAttribute('href', newHref);
      }
    });

    return results;
  },
};
