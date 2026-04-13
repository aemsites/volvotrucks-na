/* eslint-env serviceworker */

const CACHE_VERSION = 'v1';
const APP_CACHE = `volvotrucks-app-${CACHE_VERSION}`;
const RUNTIME_CACHE = `volvotrucks-runtime-${CACHE_VERSION}`;
const OFFLINE_FALLBACK = '/offline.html';

const STATIC_ASSETS = [
  '/manifest.webmanifest',
  '/offline.html',
  '/styles/styles.css',
  '/styles/favicon-192x192.png',
  '/dist/main.js',
  '/dist/vcdk.js',
  '/dist/vcdk.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(APP_CACHE);
      await Promise.allSettled(
        STATIC_ASSETS.map(async (assetPath) => {
          try {
            const response = await fetch(assetPath, { cache: 'no-cache' });
            if (response.ok || response.type === 'opaque') {
              await cache.put(assetPath, response);
            }
          } catch (error) {
            // Ignore failed precache entries so SW install is resilient.
          }
        }),
      );
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter((cacheName) => ![APP_CACHE, RUNTIME_CACHE].includes(cacheName))
          .map((cacheName) => caches.delete(cacheName)),
      );
      await self.clients.claim();
    })(),
  );
});

async function networkFirstNavigation(request) {
  const runtimeCache = await caches.open(RUNTIME_CACHE);

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      await runtimeCache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedPage = await caches.match(request);
    if (cachedPage) {
      return cachedPage;
    }

    const offlinePage = await caches.match(OFFLINE_FALLBACK);
    if (offlinePage) {
      return offlinePage;
    }

    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function staleWhileRevalidate(request) {
  const runtimeCache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await runtimeCache.match(request);

  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok || networkResponse.type === 'opaque') {
        runtimeCache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => null);

  if (cachedResponse) {
    return cachedResponse;
  }

  const networkResponse = await networkResponsePromise;
  if (networkResponse) {
    return networkResponse;
  }

  return new Response('Resource unavailable', { status: 503, statusText: 'Offline' });
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (['script', 'style', 'image', 'font'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
