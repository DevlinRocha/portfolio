import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import DefaultNotFound from './components/DefaultNotFound'
import './index.css'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            await navigator.serviceWorker.register('/service-worker.js')
        } catch (error) {
            console.error('Service Worker registration failed:', error)
        }
    })
}

const router = createRouter({
    defaultNotFoundComponent: DefaultNotFound,
    routeTree,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
