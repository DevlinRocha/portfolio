const CACHE_NAME = 'portfolio-cache-v1'
const ASSETS_TO_CACHE = [
    '/',
    '/about',
    '/banter',
    '/pokemon-roulette',
    '/vvordle',
    '/wheres-waldo',
    '/index.html',
    '/manifest.webmanifest',
    '/icon.svg',
    '/icon-512.png',
    '/icon-192.png',
    '/favicon.ico',
]

addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE)
        })
    )
})

addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) return cachedResponse

            return fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse.clone())
                        })
                    }
                    return networkResponse
                })
                .catch((error) => {
                    console.error('Failed to fetch:', error)
                    return new Response('Offline', { status: 503 })
                })
        })
    )
})
