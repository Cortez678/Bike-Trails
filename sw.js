// Название кэша
const CACHE_NAME = 'bike-trails-v1';

// Файлы для кэширования (офлайн-доступ)
const FILES_TO_CACHE = [
  '/Bike-Trails/',
  '/Bike-Trails/index.html',
  '/Bike-Trails/style.css',
  '/Bike-Trails/script.js',
  '/Bike-Trails/auth.js',
  '/Bike-Trails/auth.css',
  '/Bike-Trails/cabinet.html',
  '/Bike-Trails/favorites.html',
  '/Bike-Trails/help.html',
  '/Bike-Trails/help.css',
  '/Bike-Trails/help.js',
  '/Bike-Trails/premium.html',
  '/Bike-Trails/premium.css',
  '/Bike-Trails/premium.js',
  '/Bike-Trails/speed-tracker.html',
  '/Bike-Trails/speed-tracker.css',
  '/Bike-Trails/speed-tracker.js',
  '/Bike-Trails/trail-1.html',
  '/Bike-Trails/trail-2.html',
  '/Bike-Trails/trail-3.html',
  '/Bike-Trails/trail-4.html',
  '/Bike-Trails/trail-5.html',
  '/Bike-Trails/trail-6.html',
  'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@400;500;600;700;800&display=swap',
  'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2'
];

// Установка Service Worker — кэшируем файлы
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

// Активация — удаляем старые кэши
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

// Перехват запросов — сначала сеть, при ошибке кэш
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Не кэшируем аналитику и API
  if (url.pathname.includes('analytics') || url.pathname.includes('chrome-extension')) {
    return;
  }
  
  // Для изображений используем стратегию "сначала кэш, потом сеть"
  if (url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        }).catch(() => {
          // Если нет ни кэша, ни сети — возвращаем заглушку
          return caches.match('/Bike-Trails/images/placeholder.jpg');
        });
      })
    );
    return;
  }
  
  // Для всего остального — "сначала сеть, потом кэш"
  event.respondWith(
    fetch(event.request).then((response) => {
      // Кэшируем успешные ответы
      if (response && response.status === 200) {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
      }
      return response;
    }).catch(() => {
      // Если сеть недоступна — пробуем кэш
      return caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        // Если страницы нет в кэше — показываем офлайн-страницу
        if (event.request.mode === 'navigate') {
          return caches.match('/Bike-Trails/index.html');
        }
        return new Response('Офлайн режим. Нет доступа к сети.', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      });
    })
  );
});

// Обработка push-уведомлений (опционально)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Bike Trails';
  const options = {
