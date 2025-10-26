'use client';

/**
 * Login Form Component - Email/Password Authentication
 */

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/admin';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const supabase = createClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('E-posta veya şifre hatalı');
        setIsLoading(false);
        return;
      }

      if (data.user) {
        router.push(redirect);
        router.refresh();
      }
    } catch {
      setError('Giriş yapılırken bir hata oluştu');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <p className="text-center text-sm text-[var(--color-fg)]/70">
        Admin paneline erişmek için giriş yapın.
      </p>

      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 p-3">
          <p className="text-center text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="space-y-4">
        <Input
          type="email"
          label="E-posta"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />

        <Input
          type="password"
          label="Şifre"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
      </Button>

      <div className="mt-6 rounded-lg border-l-4 border-l-[var(--color-accent)] bg-[var(--color-card-bg)] p-4">
        <p className="text-center text-xs text-[var(--color-fg)]/70">
          Bu site resmi değildir; topluluk sayfasıdır. Sadece yetkili
          kullanıcılar admin paneline erişebilir.
        </p>
      </div>
    </form>
  );
}

