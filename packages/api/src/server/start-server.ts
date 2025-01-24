import { createHTTPServer } from '@trpc/server/adapters/standalone'
import { appRouter } from '..'

const server = createHTTPServer({
    router: appRouter,
    middleware: (req, res, next) => {
        res.setHeader(
            'Access-Control-Allow-Origin',
            process.env.NODE_ENV === 'production'
                ? 'https://devlinrocha.com'
                : 'http://localhost:5173'
        )
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Content-Type, Authorization'
        )

        if (req.method === 'OPTIONS') {
            res.writeHead(204)
            res.end()
            return
        }

        next()
    },
})

server.listen(3000, () => {
    console.log('tRPC server running on http://localhost:3000')
})
