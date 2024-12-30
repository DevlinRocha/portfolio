/* eslint-env worker */
/* eslint-disable no-undef */
importScripts('/asset-list.js')

const CACHE_NAME = 'devlin-frontend-v1'

addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSET_LIST)
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
