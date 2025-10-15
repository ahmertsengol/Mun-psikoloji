/**
 * Public Header Component
 */

import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-105">
            <span className="text-2xl">🧠</span>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Munzur Psikoloji Kulübü
            </span>
          </Link>
          <nav className="flex items-center gap-2">
            <Link
              href="/haberler"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-700"
            >
              📰 Haberler
            </Link>
            <Link
              href="/etkinlikler"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-700"
            >
              📅 Etkinlikler
            </Link>
            <Link
              href="/iletisim"
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:text-purple-700"
            >
              ✉️ İletişim
            </Link>
            <Link
              href="/login"
              className="ml-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-105"
            >
              Giriş
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
