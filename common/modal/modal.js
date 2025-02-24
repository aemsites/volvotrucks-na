/* global YT */
import { createElement, decorateIcons, getTextLabel, isSocialAllowed } from '../../scripts/common.js';
import { loadCSS, loadScript, updateSectionsStatus } from '../../scripts/aem.js';
import {
  createIframe,
  isAEMVideoUrl,
  isYoutubeVideoUrl,
  getYoutubeVideoId,
  isLowResolutionVideoUrl,
  setupPlayer,
  getDeviceSpecificVideoUrl,
  loadYouTubeIframeAPI,
} from '../../scripts/video-helper.js';

const HIDE_MODAL_CLASS = 'modal-hidden';
let currentModalClasses = null;
let currentInvokeContext = null;

const createModalTopBar = (parentEl) => {
  const topBar = document.createRange().createContextualFragment(`
    <div class="modal-top-bar">
      <div class="modal-top-bar-content">
        <h2 class="modal-top-bar-heading" id="modal-heading"></h2>
        <button type="button" class="modal-close-button" aria-label=${getTextLabel('close')}>
          <span class="icon icon-close" aria-hidden="true" />
        </button>
      </div>
    </div>
  `);

  decorateIcons(topBar);
  parentEl.prepend(...topBar.children);

  parentEl.querySelector('.modal-close-button').addEventListener('click', () => hideModal());
  parentEl.querySelector('.modal-top-bar').addEventListener('click', (event) => event.stopPropagation());
};

