import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from '../index.ts'

const allowedOrigins =
    process.env.NODE_ENV === 'production'
        ? [
              'https://devlinrocha.com',
              'https://www.devlinrocha.com',
              'https://staging.devlinrocha.com',
              'https://staging.devlinrocha.pages.dev',
              'https://www.staging.devlinrocha.com',
          ]
        : ['http://localhost:4173', 'http://localhost:5173']

const server = createHTTPServer({
    router: appRouter,
    middleware: (req, res, next) => {
        // Security headers
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('X-Frame-Options', 'DENY')
        res.setHeader(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains'
        )
        res.setHeader('Content-Security-Policy', "default-src 'self'")

        // CORS headers
        const origin = req.headers.origin || ''
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin)
        }
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        )

        // Preflight requests
        if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return
        }

        next()
    },
})

// Process signal and error handlers
process.on('SIGTERM', () => {
    console.log('Received SIGTERM. Shutting down gracefully...')
    server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
    })
})

process.on('SIGINT', () => {
    console.log('Received SIGINT. Shutting down gracefully...')
    server.close(() => {
        console.log('HTTP server closed')
        process.exit(0)
    })
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason, promise)
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err)
    process.exit(1)
})

// Start the server
const API_URL = process.env.API_URL
const PORT = Number(process.env.PORT)
const HOSTNAME = process.env.HOSTNAME
server
    .listen(PORT, HOSTNAME, undefined, () => {
        console.log(`Server listening on ${API_URL}`)
    })
    .on('error', (error) => {
        console.error('Server encountered an error:', error)
        process.exit(1)
    })
