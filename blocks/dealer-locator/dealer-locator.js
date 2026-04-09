import { simplifiedReadBlockConfig } from '../../scripts/common.js';

/**
 * Maps authored block config rows to the dealer locator component's mount options.
 * TODO: Consider refactoring this block to load/map all dealer locator mount
 * options from a JSON config file instead of hardcoding option extraction in
 * JS.
 *
 * Block config rows are read verbatim by `simplifiedReadBlockConfig` — there is
 * no key normalization. The first column of each row in the authored document
 * must use the exact camelCase key names listed below.
 *
 * Authorable block config keys (all optional unless noted):
 *
 * Core:
 * - `apiBaseUrl`: Dealer search endpoint. Mandatory at runtime — the widget
 *   logs a console error when missing.
 * - `contactFormPostUrl`: Pardot form handler endpoint. When present, a
 *   `contactFormSubmitHandler` is wired internally using the JSONP /
 *   script-tag pattern (same approach as the v2-custom-form block). The
 *   form handler must be configured to redirect success to
 *   `/blocks/dealer-locator/responses/success.js` and error to
 *   `/blocks/dealer-locator/responses/error.js`. When omitted, the
 *   contact-form CTA and modal are hidden by the widget.
 * - `contactFormSubmitHandler`: Custom JS submit handler
 *   `(payload) => Promise<boolean> | boolean`. Return `true` for success,
 *   `false` for error. Takes priority over `contactFormPostUrl` and also
 *   enables the contact-form CTA/modal. **Not authorable via block config**
 *   (function type); must be set programmatically if needed.
 * - `initialQuery`: Prefills the search field on first render.
 * - `googleMapsApiKey`: Google Maps browser API key. Mandatory for map
 *   rendering unless a page-level meta tag provides it:
 *   `<meta name="google-maps-api-key" content="...">`
 * - `showAllDealersOnLoad`: Authored as `"true"` or `"false"`. Default: `false`.
 *   When `true`, all dealers are shown on the map before the user submits a
 *   search; after search, only in-radius dealers are shown.
 * - `showDistanceOnCard`: Authored as `"true"` or `"false"`. Default: `true`.
 *   When `false`, the distance from search center to dealer is hidden on dealer
 *   cards.
 * - `showBrandFilter`: Authored as `"true"` or `"false"`. Default: `true`.
 *   When `false`, the brand filter (All/Volvo/Mack) is hidden;
 *
 * Radius slider:
 * - `rangeMin`: Minimum selectable radius in miles. Default: `25`.
 * - `rangeMax`: Maximum selectable radius in miles. Default: `2000`.
 * - `rangeInitialValue`: Pre-selected radius on first render. Default: `100`.
 *
 * Map:
 * - `mapDefaultLat`: Default map center latitude before search/geolocation.
 *   Only applied when paired with `mapDefaultLng`.
 * - `mapDefaultLng`: Default map center longitude before search/geolocation.
 *   Only applied when paired with `mapDefaultLat`.
 * - `mapDefaultZoom`: Initial zoom level. Default: `4`.
 * - `mapMinZoom`: Minimum zoom allowed in map controls. Default: `2`.
 * - `mapMaxZoom`: Maximum zoom allowed in map controls. Default: `18`.
 * - `scrollZoom`: Enables scroll-wheel zoom on the map. Authored as `"true"`
 *   or `"false"`. Defaults to `true`. When `false`, the page scrolls normally
 *   over the map; Ctrl+scroll still zooms the map.
 *
 * Numeric values (`rangeMin`, `rangeMax`, `rangeInitialValue`, `mapDefaultZoom`,
 * `mapMinZoom`, `mapMaxZoom`, `mapDefaultLat`, `mapDefaultLng`) are coerced to
 * numbers by `simplifiedReadBlockConfig`; the widget also sanitizes them before
 * use so invalid values fall back to widget defaults.
 *
 * Locale / theme:
 * - `locale`: BCP 47 locale tag controlling UI language and distance units.
 *   Default: `"en-US"`. Supported: `"en-US"`, `"en-CA"`, `"es-419"`, `"fr-CA"`.
 * - `theme`: Visual theme applied to the widget. Default: `"volvo"`. Brand
 *   aliases (`volvo`, `mack`, `renault`) resolve to the light variant. Full IDs:
 *   `volvo-light`, `volvo-dark`, `mack-light`, `mack-dark`, `renault-light`,
 *   `renault-dark`. Invalid values fall back to `volvo-light`.
 */

