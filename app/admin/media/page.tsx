/**
 * Admin Media Management Page
 */

import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Image from 'next/image';

export const metadata = {
  title: 'Medya | Admin Panel',
  description: 'Medya yönetimi',
};

export default async function AdminMediaPage() {
  const mediaItems = await prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Medya Yönetimi
        </h1>
        <p className="text-gray-600">
          Yüklenen görselleri ve dosyaları görüntüleyin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Medya Kütüphanesi</CardTitle>
        </CardHeader>
        <CardContent>
          {mediaItems.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item: typeof mediaItems[number]) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-lg border bg-white"
                >
                  <div className="aspect-video bg-gray-100 relative">
                    {item.mimeType.startsWith('image/') ? (
                      <Image
                        src={item.url}
                        alt={item.alt || item.fileName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        <span className="text-4xl">📄</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="mb-1 truncate text-sm font-medium text-gray-900">
                      {item.fileName}
                    </p>
                    <p className="mb-2 text-xs text-gray-500">
                      {(item.fileSize / 1024).toFixed(2)} KB
                    </p>
                    <p className="text-xs text-gray-400">
                      {format(new Date(item.createdAt), 'dd MMM yyyy', {
                        locale: tr,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="mb-4 text-gray-500">Henüz medya yok</p>
              <p className="text-sm text-gray-400">
                Medya yükleme özelliği Supabase Storage kurulumu sonrası aktif
                olacaktır.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 text-sm font-semibold text-blue-900">
          Medya Yükleme Hakkında
        </h3>
        <p className="text-sm text-blue-800">
          Medya yükleme özelliği için Supabase Storage bucket&apos;ı
          oluşturmanız gerekmektedir. Detaylı kurulum talimatları için
          SUPABASE_SETUP.md dosyasına bakınız.
        </p>
      </div>
    </div>
  );
}
