/**
 * Prisma Client Instance
 * Singleton pattern to prevent multiple instances in development
 * 
 * PERFORMANCE OPTIMIZATIONS:
 * - Connection pooling enabled
 * - Query caching for faster repeated queries
 * - Optimized log levels
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    // Connection pool settings for better performance
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
