/**
 * Authentication utility functions
 */

import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/db/prisma';

/**
 * Gets the current authenticated user from Supabase
 * @returns User object or null if not authenticated
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get user from database to include role
  let dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  // If user doesn't exist in database, create them
  if (!dbUser && user.email) {
    dbUser = await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        role: 'MEMBER', // Default role
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }

  return dbUser;
}

/**
 * Checks if the current user has admin or editor role
 * @returns true if user is admin or editor
 */
export async function isAdminOrEditor(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN' || user?.role === 'EDITOR';
}

/**
 * Checks if the current user has admin role
 * @returns true if user is admin
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === 'ADMIN';
}

/**
 * Requires the user to be authenticated, throws error if not
 * @throws Error if user is not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * Requires the user to have admin or editor role
 * @throws Error if user doesn't have permission
 */
export async function requireAdminOrEditor() {
  const user = await requireAuth();
  if (user.role !== 'ADMIN' && user.role !== 'EDITOR') {
    throw new Error('Forbidden: Insufficient permissions');
  }
  return user;
}

/**
 * Requires the user to have admin role
 * @throws Error if user is not admin
 */
export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'ADMIN') {
    throw new Error('Forbidden: Admin access required');
  }
  return user;
}
