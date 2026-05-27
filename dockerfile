# Stage 1 : Build
FROM node:22.12-bookworm-slim AS builder

# Active pnpm 11 (résout bien les optional deps natives, contrairement à pnpm 9)
RUN corepack enable && corepack prepare pnpm@11.1.3 --activate

WORKDIR /app

# Copier les manifests d'abord (cache Docker)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Installer toutes les deps (binaires natifs Linux x64 inclus avec pnpm 11)
RUN pnpm install --frozen-lockfile

# Copier le reste du code
COPY . .

# Build
RUN pnpm build

# Stage 2 : Runtime minimal
FROM node:22.12-bookworm-slim AS runtime

WORKDIR /app

# Copier juste ce qui est nécessaire pour faire tourner
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
