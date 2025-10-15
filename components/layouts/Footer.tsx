/**
 * Public Footer Component
 */

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 rounded-xl border-2 border-purple-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm">
          <p className="text-center text-sm font-medium text-gray-700">
            ⚠️ <span className="font-semibold text-purple-700">Bu site resmi değildir;</span> Munzur Üniversitesi Psikoloji Kulübü
            topluluk sayfasıdır. Resmi duyurular için{' '}
            <a
              href="https://munzur.edu.tr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-purple-600 underline decoration-2 underline-offset-2 transition-colors hover:text-purple-800"
            >
              munzur.edu.tr
            </a>
            &apos;yi takip ediniz.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-2xl">🧠</span>
              <h3 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Munzur Psikoloji Kulübü
              </h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Munzur Üniversitesi Psikoloji öğrencileri ve meraklıları için topluluk platformu.
              Bilgi paylaşımı, etkinlikler ve sosyal etkileşim.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-xl">🔗</span>
              Hızlı Bağlantılar
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/haberler"
                  className="text-gray-600 transition-all hover:text-purple-600 hover:translate-x-1 inline-block"
                >
                  📰 Haberler
                </a>
              </li>
              <li>
                <a
                  href="/etkinlikler"
                  className="text-gray-600 transition-all hover:text-purple-600 hover:translate-x-1 inline-block"
                >
                  📅 Etkinlikler
                </a>
              </li>
              <li>
                <a
                  href="/iletisim"
                  className="text-gray-600 transition-all hover:text-purple-600 hover:translate-x-1 inline-block"
                >
                  ✉️ İletişim
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-xl">📍</span>
              İletişim
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-start gap-2">
                <span className="text-purple-600">🏫</span>
                <span>Munzur Üniversitesi<br />Tunceli, Türkiye</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-purple-100 pt-8">
          <p className="text-center text-sm text-gray-600">
            &copy; {new Date().getFullYear()} <span className="font-semibold text-purple-700">Munzur Psikoloji Kulübü</span> Topluluk
            Sitesi. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
