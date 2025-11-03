# syntax=docker/dockerfile:1

# 1) Dependencies
FROM node:20-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) Build
FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npx prisma generate
RUN npm run build

# 3) Runtime
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# App artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
# Next.js config ve app yapısı
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/app ./app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/components ./components
COPY --from=builder /app/middleware.ts ./

ENV PORT=3000
EXPOSE 3000

# Prod migration + start
CMD sh -c "npx prisma migrate deploy && npm run start"