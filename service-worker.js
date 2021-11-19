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

self.addEventListener("activate", event => {
  /*
  event.waitUntil(
    caches.keys().then(keys =>{
      return Promise.all(
        keys.filter(
          key => key !== "app-dynamic-cache-Nov19th2021" &&
          key !== "user-interface-cache-Nov19th2021" &&
          key !== "information-screen-cache-Nov19th2021" &&
          key !== "app-core-cache-Nov19th2021" &&
          key !== "progress-chart-cache-Nov19th2021" &&
          key !== "lesson-1-1-1-cache-Nov19th2021" &&
          key !== "lesson-1-1-2-cache-Nov19th2021" &&
          key !== "lesson-1-1-3-cache-Nov19th2021"
        ).map(key => caches.delete(key))
      )
    })
  )
  */
});

//const dynamicCacheName = "app-dynamic-cache-Nov19th2021"; // CAN: Change the name to force-recache
self.addEventListener("fetch", event => {
  event.respondWith( caches.match(event.request)
    .then( cachedResponse => {
      return cachedResponse || fetch(event.request)/*.then(fetchResponse => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(event.request.url, fetchResponse.clone());
          return fetchResponse;
        })
      })*/;
    } )
  );
});
// See The Net Ninja PWA tutorials on Youtube #19 offline fallback
/*
.catch(() => {
  if (event.request.url.indexOf(".html") >= 0) {
    return caches.match("user_interface/youmustgetonline.html");
  }
})
*/

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
