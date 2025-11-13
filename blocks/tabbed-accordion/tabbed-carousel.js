function buildTabNavigation(tabItems, clickHandler) {
  const tabNavigation = document.createElement('ul');
  [...tabItems].forEach((tabItem, i) => {
    const listItem = document.createElement('li');
    if (!i) {
      listItem.classList.add('active');
    }
    const button = document.createElement('button');
    const tabContent = tabItem.querySelector(':scope > div, :scope > p > div');
    if (tabContent) {
      button.addEventListener('click', () => clickHandler.call(this, tabContent, tabNavigation, listItem));
      button.innerHTML = tabContent.dataset.accordion;
    }
    listItem.append(button);
    tabNavigation.append(listItem);
  });
  tabNavigation.className = 'tab-navigation';
  return tabNavigation;
}

export default function decorate(block) {
  const tabContainer = block.querySelector(':scope > div, :scope > p > div');
  tabContainer.classList.add('accordion-container');
  const tabItems = block.querySelectorAll(':scope > div > div');
  const tabNavigation = buildTabNavigation(tabItems, (tabContent, nav, listItem) => {
    const currentActiveTabContent = tabContainer.querySelector('.is-active');
    if (currentActiveTabContent !== tabContent) {
      currentActiveTabContent.classList.remove('is-active');
    }
    tabContent.parentElement.classList.add('is-active');

    const currentActiveNavigationItem = nav.querySelector('.active');
    if (currentActiveNavigationItem !== listItem) {
      currentActiveNavigationItem.classList.remove('active');
    }
    listItem.classList.add('active');
  });
  tabItems.forEach((tabItem, i) => {
    tabItem.classList.add('accordion-item');
    const accordionContent = tabItem.querySelector(':scope > div, :scope > p > div');
    accordionContent.classList.add('accordion-collapse');
    const accordionHeader = document.createElement('div');
    accordionHeader.classList.add('accordion-header');
    if (!i) {
      tabItem.classList.add('is-active');
    }
    const button = document.createElement('button');
    button.innerHTML = accordionContent.dataset.accordion;
    accordionHeader.append(button);
    button.addEventListener('click', () => {
      tabItem.classList.toggle('is-active');
    });
    tabItem.prepend(accordionHeader);
  });
  block.parentElement.prepend(tabNavigation);
}