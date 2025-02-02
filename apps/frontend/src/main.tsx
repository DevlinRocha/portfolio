import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

if ('serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
        try {
            await navigator.serviceWorker.register('/service-worker.js')
        } catch (error) {
            console.error('Service Worker registration failed:', error)
        }
    })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
