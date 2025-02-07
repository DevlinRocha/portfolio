FROM node:23.7-alpine AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json packages/api/package.json

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install

COPY . .

RUN pnpm --filter @portfolio/api build

FROM base AS runtime

ENV NODE_ENV=production

COPY --from=build /app/packages/api/dist ./dist
COPY --from=build /app/node_modules ./node_modules

CMD ["node", "dist/server/start-server.js"]
