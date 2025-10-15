/**
 * Contact Page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Separator } from '@/components/ui/Separator';
import { MapPin, Mail, Brain, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'İletişim | Munzur Psikoloji Kulübü',
  description: 'Munzur Psikoloji Kulübü ile iletişime geçin.',
};

export default function IletisimPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-fg)] mb-2">
            İletişim
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-fg)]/70">
            Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
          </p>
        </div>

        <Separator className="mb-8" />

        {/* Important Notice - Top Priority */}
        <Card className="mb-8 border-l-4 border-l-[var(--color-accent)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--color-accent)]">
              <AlertCircle className="h-5 w-5" />
              Önemli Not
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--color-fg)]/80 leading-relaxed">
              <span className="font-semibold text-[var(--color-accent)]">
                Bu site resmi değildir;
              </span>
              {' '}Munzur Üniversitesi Psikoloji Kulübü topluluk sayfasıdır. Resmi duyurular ve bilgiler için{' '}
              <a
                href="https://munzur.edu.tr"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[var(--color-accent)] underline decoration-2 underline-offset-2 hover:text-[var(--color-accent2)] transition-colors"
              >
                munzur.edu.tr
              </a>
              {' '}adresini takip ediniz.
            </p>
          </CardContent>
        </Card>

        {/* Contact Cards Grid */}
        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          {/* University Info */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[var(--color-accent)]" />
                Munzur Üniversitesi
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-[var(--color-fg)]/70">
                <div>
                  <p className="font-semibold text-[var(--color-fg)] mb-1">Adres:</p>
                  <p>
                    Munzur Üniversitesi
                    <br />
                    Aktuluk Yerleşkesi
                    <br />
                    62000 Tunceli / Türkiye
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--color-fg)] mb-1">Web:</p>
                  <a
                    href="https://munzur.edu.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors"
                  >
                    munzur.edu.tr
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Psychology Club Info */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-[var(--color-accent)]" />
                Psikoloji Kulübü
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-[var(--color-fg)]/70">
                <p className="leading-relaxed">
                  Psikoloji kulübü hakkında daha fazla bilgi almak ve
                  etkinliklerimize katılmak için bize ulaşabilirsiniz.
                </p>
                <div>
                  <p className="font-semibold text-[var(--color-fg)] mb-1 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-[var(--color-accent)]" />
                    E-posta:
                  </p>
                  <a
                    href="mailto:info@munzurpsikoloji.com"
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors"
                  >
                    info@munzurpsikoloji.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Community Site */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>
                Bu Topluluk Sitesi Hakkında
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-[var(--color-fg)]/70 leading-relaxed">
                <p>
                  Bu platform, Munzur Üniversitesi Psikoloji öğrencileri ve meraklıları için
                  oluşturulmuş bir topluluk sitesidir. Amacımız:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Psikoloji alanındaki güncel haberleri paylaşmak</li>
                  <li>Kulüp etkinliklerini duyurmak ve organize etmek</li>
                  <li>Bilgi paylaşımı ve sosyal etkileşim sağlamak</li>
                  <li>Psikoloji toplulugu için bir buluşma noktası olmak</li>
                </ul>
                <p className="text-xs text-[var(--color-fg)]/60 pt-2">
                  Not: Resmi üniversite duyuruları ve bilgileri için lütfen{' '}
                  <a
                    href="https://munzur.edu.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:underline"
                  >
                    munzur.edu.tr
                  </a>
                  {' '}adresini ziyaret edin.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
}
