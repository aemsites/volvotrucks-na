/* global fbq */
import { loadScript, sampleRUM } from './aem.js';
import { isPerformanceAllowed, isTargetingAllowed, isSocialAllowed, isDevHost, extractObjectFromArray, COOKIE_CONFIGS } from './common.js';

// COOKIE ACCEPTANCE AND IDs default to false in case no ID is present
const {
  FACEBOOK_PIXEL_ID = false,
  HOTJAR_ID = false,
  GTM_ID = false,
  DATA_DOMAIN_SCRIPT = false,
  ACC_ENG_TRACKING = false,
  TIKTOK_PIXEL_ID = false,
  MNTN_PIXEL_ID = false,
} = COOKIE_CONFIGS;

// Core Web Vitals RUM collection
sampleRUM('cwv');

if (isPerformanceAllowed()) {
  GTM_ID && loadGoogleTagManager();
  HOTJAR_ID && loadHotjar();
}

if (isTargetingAllowed()) {
  ACC_ENG_TRACKING && loadAccountEngagementTracking();
}

if (isSocialAllowed()) {
  FACEBOOK_PIXEL_ID && loadFacebookPixel();
  TIKTOK_PIXEL_ID && loadTiktokPixel();
  MNTN_PIXEL_ID && loadMNTNTrackingPixel();
}

// add more delayed functionality here

document.addEventListener('click', (e) => {
  if (e.target.matches('.semitrans')) {
    const trigger = e.target.parentElement.querySelector('.semitrans-trigger');
    if (trigger.ariaExpanded === 'true') {
      trigger.ariaExpanded = false;
      document.body.classList.remove('disable-scroll');
    }
  }
});

/**
 * This loader is meant to load the MNTN conversion pixel on the correct pages.
 * The conversion pixel is loaded on the following pages:
 * - Find a Dealer Page: when the Dealer Site is loaded or when the Locate a Dealer search is performed once
 * - Truck Builder Page: when the Submit Build button appears
 * NOTE: By now, the event names are hardcoded, but they can be changed to be dynamic if needed.
 */
!(function onDelayedLoad() {
  const conversionURLs = ['/find-a-dealer/', '/truck-builder'];
  const [findADealer, truckBuilder] = conversionURLs;
  const conversionEvents = [
    { pathname: findADealer, eventName: 'find-a-dealer-button-click' },
    { pathname: findADealer, eventName: 'locate-a-dealer-search' },
    { pathname: truckBuilder, eventName: 'submit-build-button-click' },
  ];
  const currentURL = new URL(window.location.href);
  const currentPath = currentURL.pathname;
  const isDealerPage = currentPath === findADealer;
  const isBuilderPage = currentPath.includes(truckBuilder);
  const conversion = isDealerPage || isBuilderPage;

  if (conversion) {
    if (!MNTN_PIXEL_ID) {
      return;
    }

    if (isDealerPage) {
      const searchButtons = document.querySelectorAll('button[onClick*="$.fn.setAddress"]');
      const [findDealerOnLoad, findDealerOnSearch] = conversionEvents;
      loadMNTNConversionPixel(findDealerOnLoad.eventName);
      [...searchButtons].forEach((button) => {
        button.addEventListener('click', () => {
          const onSearchScript = document.querySelector(`script[src*="shoid=${findDealerOnSearch.eventName}"]`);
          if (!onSearchScript) {
            loadMNTNConversionPixel(findDealerOnSearch.eventName);
          }
        });
      });
    } else if (isBuilderPage) {
      const observer = new MutationObserver(() => {
        if (window.location.href.includes('summary')) {
          const submitButton = document.querySelector('.external-app #configurator div > h4 + h5 + div > button');
          if (submitButton) {
            const [, , TruckBuilder] = conversionEvents;
            const submitPixelScript = document.querySelector(`script[src*="shoid=${TruckBuilder.eventName}"]`);
            if (!submitPixelScript) {
              loadMNTNConversionPixel(TruckBuilder.eventName);
            }
            observer.disconnect();
          }
        }
      });
      observer.observe(document, { subtree: true, childList: true });
    }
  }
})();

// OneTrust Cookies Consent Notice start for volvotrucks.us
if (DATA_DOMAIN_SCRIPT && !window.location.pathname.includes('srcdoc') && !isDevHost()) {
  // when running on localhost in the block library host is empty but the path is srcdoc
  // on localhost/hlx.page/hlx.live the consent notice is displayed every time the page opens,
  // because the cookie is not persistent. To avoid this annoyance, disable unless on the
  // production page.
  loadScript('https://cdn.cookielaw.org/scripttemplates/otSDKStub.js', {
    type: 'text/javascript',
    charset: 'UTF-8',
    'data-domain-script': DATA_DOMAIN_SCRIPT,
  });

  window.OptanonWrapper = () => {
    const currentOnetrustActiveGroups = window.OnetrustActiveGroups;
    console.log(currentOnetrustActiveGroups);

    function isSameGroups(groups1, groups2) {
      const s1 = JSON.stringify(groups1.split(','));
      const s2 = JSON.stringify(groups2.split(','));

      console.log(s1);
      console.log(s2);
      return s1 === s2;
    }

    window.OneTrust.OnConsentChanged(() => {
      // reloading the page only when the active group has changed
      if (window.isSingleVideo === true) {
        return;
      }
      if (!isSameGroups(currentOnetrustActiveGroups, window.OnetrustActiveGroups) && window.isSingleVideo !== 'true') {
        // window.location.reload();
        console.warn(currentOnetrustActiveGroups);
        console.warn(window.OnetrustActiveGroups);
        console.warn(window.isSingleVideo !== true);
        console.warn(window.location);
      }
    });
  };
}

