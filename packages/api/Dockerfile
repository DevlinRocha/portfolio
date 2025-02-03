# -----------------------
# 1. Build Stage
# -----------------------
FROM node:22-alpine AS builder

WORKDIR /app
    
# Copy all package files from the entire monorepo context
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
# Copy the rest of the monorepo files
COPY packages/api ./packages/api
    
# Install all dependencies (including dev) with pnpm
RUN corepack enable && pnpm install
    
# Move into the API package folder
WORKDIR /app/packages/api
    
# Build the API package
RUN pnpm build
    
# -----------------------
# 2. Runtime Stage
# -----------------------
FROM node:22-alpine
WORKDIR /app
    
# Copy compiled code from builder
COPY --from=builder /app/packages/api/dist ./dist
# Also copy the package.json and lockfile for runtime
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/package.json ./
    
# Install only production deps
RUN pnpm install --prod

CMD ["node", "dist/server/start-server.js"]