/**
 * Font Loader (basic and extended subsets)
 * Uses the CSS Font Loading API and localStorage for best performance.
 *
 * - On first visit: Downloads font, caches in localStorage, loads via FontFace API
 * - On repeat visits: Loads instantly from localStorage, bypassing network
 * - Falls back to CSS @font-face if JS fails
 */

/**
 * Converts an ArrayBuffer to a base64 string.
 * @param {ArrayBuffer} buffer
 * @returns {string}
 */
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return window.btoa(binary);
};

/**
 * Converts a base64 string to an ArrayBuffer.
 * @param {string} base64
 * @returns {ArrayBuffer}
 */
const base64ToArrayBuffer = (base64) => {
  const binaryStr = window.atob(base64);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes.buffer;
};

/**
 * Loads a single font using the FontFace API and caches it in localStorage.
 * @param {Object} font
 * @param {string} font.name - Font family name
 * @param {string} font.url - Font file URL
 * @param {string|number} font.weight - Font weight
 * @param {string} font.style - Font style
 * @param {string} font.unicodeRange - Unicode range (optional)
 * @param {string} font.storageKey - localStorage key
 * @returns {Promise<void>}
 */
const loadFont = async ({ name, url, weight, style, unicodeRange, storageKey }) => {
  let buffer;
  try {
    const cached = localStorage.getItem(storageKey);
    if (cached) {
      buffer = base64ToArrayBuffer(cached);
    }
  } catch (e) {
    console.warn(`Unable to read font from localStorage: ${storageKey}`, e);
  }
  if (!buffer) {
    try {
      const res = await fetch(url);
      buffer = await res.arrayBuffer();
      try {
        localStorage.setItem(storageKey, arrayBufferToBase64(buffer));
      } catch (e) {
        // Storage quota may be exceeded, or private mode disables localStorage
        console.warn(`Unable to cache font in localStorage: ${storageKey}`, e);
      }
    } catch (e) {
      console.warn(`Failed to fetch font from network: ${url}`, e);
      return;
    }
  }
  try {
    const fontFace = new FontFace(name, buffer, { weight, style, unicodeRange });
    await fontFace.load();
    document.fonts.add(fontFace);
  } catch (e) {
    console.warn(`Failed to load font: ${name}`, e);
  }
};

/**
 * Loads all critical fonts in order of priority.
 * @returns {Promise<void>}
 */
const loadAllFonts = async () => {
  const manifest = [
    // --- VolvoBroadProDigital (400) ---
    {
      name: 'VolvoBroadProDigital',
      url: '/fonts/VolvoBroadProDigital-basic.woff2',
      weight: '400',
      style: 'normal',
      unicodeRange: 'U+0020-007F',
      storageKey: 'font-VolvoBroadProDigital-basic',
    },
    {
      name: 'VolvoBroadProDigital',
      url: '/fonts/VolvoBroadProDigital-extended.woff2',
      weight: '400',
      style: 'normal',
      unicodeRange: 'U+0080-FFFF',
      storageKey: 'font-VolvoBroadProDigital-extended',
    },
    // --- VolvoNovum Regular (400) ---
    {
      name: 'VolvoNovum',
      url: '/fonts/VolvoNovum-Regular-basic.woff2',
      weight: '400',
      style: 'normal',
      unicodeRange: 'U+0020-007F',
      storageKey: 'font-VolvoNovum-Regular-basic',
    },
    {
      name: 'VolvoNovum',
      url: '/fonts/VolvoNovum-Regular-extended.woff2',
      weight: '400',
      style: 'normal',
      unicodeRange: 'U+0080-FFFF',
      storageKey: 'font-VolvoNovum-Regular-extended',
    },
    // --- VolvoNovum Medium (500) ---
    {
      name: 'VolvoNovum-Medium',
      url: '/fonts/VolvoNovum-Medium-basic.woff2',
      weight: '500',
      style: 'normal',
      unicodeRange: 'U+0020-007F',
      storageKey: 'font-VolvoNovum-Medium-basic',
    },
    {
      name: 'VolvoNovum-Medium',
      url: '/fonts/VolvoNovum-Medium-extended.woff2',
      weight: '500',
      style: 'normal',
      unicodeRange: 'U+0080-FFFF',
      storageKey: 'font-VolvoNovum-Medium-extended',
    },
  ];

  await Promise.all(manifest.map((font) => loadFont(font)));
};

export { loadAllFonts };
