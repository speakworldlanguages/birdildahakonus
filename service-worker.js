// importScripts("third_party_js/localforage.min.js"); // UNCOMMENT IF IT BECOMES NECESSARY
// service-workers CANNOT access DOM or localStorage BUT can access IndexedDB
// https://www.py4u.net/discuss/316681
// https://github.com/localForage/localForage

/* self does not refer to the DOM window here */
/* self is the service-worker itself */
/* "install" and "activate" fire only on the first visit */

/* Here [install] is not about the app itself being added to desktop or homescreen */
/* Here, it means the service-worker registration is complete */
self.addEventListener("install", event => {
  // Why on earth would one want to cache things here when one can do it normally in the main thread?
});

self.addEventListener("activate", event => {
  // What could be a good use case?
});

// const dynamicCacheName = "app-dynamic-cache-Nov19th2021"; // CAN: Change the name to force-recache
// Didn't work as expected,,, some files (like blank.html) get written in the dynamic cache despite being listed in the static cache
// Maybe we should introduce a delay or a condition so that dynamic caching will start only after static caching is done and ready

// Intervene normal fetch and see if a needed file already exists in the cache
// The browser actually does this automatically
// Which means if all files for a lesson (or the progress_chart) are cached,
// then the browser (or at least Chrome) successfully displays everything even if the device is offline
// and even if a service worker is not registered
// Still, we make the service worker intervene in case some weird browser won't do it automatically » As of 2023 cannot afford to test every single browser
self.addEventListener("fetch", event => {
  event.respondWith( caches.match(event.request).then( cachedResponse => {   return cachedResponse || fetch(event.request);   } )  );
});

// See The Net Ninja PWA tutorials on Youtube #19 #20 for offline fallback, like,
/*
.catch(() => {
  if (event.request.url.indexOf(".html") >= 0) {
    return caches.match("/user_interface/youmustgetonline.html");
  }
})
*/
