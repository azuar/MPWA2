const CACHE_NAME = "firstpwa2";
var urlsToCache = [
    "/",
    "/manifest.json",
    "/navbar.html",
    "/index.html",
    "/detail_teams.html",
    "/pages/standing.html",
    "/pages/scorer.html",
    "/pages/saved.html",
    "/img/icon-48.png",
    "/img/icon-96.png",
    "/img/icon-192.png",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/navbar.js",
    "/js/api.js",
    "/js/idb.js"
];

// Instal Service Worker
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(urlsToCache);
            })
    );
})

// Delete Cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (cacheNames) {
                return Promise.all(
                    cacheNames.map(function (cacheName) {
                        if (cacheName != CACHE_NAME) {
                            console.log("ServiceWorker: cache " + cacheName + " dihapus");
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
    );
})

// Use Aset
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request, { cacheName: CACHE_NAME })
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
                return fetch(event.request);
            })
    );
});
