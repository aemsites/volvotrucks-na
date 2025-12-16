import { loadScript, sampleRUM } from './aem.js';
import { isPerformanceAllowed, isTargetingAllowed, isDevHost, extractObjectFromArray, COOKIE_CONFIGS } from './common.js';

// COOKIE ACCEPTANCE AND IDs default to false in case no ID is present
const {
  GTM_ID = false,
  DATA_DOMAIN_SCRIPT = false,
  ACC_ENG_TRACKING = false,
} = COOKIE_CONFIGS;

// Core Web Vitals RUM collection
sampleRUM('cwv');

// This functions runs once at the begining and whenever a change in the selected group of cookies change.
function checkCookiesAndLoadAllScripts() {
  if (isPerformanceAllowed()) {
    GTM_ID && loadGoogleTagManager();
  }

  if (isTargetingAllowed()) {
    ACC_ENG_TRACKING && loadAccountEngagementTracking();
  }
}
checkCookiesAndLoadAllScripts();

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

    function isSameGroups(groups1, groups2) {
      const s1 = JSON.stringify(groups1.split(','));
      const s2 = JSON.stringify(groups2.split(','));

      return s1 === s2;
    }

    window.OneTrust.OnConsentChanged(() => {
      // reloading the page only when the active group has changed
      if (window.isSingleVideo === true) {
        return;
      }
      if (!isSameGroups(currentOnetrustActiveGroups, window.OnetrustActiveGroups) && window.isSingleVideo !== 'true') {
        // Run all cookie checks and their associated scripts
        checkCookiesAndLoadAllScripts();
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
    const dl = l != 'dataLayer' ? `&l=${l}` : '';
    j.async = true;
    j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`;
    f.parentNode.insertBefore(j, f);
  })(window, document, 'script', 'dataLayer', GTM_ID);
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
