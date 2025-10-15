/**
 * Seed script for demo data
 * Run with: npx tsx prisma/seed.ts
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (be careful in production!)
  await prisma.post.deleteMany({});
  await prisma.event.deleteMany({});

  console.log("✨ Cleared existing data");

  // Create Announcements (3)
  const announcements = await Promise.all([
    prisma.post.create({
      data: {
        title: "2025 Bahar Dönemi Etkinlik Takvimi Açıklandı",
        slug: "2025-bahar-donemi-etkinlik-takvimi",
        type: "ANNOUNCEMENT",
        status: "PUBLISHED",
        excerpt:
          "Bahar dönemi etkinlik programımız belirlendi. Seminerler, workshoplar ve sosyal aktiviteler ile dolu bir dönem sizi bekliyor!",
        content: `
          <p>Sevgili kulüp üyelerimiz,</p>
          <p>2025 Bahar dönemi etkinlik takvimimiz açıklandı! Bu dönem sizler için birbirinden değerli içerikler hazırladık.</p>
          <h3>Etkinlik Programı</h3>
          <ul>
            <li>Psikoloji Seminerleri (Her Salı 14:00)</li>
            <li>Mindfulness ve Meditasyon Workshopları (Her Perşembe 16:00)</li>
            <li>Film Geceleri (Ayda 2 kez Cuma akşamları)</li>
            <li>Kitap Kulübü Buluşmaları (Her ay son Çarşamba)</li>
          </ul>
          <p>Detaylı bilgi için etkinlikler bölümünü takip ediniz!</p>
        `,
        publishedAt: new Date("2025-01-15T10:00:00Z"),
      },
    }),
    prisma.post.create({
      data: {
        title: "Yeni Üye Kayıtları Başladı",
        slug: "yeni-uye-kayitlari-basladi",
        type: "ANNOUNCEMENT",
        status: "PUBLISHED",
        excerpt:
          "Psikoloji kulübüne katılmak isteyen tüm öğrencilerin başvuruları başlamıştır. Başvuru formunu doldurarak aramıza katılabilirsiniz.",
        content: `
          <p>Munzur Psikoloji Kulübü olarak yeni üye alımlarına başladık!</p>
          <h3>Kimler Başvurabilir?</h3>
          <ul>
            <li>Munzur Üniversitesi öğrencileri</li>
            <li>Psikolojiye ilgi duyan herkes</li>
            <li>Sosyal ve akademik aktivitelere katılmak isteyenler</li>
          </ul>
          <h3>Başvuru Süreci</h3>
          <p>Online formumuz üzerinden başvurunuzu yapabilir, ardından tanışma toplantımıza katılabilirsiniz.</p>
          <p>Son başvuru tarihi: 31 Ocak 2025</p>
        `,
        publishedAt: new Date("2025-01-10T09:00:00Z"),
      },
    }),
    prisma.post.create({
      data: {
        title: "Mezuniyet Töreni ve Yıl Sonu Değerlendirmesi",
        slug: "mezuniyet-toreni-yil-sonu-degerlendirmesi",
        type: "ANNOUNCEMENT",
        status: "PUBLISHED",
        excerpt:
          "Kulübümüzün yıl sonu değerlendirme toplantısı ve mezun olan üyelerimiz için veda töreni düzenlenecektir.",
        content: `
          <p>Değerli kulüp üyelerimiz,</p>
          <p>2024-2025 akademik yılının sonuna yaklaşırken, yıl boyunca gerçekleştirdiğimiz tüm aktiviteleri değerlendireceğiz.</p>
          <h3>Program</h3>
          <ul>
            <li>Yıl sonu sunumu ve başarı hikâyeleri</li>
            <li>Mezun üyelerimize teşekkür ve hediye töreni</li>
            <li>Gelecek yıl planları</li>
            <li>Serbest sohbet ve networking</li>
          </ul>
          <p>Tarih: 15 Haziran 2025, Saat: 14:00<br/>Yer: Konferans Salonu</p>
        `,
        publishedAt: new Date("2025-05-20T12:00:00Z"),
      },
    }),
  ]);

  console.log(`✅ Created ${announcements.length} announcements`);

  // Create News (3)
  const news = await Promise.all([
    prisma.post.create({
      data: {
        title: "Ünlü Psikolog Prof. Dr. Ayşe Yılmaz Kulübümüzü Ziyaret Etti",
        slug: "unlu-psikolog-prof-dr-ayse-yilmaz",
        type: "NEWS",
        status: "PUBLISHED",
        excerpt:
          "Türkiye'nin önde gelen klinik psikologlarından Prof. Dr. Ayşe Yılmaz, kulübümüzde bir seminer verdi ve öğrencilerimizle söyleşi gerçekleştirdi.",
        content: `
          <p>Geçtiğimiz hafta Munzur Psikoloji Kulübü'nde önemli bir etkinliğe ev sahipliği yaptık.</p>
          <p>Prof. Dr. Ayşe Yılmaz, "Modern Psikolojide Yeni Yaklaşımlar" konulu seminerinde, bilişsel davranışçı terapi, mindfulness ve pozitif psikoloji gibi güncel konulara değindi.</p>
          <blockquote>
            "Gençlerin psikolojiye olan ilgisini görmek çok güzel. Sizler geleceğin umudu ve toplumun değerli bireylerisiniz." - Prof. Dr. Ayşe Yılmaz
          </blockquote>
          <p>Seminer sonrası yapılan soru-cevap bölümü oldukça verimli geçti. Üyelerimiz kariyer, akademik gelişim ve uzmanlık alanları hakkında sorular sordu.</p>
        `,
        publishedAt: new Date("2025-03-12T14:30:00Z"),
      },
    }),
    prisma.post.create({
      data: {
        title: "Kulübümüz Üniversiteler Arası Psikoloji Zirvesi'nde Temsil Edildi",
        slug: "universiteler-arasi-psikoloji-zirvesi",
        type: "NEWS",
        status: "PUBLISHED",
        excerpt:
          "Ankara'da düzenlenen Üniversiteler Arası Psikoloji Zirvesi'ne kulübümüzden 5 üye katıldı ve sunum yaptı.",
        content: `
          <p>12-14 Mart tarihleri arasında Ankara'da düzenlenen Üniversiteler Arası Psikoloji Zirvesi'nde kulübümüz başarıyla temsil edildi.</p>
          <h3>Sunumumuz</h3>
          <p>Üyelerimiz "Gençlerde Dijital Bağımlılık ve Ruh Sağlığı" konulu araştırmalarını sundular ve büyük beğeni topladılar.</p>
          <h3>Kazanımlar</h3>
          <ul>
            <li>Diğer üniversitelerden psikoloji kulüpleriyle network kuruldu</li>
            <li>Yeni proje fikirleri geliştirildi</li>
            <li>Akademisyenlerle tanışma fırsatı</li>
          </ul>
          <p>Tebrikler ekibimiz! 🎉</p>
        `,
        publishedAt: new Date("2025-03-15T16:00:00Z"),
      },
    }),
    prisma.post.create({
      data: {
        title: "Kulüp Kütüphanemiz Yeni Kitaplarla Zenginleşti",
        slug: "kulup-kutuphanesi-yeni-kitaplar",
        type: "NEWS",
        status: "PUBLISHED",
        excerpt:
          "Psikoloji alanında 25 yeni kitap kütüphanemize eklendi. Üyelerimiz artık daha geniş bir kaynak havuzundan faydalanabilecek.",
        content: `
          <p>Sevgili üyelerimiz için harika bir haber! Kulüp kütüphanemiz 25 yeni kitapla zenginleşti.</p>
          <h3>Yeni Eklenen Kitaplar</h3>
          <ul>
            <li>Klinik Psikoloji ve Terapi kitapları (8 adet)</li>
            <li>Gelişim Psikolojisi eserleri (6 adet)</li>
            <li>Sosyal Psikoloji klasikleri (5 adet)</li>
            <li>Araştırma Yöntemleri (3 adet)</li>
            <li>Popüler Psikoloji (3 adet)</li>
          </ul>
          <p>Kitaplar kulüp odasında üyelerimizin kullanımına sunulmuştur. Ödünç alma sistemi hakkında detaylı bilgi için kulüp başkanımızla iletişime geçebilirsiniz.</p>
          <p>İyi okumalar! 📚</p>
        `,
        publishedAt: new Date("2025-04-02T11:00:00Z"),
      },
    }),
  ]);

  console.log(`✅ Created ${news.length} news`);

  // Create Events (12)
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: "Stres Yönetimi ve Mindfulness Workshop",
        slug: "stres-yonetimi-mindfulness-workshop",
        description: `
          <p>Günlük hayatın stresinden kurtulmak ve farkındalık becerilerini geliştirmek isteyenler için özel workshop!</p>
          <h3>Ne Öğreneceksiniz?</h3>
          <ul>
            <li>Stres kavramı ve etkileri</li>
            <li>Mindfulness teknikleri</li>
            <li>Nefes çalışmaları</li>
            <li>Günlük meditasyon pratiği</li>
          </ul>
          <p><strong>Konuşmacı:</strong> Uzm. Psk. Mehmet Demir</p>
          <p><strong>Ücret:</strong> Ücretsiz</p>
          <p><strong>Katılım:</strong> Kayıt zorunludur, kontenjan sınırlıdır.</p>
        `,
        startsAt: new Date("2025-02-20T14:00:00Z"),
        endsAt: new Date("2025-02-20T17:00:00Z"),
        location: "Konferans Salonu A",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Kariyer Günleri: Psikolojide Kariyer Yolları",
        slug: "kariyer-gunleri-psikolojide-kariyer-yollari",
        description: `
          <p>Psikoloji mezunu olarak hangi kariyer seçenekleriniz var? Bu etkinlikte deneyimli psikologlar kendi hikayelerini paylaşacak.</p>
          <h3>Konuşmacılar</h3>
          <ul>
            <li>Klinik Psikolog - Hastane deneyimi</li>
            <li>Endüstri Psikoloğu - Kurumsal hayat</li>
            <li>Akademisyen - Araştırma ve eğitim</li>
            <li>Danışman - Özel pratik</li>
          </ul>
          <p>Soru-cevap ve networking fırsatı!</p>
        `,
        startsAt: new Date("2025-03-05T13:00:00Z"),
        endsAt: new Date("2025-03-05T18:00:00Z"),
        location: "Amfi 1",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Film Geceleri: 'Inside Out' Gösterimi ve Analizi",
        slug: "film-geceleri-inside-out",
        description: `
          <p>Pixar'ın ünlü filmi Inside Out'u birlikte izleyip psikolojik açıdan analiz edeceğiz.</p>
          <h3>Program</h3>
          <ul>
            <li>18:00 - Film gösterimi</li>
            <li>20:00 - Film analizi ve tartışma</li>
            <li>21:00 - Serbest sohbet</li>
          </ul>
          <p>Patlamış mısır ikramımız olacak! 🍿</p>
          <p><strong>Not:</strong> Filmi daha önce izlemiş olmanız gerekmez.</p>
        `,
        startsAt: new Date("2025-03-15T18:00:00Z"),
        endsAt: new Date("2025-03-15T21:30:00Z"),
        location: "Sinema Salonu",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Araştırma Yöntemleri Semineri",
        slug: "arastirma-yontemleri-semineri",
        description: `
          <p>Psikolojide bilimsel araştırma yapmak isteyenler için temel metodoloji semineri.</p>
          <h3>İçerik</h3>
          <ul>
            <li>Nicel ve nitel araştırma yöntemleri</li>
            <li>Veri toplama teknikleri</li>
            <li>İstatistiksel analiz temelleri</li>
            <li>Makale yazımı ve yayın süreci</li>
          </ul>
          <p><strong>Hedef Kitle:</strong> Lisans ve yüksek lisans öğrencileri</p>
        `,
        startsAt: new Date("2025-03-22T10:00:00Z"),
        endsAt: new Date("2025-03-22T13:00:00Z"),
        location: "Seminer Odası 3",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Bahar Pikniği ve Takım Oyunları",
        slug: "bahar-piknigi-takim-oyunlari",
        description: `
          <p>Güzel havalarda doğayla iç içe, eğlenceli bir gün geçirmek için pikniğe davetlisiniz!</p>
          <h3>Aktiviteler</h3>
          <ul>
            <li>Voleybol ve futbol turnuvaları</li>
            <li>Takım oyunları ve yarışmalar</li>
            <li>Müzik ve şarkı söyleme</li>
            <li>Piknik ve sohbet</li>
          </ul>
          <p><strong>Yemek:</strong> Herkes kendi yiyecek ve içeceğini getirir</p>
          <p><strong>Ulaşım:</strong> Toplu araçla gideceğiz (detaylar duyurulacak)</p>
        `,
        startsAt: new Date("2025-04-12T10:00:00Z"),
        endsAt: new Date("2025-04-12T18:00:00Z"),
        location: "Kent Ormanı Piknik Alanı",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Travma ve PTSD: Güncel Yaklaşımlar",
        slug: "travma-ptsd-guncel-yaklasimlar",
        description: `
          <p>Travma sonrası stres bozukluğu (PTSD) hakkında güncel bilimsel yaklaşımları öğrenmek için seminerimize katılın.</p>
          <h3>Konu Başlıkları</h3>
          <ul>
            <li>Travma türleri ve etkileri</li>
            <li>PTSD tanı kriterleri ve belirtileri</li>
            <li>Tedavi yöntemleri (EMDR, BDT, vs.)</li>
            <li>Travma sonrası büyüme</li>
          </ul>
          <p><strong>Konuşmacı:</strong> Doç. Dr. Elif Kaya</p>
        `,
        startsAt: new Date("2025-04-18T14:00:00Z"),
        endsAt: new Date("2025-04-18T16:30:00Z"),
        location: "Konferans Salonu B",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Kitap Kulübü: 'Stoacılık' Tartışması",
        slug: "kitap-kulubu-stoacilik",
        description: `
          <p>Bu ay kitap kulübümüzde "Stoacılık" felsefesini ve modern psikolojiye katkılarını tartışacağız.</p>
          <h3>Okuyacağımız Kitaplar</h3>
          <ul>
            <li>"Meditasyonlar" - Marcus Aurelius</li>
            <li>"Stoacılık Üzerine" - Epiktetos</li>
          </ul>
          <p><strong>Not:</strong> Kitapları önceden okumuş olmanız önerilir ancak zorunlu değildir.</p>
          <p>Çay ve kurabiye ikramımız olacak! ☕</p>
        `,
        startsAt: new Date("2025-04-25T16:00:00Z"),
        endsAt: new Date("2025-04-25T18:00:00Z"),
        location: "Kulüp Odası",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Çocuk Psikolojisi ve Gelişim Workshop",
        slug: "cocuk-psikolojisi-gelisim-workshop",
        description: `
          <p>Çocuklarla çalışmayı düşünen veya çocuk gelişimine ilgi duyan öğrenciler için özel workshop.</p>
          <h3>İçerik</h3>
          <ul>
            <li>Bilişsel gelişim aşamaları</li>
            <li>Duygusal ve sosyal gelişim</li>
            <li>Oyun terapisi temelleri</li>
            <li>Çocuklarla iletişim teknikleri</li>
          </ul>
          <p><strong>Uygulamalı:</strong> Rol yapma ve vaka analizleri</p>
        `,
        startsAt: new Date("2025-05-03T13:00:00Z"),
        endsAt: new Date("2025-05-03T17:00:00Z"),
        location: "Atölye 2",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Nörobilim ve Psikoloji: Beyin-Zihin İlişkisi",
        slug: "norobilim-psikoloji-beyin-zihin",
        description: `
          <p>Nörobilim ve psikoloji arasındaki bağı keşfetmek için interaktif seminerimize katılın.</p>
          <h3>Tartışılacak Konular</h3>
          <ul>
            <li>Beyin yapısı ve işlevleri</li>
            <li>Nörotransmitterler ve davranış</li>
            <li>Nöroplastisite</li>
            <li>Bilişsel nörobilim</li>
          </ul>
          <p><strong>Bonus:</strong> Beyin görüntüleme teknikleri tanıtımı</p>
        `,
        startsAt: new Date("2025-05-10T15:00:00Z"),
        endsAt: new Date("2025-05-10T18:00:00Z"),
        location: "Laboratuvar 1",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Anksiyete ve Depresyon: Tanı ve Tedavi",
        slug: "anksiyete-depresyon-tani-tedavi",
        description: `
          <p>En yaygın ruh sağlığı sorunları olan anksiyete ve depresyon hakkında detaylı bilgi semineri.</p>
          <h3>Program</h3>
          <ul>
            <li>Anksiyete bozuklukları türleri</li>
            <li>Depresyon belirtileri ve alt türleri</li>
            <li>Tedavi seçenekleri ve etkinliği</li>
            <li>Önleme stratejileri</li>
          </ul>
          <p><strong>Konuşmacı:</strong> Uzm. Klinik Psikolog Zeynep Arslan</p>
        `,
        startsAt: new Date("2025-05-17T14:00:00Z"),
        endsAt: new Date("2025-05-17T16:30:00Z"),
        location: "Konferans Salonu A",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Sosyal Psikoloji Deneyleri Workshop",
        slug: "sosyal-psikoloji-deneyleri-workshop",
        description: `
          <p>Klasik sosyal psikoloji deneylerini inceleyip, küçük çaplı deneyler yapacağımız interaktif workshop.</p>
          <h3>İncelenecek Deneyler</h3>
          <ul>
            <li>Milgram itaat deneyi</li>
            <li>Stanford hapishane deneyi</li>
            <li>Asch uygunluk deneyleri</li>
            <li>Seyirci etkisi</li>
          </ul>
          <p><strong>Aktivite:</strong> Mini sosyal psikoloji deneyleri</p>
          <p><strong>Etik:</strong> Tüm etik kurallara uygun şekilde yürütülecektir</p>
        `,
        startsAt: new Date("2025-05-24T10:00:00Z"),
        endsAt: new Date("2025-05-24T14:00:00Z"),
        location: "Deney Odası",
        status: "PUBLISHED",
      },
    }),
    prisma.event.create({
      data: {
        title: "Yıl Sonu Şenliği ve Mezuniyet Töreni",
        slug: "yil-sonu-senligi-mezuniyet",
        description: `
          <p>2024-2025 akademik yılını kutlamak ve mezun olan üyelerimize veda etmek için özel etkinlik!</p>
          <h3>Program</h3>
          <ul>
            <li>Yıl boyunca yapılan etkinliklerin sunumu</li>
            <li>Başarı ödülleri</li>
            <li>Mezun üyelere plaket töreni</li>
            <li>Müzik dinletisi</li>
            <li>Kokteyl ve sohbet</li>
          </ul>
          <p><strong>Kıyafet:</strong> Şık günlük</p>
          <p><strong>Katılım:</strong> Tüm üyeler ve davetliler</p>
          <p>Sizi aramızda görmekten mutluluk duyarız! 🎉</p>
        `,
        startsAt: new Date("2025-06-15T14:00:00Z"),
        endsAt: new Date("2025-06-15T19:00:00Z"),
        location: "Üniversite Kültür Merkezi",
        status: "PUBLISHED",
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} events`);

  console.log("\n🎉 Seed completed successfully!");
  console.log(`📊 Total created:`);
  console.log(`   - ${announcements.length} announcements`);
  console.log(`   - ${news.length} news`);
  console.log(`   - ${events.length} events`);
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
