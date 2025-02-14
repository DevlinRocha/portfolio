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

const DYNAMIC_ROUTES = ['/blog']

async function handleFetch(request, cache) {
    const networkResponse = await fetch(request)
    if (!networkResponse.ok) throw new Error('Network response was not ok')

    const clonedResponse = networkResponse.clone()
    cache.put(request, clonedResponse)

    return networkResponse
}

async function handleCache(request, isDynamic = false) {
    const cache = await caches.open(CACHE_NAME)
    const cachedResponse = await cache.match(request)

    try {
        if (isDynamic) return await handleFetch(request)

        handleFetch(request, cache)
        return cachedResponse
    } catch (error) {
        console.error('Failed to fetch new content:', error)
        return cachedResponse
    }
}

addEventListener('install', async (event) => {
    const cache = await caches.open(CACHE_NAME)
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

    const isDynamic = DYNAMIC_ROUTES.some((route) =>
        event.request.url.startsWith(route)
    )
    event.respondWith(handleCache(event.request, isDynamic))
})
