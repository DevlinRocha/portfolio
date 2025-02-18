import React, { Suspense } from 'react'
import {
    createRootRoute,
    Outlet,
    ScrollRestoration,
    useLocation,
} from '@tanstack/react-router'
import Nav from '@/components/Nav'
import BlogNav from '@/components/BlogNav'
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
    component: () => {
        const { pathname } = useLocation()

        const blogRoute = ['/blog'].some((route) => pathname.startsWith(route))

        return (
            <>
                <Nav disableMenu={blogRoute} />
                {blogRoute && <BlogNav />}
                <ScrollRestoration />
                <Outlet />
                <Suspense>
                    <TanStackRouterDevtools />
                </Suspense>
                <Footer />
            </>
        )
    },
})
