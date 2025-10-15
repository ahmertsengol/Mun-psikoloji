/**
 * OAuth Callback Route Handler
 * Handles the callback from OAuth providers
 */

import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const redirect = requestUrl.searchParams.get('redirect') || '/admin';

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Ensure user exists in database
      await prisma.user.upsert({
        where: { id: data.user.id },
        update: {
          email: data.user.email || '',
        },
        create: {
          id: data.user.id,
          email: data.user.email || '',
          role: 'MEMBER', // Default role
        },
      });

      return NextResponse.redirect(new URL(redirect, requestUrl.origin));
    }
  }

  // If there's an error, redirect to login
  return NextResponse.redirect(new URL('/login', requestUrl.origin));
}
