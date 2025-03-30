import { useState } from 'react'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { trpc } from '@/api/trpcClient'

import { routeTree } from './routeTree.gen'
import DefaultNotFound from './components/DefaultNotFound'
import './index.css'

const router = createRouter({
    scrollRestoration: true,
    defaultHashScrollIntoView: { behavior: 'smooth' },
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
                    url: import.meta.env.VITE_API_URL,
                    // headers: () => {
                    //     return {
                    //         'Content-Type': 'application/json',
                    //     }
                    // },
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
