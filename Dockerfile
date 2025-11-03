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
# Install OpenSSL for Prisma and curl for health checks
RUN apt-get update && apt-get install -y openssl curl && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone build output (includes only necessary files)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Set ownership to non-root user
RUN chown -R nextjs:nodejs /app

USER nextjs

ENV PORT=3000
EXPOSE 3000

# Run migrations and start server
CMD sh -c "npx prisma migrate deploy && node server.js"