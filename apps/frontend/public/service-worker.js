/* eslint-env worker */
/* eslint-disable no-undef */
importScripts('/resource-list.js')

const CACHE_NAME = 'devlin-frontend-v0.0.1'
const CACHE_MAX_AGE = 60 * 60 * 24

const EXTENSION_SCHEMES = [
    'chrome-extension://',
    'moz-extension://',
    'safari-extension://',
    'edge-extension://',
]

const STATIC_ROUTES = [
    '/',
    '/banter',
    '/vvordle',
    '/pokemon-roulette',
    '/wheres-waldo',
    '/about',
]
const DYNAMIC_ROUTES = ['/blog', '/blog/']

function handleFetch(request, isStatic = false) {
    fetch(request)
        .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
                const clonedResponse = networkResponse.clone()
                if (isStatic) {
                    const cacheTime = Date.now()

                    clonedResponse.headers.set(
                        'X-Cache-Time',
                        cacheTime.toString()
                    )
                }

                clonedResponse.headers.set(
                    'Cache-Control',
                    isStatic
                        ? `max-age=${CACHE_MAX_AGE}`
                        : 'max-age=0, no-cache'
                )

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(request, clonedResponse)
                })

                return networkResponse
            }

            return caches.match(request)
        })
        .catch(async (error) => {
            console.error('Failed to fetch:', error)
            const cachedResponse = await caches.match(event.request)
            return cachedResponse || new Response('Offline', { status: 503 })
        })
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

addEventListener('fetch', (event) => {
    if (
        EXTENSION_SCHEMES.some((scheme) => event.request.url.startsWith(scheme))
    )
        return

    const isStaticRoute = STATIC_ROUTES.includes(event.request.url)
    const isDynamicRoute = DYNAMIC_ROUTES.includes(event.request.url)

    if (isStaticRoute) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    const currentTime = Date.now()
                    const cachedTime = parseInt(
                        cachedResponse.headers.get('X-Cache-Time') ||
                            currentTime
                    )
                    const isStale = currentTime - cachedTime > CACHE_MAX_AGE

                    if (!isStale) {
                        return cachedResponse
                    }
                }

                return handleFetch(event.request, true)
            })
        )
    } else if (isDynamicRoute) {
        event.respondWith(handleFetch(event.request))
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || handleFetch(event.request)
            })
        )
    }
})
