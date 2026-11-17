// Κρατάει την εφαρμογή διαθέσιμη χωρίς internet.
// Όταν αλλάζεις αρχεία της εφαρμογής, άλλαξε το VERSION για να πάρουν όλοι τη νέα έκδοση.
const VERSION = 'gym-v3';
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
  event.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(ASSETS.map((u) => new Request(u, {cache: 'reload'})))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && k.startsWith('gym-')).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Δείχνει αμέσως ό,τι υπάρχει αποθηκευμένο και ανανεώνει στο παρασκήνιο.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const cached = await cache.match(req, {ignoreSearch: true}) ||
        (req.mode === 'navigate' ? await cache.match('./index.html') : undefined);
      // cache: 'no-cache' ώστε οι αλλαγές να φαίνονται με το επόμενο άνοιγμα.
      const network = fetch(req.url, {cache: 'no-cache', credentials: 'same-origin'}).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
