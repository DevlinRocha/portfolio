import { useState } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from '@/api/trpcClient'

import { routeTree } from './routeTree.gen'
import DefaultNotFound from './components/DefaultNotFound'
import './index.css'

const router = createRouter({
    defaultNotFoundComponent: DefaultNotFound,
    routeTree,
})

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export function App() {
    const [queryClient] = useState(() => new QueryClient())

    const [trpcClient] = useState(() =>
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: 'http://localhost:3000',
                }),
            ],
        })
    )
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </trpc.Provider>
    )
}
