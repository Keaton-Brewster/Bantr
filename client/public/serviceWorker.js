const FILES_TO_CACHE = ["~/src"];
const CACHE_NAME = "banter_static_v1";

/* eslint-disable no-restricted-globals */
self.addEventListener("install", function (event) {
  console.log("Install!");
  //! Need to, at somepoint figure out caching source files
  //! so That app load time is quicker once youve installed it
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then((cache) => {
  //     console.log(FILES_TO_CACHE);
  //     return cache.addAll(FILES_TO_CACHE);
  //   })
  // );
  // console.log("Your files were pre-cached successfully!");
  // self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Activate!");
});
self.addEventListener("fetch", function (event) {
  // console.log("Fetch!", event.request);
});
