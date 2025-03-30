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

let CACHE_INSTANCE

async function getCache() {
    if (!CACHE_INSTANCE) {
        CACHE_INSTANCE = await caches.open(CACHE_NAME)
    }
    return CACHE_INSTANCE
}

async function handleFetch(request, cache) {
    try {
        const networkResponse = await fetch(request)
        if (!networkResponse.ok) {
            console.warn(
                `Network response was not ok for ${request.url}: ${networkResponse.status}`
            )
            return networkResponse
        }

        const clonedResponse = networkResponse.clone()
        await cache.put(request, clonedResponse)

        return networkResponse
    } catch (error) {
        console.error('Network fetch failed:', error)
        throw error
    }
}

addEventListener('install', (event) => {
    event.waitUntil(
        (async () => {
            const cache = await getCache()
            await cache.addAll(RESOURCE_LIST)
        })()
    )

    skipWaiting()
})

addEventListener('activate', (event) => {
    event.waitUntil(
        (async () => {
            const cacheNames = await caches.keys()

            await Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })()
    )

    clients.claim()
})

addEventListener('fetch', (event) => {
    if (
        event.request.method !== 'GET' ||
        EXTENSION_SCHEMES.some((scheme) => event.request.url.startsWith(scheme))
    )
        return

    event.respondWith(
        (async () => {
            const cache = await getCache()
            const cachedResponse = await cache.match(event.request)

            if (cachedResponse) {
                event.waitUntil(handleFetch(event.request, cache))
                return cachedResponse
            }

            try {
                return await handleFetch(event.request, cache)
            } catch (error) {
                console.error(
                    `Failed to fetch from network for ${event.request.url}:`,
                    error
                )

                return new Response('Offline or network error occurred ', {
                    status: 503,
                    statusText: 'Service Unavailable',
                })
            }
        })()
    )
})
