const FILES_TO_CACHE = ["../build"],
  CACHE_NAME = "banter_static_v1",
  CACHE_VERSION = "0.1.0",
  CURRENT_CACHES = {
    font: CACHE_NAME + CACHE_VERSION,
  };

const cacheFiles = async () => {
  const cache = await caches.open(CACHE_NAME);
  return cache.addAll(FILES_TO_CACHE);
};

const removeOldCaches = async () => {
  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  caches.keys().then((cacheNames) => {
    return Promise.all(
      cacheNames.forEach((cacheName) => {
        if (!expectedCacheNamesSet.has(cacheName)) {
          // If this cache name isn't present in the set of "expected" cache names, then delete it.
          console.log("Deleting out of date cache:", cacheName);
          return caches.delete(cacheName);
        }
      })
    );
  });
};

/* eslint-disable no-restricted-globals */
self.addEventListener("install", function (event) {
  console.log("Install!");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  try {
    removeOldCaches();
    cacheFiles();
    console.log("Activate!");
  } catch (e) {
    console.error(e);
  }
});

self.addEventListener("fetch", function (event) {
  // console.log("Fetch!", event.request);
});
