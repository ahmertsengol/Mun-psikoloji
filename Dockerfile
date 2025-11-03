# syntax=docker/dockerfile:1

FROM node:20-slim AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build environment configuration
ENV NODE_ENV=production

# CRITICAL: Dummy DATABASE_URL to satisfy Prisma schema validation
# The actual connection will NOT be used during build thanks to instrumentation.ts
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?connection_limit=1&pool_timeout=0"
ENV DIRECT_URL="postgresql://dummy:dummy@localhost:5432/dummy?connection_limit=1&pool_timeout=0"

# Generate Prisma Client (this only generates TypeScript types, no DB connection)
RUN npx prisma generate

# Build Next.js with standalone output
# instrumentation.ts ensures Prisma Client is NOT instantiated during build
RUN npm run build

FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN apt-get update && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

# Sadece prod node_modules
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Standalone + static + public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
# Prisma dosyaları (client runtime dosyaları için)
COPY --from=builder /app/prisma ./prisma

# Varsayılan port ve komut
ENV PORT=3000
EXPOSE 3000
CMD ["node","server.js"]