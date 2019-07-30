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
    // event.waitUntil(fetchResponse);
    const fetchResponse = caches.open('gallerium').then((cache) => {
      return fetch(event.request)
          .then((res) => {
            cache.put(event.request, res.clone());
            return res;
          })
          .catch(() => {
            return caches.match(event.request);
          });
    });
    event.respondWith(fetchResponse);
  }
});

self.addEventListener('push', (event) => {
  const payload = JSON.parse(event.data.text());
  event.waitUntil(
      self.registration.showNotification(payload.title, {
        body: payload.message
      })
  );
});
