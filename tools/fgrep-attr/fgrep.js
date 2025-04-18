/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
// copied from https://github.com/adobe/express-website/tree/main/tools/fgrep-attr

import TOOLS_VALUES from '../sidekick/tools-config.js';

const { GIT_OWNER, GIT_REPO, GLOBAL_SITEMAP_URL } = TOOLS_VALUES;

let sitemapURLs = [];
let totalSize = 0;
let totalFiles = 0;
let totalFilesMatched = 0;
let startTime = new Date();
let endTime = 0;

function humanFileSize(bytes, si = false, dp = 1) {
  let numBytes = bytes;
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = si ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  let u = -1;
  const r = 10 ** dp;

  do {
    numBytes /= thresh;
    u += 1;
  } while (Math.round(Math.abs(numBytes) * r) / r >= thresh && u < units.length - 1);

  return `${numBytes.toFixed(dp)} ${units[u]}`;
}

async function loadSitemap(sitemapURL) {
  const resp = await fetch(sitemapURL);
  const xml = await resp.text();
  const sitemap = new DOMParser().parseFromString(xml, 'text/xml');
  const subSitemaps = [...sitemap.querySelectorAll('sitemap loc')];
  for (let i = 0; i < subSitemaps.length; i += 1) {
    const loc = subSitemaps[i];
    const subSitemapURL = new URL(loc.textContent.trim());

    await loadSitemap(subSitemapURL.pathname);
  }
  const urlLocs = sitemap.querySelectorAll('url loc');
  urlLocs.forEach((loc) => {
    const locURL = new URL(loc.textContent.trim());
    sitemapURLs.push(locURL.pathname);
  });
}

function updateStatus() {
  const status = document.getElementById('status');
  const seconds = Math.floor((endTime - startTime) / 100) / 10;
  status.innerHTML = `Matched Files: ${totalFilesMatched} / ${totalFiles} (${humanFileSize(totalSize, true)}) ${seconds}s`;
}

async function fgrep(pathname, pattern) {
  const occurences = [];
  const resp = await fetch(pathname, { redirect: 'manual' });
  const text = await resp.text();
  let found = false;

  // ignoring case. Based on https://jsperf.app/regex-vs-tolowercase-then-regex/7
  // toLowerCase is faster than regex. Also, we don't need to escape the pattern.
  const lowercaseText = text.toLowerCase();
  const lowercasePattern = pattern.toLowerCase();

  if (lowercaseText.indexOf(lowercasePattern) >= 0) {
    found = true;

    let offset = lowercaseText.indexOf(lowercasePattern);
    while (offset >= 0) {
      const endOf = lowercaseText.indexOf('"', offset);
      occurences.push(text.substring(offset, endOf));
      offset = lowercaseText.indexOf(lowercasePattern, offset + 1);
    }
  }

  const { status } = resp;
  const size = +resp.headers.get('content-length');
  return {
    found,
    size,
    status,
    pathname,
    occurences,
  };
}

async function edit(path, y) {
  try {
    const statusRes = await fetch(`https://admin.hlx.page/status/${GIT_OWNER}/${GIT_REPO}/main${path}?editUrl=auto`);
    const status = await statusRes.json();
    const editUrl = status.edit && status.edit.url;
    if (y) {
      // scroll back to original position
      window.scrollTo(0, y);
    }
    if (editUrl) {
      window.open(editUrl);
    } else {
      throw new Error('admin did not return an edit url');
    }
  } catch (e) {
    console.log(`failed to get edit url for ${path}`, e);

    alert(`failed to get edit url for ${path}`);
  }
}

function displayResult(result) {
  const resultDisplay = document.getElementById('results');
  totalSize += result.size;
  totalFilesMatched += result.found ? 1 : 0;
  if (result.found) {
    const p = document.createElement('p');
    p.innerHTML = `${humanFileSize(result.size, true).padStart(9, ' ')} <a href="${result.pathname}">${result.pathname}</a> (${result.status})`;
    const editLink = document.createElement('a');
    editLink.className = 'edit';
    editLink.href = `#${result.pathname}`;
    editLink.onclick = () => edit(result.pathname, window.scrollY);
    p.append(' ', editLink);
    resultDisplay.appendChild(p);
  }
}

function exportResults() {
  const exp = [...document.querySelectorAll('#results > p')].map((res) => res.querySelector('a:first-of-type').getAttribute('href')).join('\n');
  const blob = new Blob([exp], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const a = document.getElementById('exportLink');
  a.href = url;
  a.download = 'fgrep-export.txt';
  a.click();
  window.URL.revokeObjectURL(url);
}

async function fgrepNextFile(queue, pattern) {
  const path = queue.shift();
  if (path) {
    totalFiles += 1;
    fgrep(path, pattern).then((result) => {
      displayResult(result);
      if (queue[0]) {
        fgrepNextFile(queue, pattern);
      }
      endTime = new Date();
      updateStatus();
    });
  }
}

async function fgrepFiles(sitemap, pattern, connections) {
  const queue = [...sitemap];
  for (let c = 0; c < connections; c += 1) {
    fgrepNextFile(queue, pattern);
  }
}

export async function run() {
  sitemapURLs = [];
  totalSize = 0;
  totalFiles = 0;
  totalFilesMatched = 0;
  startTime = new Date();
  endTime = new Date();
  document.getElementById('results').textContent = '';

  await loadSitemap(GLOBAL_SITEMAP_URL);
  const resultDisplay = document.body;
  const sitemap = sitemapURLs;
  let pattern = document.getElementById('input').value;
  let connections = 10;
  if (pattern.includes(' -c ')) {
    [pattern, connections] = pattern.split(' -c ');
  }
  fgrepFiles(sitemap, pattern, +connections, resultDisplay);
  localStorage.setItem('pattern', pattern);
}

const runButton = document.getElementById('run');
runButton.addEventListener('click', () => {
  run();
});

const input = document.getElementById('input');
input.value = localStorage.getItem('pattern') || '';
input.focus();
input.setAttribute('autocomplete', 'on');
input.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    runButton.click();
  }
});

// only run on .aem.live
if (window.location.hostname.endsWith('.aem.page')) {
  window.location.href = window.location.href.replace('.aem.page', '.aem.live');
}

document.getElementById('export').addEventListener('click', exportResults);
