const CACHE_NAME = 'bike-trails-v1';

const FILES_TO_CACHE = [
  '/Bike-Trails/',
  '/Bike-Trails/index.html',
  '/Bike-Trails/style.css',
  '/Bike-Trails/script.js',
  '/Bike-Trails/auth.js',
  '/Bike-Trails/auth.css',
  '/Bike-Trails/premium.js',
  '/Bike-Trails/gamification.js',
  '/Bike-Trails/cabinet.html',
  '/Bike-Trails/favorites.html',
  '/Bike-Trails/planner.html',
  '/Bike-Trails/map.html',
  '/Bike-Trails/map.js',
  '/Bike-Trails/map.css',
  '/Bike-Trails/weather.html',
  '/Bike-Trails/weather.js',
  '/Bike-Trails/weather.css',
  '/Bike-Trails/help.html',
  '/Bike-Trails/help.js',
  '/Bike-Trails/help.css',
  '/Bike-Trails/premium.html',
  '/Bike-Trails/premium.css',
  '/Bike-Trails/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  console.log('[SW] Установка');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Кэширование файлов');
      return cache.addAll(FILES_TO_CACHE);
    }).catch((err) => {
      console.error('[SW] Ошибка кэширования:', err);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[SW] Активация');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[SW] Удаление старого кэша', key);
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  if (url.pathname.includes('chrome-extension')) return;
  
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          return caches.match('/Bike-Trails/images/placeholder.jpg');
        });
      })
    );
    return;
  }
  
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response && response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        if (event.request.mode === 'navigate') {
          return caches.match('/Bike-Trails/index.html');
        }
        return new Response('Нет соединения', { status: 503 });
      });
    })
  );
});
