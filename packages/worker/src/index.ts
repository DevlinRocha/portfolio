/**
 * Bind resources to your worker in `wrangler.json`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { createFetchHandler } from '@portfolio/api'

const fetchHandler = createFetchHandler()

export default {
	fetch: (request: Request, env: Record<string, string>) => {
		process.env.DATABASE_URL = env.DATABASE_URL
		return fetchHandler(request)
	},
}
