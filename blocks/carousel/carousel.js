import { createOptimizedPicture } from '../../scripts/aem.js';

const debounceDelay = 30;

function adjustWidthAndControls(block, carousel, ...controls) {
  function toggle() {
    const documentWidth = document.documentElement.clientWidth;
    const isDesktop = documentWidth > 767 && !block.matches('.grid-on-desktop');
    const gap = parseInt(window.getComputedStyle(carousel).gap, 10);
    const itemWidth = parseInt(window.getComputedStyle(carousel.firstElementChild).width, 10);
    const itemsWidth = itemWidth * carousel.children.length + gap * (carousel.children.length - 1);
    let containerWidth = parseInt(window.getComputedStyle(carousel.parentElement).width, 10);
    if (isDesktop) {
      // on desktop the container width is 2x50px smaller due to the controls
      containerWidth -= 100;
    }
    const showControls = itemsWidth > containerWidth;
    controls.forEach((ul) => (showControls ? ul.classList.remove('hidden') : ul.classList.add('hidden')));
    if (showControls) {
      carousel.classList.remove('centered');
    } else {
      carousel.classList.add('centered');
    }
    if (isDesktop) {
      // set the width only on desktop
      const maxItems = Math.floor((containerWidth - 100) / (itemsWidth / carousel.children.length));
      const width = maxItems * itemWidth + gap * (maxItems - 1);
      carousel.style.width = `${width}px`;
    } else {
      // remove on mobile viewports
      delete carousel.style.width;
    }
  }

  let resizeTimeout;
  window.addEventListener('resize', () => {
    if (resizeTimeout) {
      clearTimeout(resizeTimeout);
    }
    resizeTimeout = setTimeout(toggle, debounceDelay);
  });

  // wait for the section to be loaded before we initially resize the carousel
  const section = block.closest('.section');
  new MutationObserver((_, observer) => {
    if (section.dataset.sectionStatus === 'loaded') {
      observer.disconnect();
      setTimeout(toggle);
    }
  }).observe(section, { attributes: true });
}

function createDesktopControls(ul) {
  function scroll(direction) {
    const first = ul.firstElementChild;
    const second = first.nextElementSibling;
    const scrollOffset = second.getBoundingClientRect().x - first.getBoundingClientRect().x;
    const left = direction === 'left' ? -1 * scrollOffset : scrollOffset;
    ul.scrollBy({ top: 0, left, behavior: 'smooth' });
  }

  const desktopControls = document.createElement('ul');
  desktopControls.className = 'desktop-controls hidden';
  desktopControls.innerHTML = '<li><button type="button">Left</button></li><li><button type="button">Right</button></li>';
  ul.insertAdjacentElement('beforebegin', desktopControls);
  const [prevButton, nextButton] = desktopControls.querySelectorAll(':scope button');
  prevButton.addEventListener('click', () => scroll('left'));
  nextButton.addEventListener('click', () => scroll('right'));
  return desktopControls;
}

function createMobileControls(ul) {
  // create carousel controls for mobile
  const mobileControls = document.createElement('ul');
  mobileControls.className = 'mobile-controls';
  [...ul.children].forEach((item, j) => {
    const control = document.createElement('li');
    if (!j) {
      control.className = 'active';
    }
    control.innerHTML = `<button type="button">${j + 1}</button>`;
    control.firstElementChild.addEventListener('click', () => {
      mobileControls.querySelector('li.active').classList.remove('active');
      control.classList.add('active');

      const left = item.offsetLeft + item.offsetWidth / 2 - (item.parentNode.offsetLeft + item.parentNode.offsetWidth / 2);
      ul.scrollTo({ top: 0, left, behavior: 'smooth' });
    });

    mobileControls.append(control);
  });
  ul.insertAdjacentElement('beforebegin', mobileControls);

  let scrollTimeout;
  ul.addEventListener('scroll', () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      const first = ul.firstElementChild;
      const second = first.nextElementSibling;
      const scrollOffset = second.getBoundingClientRect().x - first.getBoundingClientRect().x;
      let index = 0;
      // how many items have scrolled out?
      while (ul.scrollLeft - scrollOffset * (index + 1) > 0) {
        index += 1;
      }
      mobileControls.querySelector('li.active').classList.remove('active');
      mobileControls.children[index].classList.add('active');
    }, debounceDelay);
  });
  return mobileControls;
}

export default function decorate(block) {
  const ul = document.createElement('ul');
  ul.classList.add('items');

  // We support two formats:
  // 1. Each slide in a cell in either columns column and/or rows.
  // 2. all values in the first cell as a list.
  [...block.querySelectorAll(':scope > div > div')].forEach((cell) => {
    // collect any <li>
    cell.querySelectorAll('li').forEach((li) => {
      if (li.childElementCount) {
        ul.append(li);
      }
    });
    // remove any remaining <ul>
    cell.querySelectorAll('ul').forEach((el) => el.remove());

    // If cell still contains anything, add content to list
    if (cell.childElementCount) {
      const li = document.createElement('li');
      li.append(...cell.childNodes);
      // remove link decoration
      li.querySelectorAll('.button-container,.button').forEach((el) => {
        el.classList.remove('button-container', 'button', 'primary');
      });
      ul.append(li);
    }
    cell.remove();
  });

  // now that all cells are removed, only rows are remining.
  const firstCell = document.createElement('div');
  block.firstElementChild.append(firstCell);
  firstCell.append(ul);

  [...ul.children].forEach((li) => {
    // Add wrapper around the content
    const container = document.createElement('div');
    container.className = 'carousel-content-wrapper';
    container.innerHTML = li.innerHTML;
    li.innerHTML = '';
    li.append(container);

    // add link to the image and move it outside of the wrapper
    const a = li.querySelector('a');
    let picture = li.querySelector('picture');
    if (picture) {
      const img = picture.lastElementChild;
      const newPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '370' }]);
      picture.replaceWith(newPicture);
      picture = newPicture;
    }
    if (a && picture) {
      const clone = a.cloneNode(false);
      picture.replaceWith(clone);
      clone.append(picture);
      li.prepend(clone);
    }

    const textItems = container.innerHTML.split('<br>').filter((text) => text.trim() !== '');

    container.innerHTML = `
      <p>${textItems.join('</p><p>')}</p>
    `;

    const carouselLink = container.querySelector('a');
    if (carouselLink) {
      carouselLink.classList.add('button', 'carousel-link');
    }
  });

  const desktopControls = createDesktopControls(ul);
  const mobileControls = createMobileControls(ul);

  adjustWidthAndControls(block, ul, mobileControls, desktopControls);
}
