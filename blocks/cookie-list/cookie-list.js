/**
 * OneTrust Cookies list is automatically injected into this block.
 * The OneTrust framework is loaded from delayed.js.
 * @param block
 */
export default function decorate(block) {
  block.setAttribute('id', 'ot-sdk-cookie-policy');
  block.textContent = '';
}