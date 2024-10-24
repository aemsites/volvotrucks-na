import {
  getMetadata,
  createOptimizedPicture,
} from '../../scripts/aem.js';
import {
  createElement,
  decorateIcons,
} from '../../scripts/common.js';

async function buildArticleHero(container) {
  const title = getMetadata('og:title');
  const author = getMetadata('author');
  const pubdate = getMetadata('publish-date');
  const readtime = getMetadata('readingtime');
  const headPic = getMetadata('og:image');
  const headAlt = getMetadata('og:image:alt');
  const locale = getMetadata('locale');

  const row = createElement('div', { classes: ['row', 'size-img'] });
  const headImg = createOptimizedPicture(headPic, headAlt);
  const content = createElement('div', { classes: 'content' });
  const topDetails = createElement('div', { classes: ['top-details', 'hide-desktop'] });
  content.append(topDetails);
  const calendarIcon = createElement('i', { classes: ['fa', 'fa-calendar'] });
  topDetails.append(calendarIcon);
  const pubDateSpan = createElement('span', { classes: 'date' });
  pubDateSpan.innerHTML = new Intl.DateTimeFormat(locale).format(new Date(pubdate)).replaceAll('-', '/');
  topDetails.append(pubDateSpan);

  const timeIcon = createElement('i', { classes: ['fa', 'fa-clock-o'] });
  topDetails.append(timeIcon);
  const timeSpan = createElement('span', { classes: 'time' });
  timeSpan.innerHTML = readtime;
  topDetails.append(timeSpan);

  const titleH1 = createElement('h1', { classes: 'title-sentence' });
  titleH1.innerText = title.includes('|') ? title.split('|')[0] : title;
  content.append(titleH1);
  const details = createElement('div', { classes: 'details' });
  content.append(details);

  const userIcon = createElement('i', { classes: ['fa', 'fa-user'] });
  details.append(userIcon);
  const authorSpan = createElement('span', { classes: 'author' });
  authorSpan.innerHTML = author;
  details.append(authorSpan);

  const calendarIconClone = calendarIcon.cloneNode();
  calendarIconClone.classList.add('hide-mobile');
  details.append(calendarIconClone);
  const pubDateSpanClone = pubDateSpan.cloneNode(true);
  pubDateSpanClone.classList.add('hide-mobile');
  details.append(pubDateSpanClone);
  const timeIconClone = timeIcon.cloneNode();
  timeIconClone.classList.add('hide-mobile');
  details.append(timeIconClone);
  const timeSpanClone = timeSpan.cloneNode(true);
  timeSpanClone.classList.add('hide-mobile');
  details.append(timeSpanClone);

  // row
  row.append(headImg);
  row.append(content);
  const section = createElement('div', { classes: ['section', 'template', 'article-hero'] });
  section.insertAdjacentElement('afterbegin', row);
  container.insertAdjacentElement('afterbegin', section);
}

export default async function decorate(doc) {
  const container = doc.querySelector('main');
  buildArticleHero(container);

  const classes = ['section', 'template', 'article-sidebar', 'loading'];
  const sidebarSection = createElement('div', { classes, props: { id: 'sidebar' } });
  // topics
  const topicsSidebar = createElement('div', { classes: 'topics' });
  sidebarSection.append(topicsSidebar);
  const topicsHeading = createElement('p');
  topicsHeading.textContent = 'Topics in this article';
  topicsSidebar.append(topicsHeading);
  const topics = getMetadata('article:tag').split(',');
  const topicsList = createElement('ul', { classes: 'topic-list' });
  topics.forEach((topic) => {
    const topicItem = createElement('li');
    topicItem.innerHTML = topic;
    topicsList.appendChild(topicItem);
  });
  topicsSidebar.append(topicsList);

  // share
  const shareItems = [
    ['envelope', 'Share via email', 'mailto:?body='],
    ['twitter', 'Share on Twitter', 'https://twitter.com/intent/tweet?url='],
    ['linkedin', 'Share on LinkedIn', 'https://www.linkedin.com/sharing/share-offsite/?url='],
    ['facebook', 'Share on Facebook', 'https://www.facebook.com/sharer/sharer.php?u='],
  ];
  const shareSidebar = createElement('div', { classes: 'share' });
  const shareHeading = createElement('p');
  shareHeading.textContent = 'Share this article';
  shareSidebar.append(shareHeading);
  const shareList = createElement('div', { classes: 'share-icons' });
  shareItems.forEach((share) => {
    const icon = createElement('i', { classes: ['fa', `fa-${share[0]}`] });
    const shareItem = createElement('button', share[0], { title: share[1], type: 'button' });
    shareItem.addEventListener('click', () => {
      window.open(`${share[2]}${window.location.href}`, '_blank');
    });
    shareItem.append(icon);
    shareList.append(shareItem);
  });
  shareSidebar.append(shareList);
  sidebarSection.append(shareSidebar);

  // subscribe
  const subscribeSidebar = createElement('div', { classes: 'subscribe' });
  const button = createElement('a', { classes: 'cta', props: { href: '#form59' } });
  button.textContent = 'Subscribe';
  const arrowIcon = createElement('i', { classes: ['fa', 'fa-angle-right'] });
  button.append(arrowIcon);
  subscribeSidebar.append(button);
  sidebarSection.append(subscribeSidebar);

  let sidebarPreviousSection;
  let sectionFound = false;
  const sections = [...doc.querySelectorAll('.section')];
  while (!sectionFound && sections.length > 0) {
    const section = sections.pop();
    if (!sidebarPreviousSection) {
      sidebarPreviousSection = section;
    } else if (section.classList.contains('related-articles-container')) {
      sidebarPreviousSection = section;
    } else {
      sectionFound = true;
    }
  }
  sidebarPreviousSection.insertAdjacentElement('beforebegin', sidebarSection);
  decorateIcons(doc);
  // show hidden sidebar until all sections are loaded to improve CLS
  const sectionObserver = new MutationObserver(() => {
    const pendingSection = doc.querySelector('main > .section[data-section-status="initialized"],main > .section[data-section-status="loading"]');
    if (!pendingSection) {
      sidebarSection.classList.remove('loading');
      sectionObserver.disconnect();
    }
  });
  doc.querySelectorAll('main > .section[data-section-status]').forEach((section) => {
    sectionObserver.observe(section, { attributeFilter: ['data-section-status'] });
  });
}