if (isDevHost()) {
  import('./validate-elements.js');
}

// Google Analytics
async function loadGoogleTagManager() {
  // google tag manager
  (function loadGoogleTagManagerInit(w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const f = d.getElementsByTagName(s)[0];
    const j = d.createElement(s);
    const dl = l !== 'dataLayer' ? `&l=${l}` : '';
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);
}

async function loadFacebookPixel() {
  // FaceBook Pixel
  (function loadFacebookPixelInit(f, b, e, v, n, t, s) {
    if (f.fbq) {
      return;
    }
    n = f.fbq = function loadFacebookPixelInitInner() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) {
      f._fbq = n;
    }
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', FACEBOOK_PIXEL_ID);
  fbq('track', 'PageView');
}

// Hotjar Tracking Code for volvotrucks.us
async function loadHotjar() {
  (function loadHotjarInit(h, o, t, j, a, r) {
    h.hj =
      h.hj ||
      function loadHotjarInitInner() {
        (h.hj.q = h.hj.q || []).push(arguments);
      };
    h._hjSettings = { hjid: HOTJAR_ID, hjsv: 6 };
    a = o.getElementsByTagName('head')[0];
    r = o.createElement('script');
    r.async = 1;
    r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
    a.appendChild(r);
  })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
}

// Initiate searchWidget ,  check for search div loaded
if (document.getElementById('div-widget-id') && !document.querySelector('.studio-widget-autosuggest-results')) {
  window.initiateSearchWidget();
}

// after search widget is loaded remove autocomplete
if (document.querySelector('.studio-widget-autosuggest-results')) {
  const searchWidget = document.querySelector('.studio-widget-search-input');
  searchWidget.setAttribute('autocomplete', 'off');
}

// Account Engagement Tracking Code
async function loadAccountEngagementTracking() {
  const formatedData = extractObjectFromArray(JSON.parse(ACC_ENG_TRACKING));
  const { piAId = null, piCId = null, piHostname = null } = formatedData;
  if (!piAId || !piCId || !piHostname) {
    return;
  }
  const body = document.querySelector('body');
  const script = document.createElement('script');
  script.type = 'text/javascript';

  script.text = `piAId = '${piAId}'; piCId = '${piCId}'; piHostname = '${piHostname}'; (function() { function async_load(){ var s = document.createElement('script'); s.type = 'text/javascript'; s.src = ('https:' == document.location.protocol ? 'https://pi' : 'http://cdn') + '.pardot.com/pd.js'; var c = document.getElementsByTagName('script')[0]; c.parentNode.insertBefore(s, c); } if(window.attachEvent) { window.attachEvent('onload', async_load); } else { window.addEventListener('load', async_load, false); } })();`;

  body.append(script);
}

// TikTok Code
async function loadTiktokPixel() {
  !(function loadTiktokPixelInit(w, d, t) {
    w.TiktokAnalyticsObject = t;
    const ttq = (w[t] = w[t] || []);
    (ttq.methods = [
      'page',
      'track',
      'identify',
      'instances',
      'debug',
      'on',
      'off',
      'once',
      'ready',
      'alias',
      'group',
      'enableCookie',
      'disableCookie',
    ]),
      (ttq.setAndDefer = function loadTiktokPixelInitSetAndDefer(t, e) {
        t[e] = function loadTiktokPixelInitSetAndDeferPush() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      });
    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    (ttq.instance = function loadTiktokPixelInitI(t) {
      let e;
      let n;
      for (e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) {
        ttq.setAndDefer(e, ttq.methods[n]);
      }
      return e;
    }),
      (ttq.load = function loadTiktokPixelInitSetAndDeferLoad(e, n) {
        const i = 'https://analytics.tiktok.com/i18n/pixel/events.js';
        (ttq._i = ttq._i || {}),
          (ttq._i[e] = []),
          (ttq._i[e]._u = i),
          (ttq._t = ttq._t || {}),
          (ttq._t[e] = +new Date()),
          (ttq._o = ttq._o || {}),
          (ttq._o[e] = n || {});
        const o = document.createElement('script');
        (o.type = 'text/javascript'), (o.async = !0), (o.src = `${i}?sdkid=${e}&lib=${t}`);
        const a = document.getElementsByTagName('script')[0];
        a.parentNode.insertBefore(o, a);
      });
    ttq.load(TIKTOK_PIXEL_ID);
    ttq.page();

    // Identifying the user with hashed details
    ttq.identify({
      email: '<hashed_email_address>', // string. The email of the customer if available. It must be hashed with SHA-256 on the client side.
      phone_number: '<hashed_phone_number>', // string. The phone number of the customer if available. It must be hashed with SHA-256 on the client side.
      external_id: '<hashed_external_id>', // string. A unique ID from the advertiser such as user or external cookie IDs. It must be hashed with SHA256 on the client side.
    });

    const trackingObject = {
      value: '<content_value>', // number. Value of the order or items sold. Example: 100.
      currency: '<content_currency>', // string. The 4217 currency code. Example: "USD".
      contents: [
        {
          content_id: '<content_identifier>', // string. ID of the product. Example: "1077218".
          content_type: '<content_type>', // string. Either product or product_group.
          content_name: '<content_name>', // string. The name of the page or product. Example: "shirt".
        },
      ],
    };

    // Tracking various user interactions
    ttq.track('SubmitForm', trackingObject);
    ttq.track('ClickButton', trackingObject);

    // Repeat similar structure for 'Download', 'CompletePayment', 'Contact', 'CompleteRegistration',
    // 'ViewContent', 'AddToCart', 'PlaceAnOrder', 'AddPaymentInfo', 'InitiateCheckout', 'Search',
    // 'AddToWishlist', 'Subscribe', and 'Pageview' events with appropriate parameters and comments.
  })(window, document, 'ttq');
}

// MNTN Tracking Pixel
// INSTALL ON ALL PAGES OF SITE
async function loadMNTNTrackingPixel() {
  !(function loadMNTNTrakingPixelInit() {
    'use strict';
    const e = null;
    const b = '4.0.0';
    const n = MNTN_PIXEL_ID;
    const additional = 'term=value';
    let t;
    let r;
    let i;
    try {
      t = top.document.referer !== '' ? encodeURIComponent(top.document.referrer.substring(0, 2048)) : '';
    } catch (o) {
      t = document.referrer !== null ? document.referrer.toString().substring(0, 2048) : '';
    }
    try {
      if (window && window.top && document.location && window.top.location === document.location) {
        r = document.location;
      } else if (window && window.top && window.top.location && '' !== window.top.location) {
        r = window.top.location;
      } else {
        r = document.location;
      }
    } catch (u) {
      r = document.location;
    }
    try {
      i = parent.location.href !== '' ? encodeURIComponent(parent.location.href.toString().substring(0, 2048)) : '';
    } catch (a) {
      try {
        i = r !== null ? encodeURIComponent(r.toString().substring(0, 2048)) : '';
      } catch (f) {
        i = '';
      }
    }
    let l;
    const c = document.createElement('script');
    let h = null;
    const p = document.getElementsByTagName('script');
    const d = Number(p.length) - 1;
    const v = document.getElementsByTagName('script')[d];
    if (typeof l === 'undefined') {
      l = Math.floor(Math.random() * 1e17);
    }
    h = 'dx.mountain.com/spx?' + `dxver=${b}&shaid=${n}&tdr=${t}&plh=${i}&cb=${l}${additional}`;
    c.type = 'text/javascript';
    c.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + h;
    v.parentNode.insertBefore(c, v);
  })();
}

// MNTN Conversion Pixel
// Install ONLY on conversion page/event
async function loadMNTNConversionPixel(orderId, orderAmount = '') {
  !(function loadMNTNConversionPixelInit() {
    const x = null;
    let p;
    let q;
    let m;
    const o = MNTN_PIXEL_ID;
    const l = orderId;
    const i = orderAmount;
    const c = '';
    const k = '';
    const g = '';
    const j = '';
    const u = '';
    const shadditional = '';
    try {
      p = top.document.referer !== '' ? encodeURIComponent(top.document.referrer.substring(0, 512)) : '';
    } catch (n) {
      p = document.referrer !== null ? document.referrer.toString().substring(0, 512) : '';
    }
    try {
      if (window && window.top && document.location && window.top.location === document.location) {
        q = document.location;
      } else if (window && window.top && window.top.location && '' !== window.top.location) {
        q = window.top.location;
      } else {
        q = document.location;
      }
    } catch (b) {
      q = document.location;
    }
    try {
      m = parent.location.href !== '' ? encodeURIComponent(parent.location.href.toString().substring(0, 512)) : '';
    } catch (z) {
      try {
        m = q !== null ? encodeURIComponent(q.toString().substring(0, 512)) : '';
      } catch (h) {
        m = '';
      }
    }
    let A;
    const y = document.createElement('script');
    let w = null;
    const v = document.getElementsByTagName('script');
    const t = Number(v.length) - 1;
    const r = document.getElementsByTagName('script')[t];
    if (typeof A === 'undefined') {
      A = Math.floor(Math.random() * 100000000000000000);
    }
    w = `dx.mountain.com/spx?conv=1&shaid=${o}&tdr=${p}&plh=${m}&cb=${A}&shoid=${l}&shoamt=${i}&shocur=${c}&shopid=${k}&shoq=${g}&shoup=${j}&shpil=${
      u
    }${shadditional}`;
    y.type = 'text/javascript';
    y.src = ('https:' === document.location.protocol ? 'https://' : 'http://') + w;
    r.parentNode.insertBefore(y, r);
  })();
}
