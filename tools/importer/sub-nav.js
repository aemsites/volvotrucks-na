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

const createMetadata = (main, document) => {
  const meta = {};
  meta.Robots = 'noindex, nofollow';

  const block = WebImporter.Blocks.getMetadataBlock(document, meta);
  main.append(block);

  return meta;
};

function createSubNav(main, document) {
  const subNav = main.querySelector('div.sub-navigation > div > ul.sub-links');
  if (subNav) {
    console.log('sub-nav found');
    main.innerHTML = '';
    main.append(subNav);
    main.append(document.createElement('hr'));
    return true;
  }
  throw new Error('No SubNav on page');
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

export default {
  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transformDOM: ({ document, url, html, params }) => {
    // define the main element: the one that will be transformed to Markdown
    const main = document.body;

    // use helper method to remove header, footer, etc.
    WebImporter.DOMUtils.remove(main, [
      'header > div.container',
      'div.refresh-header-mobile-container',
      'div.navbar',
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
      'div.modal',
    ]);

    createSubNav(main, document, url);

    linkToHlxPage(main, document, url);

    // create the metadata block and append it to the main element
    createMetadata(main, document);

    return main;
  },

  /**
   * Return a path that describes the document being transformed (file name, nesting...).
   * The path is then used to create the corresponding Word document.
   * @param {HTMLDocument} document The document
   * @param {URL} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @return {string} The path
   */
  generateDocumentPath: ({ document, url, html, params }) => {
    const subNavUrl = new URL('sub-nav', url);
    return WebImporter.FileUtils.sanitizePath(subNavUrl.pathname.replace(/\.html$/, '').replace(/\/$/, ''));
  },
};
