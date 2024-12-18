/* global describe before it beforeEach afterEach */

import { readFile } from '@web/test-runner-commands';
import { expect } from '@esm-bundle/chai';
import sinon from 'sinon';

const videoHelper = await import('../../scripts/video-helper.js');
const commonScript = await import('../../scripts/common.js');

document.body.innerHTML = await readFile({ path: './body.html' });
document.head.innerHTML = await readFile({ path: './head.html' });

describe('Video Configuration', () => {
  let standardVideoConfig;
  let getVideoConfig;
  let addVideoConfig;

  before(async () => {
    standardVideoConfig = videoHelper.standardVideoConfig;
    getVideoConfig = videoHelper.getVideoConfig;
    addVideoConfig = videoHelper.addVideoConfig;
  });

  it('should initialize video configuration if it does not exist', () => {
    const videoId = 'video1';
    const props = { autoplay: true };
    addVideoConfig(videoId, props);
    const config = getVideoConfig(videoId);
    expect(config).to.deep.include({ ...standardVideoConfig, ...props });
  });

  it('should merge properties into an existing video configuration', () => {
    const videoId = 'video1';
    addVideoConfig(videoId, { autoplay: true });
    addVideoConfig(videoId, { volume: 0.5 });
    const config = getVideoConfig(videoId);

    // Assert that config object includes these keys
    expect(config).to.include.keys(['volume', 'autoplay']);

    // Assert each property separately on the config object
    expect(config.volume).to.equal(0.5, 'Volume should be set to 0.5');
    expect(config.autoplay).to.be.true;
  });

  it('should return the correct configuration for a videoId', () => {
    const video1 = 'video1';
    const video2 = 'video2';
    addVideoConfig(video1, { autoplay: true });
    addVideoConfig(video2, { volume: 0.5 });
    const config1 = getVideoConfig(video1);
    const config2 = getVideoConfig(video2);
    expect(config1).to.deep.include({ autoplay: true });
    expect(config2).to.deep.include({ volume: 0.5 });
  });
});

describe('Video URL Analysis', () => {
  let isAEMVideoUrl;
  let isLowResolutionVideoUrl;
  let isVideoLink;
  let createElement;

  before(async () => {
    isAEMVideoUrl = videoHelper.isAEMVideoUrl;
    isLowResolutionVideoUrl = videoHelper.isLowResolutionVideoUrl;
    isVideoLink = videoHelper.isVideoLink;
    createElement = commonScript.createElement;
  });

  describe('isAEMVideoUrl', () => {
    const testCases = [
      { url: 'https://example.com/assets/urn:aaid:aem:ad1d25-ffffff-1e4785/play', expected: true },
      { url: 'https://example.com/assets/urn:aaid:aem:play', expected: false },
      { url: 'https://example.com/page.html', expected: false },
      { url: '', expected: false },
      { url: 'https://example.com/assets/urn:aaid:aem/ad1d25-ffffff-1e4785', expected: false },
    ];

    testCases.forEach(({ url, expected }) => {
      it(`should return ${expected} for URL: ${url}`, () => {
        expect(isAEMVideoUrl(url)).to.equal(expected);
      });
    });
  });

  describe('isLowResolutionVideoUrl', () => {
    const testCases = [
      { url: '', expected: false },
      { url: 'https://example.com/video_low.mp4?param=value', expected: true },
      { url: 'https://example.com/video.mov', expected: false },
    ];

    testCases.forEach(({ url, expected }) => {
      it(`should return ${expected} for URL: ${url}`, () => {
        expect(isLowResolutionVideoUrl(url)).to.equal(expected);
      });
    });
  });

  describe('isVideoLink', () => {
    let link;

    beforeEach(() => {
      // Create a new link element before each test in this describe block
      link = createElement('a');
    });

    const testCases = [
      { url: '', expected: false },
      {
        url: 'https://delivery-p107394-e1241111.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ad1d25-ffffff-1e4785/play?accept-experimental',
        expected: true,
      },
      { url: 'https://delivery-p107394-e1241111.adobeaemcloud.com/adobe/assets/urn:aaid:aem:ad1d25-ffffff-1e4785/', expected: false },
      { url: 'https://www.youtube.com/embed/videoID', expected: true },
      { url: 'https://example.com/video_low.mp4?param=value', expected: true },
      { url: 'https://example.com/page.html', expected: false },
    ];

    testCases.forEach(({ url, expected }) => {
      it(`should return ${expected} for URL: ${url}`, () => {
        link.setAttribute('href', url);
        expect(isVideoLink(link)).to.equal(expected);
      });
    });

    it('should return false for video link within .block.embed', () => {
      link.setAttribute('href', 'https://example.com/video.mp4');
      const block = createElement('div', { classes: ['block', 'embed'] });
      block.appendChild(link);

      expect(isVideoLink(link)).to.be.false;
    });
  });
});

