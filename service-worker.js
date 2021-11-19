// importScripts("third_party_js/localforage.min.js");
// importScripts(
//   "third_party_js/devicedetector-min.js", "third_party_js/ua-parser.min.js" /* */
// );
// service-workers CANNOT access DOM or localStorage BUT can access IndexedDB
// https://www.py4u.net/discuss/316681
// https://github.com/localForage/localForage

/* self does not refer to the DOM window here */
/* self is the service-worker itself */
/* install and activate fire only on the first visit*/

self.addEventListener("activate", event => { /*console.log("SW activate fired!");*/ /*clear older unused stuff or handle notifications*/ });

const dynamicCache = "app-dynamic-cache";
self.addEventListener("fetch", event => {
  event.respondWith( caches.match(event.request)
    .then( cachedResponse => {
      return cachedResponse || fetch(event.request).then(fetchResponse => {
        return caches.open(dynamicCache).then(cache => {
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        })
      });
    } )
  );
});

/* Here [install] is not about the app itself being added to desktop or homescreen */
/* Here, it means the service-worker registration is complete */
self.addEventListener("install", event => { // Moved caching to js_for_precaching_assets
  /*console.log("SW install fired!");*/
  /*event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(resourcesToPrecache);
    })
  );*/
});
