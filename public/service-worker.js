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
    event.waitUntil(async () => {
        return await caches.open(CACHE_NAME).addAll(ASSETS_TO_CACHE)
    })
})

addEventListener('activate', (event) => {
    event.waitUntil(async () => {
        const cacheNames = await caches.keys()

        return Promise.all(
            cacheNames.map(async (cacheName) => {
                if (cacheName !== CACHE_NAME) {
                    return await caches.delete(cacheName)
                }
            })
        )
    })
})

addEventListener('fetch', (event) => {
    event.respondWith(async () => {
        const cachedResponse = await caches.match(event.request)

        if (cachedResponse) return cachedResponse

        try {
            return await fetch(event.request)
        } catch (error) {
            console.error('Failed to fetch:', error)
            return new Response('Offline', { status: 503 })
        }
    })
})
