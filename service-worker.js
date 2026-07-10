const CACHE_NAME='ejws-static-v9';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  if (req.mode === 'navigate' || req.destination === 'document') {
    event.respondWith(fetch(req, {cache:'no-store'}).catch(() => caches.match('/offline.html')));
    return;
  }
  event.respondWith(fetch(req).then(resp => {
    const copy = resp.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
    return resp;
  }).catch(() => caches.match(req)));
});
