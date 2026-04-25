const CACHE_NAME = 'bike-trails-v1';

self.addEventListener('install', (event) => {
    console.log('SW установлен');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('SW активирован');
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request));
});
