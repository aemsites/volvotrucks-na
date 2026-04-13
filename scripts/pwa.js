const INSTALL_AVAILABLE_EVENT = 'pwa-install-available';
const INSTALL_RESULT_EVENT = 'pwa-install-result';
const FLOATING_INSTALL_BUTTON_ID = 'pwa-floating-install-button';
const FLOATING_INSTALL_STYLE_ID = 'pwa-floating-install-style';

let deferredInstallPrompt = null;
let pwaInitialized = false;

function isStandaloneMode() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function ensureFloatingInstallStyle() {
  if (document.getElementById(FLOATING_INSTALL_STYLE_ID)) {
    return;
  }

  const style = document.createElement('style');
  style.id = FLOATING_INSTALL_STYLE_ID;
  style.textContent = `
    #${FLOATING_INSTALL_BUTTON_ID} {
      position: fixed;
      right: 1rem;
      bottom: 1rem;
      z-index: 1000;
      border: 0;
      border-radius: 999px;
      background: #141414;
      color: #fff;
      box-shadow: 0 10px 24px rgb(0 0 0 / 22%);
      padding: 0.8rem 1.2rem;
      font-size: 0.95rem;
      line-height: 1;
      font-weight: 600;
      cursor: pointer;
    }

    #${FLOATING_INSTALL_BUTTON_ID}[hidden] {
      display: none;
    }

    @media (min-width: 1200px) {
      #${FLOATING_INSTALL_BUTTON_ID} {
        right: 1.5rem;
        bottom: 1.5rem;
      }
    }
  `;
  document.head.append(style);
}

function ensureFloatingInstallButton() {
  let button = document.getElementById(FLOATING_INSTALL_BUTTON_ID);
  if (button) {
    return button;
  }

  ensureFloatingInstallStyle();

  button = document.createElement('button');
  button.id = FLOATING_INSTALL_BUTTON_ID;
  button.type = 'button';
  button.textContent = 'Install app';
  button.setAttribute('data-pwa-install', 'true');
  button.hidden = false;
  button.setAttribute('aria-hidden', 'false');

  document.body.append(button);
  return button;
}

function syncFloatingInstallButton(available = canInstallPWA()) {
  const button = ensureFloatingInstallButton();
  if (!button) {
    return;
  }

  const shouldRenderButton = !isStandaloneMode();
  button.hidden = !shouldRenderButton;
  button.setAttribute('aria-hidden', shouldRenderButton ? 'false' : 'true');

  button.disabled = !available;
  button.textContent = available ? 'Install app' : 'Install app (not available)';
  button.title = available ? 'Install this app' : 'Install prompt is not available in this browser right now';
}

function initFloatingInstallButton() {
  ensureFloatingInstallButton();
  syncFloatingInstallButton();

  window.addEventListener(INSTALL_AVAILABLE_EVENT, (event) => {
    syncFloatingInstallButton(Boolean(event.detail?.available));
  });

  window.addEventListener(INSTALL_RESULT_EVENT, () => {
    syncFloatingInstallButton();
  });
}

function emitInstallAvailability() {
  const isAvailable = Boolean(deferredInstallPrompt);
  window.dispatchEvent(
    new CustomEvent(INSTALL_AVAILABLE_EVENT, {
      detail: { available: isAvailable },
    }),
  );
}

export function canInstallPWA() {
  return Boolean(deferredInstallPrompt);
}

export async function promptPWAInstall() {
  if (!deferredInstallPrompt) {
    window.dispatchEvent(
      new CustomEvent(INSTALL_RESULT_EVENT, {
        detail: { outcome: 'unavailable' },
      }),
    );
    return { outcome: 'unavailable' };
  }

  const installEvent = deferredInstallPrompt;
  deferredInstallPrompt = null;
  emitInstallAvailability();

  installEvent.prompt();
  const { outcome } = await installEvent.userChoice;

  window.dispatchEvent(
    new CustomEvent(INSTALL_RESULT_EVENT, {
      detail: { outcome },
    }),
  );

  return { outcome };
}

function attachInstallClickDelegate() {
  document.addEventListener('click', async (event) => {
    const installTrigger = event.target.closest('[data-pwa-install]');
    if (!installTrigger) {
      return;
    }

    event.preventDefault();
    await promptPWAInstall();
  });
}

function exposePWAApi() {
  window.hlx = window.hlx || {};
  window.hlx.pwa = {
    canInstallPWA,
    promptPWAInstall,
    events: {
      available: INSTALL_AVAILABLE_EVENT,
      result: INSTALL_RESULT_EVENT,
    },
  };
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator) || !window.isSecureContext) {
    return;
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.error('[PWA] Service worker registration failed:', error);
    });
  });
}

export function initPWA() {
  if (pwaInitialized) {
    return;
  }

  pwaInitialized = true;
  registerServiceWorker();
  exposePWAApi();
  attachInstallClickDelegate();
  initFloatingInstallButton();

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    emitInstallAvailability();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    emitInstallAvailability();
  });
}
