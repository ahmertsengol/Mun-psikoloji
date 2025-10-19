import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası | Munzur Psikoloji Kulübü',
  description: 'Munzur Psikoloji Kulübü gizlilik politikası ve kişisel veri koruma uygulamaları.',
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold mb-8">Gizlilik Politikası</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-0">
            <strong>Son Güncelleme:</strong> {new Date().toLocaleDateString('tr-TR')}
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Giriş</h2>
          <p className="mb-4">
            Munzur Psikoloji Kulübü olarak, kişisel verilerinizin korunması konusunda hassasiyetle 
            hareket etmekteyiz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde kişisel 
            verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
          </p>
          <p className="mb-4">
            Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği 
            Genel Veri Koruma Tüzüğü (GDPR) kapsamında hazırlanmıştır.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Veri Sorumlusu</h2>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p><strong>Munzur Psikoloji Kulübü</strong></p>
            <p>E-posta: info@munzurpsikoloji.com</p>
            <p>Adres: Munzur Üniversitesi, Tunceli</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Toplanan Kişisel Veriler</h2>
          
          <h3 className="text-lg font-semibold mb-3">3.1 Doğrudan Toplanan Veriler</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>İletişim Bilgileri:</strong> Ad, soyad, e-posta adresi</li>
            <li><strong>Hesap Bilgileri:</strong> Kullanıcı adı, şifre (şifrelenmiş)</li>
            <li><strong>Profil Bilgileri:</strong> Biyografi, profil fotoğrafı</li>
            <li><strong>İçerik Verileri:</strong> Paylaştığınız yazılar, yorumlar</li>
          </ul>

          <h3 className="text-lg font-semibold mb-3">3.2 Otomatik Toplanan Veriler</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Teknik Veriler:</strong> IP adresi, tarayıcı bilgileri, cihaz bilgileri</li>
            <li><strong>Kullanım Verileri:</strong> Sayfa görüntülemeleri, tıklama verileri</li>
            <li><strong>Çerez Verileri:</strong> Detaylar için{' '}
              <Link href="/cerez-politikasi" className="text-blue-600 hover:underline">
                Çerez Politikamızı
              </Link> inceleyiniz
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Verilerin İşlenme Amaçları</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Kullanıcı hesabı oluşturma ve yönetimi</li>
            <li>İçerik paylaşımı ve topluluk etkileşimi sağlama</li>
            <li>Web sitesi güvenliğini sağlama</li>
            <li>Kullanıcı deneyimini iyileştirme</li>
            <li>İstatistiksel analiz ve performans ölçümü</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Çerezler ve Takip Teknolojileri</h2>
          <p className="mb-4">
            Web sitemizde çeşitli türde çerezler kullanmaktayız. Çerezlerin detaylı açıklaması, 
            türleri ve yönetimi hakkında bilgi almak için{' '}
            <Link href="/cerez-politikasi" className="text-blue-600 hover:underline">
              Çerez Politikamızı
            </Link> inceleyebilirsiniz.
          </p>
          
          <h3 className="text-lg font-semibold mb-3">5.1 Kullandığımız Çerez Türleri</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Gerekli Çerezler:</strong> Web sitesinin temel işlevleri için</li>
            <li><strong>Analitik Çerezler:</strong> Site kullanımını analiz etmek için</li>
            <li><strong>Tercih Çerezleri:</strong> Kullanıcı tercihlerini hatırlamak için</li>
            <li><strong>Pazarlama Çerezleri:</strong> Kişiselleştirilmiş içerik için</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Veri Paylaşımı</h2>
          <p className="mb-4">
            Kişisel verilerinizi üçüncü taraflarla paylaşmamaktayız. Ancak aşağıdaki durumlarda 
            sınırlı veri paylaşımı gerçekleşebilir:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Yasal zorunluluklar (mahkeme kararı, yasal süreç)</li>
            <li>Güvenlik ve dolandırıcılık önleme</li>
            <li>Hizmet sağlayıcılar (Supabase, Vercel) - veri işleme sözleşmeleri kapsamında</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Veri Güvenliği</h2>
          <p className="mb-4">
            Kişisel verilerinizin güvenliği için aşağıdaki önlemleri almaktayız:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>SSL/TLS şifreleme ile veri aktarımı</li>
            <li>Güvenli veri tabanı saklama</li>
            <li>Erişim kontrolü ve yetkilendirme</li>
            <li>Düzenli güvenlik güncellemeleri</li>
            <li>Veri yedekleme ve kurtarma prosedürleri</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Veri Saklama Süreleri</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Hesap Verileri:</strong> Hesap aktif olduğu sürece</li>
            <li><strong>İçerik Verileri:</strong> Kullanıcı tarafından silinene kadar</li>
            <li><strong>Log Verileri:</strong> 12 ay</li>
            <li><strong>Çerez Verileri:</strong> Çerez türüne göre değişir (detaylar çerez politikasında)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Haklarınız</h2>
          <p className="mb-4">
            KVKK ve GDPR kapsamında aşağıdaki haklara sahipsiniz:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Bilgi Alma Hakkı:</strong> Hangi verilerinizin işlendiğini öğrenme</li>
            <li><strong>Erişim Hakkı:</strong> Verilerinizin bir kopyasını talep etme</li>
            <li><strong>Düzeltme Hakkı:</strong> Yanlış verilerin düzeltilmesini isteme</li>
            <li><strong>Silme Hakkı:</strong> Verilerinizin silinmesini talep etme</li>
            <li><strong>İşlemeyi Sınırlama Hakkı:</strong> Veri işlemenin durdurulmasını isteme</li>
            <li><strong>Taşınabilirlik Hakkı:</strong> Verilerinizi başka platforma aktarma</li>
            <li><strong>İtiraz Hakkı:</strong> Veri işlemeye itiraz etme</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Çocukların Gizliliği</h2>
          <p className="mb-4">
            Web sitemiz 13 yaş altındaki çocuklara yönelik değildir. 13 yaş altındaki çocuklardan 
            bilerek kişisel veri toplamamaktayız. Eğer 13 yaş altında bir çocuğun veri sağladığını 
            fark edersek, bu verileri derhal sileriz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">11. Uluslararası Veri Aktarımı</h2>
          <p className="mb-4">
            Verileriniz, hizmet sağlayıcılarımız aracılığıyla Avrupa Birliği dışındaki ülkelere 
            aktarılabilir. Bu aktarımlar, uygun güvenlik önlemleri ve yasal çerçeveler kapsamında 
            gerçekleştirilir.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">12. Politika Değişiklikleri</h2>
          <p className="mb-4">
            Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler durumunda 
            sizi bilgilendireceğiz. Politikanın güncel halini düzenli olarak kontrol etmenizi 
            öneririz.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">13. İletişim</h2>
          <p className="mb-4">
            Gizlilik politikamız hakkında sorularınız veya haklarınızı kullanmak istiyorsanız 
            bizimle iletişime geçebilirsiniz:
          </p>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
            <p><strong>E-posta:</strong> privacy@munzurpsikoloji.com</p>
            <p><strong>Adres:</strong> Munzur Üniversitesi, Tunceli</p>
            <p><strong>Telefon:</strong> +90 (XXX) XXX XX XX</p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Bu politika, kişisel verilerinizin korunması konusundaki taahhüdümüzü yansıtmaktadır. 
            Sorularınız için{' '}
            <Link href="/iletisim" className="text-blue-600 hover:underline">
              iletişim sayfamızı
            </Link>{' '}
            ziyaret edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}