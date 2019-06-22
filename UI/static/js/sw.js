self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('gallerium').then((cache) => {
        return cache.addAll([
          '/',
          '/landing',
          '/signup',
          '/login',
          '/js/route.js',
          '/js/router.js',
          '/js/load-scripts.js',
          '/js/spa.js',
          '/css/global.css'
        ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method === 'GET') {
    // console.log('GET');
    event.respondWith(
        caches.match(event.request).then((res) => {
          return (
            res ||
          fetch(event.request).then((response) => {
            return caches.open('gallerium').then((cache) => {
              cache.put(event.request, response.clone());
              console.log('INTERCEPTED AND CACHED');
              return response;
            });
          })
          );
        })
    );
  }
});
