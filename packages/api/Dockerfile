FROM node:23.7-alpine AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json .

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --prod && pnpm --filter api build && pnpm --filter api --prod --legacy deploy pruned

COPY ./packages/api/dist ./dist

FROM base AS runtime

COPY --from=build /app/dist ./dist
COPY --from=build /app/pruned .

CMD ["node", "dist/server/start-server.js"]