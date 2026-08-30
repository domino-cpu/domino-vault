// v73 — bump this comment on every deploy to force SW replacement
const CACHE = 'domino-workout-v73';
const ASSETS = [
  './',
  './index.html',
  './app.js?v=73',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

// The page can tell a waiting SW to take over immediately (iOS sometimes ignores
// the skipWaiting() in install), so updates apply on the next foreground.
self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-first: bypass HTTP cache for HTML/JS so stale browser cache never blocks updates.
// version.json is always network-only.
self.addEventListener('fetch', e => {
  if (e.request.url.includes('version.json')) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' })
        .catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } }))
    );
    return;
  }
  // Use cache:'reload' for same-origin HTML/JS to bypass the HTTP cache
  const url = new URL(e.request.url);
  const isLocal = url.origin === self.location.origin;
  const fetchOpts = isLocal ? { cache: 'reload' } : {};
  e.respondWith(
    fetch(e.request, fetchOpts)
      .then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
