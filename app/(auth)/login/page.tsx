/**
 * Login Page - OAuth Authentication
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoginButton } from './LoginButton';

export const metadata = {
  title: 'Giriş Yap | Munzur Psikoloji Kulübü',
  description: 'Admin paneline erişmek için giriş yapın.',
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Admin Paneli Girişi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Admin paneline erişmek için aşağıdaki yöntemlerden biriyle giriş
              yapın.
            </p>

            <div className="space-y-3">
              <LoginButton provider="google" />
              <LoginButton provider="github" />
            </div>

            <div className="mt-6 rounded-lg border border-amber-300 bg-amber-50 p-4">
              <p className="text-center text-xs text-amber-900">
                Bu site resmi değildir; topluluk sayfasıdır. Sadece yetkili
                kullanıcılar admin paneline erişebilir.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