const createModal = () => {
  document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  const modalBackground = createElement('div', { classes: ['modal-background', HIDE_MODAL_CLASS] });
  modalBackground.setAttribute('role', 'dialog');

  modalBackground.addEventListener('click', () => {
    if (!document.documentElement.classList.contains('redesign-v2')) {
      hideModal();
    }
  });

  const keyDownAction = (event) => {
    if (event.key === 'Escape') {
      hideModal();
    }
  };

  const modalContent = createElement('div', { classes: ['modal-content'] });
  createModalTopBar(modalBackground);
  modalBackground.appendChild(modalContent);
  // preventing initial animation when added to DOM
  modalBackground.style = 'display: none';
  document.body.appendChild(modalBackground);

  // don't close modal when clicking on modal content
  modalContent.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  const clearModalContent = () => {
    modalContent.innerHTML = '';
    modalContent.className = 'modal-content';
    modalBackground.querySelector('.modal-top-bar-heading').textContent = '';
  };

  const handleVideoLoad = (videoElement) => {
    videoElement.addEventListener(
      'loadeddata',
      () => {
        updateSectionsStatus(modalContent);
      },
      { once: true },
    );
  };

  const handleNewContent = (newContent) => {
    clearModalContent();
    modalContent.scrollTo(0, 0);

    const firstSection = newContent[0];

    // checking if the first section contains one heading only
    if (
      firstSection.children.length === 1 &&
      firstSection.children[0].children.length === 1 &&
      /^H[1-6]$/.test(newContent[0].children[0].children[0].tagName)
    ) {
      const headingContent = firstSection.children[0].children[0].textContent;

      modalBackground.querySelector('.modal-top-bar-heading').textContent = headingContent;
      firstSection.style.display = 'none';
      modalBackground.setAttribute('aria-labelledby', 'modal-heading');
    } else {
      modalBackground.removeAttribute('aria-labelledby');
    }

    modalContent.classList.add('modal-content--wide');
    modalContent.append(...newContent);

    const videoElements = modalContent.querySelectorAll('video');
    videoElements.forEach(handleVideoLoad);
  };

  async function addVideo(block, videoId) {
    console.log('addVideo - videoId: ', videoId);
    block.innerHTML = '';

    const iframeSrc = `https://www.youtube.com/embed/${videoId}?color=white&amp;rel=0&amp;playsinline=1&amp;enablejsapi=1&amp;autoplay=1`;

    const iframeYT = createIframe(iframeSrc, {
      parentEl: block,
      classes: 'modal-video',
      props: { id: 'modal-youtube-iframe', allow: 'autoplay', allowfullscreen: 'true' },
    });

    block.append(...iframeYT.childNodes);

    await loadYouTubeIframeAPI();

    window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReadyInit() {
      if (!YT) {
        throw new Error('YouTube API not loaded');
      }
      new YT.Player('modal-youtube-iframe', {
        events: {
          onReady: onPlayerReady,
          onError: onPlayerError,
          onAutoplayBlocked: onPlayerAutoplayBlocked,
        },
      });
    };
  }

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerError(event) {
    console.warn(event.data);
  }

  function onPlayerAutoplayBlocked(event) {
    console.warn(event.data);
  }

  async function showModal(newContent, { beforeBanner, beforeIframe, modalClasses = [], invokeContext }) {
    const shouldVideoSocialCheck = modalClasses.includes('modal-video-social-cookie-check');

    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
    currentInvokeContext = invokeContext;
    // disabling focus for header, footer and main elements when modal is open
    document.querySelectorAll('header, footer, main').forEach((el) => {
      el.setAttribute('inert', 'inert');
    });
    await loadCSS(`${window.hlx.codeBasePath}/common/modal/modal.css`);
    modalBackground.style = '';
    modalBackground.classList.add(...modalClasses);
    currentModalClasses = modalClasses;
    window.addEventListener('keydown', keyDownAction);
    if (newContent && typeof newContent !== 'string') {
      handleNewContent(newContent);
    } else if (newContent) {
      clearModalContent();
      let videoOrIframe = null;
      if (isLowResolutionVideoUrl(newContent)) {
        // We can't use the iframe for videos, because if the Content-Type
        // `application/octet-stream` is returned instead of `video/mp4`, the
        // file is downloaded instead of displayed. So we use the video element instead.
        videoOrIframe = document.createElement('video');
        videoOrIframe.setAttribute('src', newContent);
        videoOrIframe.setAttribute('controls', '');
        videoOrIframe.setAttribute('autoplay', '');
        videoOrIframe.classList.add('modal-video');
        modalBackground.classList.add('modal--video');
        modalContent.append(videoOrIframe);
      } else if (isAEMVideoUrl(newContent)) {
        videoOrIframe = document.createElement('div');
        videoOrIframe.classList.add('modal-video');

        const videoUrl = getDeviceSpecificVideoUrl(newContent);
        await setupPlayer(
          videoUrl,
          videoOrIframe,
          {
            autoplay: 'any',
            disablePictureInPicture: true,
            loop: false,
            muted: false,
            playsinline: true,
            fill: true,
          },
          null,
        );

        modalBackground.classList.add('modal--video');
        modalContent.append(videoOrIframe);
      } else if (isYoutubeVideoUrl(newContent) && shouldVideoSocialCheck) {
        const videoId = getYoutubeVideoId(newContent);

        if (!videoId) {
          console.warn('V2 Video block: There is no video link. Please check the provided URL.');
          return;
        }
        window.isSingleVideo = true;

        if (!videoId) {
          console.warn('V2 Livestream Embed block: There is no video link. Please check the provided URL.');
          return;
        }

        if (isSocialAllowed()) {
          addVideo(modalContent, videoId);
        } else {
          const cookieMsgContainer = createElement('div', {
            classes: 'modal-cookie-message',
          });
          cookieMsgContainer.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%) center / cover no-repeat';

          const cookieMessage = document.createRange().createContextualFragment(`
            <h3 class="modal-cookie-message__title">${getTextLabel('single video message title')}</h3>
            ${getTextLabel('single video message text')}
            <div class="modal-cookie-message__button-container">
              <button class="button primary dark">${getTextLabel('single video message button')}</button>
              <button class="button secondary dark">${getTextLabel('single video message button deny')}</button>
            </div>
          `);

          cookieMsgContainer.append(cookieMessage);
          modalContent.append(cookieMsgContainer);

          modalContent.querySelector('.modal-cookie-message__button-container .primary')?.addEventListener('click', () => {
            if (window.OneTrust) {
              window.OneTrust.AllowAll();
            }

            addVideo(modalContent, videoId);
          });

          modalContent.querySelector('.modal-cookie-message__button-container .secondary')?.addEventListener('click', () => {
            hideModal();
          });
        }
      } else {
        videoOrIframe = createIframe(newContent, { parentEl: modalContent, classes: 'modal-video' });
        modalBackground.classList.add('modal--video');
      }

      if (beforeBanner) {
        const bannerWrapper = document.createElement('div');
        bannerWrapper.classList.add('modal-before-banner');
        bannerWrapper.addEventListener('click', (event) => event.stopPropagation());
        bannerWrapper.appendChild(beforeBanner);

        videoOrIframe.before(bannerWrapper);
      }

      if (beforeIframe) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('modal-before-iframe');
        wrapper.appendChild(beforeIframe);
        videoOrIframe.before(wrapper);
      }
    }

    modalContent.classList.add('modal-content-fade-in');
    modalBackground.classList.remove(HIDE_MODAL_CLASS);
    modalBackground.querySelector('.modal-top-bar .modal-close-button').focus();
    modalBackground.setAttribute('aria-hidden', 'false');

    // disable page scrolling
    document.body.classList.add('disable-body-scroll');
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const { body } = document;
    document.documentElement.style.scrollBehavior = 'auto';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
  }

  function hideModal() {
    // restoring focus for header, footer and main elements when modal is close
    document.querySelectorAll('header, footer, main').forEach((el) => {
      el.removeAttribute('inert');
    });
    if (currentInvokeContext) {
      currentInvokeContext.focus();
    }
    currentInvokeContext = null;
    modalContent.scrollTo(0, 0);
    modalBackground.classList.add(HIDE_MODAL_CLASS);
    modalBackground.classList.remove('modal--video');
    modalContent.classList.remove('modal-content-fade-in');
    window.removeEventListener('keydown', keyDownAction);
    document.body.classList.remove('disable-body-scroll');
    const { body } = document;
    const scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    document.documentElement.style.scrollBehavior = '';
    modalContent.querySelector('iframe, video')?.remove();
    modalContent.querySelector('.modal-before-banner')?.remove();
    modalContent.querySelector('.modal-before-iframe')?.remove();
    modalBackground.setAttribute('aria-hidden', 'true');

    if (currentModalClasses.length) {
      modalBackground.classList.remove(currentModalClasses);
      currentModalClasses = null;
    }
  }

  return {
    showModal,
    hideModal,
  };
};

const { showModal, hideModal } = createModal();

export { showModal, hideModal };
