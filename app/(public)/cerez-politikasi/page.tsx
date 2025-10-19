'use client';

import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { COOKIE_CATEGORIES } from '@/lib/utils/cookies';
import Link from 'next/link';

export default function CookiePolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Çerez Politikası
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-4 max-w-3xl mx-auto leading-relaxed">
              Gizliliğiniz bizim için önemlidir. Çerezleri nasıl kullandığımızı şeffaf bir şekilde açıklıyoruz.
            </p>
            <div className="flex items-center justify-center gap-2 opacity-80">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg">Son güncelleme: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Table of Contents */}
        <Card className="p-6 mb-8 border-l-4 border-[var(--color-accent)] bg-[var(--color-card-bg)] shadow-[var(--shadow-soft-lg)]">
          <h2 className="text-xl font-semibold mb-4 text-[var(--color-fg)]">İçindekiler</h2>
          <nav className="grid md:grid-cols-2 gap-2">
            <a href="#what-are-cookies" className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors">
              • Çerezler Nedir?
            </a>
            <a href="#cookie-types" className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors">
              • Çerez Türleri
            </a>
            <a href="#cookie-management" className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors">
              • Çerez Yönetimi
            </a>
            <a href="#legal-rights" className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors">
              • Yasal Haklar (GDPR)
            </a>
            <a href="#third-party" className="text-[var(--color-accent)] hover:text-[var(--color-accent2)] hover:underline transition-colors">
              • Üçüncü Taraf Çerezleri
            </a>
          </nav>
        </Card>

        <div className="space-y-8">
          {/* What are Cookies */}
          <section id="what-are-cookies">
            <Card className="p-8 bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-[var(--shadow-soft-lg)] hover:shadow-[var(--shadow-soft-xl)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-fg)]">Çerezler Nedir?</h2>
              </div>
              
              <div className="prose prose-lg max-w-none text-[var(--color-fg)]/80 leading-relaxed">
                <p className="mb-6 text-lg">
                  Çerezler, web sitelerini ziyaret ettiğinizde cihazınıza (bilgisayar, tablet, telefon) 
                  kaydedilen küçük metin dosyalarıdır. Bu dosyalar, web sitesinin daha iyi çalışmasını 
                  sağlar ve size daha iyi bir kullanıcı deneyimi sunar.
                </p>
                <div className="bg-[var(--color-card-bg)] p-6 rounded-lg border-l-4 border-[var(--color-accent)]">
                  <p className="mb-0 font-medium">
                    💡 <strong>Önemli Not:</strong> Çerezler genellikle zararsızdır ve kişisel olarak sizi tanımlamaz. 
                    Ancak, web sitesinin nasıl kullanıldığını anlamamıza ve tercihlerinizi hatırlamamıza yardımcı olur.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          {/* Cookie Types */}
          <section id="cookie-types">
            <Card className="p-8 bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-[var(--shadow-soft-lg)] hover:shadow-[var(--shadow-soft-xl)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-accent2)]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-accent2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-fg)]">Çerez Türleri</h2>
              </div>
              
              <div className="grid gap-6">
                {COOKIE_CATEGORIES.map((category, index) => (
                  <div key={category.id} className="group">
                    <div className="bg-[var(--color-muted)] p-6 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 hover:shadow-[var(--shadow-soft-md)]">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-[var(--color-fg)] group-hover:text-[var(--color-accent)] transition-colors">
                          {category.name}
                        </h3>
                        <div className="flex gap-2">
                          {category.required && (
                            <Badge className="bg-[var(--color-accent2)]/10 text-[var(--color-accent2)] border-[var(--color-accent2)]/20">
                              Zorunlu
                            </Badge>
                          )}
                          <Badge className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20">
                            Kategori {index + 1}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-[var(--color-fg)]/70 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Cookie Management */}
          <section id="cookie-management">
            <Card className="p-8 bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-[var(--shadow-soft-lg)] hover:shadow-[var(--shadow-soft-xl)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-fg)]">Çerez Yönetimi</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-fg)]">Tercihlerinizi Nasıl Değiştirebilirsiniz?</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-[var(--color-accent)]/5 p-4 rounded-lg border border-[var(--color-accent)]/20">
                       <h4 className="font-semibold text-[var(--color-accent)] mb-2">Web Sitesi Banner</h4>
                       <p className="text-sm text-[var(--color-fg)]/70">İlk ziyaretinizde çıkan banner&apos;dan tercihlerinizi belirleyebilirsiniz.</p>
                     </div>
                     <div className="bg-[var(--color-accent2)]/5 p-4 rounded-lg border border-[var(--color-accent2)]/20">
                       <h4 className="font-semibold text-[var(--color-accent2)] mb-2">Çerez Tercihleri</h4>
                       <p className="text-sm text-[var(--color-fg)]/70">Banner&apos;daki &quot;Ayarları Özelleştir&quot; butonuna tıklayarak detaylı tercihlerinizi belirleyebilirsiniz.</p>
                     </div>
                    <div className="bg-[var(--color-muted)] p-4 rounded-lg border border-[var(--color-border)]">
                      <h4 className="font-semibold text-[var(--color-fg)] mb-2">Tarayıcı Ayarları</h4>
                      <p className="text-sm text-[var(--color-fg)]/70">Tarayıcınızın ayarlarından çerezleri yönetebilirsiniz.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4 text-[var(--color-fg)]">Tarayıcı Ayarları</h3>
                  <p className="text-[var(--color-fg)]/70 mb-4">
                    Çoğu tarayıcı çerezleri otomatik olarak kabul eder, ancak bunu değiştirebilirsiniz:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center">
                          <span className="text-[var(--color-accent)] font-bold text-sm">C</span>
                        </div>
                        <div>
                          <strong className="text-[var(--color-fg)]">Chrome:</strong>
                          <span className="text-[var(--color-fg)]/70 ml-2">Ayarlar → Gizlilik ve güvenlik → Çerezler</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-accent2)]/10 rounded-full flex items-center justify-center">
                          <span className="text-[var(--color-accent2)] font-bold text-sm">F</span>
                        </div>
                        <div>
                          <strong className="text-[var(--color-fg)]">Firefox:</strong>
                          <span className="text-[var(--color-fg)]/70 ml-2">Ayarlar → Gizlilik ve Güvenlik → Çerezler</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center">
                          <span className="text-[var(--color-accent)] font-bold text-sm">S</span>
                        </div>
                        <div>
                          <strong className="text-[var(--color-fg)]">Safari:</strong>
                          <span className="text-[var(--color-fg)]/70 ml-2">Tercihler → Gizlilik → Çerezler</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-[var(--color-muted)] rounded-lg">
                        <div className="w-8 h-8 bg-[var(--color-accent2)]/10 rounded-full flex items-center justify-center">
                          <span className="text-[var(--color-accent2)] font-bold text-sm">E</span>
                        </div>
                        <div>
                          <strong className="text-[var(--color-fg)]">Edge:</strong>
                          <span className="text-[var(--color-fg)]/70 ml-2">Ayarlar → Çerezler ve site izinleri</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Legal Rights */}
          <section id="legal-rights">
            <Card className="p-8 bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-[var(--shadow-soft-lg)] hover:shadow-[var(--shadow-soft-xl)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-fg)]">Yasal Haklar (GDPR)</h2>
              </div>

              <div className="bg-gradient-to-r from-[var(--color-accent)]/5 to-[var(--color-accent2)]/5 p-6 rounded-xl border border-[var(--color-border)] mb-6">
                <p className="text-lg text-[var(--color-fg)]/80 mb-0">
                  Avrupa Birliği Genel Veri Koruma Yönetmeliği (GDPR) kapsamında aşağıdaki haklara sahipsiniz:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Bilgilendirilme Hakkı", desc: "Hangi çerezlerin kullanıldığını bilme hakkı", icon: "ℹ️" },
                  { title: "Erişim Hakkı", desc: "Saklanan verilerinize erişim hakkı", icon: "👁️" },
                  { title: "Düzeltme Hakkı", desc: "Yanlış verilerin düzeltilmesini isteme hakkı", icon: "✏️" },
                  { title: "Silme Hakkı", desc: "Verilerinizin silinmesini isteme hakkı", icon: "🗑️" },
                  { title: "Rıza Geri Çekme Hakkı", desc: "Verdiğiniz rızayı geri çekme hakkı", icon: "↩️" },
                  { title: "Veri Taşınabilirliği Hakkı", desc: "Verilerinizi başka bir hizmete taşıma hakkı", icon: "📦" }
                ].map((right, index) => (
                  <div key={index} className="bg-[var(--color-card-bg)] p-4 rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{right.icon}</span>
                      <div>
                        <h4 className="font-semibold text-[var(--color-fg)] mb-1">{right.title}</h4>
                        <p className="text-sm text-[var(--color-fg)]/70">{right.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Third Party Cookies */}
          <section id="third-party">
            <Card className="p-8 bg-[var(--color-card-bg)] border-[var(--color-border)] shadow-[var(--shadow-soft-lg)] hover:shadow-[var(--shadow-soft-xl)] transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[var(--color-accent2)]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[var(--color-accent2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-fg)]">Üçüncü Taraf Çerezleri</h2>
              </div>

              <p className="text-lg text-[var(--color-fg)]/80 mb-6">
                Web sitemizde aşağıdaki üçüncü taraf hizmetleri kullanılmaktadır:
              </p>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-[var(--color-muted)] to-[var(--color-accent)]/5 p-6 rounded-xl border border-[var(--color-border)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-fg)] rounded-lg flex items-center justify-center">
                      <span className="text-[var(--color-bg)] font-bold text-sm">V</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-[var(--color-fg)] mb-2">Vercel Analytics</h4>
                      <p className="text-[var(--color-fg)]/70 mb-3">
                        Web sitesi performansını ölçmek için kullanılır. Kişisel veri toplamaz, anonim istatistikler sağlar.
                      </p>
                      <Badge className="bg-[var(--color-accent2)]/10 text-[var(--color-accent2)] border-[var(--color-accent2)]/20">Gizlilik Dostu</Badge>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[var(--color-muted)] to-[var(--color-accent2)]/5 p-6 rounded-xl border border-[var(--color-border)]">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[var(--color-accent2)] rounded-lg flex items-center justify-center">
                      <span className="text-[var(--color-bg)] font-bold text-sm">S</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-[var(--color-fg)] mb-2">Supabase</h4>
                      <p className="text-[var(--color-fg)]/70 mb-3">
                        Veritabanı ve kimlik doğrulama hizmetleri için kullanılır. Sadece gerekli işlevsellik için veri işler.
                      </p>
                      <Badge className="bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/20">Güvenli</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>



          {/* Quick Links */}
          <Card className="p-6 bg-[var(--color-muted)] border-[var(--color-border)]">
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-fg)]">İlgili Sayfalar</h3>
            <div className="flex flex-wrap gap-3">
              <Link 
                href="/gizlilik-politikasi" 
                className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/5 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Gizlilik Politikası
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}