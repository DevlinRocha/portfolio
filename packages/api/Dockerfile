FROM node:23.7-alpine AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY .npmrc pnpm-lock.yaml pnpm-workspace.yaml package.json tsconfig.base.json ./
COPY packages/api ./packages/api

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm --filter=api install && pnpm --filter=api build && pnpm --filter=api --prod deploy deployment

FROM base AS runtime

COPY --from=build /app/deployment .

CMD ["node", "dist/server/start-server.js"]
