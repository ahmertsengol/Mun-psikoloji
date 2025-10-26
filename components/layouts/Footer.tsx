/**
 * Public Footer Component
 */

import Link from "next/link";
import { Brain, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-card-bg)]/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Warning Banner */}
        <div className="mb-8 rounded-lg border-2 border-[var(--color-accent)] bg-[var(--color-card-bg)] p-5 shadow-sm">
          <p className="text-center text-sm font-medium text-[var(--color-fg)]">
            <span className="inline-flex items-center gap-2 mb-1">
              <span className="text-lg">⚠️</span>
              <span className="font-semibold text-[var(--color-accent)]">Bu site resmi değildir;</span>
            </span>
            {" "}Munzur Üniversitesi Psikoloji Kulübü topluluk sayfasıdır. Resmi duyurular için{" "}
            <a
              href="https://munzur.edu.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[var(--color-accent)] underline decoration-2 underline-offset-2 transition-colors hover:text-[var(--color-accent2)]"
            >
              munzur.edu.tr
            </a>
            &apos;yi takip ediniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Brain className="h-6 w-6 text-[var(--color-accent)]" />
              <h3 className="text-lg font-bold text-[var(--color-fg)]">
                Munzur Psikoloji Kulübü
              </h3>
            </div>
            <p className="text-sm text-[var(--color-fg)]/70 leading-relaxed">
              Munzur Üniversitesi Psikoloji öğrencileri ve meraklıları için topluluk platformu.
              Bilgi paylaşımı, etkinlikler ve sosyal etkileşim.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--color-fg)]">
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/haberler"
                  className="text-[var(--color-fg)]/70 transition-colors hover:text-[var(--color-accent)] inline-block"
                >
                  Haberler
                </Link>
              </li>
              <li>
                <Link
                  href="/etkinlikler"
                  className="text-[var(--color-fg)]/70 transition-colors hover:text-[var(--color-accent)] inline-block"
                >
                  Etkinlikler
                </Link>
              </li>
              <li>
                <Link
                  href="/iletisim"
                  className="text-[var(--color-fg)]/70 transition-colors hover:text-[var(--color-accent)] inline-block"
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-[var(--color-fg)]">
              İletişim
            </h3>
            <div className="space-y-3 text-sm text-[var(--color-fg)]/70">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[var(--color-accent)] mt-0.5" />
                <span>Munzur Üniversitesi<br />Tunceli, Türkiye</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[var(--color-border)] pt-8">
          <p className="text-center text-sm text-[var(--color-fg)]/60">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-[var(--color-fg)]">Munzur Psikoloji Kulübü</span>{" "}
            Topluluk Sitesi. Tüm hakları saklıdır.
          </p>
          
          {/* Developer Credit */}
          <p className="text-center text-xs text-[var(--color-fg)]/40 mt-3">
            Designed & Developed by{" "}
            <a
              href="https://www.ahmertsengol.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--color-fg)]/50 hover:text-[var(--color-accent)] transition-colors duration-200"
            >
              Ahmet Mert Şengöl
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
