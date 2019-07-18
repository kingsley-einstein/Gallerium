self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('gallerium').then((cache) => {
        return cache.addAll([
          '/',
          '/landing',
          '/signup',
          '/login',
          '/settings',
          '/home',
          '/upload',
          '/feeds',
          '/profile',
          '/search',
          '/collection',
          '/js/route.js',
          '/js/router.js',
          '/js/load-scripts.js',
          '/js/spa.js',
          '/js/login.js',
          '/js/signup.js',
          '/js/home.js',
          '/css/global.css'
        ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    // console.log('GET');
    event.respondWith(caches.open('gallerium').then((cache) => {
      return cache.match(event.request).then((cacheResponse) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        event.waitUntil(fetchPromise);
        return cacheResponse;
      });
    }));
  }
});
