/* eslint-disable no-unused-expressions */
/* global describe before it afterEach */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import { adjustPretitle } from '../../scripts/common.js';

/** @type {import('./types').Scripts} */
let commonScript;
/** @type {import('./types').LibFranklin} */
// eslint-disable-next-line no-unused-vars
let lib;

document.body.innerHTML = await readFile({ path: './dummy.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('createElement', () => {
  before(async () => {
    commonScript = await import('../../scripts/common.js');
    lib = await import('../../scripts/aem.js');

    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('should create an element with specified tag name', () => {
    const elem = commonScript.createElement('span');
    expect(elem.tagName).to.equal('SPAN');
  });

  it('should add classes to the created element', () => {
    const elem = commonScript.createElement('div', { classes: ['class1', 'class2'] });
    expect(elem.classList.contains('class1')).to.be.true;
    expect(elem.classList.contains('class2')).to.be.true;
  });

  it('should not add classes if classes option is not provided', () => {
    const elem = commonScript.createElement('div');
    expect(elem.classList.length).to.equal(0);
  });

  it('should remove class attribute if classes array is empty', () => {
    const elem = commonScript.createElement('p', { classes: [] });
    expect(elem.getAttribute('class')).to.be.null;
  });

  it('should set attributes on the created element', () => {
    const elem = commonScript.createElement('a', { props: { href: 'https://example.com', target: '_blank' } });
    expect(elem.getAttribute('href')).to.equal('https://example.com');
    expect(elem.getAttribute('target')).to.equal('_blank');
  });

  it('should handle empty props object', () => {
    const elem = commonScript.createElement('span', { props: {} });
    expect(elem.hasAttributes()).to.be.false;
  });

  it('should handle boolean attribute values', () => {
    const elem = commonScript.createElement('input', { props: { checked: true } });
    expect(Boolean(elem.getAttribute('checked'))).to.be.true;
  });

  it('should handle both string and array of classes', () => {
    const elem = commonScript.createElement('div', { classes: 'class-string' });
    expect(elem.classList.contains('class-string')).to.be.true;
  });
});

describe('adjustPretitle', () => {
  afterEach(async () => {
    document.body.innerHTML = await readFile({ path: './body.html' });
  });

  it('Should NOT make changes when there is no heading', () => {
    const testElementId = 'test-element';
    const testNode = document.createRange().createContextualFragment(`
      <div id=${testElementId}>
        <span>Test content</span>
        <p>Test paragraph</p>
      </div>
    `);
    const mainEl = document.body.querySelector('main');
    mainEl.append(testNode);
    const beforeHTML = mainEl.querySelector(`#${testElementId}`).outerHTML;

    adjustPretitle(mainEl.querySelector(`#${testElementId}`));

    const afterHTML = mainEl.querySelector(`#${testElementId}`).outerHTML;

    expect(beforeHTML).equal(afterHTML);
  });

  it('Should NOT make changes for HTML with headings in the correct order', () => {
    const testElementId = 'test-element';
    const testNode = document.createRange().createContextualFragment(`
      <div id=${testElementId}>
        <span>Test content</span>
        <p>Test paragraph</p>
        <h1>First heading</h1>
        <h2>Second heading</h2>
      </div>
    `);
    const mainEl = document.body.querySelector('main');
    mainEl.append(testNode);
    const beforeHTML = mainEl.querySelector(`#${testElementId}`).outerHTML;

    adjustPretitle(mainEl.querySelector(`#${testElementId}`));

    const afterHTML = mainEl.querySelector(`#${testElementId}`).outerHTML;

    expect(beforeHTML).equal(afterHTML);
  });

  it('Should change every low level heading which is directly before the higher level heading to pretitle', () => {
    const testElementId = 'test-element';
    const pretitleText = 'Pretitle element';
    const testNode = document.createRange().createContextualFragment(`
      <div id=${testElementId}>
        <span>Test content</span>
        <p>Test paragraph</p>
        <h2>${pretitleText}</h2>
        <h1>First heading</h1>
        <h3>Some other heading</h3>
      </div>
    `);
    const mainEl = document.body.querySelector('main');
    mainEl.append(testNode);
    const beforeHTML = mainEl.querySelector(`#${testElementId}`).outerHTML;

    adjustPretitle(mainEl.querySelector(`#${testElementId}`));

    const afterHTML = mainEl.querySelector(`#${testElementId}`).outerHTML;

    expect(beforeHTML).not.equal(afterHTML);
    // no H2
    expect(mainEl.querySelector(`#${testElementId} h2`)).to.be.null;
    // H2 replaced with pretitle
    expect(mainEl.querySelector(`#${testElementId} span.pretitle`).textContent).equal(pretitleText);
  });
});

describe('slugify', () => {
  before(async () => {
    commonScript = await import('../../scripts/common.js');
  });

  it('should trim spaces', () => {
    const result = commonScript.slugify(' Cards   ');
    expect(result).to.equal('cards');
  });

  it('should convert uppercapse to lowercase', () => {
    const result = commonScript.slugify('Cards');
    expect(result).to.equal('cards');
  });

  it('should convert spaces in hyphen', () => {
    const result = commonScript.slugify('Cards 1');
    expect(result).to.equal('cards-1');
  });

  it('should convert double hyphen in single hyphen', () => {
    const result = commonScript.slugify('Cards--1');
    expect(result).to.equal('cards-1');
  });

  it('should convert accents to characters', () => {
    const result = commonScript.slugify('Cárüñs');
    expect(result).to.equal('caruns');
  });

  it('should remove special characters', () => {
    const result = commonScript.slugify('传');
    expect(result).to.equal('');
  });
});

describe('checkOneTrustGroup', () => {
  it('should return true when the group is present with value 1', () => {
    // Simulate a cookie with the group 'group1' set to 1
    document.cookie = 'OptanonConsent=group1:1;';

    const result = commonScript.checkOneTrustGroup('group1');
    expect(result).to.be.true;
  });

  it('should return false when the group is present with a value other than 1', () => {
    // Simulate a cookie with the group 'group2' set to 0 (or any value other than 1)
    document.cookie = 'OptanonConsent=group2:0;';

    const result = commonScript.checkOneTrustGroup('group2');
    expect(result).to.be.false;
  });

  it('should return false when the group is not present in the cookie', () => {
    // Simulate an empty cookie
    document.cookie = '';

    const result = commonScript.checkOneTrustGroup('group3');
    expect(result).to.be.false;
  });

  it('should handle URL encoding of the group name', () => {
    // Simulate a cookie with a URL-encoded group name
    document.cookie = 'OptanonConsent=group%204:1;';

    const result = commonScript.checkOneTrustGroup('group 4');
    expect(result).to.be.true;
  });
});
