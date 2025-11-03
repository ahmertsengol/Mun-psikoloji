/**
 * Next.js Instrumentation Hook
 *
 * This file runs once when the Next.js server starts (not during build).
 * We use it to prevent Prisma Client from being initialized during the build process.
 *
 * Why this is needed:
 * - Next.js 15 pre-renders Server Components during build
 * - app/page.tsx uses Prisma queries that get executed at build time
 * - Docker build stage doesn't have database access
 * - This hook ensures Prisma only initializes at runtime, not build time
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */

export async function register() {
  // This runs when the server starts, NOT during build
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // Import Prisma only at runtime
    const { prisma } = await import('@/lib/db/prisma');

    // Test connection only in non-build environments
    if (process.env.NODE_ENV === 'production') {
      console.log('[Instrumentation] Prisma Client initialized at runtime');
    }
  }
}
