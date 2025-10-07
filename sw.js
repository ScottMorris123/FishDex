// sw.js — FishDex (Sharded) offline support
const CACHE_NAME = 'fishdex-sharded-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
    self.skipWaiting();
  })());
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(k => k === CACHE_NAME ? null : caches.delete(k)));
    self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);

  // App shell
  if (ASSETS.some(a => url.pathname.endsWith(a.replace('./','/')) || (a === './' && url.pathname.endsWith('/')))) {
    e.respondWith(caches.match(req).then(r => r || fetch(req)));
    return;
  }

  // Runtime: cache sharded JSON (stale-while-revalidate)
  if (url.pathname.includes('/fishdex_sharded/') && url.pathname.endsWith('.json')) {
    e.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
      } catch {
        return cached || Response.error();
      }
    })());
    return;
  }

  // Default: network first, then cache
  e.respondWith((async () => {
    try { return await fetch(req); }
    catch {
      const cached = await caches.match(req);
      return cached || Response.error();
    }
  })());
});
