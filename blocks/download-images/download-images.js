export default function decorate(block) {
  const [downloadDir, ...imgContainers] = block.children;

  downloadDir.className = 'download-text';

  // wrap pictures in links
  imgContainers.forEach(async (imageContainer) => {
    imageContainer.className = 'image-container';
    const picture = imageContainer.querySelector('picture');
    const img = picture.querySelector('img');

    const link = document.createElement('a');
    link.href = getOriginalImage(img.src);
    link.appendChild(picture);
    link.download = '';

    // remove any existing links and <br>
    imageContainer.innerHTML = '';
    imageContainer.append(link);
  });
}

function getOriginalImage(url) {
  // remove any parameters, e.g. ?width=2000&format=webply&optimize=medium
  return url.replace(/\?.*$/, '');
}
