import { isVideoLink, createVideo } from '../../scripts/video-helper.js';
import { createElement, getTextLabel, removeEmptyTags, variantsClassesToBEM } from '../../scripts/common.js';

const variantClasses = ['centered', 'left-center', 'center-bottom', 'dark', 'background-right', 'compact', 'background-transparent'];
let intervalId = null;
const blockName = 'v2-hero';

function updateCountdownElement(block, elementId, value, label) {
  const element = block.querySelector(`#${elementId}`);
  element.textContent = value.toString().padStart(2, '0');
  element.nextElementSibling.textContent = label;
}

function updateCountdown(eventTime, block) {
  const now = new Date();
  const diff = eventTime - now;

  // Check if the event time has passed
  if (diff <= 0) {
    block.querySelector(`.${blockName}__countdown-wrapper`)?.remove();
    clearInterval(intervalId);
    return;
  }

  // Calculate time left
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // Format labels
  const dayLabel = days === 1 ? getTextLabel('day') : `${getTextLabel('day')}s`;
  const hourLabel = hours === 1 ? getTextLabel('hour') : `${getTextLabel('hour')}s`;
  const minuteLabel = minutes === 1 ? getTextLabel('minute') : `${getTextLabel('minute')}s`;
  const secondLabel = seconds === 1 ? getTextLabel('second') : `${getTextLabel('second')}s`;

  updateCountdownElement(block, 'days', days, dayLabel);
  updateCountdownElement(block, 'hours', hours, hourLabel);
  updateCountdownElement(block, 'minutes', minutes, minuteLabel);
  updateCountdownElement(block, 'seconds', seconds, secondLabel);
}

export default async function decorate(block) {
  // add Hero variant classnames
  variantsClassesToBEM(block.classList, variantClasses, blockName);

  const isCompact = block.classList.contains(`${blockName}--compact`);
  const picture = block.querySelector('picture');
  const link = block.querySelector('a');
  const isVideo = link ? isVideoLink(link) : false;
  if (isVideo) {
    const video = createVideo(link.getAttribute('href'), `${blockName}__video`, {
      muted: true,
      autoplay: true,
      loop: true,
      playsinline: true,
    });
    block.prepend(video);
    link.remove();
  }

  if (picture) {
    const img = picture.querySelector('img');
    img.classList.add(`${blockName}__image`);
    if (picture.parentElement.tagName === 'P') {
      picture.parentElement.remove();
    }
    block.prepend(picture);
  }

  const contentWrapper = block.querySelector(':scope > div');
  contentWrapper.classList.add(`${blockName}__content-wrapper`);

  const content = block.querySelector(':scope > div > div');
  content.classList.add(`${blockName}__content`);

  // Countdown timer
  const blockSection = block.parentElement?.parentElement;
  if (blockSection && blockSection.dataset?.countdownDate) {
    const countDownWrapper = createElement('div', { classes: `${blockName}__countdown-wrapper` });
    countDownWrapper.innerHTML = `<div class="${blockName}__countdown">
  <div class="${blockName}__countdown-segment">
    <div id="days" class="${blockName}__countdown-number">00</div>
    <div class="${blockName}__countdown-label">Days</div>
  </div>
  <div class="${blockName}__countdown-segment">
    <div id="hours" class="${blockName}__countdown-number">00</div>
    <div class="${blockName}__countdown-label">Hours</div>
  </div>
  <div class="${blockName}__countdown-segment">
    <div id="minutes" class="${blockName}__countdown-number">00</div>
    <div class="${blockName}__countdown-label">Minutes</div>
  </div>
  <div class="${blockName}__countdown-segment">
    <div id="seconds" class="${blockName}__countdown-number">00</div>
    <div class="${blockName}__countdown-label">Seconds</div>
  </div>
</div>`;
    content.prepend(countDownWrapper);

    const eventTimeIso = blockSection.dataset.countdownDate;
    const eventTime = new Date(eventTimeIso);
    updateCountdown(eventTime, block);
    intervalId = setInterval(() => {
      updateCountdown(eventTime, block);
    }, 1000);
  }

  // convert all headings to h1
  const headings = [...content.querySelectorAll('h1, h2, h3, h4, h5, h6')];
  headings.forEach((heading) => {
    if (heading.tagName !== 'H1') {
      const h1 = createElement('h1', { classes: `${blockName}__title` });
      h1.setAttribute('id', heading.getAttribute('id'));
      h1.innerHTML = heading.innerHTML;
      heading.parentNode.replaceChild(h1, heading);
    } else {
      heading.classList.add(`${blockName}__title`);
    }
  });

  // render all paragraph as H6 with the class
  const paragraphs = [...content.querySelectorAll('p')];
  paragraphs.forEach((paragraph) => paragraph.classList.add('h6'));

  const buttonsWrapper = createElement('div', { classes: `${blockName}__buttons-wrapper` });
  const ctaButtons = content.querySelectorAll('.button-container > a');
  [...ctaButtons].forEach((b) => {
    if (block.classList.contains(`${blockName}--dark`)) {
      b.classList.add('dark');
    }

    b.parentElement.remove();
    buttonsWrapper.appendChild(b);
  });
  content.appendChild(buttonsWrapper);

  if (!isCompact) {
    const scrollIcon = createElement('div', { classes: `${blockName}__scroll-icon` });
    block.append(scrollIcon);
  }

  removeEmptyTags(content);

  block.parentElement.classList.add('full-width');
}