/**
 * Returns a contactFormSubmitHandler compatible with the dealer locator widget
 * that submits form data to a Pardot form handler via the JSONP / script-tag
 * pattern.
 *
 * Pardot must be configured to redirect:
 *   - success → /blocks/dealer-locator/responses/success.js
 *   - error   → /blocks/dealer-locator/responses/error.js
 *
 * Both response files call window.showResult({ result: 'success'|'error' }),
 * which resolves the Promise returned here.
 *
 * @param {string} postUrl - Pardot form handler endpoint URL
 * @returns {(payload: object) => Promise<boolean>}
 */
function makeContactFormSubmitHandler(postUrl) {
  return function contactFormSubmitHandler(payload) {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        delete window.showResult;
        resolve(false);
      }, 15000);

      window.showResult = function showResult({ result }) {
        clearTimeout(timeout);
        delete window.showResult;
        resolve(result === 'success');
      };

      const params = new URLSearchParams({ ...payload, callback: 'showResult' });
      const script = document.createElement('script');
      script.src = `${postUrl}?${params.toString()}`;
      script.addEventListener('error', () => {
        clearTimeout(timeout);
        delete window.showResult;
        resolve(false);
      });
      document.head.appendChild(script);
    });
  };
}

function toMountOptions(cfg) {
  const options = {
    apiBaseUrl: cfg.apiBaseUrl || undefined,
    contactFormSubmitHandler: cfg.contactFormPostUrl ? makeContactFormSubmitHandler(cfg.contactFormPostUrl) : undefined,
    initialQuery: cfg.initialQuery || undefined,
    locale: cfg.locale || undefined,
    theme: cfg.theme || undefined,
    // Prefer an authored key, otherwise fall back to a page-level meta contract.
    googleMapsApiKey: cfg.googleMapsApiKey || document.querySelector('meta[name="google-maps-api-key"]')?.content || undefined,
  };

  if (cfg.showAllDealersOnLoad === 'true') {
    options.showAllDealersOnLoad = true;
  } else if (cfg.showAllDealersOnLoad === 'false') {
    options.showAllDealersOnLoad = false;
  }

  if (cfg.showDistanceOnCard === 'true') {
    options.showDistanceOnCard = true;
  } else if (cfg.showDistanceOnCard === 'false') {
    options.showDistanceOnCard = false;
  }

  if (cfg.showBrandFilter === 'true') {
    options.showBrandFilter = true;
  } else if (cfg.showBrandFilter === 'false') {
    options.showBrandFilter = false;
  }

  const { rangeMin, rangeMax, rangeInitialValue } = cfg;
  if (rangeMin !== undefined || rangeMax !== undefined || rangeInitialValue !== undefined) {
    options.range = {
      ...(rangeMin !== undefined ? { min: rangeMin } : {}),
      ...(rangeMax !== undefined ? { max: rangeMax } : {}),
      ...(rangeInitialValue !== undefined ? { initialValue: rangeInitialValue } : {}),
    };
  }

  const { mapDefaultLat: lat, mapDefaultLng: lng, mapDefaultZoom: defaultZoom, mapMinZoom: minZoom, mapMaxZoom: maxZoom } = cfg;
  let scrollZoom;
  if (cfg.scrollZoom === 'false') {
    scrollZoom = false;
  } else if (cfg.scrollZoom === 'true') {
    scrollZoom = true;
  }

  if (
    (lat !== undefined && lng !== undefined) ||
    defaultZoom !== undefined ||
    minZoom !== undefined ||
    maxZoom !== undefined ||
    scrollZoom !== undefined
  ) {
    options.map = {
      ...(lat !== undefined && lng !== undefined ? { defaultCenter: { lat, lng } } : {}),
      ...(defaultZoom !== undefined ? { defaultZoom } : {}),
      ...(minZoom !== undefined ? { minZoom } : {}),
      ...(maxZoom !== undefined ? { maxZoom } : {}),
      ...(scrollZoom !== undefined ? { scrollZoom } : {}),
    };
  }

  return options;
}

export default async function decorate(block) {
  const [{ mount }] = await Promise.all([
    import(/* webpackChunkName: "dealer-locator-vendor" */ '@volvo/vg-dealer-locator/dist/vg-dealer-locator.es.js'),
    import(/* webpackChunkName: "dealer-locator-vendor" */ '@volvo/vg-dealer-locator/dist/vg-dealer-locator.css'),
  ]);

  const cfg = simplifiedReadBlockConfig(block);

  const mountEl = document.createElement('div');
  mountEl.className = 'dealer-locator__mount';

  block.textContent = '';
  block.append(mountEl);

  if (block.__dealerLocatorUnmount) {
    block.__dealerLocatorUnmount();
  }

  block.__dealerLocatorUnmount = mount(mountEl, toMountOptions(cfg));
}
