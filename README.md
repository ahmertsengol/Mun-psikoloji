# Munzur Üniversitesi Psikoloji Kulübü

Munzur Üniversitesi Psikoloji öğrencileri ve kulübü için gayri-resmi topluluk web sitesi.

**Önemli**: Bu site resmi değildir; Munzur Üniversitesi Psikoloji Kulübü topluluk sayfasıdır. Resmi duyurular için [munzur.edu.tr](https://munzur.edu.tr) adresini takip ediniz.

## Teknoloji Stack

- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Supabase Auth (OAuth: Google, GitHub)
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form + Zod
- **Language**: TypeScript

## Özellikler

### Public Features
- Haber ve duyuru listesi
- Etkinlik takvimi
- Etkinlik detay sayfaları
- İletişim sayfası
- Responsive tasarım

### Admin Panel
- Haber yönetimi (CRUD)
- Etkinlik yönetimi (CRUD)
- Medya yönetimi
- Taslak/Yayında durumları
- OAuth ile güvenli giriş
- Rol tabanlı yetkilendirme (ADMIN, EDITOR, MEMBER)

## Kurulum

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı

### Adım 1: Repository'i Klonlayın

```bash
git clone <repository-url>
cd munzur-psikoloji-kulubu
```

### Adım 2: Bağımlılıkları Yükleyin

```bash
npm install
```

### Adım 3: Supabase Kurulumu

**Detaylı kurulum için [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) dosyasına bakınız.**

1. Supabase projesi oluşturun
2. `.env.local` dosyasını oluşturun:

```bash
cp .env.example .env.local
```

3. `.env.local` dosyasını Supabase bilgilerinizle doldurun
4. Prisma migration'ı çalıştırın:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. RLS politikalarını ve OAuth provider'larını yapılandırın (SUPABASE_SETUP.md'de detaylı anlatılmıştır)

### Adım 4: Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## Proje Yapısı

```
munzur-psikoloji-kulubu/
├── app/
│   ├── (auth)/              # Auth sayfaları (login)
│   ├── (public)/            # Public sayfalar (haberler, etkinlikler, iletişim)
│   ├── admin/               # Admin panel sayfaları
│   ├── api/                 # API routes
│   ├── auth/                # Auth callback
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Ana sayfa
├── components/
│   ├── admin/               # Admin component'leri
│   ├── layouts/             # Layout component'leri (Header, Footer)
│   └── ui/                  # UI component'leri (Button, Card, Input, etc.)
├── lib/
│   ├── db/                  # Prisma client
│   ├── supabase/            # Supabase client configs
│   ├── utils/               # Utility fonksiyonlar (slugify, auth, audit)
│   └── validations/         # Zod validation schemas
├── prisma/
│   └── schema.prisma        # Database schema
├── .env.example             # Environment variables örneği
├── SUPABASE_SETUP.md        # Supabase kurulum rehberi
└── README.md                # Bu dosya
```

## Environment Variables

`.env.local` dosyasında aşağıdaki değişkenler tanımlanmalıdır:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_connection_string
DIRECT_URL=your_direct_database_url
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Veritabanı Şeması

- **Users**: Kullanıcılar ve rolleri
- **Posts**: Haberler ve duyurular
- **Events**: Etkinlikler
- **Media**: Yüklenen medya dosyaları
- **AuditLog**: Audit trail kayıtları

## Admin Paneli

Admin paneline erişmek için:

1. `/login` sayfasına gidin
2. Google veya GitHub ile giriş yapın
3. İlk kullanıcınızın rolünü ADMIN olarak ayarlayın (SUPABASE_SETUP.md'de açıklanmıştır)

### Admin Özellikleri

- Dashboard (istatistikler ve hızlı erişim)
- Haber oluşturma, düzenleme, silme
- Etkinlik oluşturma, düzenleme, silme
- Taslak/Yayın durumu yönetimi
- Otomatik slug oluşturma (Türkçe karakter desteği)

## Deployment

### Vercel'e Deploy

1. GitHub'a push edin
2. Vercel'de proje oluşturun
3. Environment variables'ı ekleyin
4. Deploy edin

```bash
npm run build
```

## Güvenlik

- Row Level Security (RLS) ile veritabanı güvenliği
- Middleware ile route protection
- Server-side authorization kontrolleri
- OAuth ile güvenli kimlik doğrulama
- Input validation (Zod)
- Audit logging

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje eğitim amaçlı bir topluluk projesidir.

## İletişim

Munzur Üniversitesi Psikoloji Kulübü

**Not**: Bu site resmi değildir; topluluk projesidir. Resmi bilgiler için [munzur.edu.tr](https://munzur.edu.tr) adresini ziyaret edin.
