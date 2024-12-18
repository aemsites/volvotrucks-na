const debounceDelay = 30;

function stripEmptyTags(main, child) {
  if (child !== main && child.innerHTML.trim() === '') {
    const parent = child.parentNode;
    child.remove();
    stripEmptyTags(main, parent);
  }
}

function setActive(tabNavigation, tabContainer, index) {
  if (!tabNavigation.children[index].classList.contains('active')) {
    [tabNavigation, tabContainer].forEach((c) => c.querySelectorAll('.active').forEach((i) => i.classList.remove('active')));

    handlingVideo(tabContainer, index);
    tabNavigation.children[index].classList.add('active');
    tabContainer.children[index].classList.add('active');
  }
}

function buildTabNavigation(tabItems, clickHandler) {
  const tabNavigation = document.createElement('ul');
  [...tabItems].forEach((tabItem, i) => {
    const listItem = document.createElement('li');
    const button = document.createElement('button');
    button.addEventListener('click', () => clickHandler.call(this, tabNavigation, tabItem, i));
    const tabContent = tabItem.querySelector(':scope > div');
    button.innerHTML = tabContent.dataset.carousel;
    listItem.append(button);
    tabNavigation.append(listItem);
  });
  tabNavigation.className = 'tab-navigation';
  return tabNavigation;
}

function handlingVideo(carouselContainer, activeIndex) {
  carouselContainer.querySelectorAll('.tab-item').forEach((tab, index) => {
    const video = tab.querySelector('video');

    if (video) {
      if (index === activeIndex) {
        video.play();
      } else {
        video.pause();
      }
    }
  });
}

export default function decorate(block) {
  const tabContainer = block.querySelector(':scope > div');
  tabContainer.classList.add('tab-container');
  const tabItems = block.querySelectorAll(':scope > div > div');

  tabItems.forEach((tabItem) => {
    const firstChildParagraph = tabItem.querySelector(':scope > p');
    if (firstChildParagraph) {
      tabItem.innerHTML = firstChildParagraph.innerHTML;
    }
  });

  const tabNavigation = buildTabNavigation(tabItems, (nav, tabItem, index) => {
    tabContainer.scrollTo({
      top: 0,
      left: tabItem.offsetLeft - tabItem.parentNode.offsetLeft,
      behavior: 'smooth',
    });

    setActive(tabNavigation, tabContainer, index);
  });
  tabItems.forEach((tabItem) => {
    tabItem.classList.add('tab-item');
    const tabContent = tabItem.querySelector(':scope > div');
    const picture = tabItem.querySelector('picture');

    if (picture) {
      tabContent.prepend(picture);
    }

    tabContent.querySelectorAll('p, div').forEach((item) => {
      stripEmptyTags(tabContent, item);
    });
  });
  block.parentElement.prepend(tabNavigation);

  // update the button indicator on scroll
  let scrollTimeout;
  tabContainer.addEventListener('scroll', () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
      const { scrollLeft } = tabContainer;
      const { clientWidth } = tabContainer.firstElementChild;
      const activeIndex = Math.floor(scrollLeft / clientWidth);
      setActive(tabNavigation, tabContainer, activeIndex);
    }, debounceDelay);
  });

  setActive(tabNavigation, tabContainer, 0);
}
