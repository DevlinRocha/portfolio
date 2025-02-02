import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '@portfolio/api'

export const trpc = createTRPCReact<AppRouter>()
