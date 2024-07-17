import React, { Suspense } from 'react'
import {
    createRootRoute,
    Outlet,
    ScrollRestoration,
} from '@tanstack/react-router'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const TanStackRouterDevtools =
    process.env.NODE_ENV === 'production'
        ? () => null // Render nothing in production
        : React.lazy(() =>
              // Lazy load in development
              import('@tanstack/router-devtools').then((res) => ({
                  default: res.TanStackRouterDevtools,
              }))
          )

export const Route = createRootRoute({
    component: () => (
        <>
            <Nav />
            <ScrollRestoration />
            <Outlet />
            <Suspense>
                <TanStackRouterDevtools />
            </Suspense>
            <Footer />
        </>
    ),
})
