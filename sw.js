// Κρατάει την εφαρμογή διαθέσιμη χωρίς internet.
// Όταν αλλάζεις αρχεία της εφαρμογής, άλλαξε το VERSION για να πάρουν όλοι τη νέα έκδοση.
const VERSION = 'pocketfold-v4';
const ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && (k.startsWith('pocketfold-') || k.startsWith('exoda-'))).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Δείχνει αμέσως ό,τι υπάρχει αποθηκευμένο και ανανεώνει στο παρασκήνιο.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  // Η εφαρμογή γυμναστηρίου στο /gym/ έχει τον δικό της service worker.
  if (url.pathname.startsWith('/gym/')) return;
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(req, {ignoreSearch: true}) ||
        (req.mode === 'navigate' ? await cache.match('./index.html') : undefined);
      const network = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
