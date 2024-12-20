import { decorateLinks } from '../../scripts/scripts.js';

function handleActiveClick(ul, event) {
  // on mobile we expand the navigation
  if (document.documentElement.clientWidth < 992) {
    if (ul.style.height) {
      ul.style.height = '';
      ul.classList.remove('expand');
    } else {
      const navHeight = [...ul.children].reduce((sum, el) => sum + el.offsetHeight, 0);
      ul.style.height = `${navHeight}px`;
      ul.classList.add('expand');
    }
    event.preventDefault();
  }
}

async function createSubNav(block, ref) {
  const resp = await fetch(`${ref}.plain.html`);
  if (resp.ok) {
    const { pathname } = window.location;
    const text = await resp.text();
    const fragment = document.createRange().createContextualFragment(text);
    const ul = fragment.querySelector('ul');

    ul.querySelectorAll('picture').forEach((picture) => {
      const pictureContainer = picture.parentElement;
      const a = pictureContainer.querySelector('a');
      if (a) {
        const caption = document.createElement('span');
        caption.className = 'caption';
        caption.innerText = a.innerText;
        a.replaceChildren(picture, caption);
        pictureContainer.replaceChildren(a);
      }
    });

    // move the active link to the top
    const currentPathname = pathname.endsWith('/') ? pathname : `${pathname}/`;
    let activeLink = [...ul.querySelectorAll('li a')].find((a) => {
      let linkPathname = new URL(a.href).pathname;
      linkPathname = linkPathname.endsWith('/') ? linkPathname : `${linkPathname}/`;

      return linkPathname === currentPathname;
    });

    if (activeLink) {
      activeLink.closest('li').classList.add('active');
    } else {
      // if there is no active link, create one for the current page for mobile
      const [title] = document.title.split('|');
      ul.firstElementChild.insertAdjacentHTML('afterend', `<li class="active synthetic"><a href="#">${title}</a></li>`);
      activeLink = ul.querySelector('.active');
    }

    // create an overview link for mobile
    const lastSlash = (pathname.endsWith('/') ? pathname.substring(0, pathname.length - 1) : pathname).lastIndexOf('/');
    if (lastSlash > 0) {
      const parentLink = `${pathname.substring(0, lastSlash)}/`;
      ul.firstElementChild.insertAdjacentHTML('afterend', `<li class="overview"><a href="${parentLink}">Overview</a></li>`);
    }

    const nav = document.createElement('nav');
    nav.appendChild(ul);
    decorateLinks(nav);
    block.replaceChildren(nav);

    // attach click listner for mobile
    (activeLink || ul.querySelector('a')).addEventListener('click', handleActiveClick.bind(null, ul));

    window.addEventListener('scroll', () => {
      const navHeight = block.previousElementSibling.clientHeight;
      if (document.documentElement.scrollTop >= navHeight) {
        block.classList.add('sticky');
      } else {
        block.classList.remove('sticky');
      }
    });

    document.addEventListener('click', (event) => {
      if (!block.contains(event.target)) {
        const openItem = block.querySelector('.expand');
        if (openItem) {
          handleActiveClick(openItem, event);
        }
      }
    });
  }
}

export default async function decorate(block) {
  const { content } = document.head.querySelector('meta[name="sub-navigation"]');
  createSubNav(block, content);
}
