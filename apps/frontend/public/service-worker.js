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

const DYNAMIC_ROUTES = ['/blog']

async function handleFetch(request, cache) {
    const networkResponse = await fetch(request)
    if (!networkResponse.ok) throw new Error('Network response was not ok')

    const clonedResponse = networkResponse.clone()
    await cache.put(request, clonedResponse)

    return networkResponse
}

addEventListener('install', async (event) => {
    const cache = await getCache()
    event.waitUntil(cache.addAll(RESOURCE_LIST))
})

addEventListener('activate', async (event) => {
    const cacheNames = await caches.keys()

    event.waitUntil(
        await Promise.all(
            cacheNames.map((cacheName) => {
                if (cacheName !== CACHE_NAME) {
                    return caches.delete(cacheName)
                }
            })
        )
    )
})

addEventListener('fetch', async (event) => {
    if (
        EXTENSION_SCHEMES.some((scheme) => event.request.url.startsWith(scheme))
    )
        return

    const request = event.request
    const cache = await getCache()
    const cachedResponse = await cache.match(request)

    const isDynamic = DYNAMIC_ROUTES.some((route) =>
        request.url.startsWith(route)
    )

    try {
        if (isDynamic || !cachedResponse) {
            const networkResponse = await handleFetch(request, cache)
            event.respondWith(networkResponse)
        } else {
            event.respondWith(cachedResponse)
            event.waitUntil(handleFetch(request, cache))
        }
    } catch (error) {
        console.error('Failed to fetch new content:', error)
        event.respondWith(cachedResponse ?? (await handleFetch(request, cache)))
    }
})