describe('selectVideoLink', () => {
  let createElement;
  let selectVideoLink;
  let videoTypes;
  let youtubeLink;
  let mp4Link;
  let otherLink;
  let aemVideoLink;

  before(async () => {
    selectVideoLink = videoHelper.selectVideoLink;
    createElement = commonScript.createElement;

    youtubeLink = createElement('a', { props: { href: 'https://www.youtube.com/embed/example-video' } });
    mp4Link = createElement('a', { props: { href: 'https://example.com/example-video.mp4' } });
    otherLink = createElement('a', { props: { href: 'https://example.com/other-link' } });
    aemVideoLink = createElement('a', { props: { href: 'https://example.com/assets/urn:aaid:aem:ad1d25-ffffff-1e4785/play' } });

    videoTypes = videoHelper.videoTypes;
  });

  it('should prioritize AEM video link when available', () => {
    const links = [youtubeLink, mp4Link, aemVideoLink];
    const result = selectVideoLink(links, videoTypes.youtube);
    expect(result).to.equal(aemVideoLink);
  });

  it('should return YouTube link when consent for social videos is given', () => {
    document.cookie = 'OptanonConsent=C0005:1';
    const links = [youtubeLink, mp4Link];
    const result = selectVideoLink(links, videoTypes.youtube, videoTypes.youtube);
    expect(result).to.equal(youtubeLink);
  });

  it('should ignore YouTube link when consent for social videos is not given', () => {
    document.cookie = 'OptanonConsent=C0005:0';
    const links = [youtubeLink, mp4Link];
    const result = selectVideoLink(links, videoTypes.youtube, videoTypes.both);
    expect(result).to.equal(mp4Link);
  });

  it('should return local media link when videoType is explicitly set to local', () => {
    const links = [youtubeLink, mp4Link];
    const result = selectVideoLink(links, videoTypes.local, videoTypes.both);
    expect(result).to.equal(mp4Link);
  });

  it('should return YouTube link when preferredType is not "local" and YouTube link is available', () => {
    document.cookie = 'OptanonConsent=C0005:1';
    const links = [youtubeLink, mp4Link];
    const result = selectVideoLink(links, videoTypes.youtube, videoTypes.both);
    expect(result).to.equal(youtubeLink);
  });

  it('should return local media link when preferredType is "local" and local media link is available', () => {
    const links = [youtubeLink, mp4Link];
    const result = selectVideoLink(links, videoTypes.local);
    expect(result).to.equal(mp4Link);
  });

  it('should return undefined when preferredType is "local" but no local media link is available', () => {
    const links = [youtubeLink, otherLink];
    const result = selectVideoLink(links, videoTypes.local);
    expect(result).to.be.undefined;
  });

  it('should return local media link when preferredType is not "local" and YouTube link is not available', () => {
    const links = [mp4Link, otherLink];
    const result = selectVideoLink(links, videoTypes.youtube);
    expect(result).to.equal(mp4Link);
  });

  it('should return undefined when no links are available', () => {
    const links = [];
    const result = selectVideoLink(links, videoTypes.youtube);
    expect(result).to.be.undefined;
  });
});

describe('addVideoShowHandler', () => {
  let addVideoShowHandler;
  let createElement;
  let linkElement;

  before(async () => {
    addVideoShowHandler = videoHelper.addVideoShowHandler;
    createElement = commonScript.createElement;

    linkElement = createElement('div', { classes: 'test-link' });
    linkElement.addEventListener = sinon.spy();
  });

  beforeEach(() => {
    sinon.resetHistory(); // Reset spies and fakes before each test
  });

  it('should add "text-link-with-video" class to the link', () => {
    addVideoShowHandler(linkElement);
    expect(linkElement.classList.contains('text-link-with-video')).to.be.true;
  });

  it('should add a click event listener to the link', () => {
    addVideoShowHandler(linkElement);
    expect(linkElement.addEventListener.calledOnce).to.be.true;
    expect(linkElement.addEventListener.getCall(0).args[0]).to.equal('click');
  });
});

