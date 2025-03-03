import { loadBlock, loadBlocks } from '../../scripts/aem.js';
import { createElement } from '../../scripts/common.js';
import { decorateLinks } from '../../scripts/scripts.js';
import { variantClasses as heroVariantClasses } from '../v2-hero/v2-hero.js';

function buildPreRevealCountdownHero(innerBlockCode, v2HeroRevealBlockClassList) {
  return getV2HeroBlockCode(innerBlockCode, v2HeroRevealBlockClassList);
}

function buildRevealHero(innerBlockCode, v2HeroRevealBlockClassList) {
  return getV2HeroBlockCode(innerBlockCode, v2HeroRevealBlockClassList);
}

function isCountDownFinished(eventTime) {
  const now = new Date();
  const diff = eventTime - now;

  return diff <= 0;
}

function getV2HeroBlockCode(innerBlockCode, v2HeroRevealBlockClassList) {
  const block = createElement('div', { classes: ['v2-hero', 'block'], props: { 'data-block-name': 'v2-hero', 'data-block-status': 'initialized' } });
  const providedVariantClasses = Array.from(v2HeroRevealBlockClassList).filter((className) => heroVariantClasses.includes(className));

  block.append(innerBlockCode);

  block.classList.add(...providedVariantClasses);

  return block;
}

function decorate(block) {
  const blockRows = block.querySelectorAll(':scope > div');

  if (blockRows.length !== 2) {
    console.warn('V2 Hero Reveal block: Block misconfigured, please provide Countdown and Reveal Hero blocks.');
    return;
  }

  const preRevealCountdownHeroBlock = blockRows[0]?.cloneNode(true);
  const revealHeroBlock = blockRows[1]?.cloneNode(true);

  if (!preRevealCountdownHeroBlock || !revealHeroBlock) {
    console.warn('V2 Hero Reveal block: Countdown and Reveal Hero blocks not provided.');
    return;
  }

  const blockSection = block.parentElement?.parentElement;
  const revealEventTimeIso = blockSection?.dataset?.revealDate;
  const blockClassList = block.classList;
  let v2HeroBlock;
  let intervalId = null;

  if (!revealEventTimeIso) {
    console.warn('V2 Hero Reveal block: Reveal date not provided in the Section Metadata.');
    return;
  }

  const eventTime = new Date(revealEventTimeIso);

  if (!revealEventTimeIso) {
    console.warn('V2 Hero Reveal block: Reveal date invalid.');
    return;
  }

  if (isCountDownFinished(eventTime)) {
    v2HeroBlock = buildRevealHero(revealHeroBlock, blockClassList);
  } else {
    v2HeroBlock = buildPreRevealCountdownHero(preRevealCountdownHeroBlock, blockClassList);

    intervalId = setInterval(() => {
      // Build the reveal hero and replace the current block
      if (isCountDownFinished(eventTime)) {
        const newV2HeroBlock = buildRevealHero(revealHeroBlock, blockClassList);

        v2HeroBlock.replaceWith(newV2HeroBlock);

        loadBlock(newV2HeroBlock);
        decorateLinks(newV2HeroBlock);
        clearInterval(intervalId);
      }
    }, 1000);
  }

  decorateLinks(v2HeroBlock);

  block.replaceWith(v2HeroBlock);

  const main = document.querySelector('main');

  if (main) {
    loadBlocks(main);
  } else {
    loadBlocks(v2HeroBlock);
  }
}

export default decorate;
