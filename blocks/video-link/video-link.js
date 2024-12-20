import { selectVideoLink } from '../../scripts/video-helper.js';

export default function decorate(block) {
  const links = block.querySelectorAll('a');
  const selectedLink = selectVideoLink(links);
  if (selectedLink) {
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-play-circle-o');
    selectedLink.prepend(icon);
    block.innerHTML = '';
    block.appendChild(selectedLink);
  } else {
    block.remove();

    console.warn('local video link missing', block);
  }
}