describe('isSoundcloudLink', () => {
  let isSoundcloudLink;
  let createElement;
  let linkElement;

  before(async () => {
    isSoundcloudLink = videoHelper.isSoundcloudLink;
    createElement = commonScript.createElement;

    linkElement = createElement('a', { props: { href: 'https://soundcloud.com/player/track' } });
  });

  it('should return true for a valid SoundCloud link', () => {
    document.body.appendChild(linkElement);

    const result = isSoundcloudLink(linkElement);
    expect(result).to.be.true;
  });

  it('should return false if the link is inside a block with class "embed"', () => {
    const embedBlock = createElement('div', { classes: ['block', 'embed'] });
    embedBlock.appendChild(linkElement);

    document.body.appendChild(embedBlock);

    const result = isSoundcloudLink(linkElement);
    expect(result).to.be.false;
  });

  it('should return false for an invalid SoundCloud link', () => {
    linkElement = createElement('a', { props: { href: 'https://example.com' } });
    document.body.appendChild(linkElement);

    const result = isSoundcloudLink(linkElement);
    expect(result).to.be.false;
  });
});

describe('wrapImageWithVideoLink', () => {
  let wrapImageWithVideoLink;
  let videoLink;
  let image;

  before(async () => {
    wrapImageWithVideoLink = videoHelper.wrapImageWithVideoLink;
    videoLink = document.createElement('a');
    image = document.createElement('img');
  });

  it('should add the "link-with-video" class to the video link', () => {
    wrapImageWithVideoLink(videoLink, image);

    expect(videoLink.classList.contains('link-with-video')).to.be.true;
  });

  it('should remove certain classes from the video link', () => {
    videoLink.classList.add('button', 'primary', 'text-link-with-video');
    wrapImageWithVideoLink(videoLink, image);

    expect(videoLink.classList.contains('button')).to.be.false;
    expect(videoLink.classList.contains('primary')).to.be.false;
    expect(videoLink.classList.contains('text-link-with-video')).to.be.false;
  });
});

describe('createIframe', () => {
  let createIframe;
  let createElement;

  before(async () => {
    createIframe = videoHelper.createIframe;
    createElement = commonScript.createElement;
  });

  let parentEl;

  beforeEach(() => {
    // Setup a DOM element to serve as the parent for each test
    parentEl = createElement('div', { classes: 'test-parent' });
    document.body.appendChild(parentEl);
  });

  it('should create an iframe with the specified URL', () => {
    const url = 'https://example.com';
    const iframe = createIframe(url, {});

    expect(iframe.src).to.include(url);
  });

  it('should append the iframe to the specified parent element', () => {
    const iframe = createIframe('https://example.com', { parentEl });
    expect(parentEl.contains(iframe)).to.be.true;
  });

  it('should assign classes to the iframe', () => {
    const classes = ['class1', 'class2'];
    const iframe = createIframe('https://example.com', { classes });

    classes.forEach((className) => expect(iframe.classList.contains(className)).to.be.true);
  });

  it('should handle a single class string correctly', () => {
    const classes = 'single-class';
    const iframe = createIframe('https://example.com', { classes });

    expect(iframe.classList.contains(classes)).to.be.true;
  });

  it('should create an iframe without classes when none are provided', () => {
    const iframe = createIframe('https://example.com', {});

    expect(iframe.className).to.equal('');
  });

  afterEach(() => {
    document.body.removeChild(parentEl);
  });
});

describe('createVideo function', () => {
  let createVideo;
  const videoSrc = 'https://example.com/example-video.mp4';

  before(async () => {
    createVideo = videoHelper.createVideo;
  });

  it('should create a video element with default attributes', () => {
    const video = createVideo(videoSrc);
    const source = video.querySelector('source');

    expect(video.tagName).to.equal('VIDEO', 'The created element should be a video tag');
    expect(source.src).to.equal(videoSrc);
    expect(video.className).to.equal('');
    expect(video.muted).to.be.false;
    expect(video.autoplay).to.be.false;
  });

  it('should create a video element with custom attributes', () => {
    const props = {
      muted: true,
      autoplay: true,
      controls: true,
    };
    const video = createVideo(videoSrc, 'custom-class', props);
    const source = video.querySelector('source');

    expect(video.tagName).to.equal('VIDEO', 'The created element should be a video tag');
    expect(source.src).to.equal(videoSrc);
    expect(video.className).to.equal('custom-class');
    expect(video.muted).to.be.true;
    expect(video.autoplay).to.be.true;
    expect(video.controls).to.be.true;
  });

  it('should set additional attributes', () => {
    const props = {
      loop: true,
      preload: 'auto',
    };
    const video = createVideo(videoSrc, 'extra-attributes', props);

    expect(video.loop).to.be.true;
    expect(video.preload).to.equal('auto');
  });

  it('should create a source element with correct attributes', () => {
    const video = createVideo(videoSrc);
    const source = video.querySelector('source');

    expect(source).to.exist;
    expect(source.tagName).to.equal('SOURCE');
    expect(source.src).to.equal(videoSrc);
    expect(source.type).to.equal('video/mp4');
  });
});
