const CACHE_NAME = 'perfectwin-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icon.png',
  '/icon512.png',
  '/screenshot1.png',
  '/screenshot2.png',
  '/style.css',
  '/app.js'
];

// Instala o cache inicial
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Ativa o service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Busca arquivos no cache primeiro
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
