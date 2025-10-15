/**
 * Contact Page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export const metadata = {
  title: 'İletişim | Munzur Psikoloji Kulübü',
  description: 'Munzur Psikoloji Kulübü ile iletişime geçin.',
};

export default function IletisimPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">İletişim</h1>
        <p className="text-lg text-gray-600">
          Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Munzur Üniversitesi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <strong>Adres:</strong> Munzur Üniversitesi
                <br />
                Aktuluk Yerleşkesi
                <br />
                62000 Tunceli / Türkiye
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Psikoloji Kulübü</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                Psikoloji kulübü hakkında daha fazla bilgi almak ve
                etkinliklerimize katılmak için bize ulaşabilirsiniz.
              </p>
              <p className="text-xs text-gray-500">
                Not: Bu topluluk sitesidir. Resmi bilgiler için{' '}
                <a
                  href="https://munzur.edu.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  munzur.edu.tr
                </a>{' '}
                adresini ziyaret edin.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Önemli Not</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border-2 border-amber-500 bg-amber-50 p-4">
              <p className="text-sm text-amber-900">
                Bu site resmi değildir; Munzur Üniversitesi Psikoloji Kulübü
                topluluk sayfasıdır. Resmi duyurular ve bilgiler için{' '}
                <a
                  href="https://munzur.edu.tr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline hover:text-amber-700"
                >
                  munzur.edu.tr
                </a>{' '}
                adresini takip ediniz.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
