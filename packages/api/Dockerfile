FROM node:23.7-alpine AS base

WORKDIR /app

FROM base AS build

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/api/package.json ./

RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --prod
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm --filter api build

COPY . .

FROM base AS runtime

ENV NODE_ENV=production

COPY --from=build /app/packages/api/dist ./dist
COPY --from=build /app/node_modules ./node_modules


CMD ["node", "dist/server/start-server.js"]
