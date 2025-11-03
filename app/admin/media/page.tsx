/**
// Force dynamic rendering - admin pages require authentication
export const dynamic = 'force-dynamic';

 * Admin Media Management Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent } from '@/components/ui/Card';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Image from 'next/image';
import { ImageIcon, FileIcon, InfoIcon } from 'lucide-react';

export const metadata = {
  title: 'Medya | Admin Panel',
  description: 'Medya yönetimi',
};

export default async function AdminMediaPage() {
  const mediaItems = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[var(--color-fg)] mb-3">
          Medya Yönetimi
        </h1>
        <p className="text-lg text-[var(--color-fg)]/70">
          Yüklenen görselleri ve dosyaları görüntüleyin
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-l-4 border-l-[var(--color-accent)]">
        <CardContent className="py-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <InfoIcon className="w-6 h-6 text-[var(--color-accent)]" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="text-base font-semibold text-[var(--color-fg)]">
                Medya Yükleme Hakkında
              </h3>
              <p className="text-[var(--color-fg)]/70 leading-relaxed">
                Medya yükleme özelliği için Supabase Storage bucket&apos;ı oluşturmanız gerekmektedir. 
                Detaylı kurulum talimatları için <code className="px-2 py-0.5 bg-[var(--color-muted)] rounded text-sm">SUPABASE_SETUP.md</code> dosyasına bakınız.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Media Library */}
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon className="w-6 h-6 text-[var(--color-accent)]" />
            <h2 className="text-2xl font-semibold text-[var(--color-fg)]">
              Medya Kütüphanesi
            </h2>
          </div>

          {mediaItems.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {mediaItems.map((item: typeof mediaItems[number]) => (
                <div
                  key={item.id}
                  className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] transition-all hover:shadow-[var(--shadow-soft-md)] hover:border-[var(--color-accent)]/50"
                >
                  <div className="aspect-video bg-[var(--color-muted)] relative overflow-hidden">
                    {item.mimeType.startsWith('image/') ? (
                      <Image
                        src={item.url}
                        alt={item.alt || item.fileName}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <FileIcon className="w-16 h-16 text-[var(--color-fg)]/30" />
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="truncate text-base font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                      {item.fileName}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--color-fg)]/70">
                        {(item.fileSize / 1024).toFixed(2)} KB
                      </span>
                      <span className="text-[var(--color-fg)]/60">
                        {format(new Date(item.createdAt), 'dd MMM yyyy', {
                          locale: tr,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-6 rounded-full bg-[var(--color-muted)]">
                  <ImageIcon className="w-12 h-12 text-[var(--color-fg)]/40" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-fg)] mb-3">
                Henüz medya yok
              </h3>
              <p className="text-base text-[var(--color-fg)]/60 max-w-md mx-auto leading-relaxed">
                Medya yükleme özelliği Supabase Storage kurulumu sonrası aktif olacaktır. 
                Yukarıdaki bilgi kutusuna göz atın.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
