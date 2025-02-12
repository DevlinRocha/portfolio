/* eslint-env worker */
/* eslint-disable no-undef */
importScripts('/resource-list.js')

const CACHE_NAME = 'devlin-frontend-v0.0.1'

const EXTENSION_SCHEMES = [
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    'edge-extension://',
]

const DYNAMIC_ROUTES = ['/blog', '/blog/']

async function handleFetch(request, isDynamic = false) {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)

    const result = await fetch(request)
        .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone()

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, clonedResponse)
                })

                return networkResponse
            }

            return caches.match(request)
        })
        .catch(async (error) => {
            console.error('Failed to fetch:', error)
            const cachedResponse = await caches.match(request)
            return cachedResponse || new Response('Offline', { status: 503 })
        })

    return isDynamic ? result || cachedResponse : cachedResponse || result
}

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

addEventListener('fetch', async (event) => {
    if (
        EXTENSION_SCHEMES.some((scheme) => event.request.url.startsWith(scheme))
    )
        return

    event.respondWith(
        handleFetch(
            event.request,
            DYNAMIC_ROUTES.includes(request.url) ? false : true
        )
    )
})
