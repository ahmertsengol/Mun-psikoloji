/**
 * Login Page - Email/Password Authentication
 */

import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoginForm } from './LoginForm';

export const metadata = {
  title: 'Giriş Yap | Munzur Psikoloji Kulübü',
  description: 'Admin paneline erişmek için giriş yapın.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg)] px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Admin Paneli Girişi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div className="text-center py-4 text-[var(--color-fg)]/70">Yükleniyor...</div>}>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
