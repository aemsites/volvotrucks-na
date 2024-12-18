/* global YT */
import { loadScript } from '../../scripts/aem.js';
import { createElement, getTextLabel, isSocialAllowed } from '../../scripts/common.js';
import { hideModal } from '../../common/modal/modal.js';

let player;

function onPlayerReady(event) {
  event.target.playVideo();
}

function onPlayerError(event) {
  console.warn(event.data);
}

function onPlayerAutoplayBlocked(event) {
  console.warn(event.data);
}

export function playVideo() {
  if (player && player.playVideo) {
    player.playVideo();
  }
}

function addVideo(block, videoId) {
  const iframeYT = document.createRange().createContextualFragment(`
    <iframe class="v2-livestream-embed" id="livestream"
      frameborder="0" allowfullscreen="" allow="autoplay"
      src="https://www.youtube.com/embed/${videoId}?color=white&amp;rel=0&amp;playsinline=1&amp;enablejsapi=1&amp;autoplay=1">
    </iframe>
  `);

  block.innerHTML = '';

  block.append(...iframeYT.childNodes);
}

export default function decorate(block) {
  let videoId = block.querySelector('p + p');
  videoId = videoId.innerText;

  window.isSingleVideo = true;

  loadScript('https://www.youtube.com/iframe_api');

  if (!videoId) {
    block.innerHTML = '';

    console.warn('V2 Livestream Embed block: There is no video link. Please check the provided URL.');
    return;
  }

  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReadyInit() {
    setTimeout(() => {
      if (!YT) {
        throw new Error('YouTube API not loaded');
      }
      player = new YT.Player('livestream', {
        events: {
          onReady: onPlayerReady,
          onError: onPlayerError,
          onAutoplayBlocked: onPlayerAutoplayBlocked,
        },
      });
    }, 3000);
  };

  if (!isSocialAllowed()) {
    const img = block.querySelector('picture img');
    block.innerHTML = '';

    const cookieMsgContainer = createElement('div', {
      classes: 'cookie-message',
    });
    cookieMsgContainer.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%), url(${img.src}) center / cover no-repeat`;

    const cookieMessage = document.createRange().createContextualFragment(`
      <h3 class="cookie-message__title">${getTextLabel('single video message title')}</h3>
      ${getTextLabel('single video message text')}
      <div class="cookie-message__button-container">
        <button class="primary dark">${getTextLabel('single video message button')}</button>
        <button class="button secondary dark">${getTextLabel('single video message button deny')}</button>
      </div>
    `);

    cookieMsgContainer.append(cookieMessage);
    block.append(cookieMsgContainer);

    block.querySelector('.cookie-message__button-container .primary')?.addEventListener('click', () => {
      window.OneTrust.AllowAll();

      addVideo(block, videoId);
    });

    block.querySelector('.cookie-message__button-container .secondary')?.addEventListener('click', () => {
      hideModal();
    });
  } else {
    addVideo(block, videoId);
  }
}
