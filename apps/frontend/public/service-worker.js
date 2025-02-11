/* eslint-env worker */
/* eslint-disable no-undef */
importScripts('/resource-list.js')

const CACHE_NAME = 'devlin-frontend-v1'

addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(RESOURCE_LIST)
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
    const extensionSchemes = [
        'chrome-extension://',
        'moz-extension://',
        'safari-extension://',
        'edge-extension://',
    ]

    if (extensionSchemes.some((scheme) => event.request.url.startsWith(scheme)))
        return

    const isBlogRoute = event.request.url.includes('/blog/')

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (!isBlogRoute && cachedResponse) {
                return cachedResponse
            }

            return fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const clonedResponse = networkResponse.clone()

                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, clonedResponse)
                        })

                        return networkResponse
                    }
                    return networkResponse
                })
                .catch((error) => {
                    console.error('Failed to fetch:', error)
                    if (cachedResponse) return cachedResponse
                    return new Response('Offline', { status: 503 })
                })
        })
    )
})
