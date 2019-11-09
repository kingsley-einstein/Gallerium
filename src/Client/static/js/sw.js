const CACHE_NAME = 'gallerium';
const RESOURCES_TO_CACHE = [
  '/',
  '/home/feeds',
  '/login',
  '/signup'
];

self.addEventListener('install', (event) => {
  event.waitUntil(new Promise(async (resolve) => {
    const cache = await caches.open(CACHE_NAME);
    resolve(await cache.addAll(RESOURCES_TO_CACHE));
  }));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method == 'GET') {
    event.respondWith(new Promise(async (resolve) => {
      let finalResponse = null;
      const cache = await caches.open(CACHE_NAME);
      const responseFromCache = await caches.match(event.request);
      finalResponse = responseFromCache;
      event.waitUntil(new Promise(async (resolve) => {
        const responseFromServer = await fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
        if (!finalResponse) {
          finalResponse = responseFromServer;
        }
        resolve(responseFromServer);
      }));
      console.log(finalResponse);
      resolve(finalResponse);
    }));
  }
});
