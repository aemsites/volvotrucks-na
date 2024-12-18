// eslint-disable-next-line import/no-cycle
import { formatStringToArray, TOOLS_CONFIGS } from './common.js';
import { loadCSS } from './aem.js';
import showSnackbar from '../common/snackbar/snackbar.js';

loadCSS(`${window.hlx.codeBasePath}/common/snackbar/snackbar.css`);

const { v1SectionClasses, v2SectionClasses, v1AllowedBlocks, v2AllowedBlocks } = TOOLS_CONFIGS;

const formattedV1SectionClasses = formatStringToArray(v1SectionClasses);
const formattedV2SectionClasses = formatStringToArray(v2SectionClasses);
const formattedV1AllowedBlocks = formatStringToArray(v1AllowedBlocks);
const formattedV2AllowedBlocks = formatStringToArray(v2AllowedBlocks);

const allowlist = [''];

const isV2 = document.documentElement.classList.contains('redesign-v2');
const pageText = isV2 ? 'redesign page' : 'legacy page';
const targetNode = document.body;
const config = { childList: true, subtree: false };

const countOccurrences = (elements, getName) => {
  const counts = {};
  elements.forEach((element) => {
    const name = getName(element);
    if (name) {
      if (counts[name]) {
        counts[name] += 1;
      } else {
        counts[name] = 1;
      }
    }
  });
  return counts;
};

const collectViolations = (counts, checkFn) => {
  const violations = [];
  Object.keys(counts).forEach((name) => {
    if (checkFn(name)) {
      violations.push(`<span style="white-space: nowrap">${name}${counts[name] > 1 ? ` (${counts[name]}\xD7)` : ''}</span>`);
    }
  });
  return violations;
};

const checkBlocks = () => {
  const blocks = document.querySelectorAll('[data-block-name]');
  const blockCounts = countOccurrences(blocks, (block) => block.getAttribute('data-block-name'));
  const checkFn = (blockName) => {
    if (isV2) {
      return !blockName.startsWith('v2-') && !formattedV2AllowedBlocks.includes(blockName);
    }
    return blockName.startsWith('v2-') && !formattedV1AllowedBlocks.includes(blockName);
  };
  return collectViolations(blockCounts, checkFn);
};

const checkSections = () => {
  const sections = targetNode.querySelectorAll(':scope > main > .section');
  const sectionCounts = {};

  sections.forEach((section) => {
    const sectionClasses = Array.from(section.classList);
    const checkList = isV2 ? formattedV1SectionClasses : formattedV2SectionClasses;

    sectionClasses.forEach((className) => {
      if (checkList.includes(className)) {
        const cleanedClassName = className.startsWith('section--') ? className.replace('section--', '') : className;
        if (sectionCounts[cleanedClassName]) {
          sectionCounts[cleanedClassName] += 1;
        } else {
          sectionCounts[cleanedClassName] = 1;
        }
      }
    });
  });

  const checkFn = (className) => !allowlist.includes(className);
  return collectViolations(sectionCounts, checkFn);
};

const logCombinedViolations = (blockViolations, sectionViolations) => {
  const allMessages = [];

  if (sectionViolations.length > 0) {
    const sectionMessage = `Found unsupported section classes on this ${pageText}: ${sectionViolations.join(', ')}`;
    allMessages.push(sectionMessage);
  }

  if (blockViolations.length > 0) {
    const blockMessage = `Found unsupported block${blockViolations.length > 1 ? 's' : ''} on this ${pageText}: ${blockViolations.join(', ')}`;
    allMessages.push(blockMessage);
  }

  if (allMessages.length > 0) {
    showSnackbar(allMessages.join('. '), 'error', 'center', 'bottom', false, true, 15000, true);
  }
};

const performDomCheck = () => {
  const blockViolations = checkBlocks();
  const sectionViolations = checkSections();
  logCombinedViolations(blockViolations, sectionViolations);
};

const existingElement = document.querySelector('body > helix-sidekick');
if (existingElement) {
  performDomCheck();
} else {
  const callback = (mutationsList, observer) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'helix-sidekick') {
            performDomCheck();
            observer.disconnect();
          }
        });
      }
    });
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}
