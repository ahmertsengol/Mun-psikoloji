# Munzur Psikoloji Kulübü

Munzur Üniversitesi Psikoloji Kulübü için topluluk web sitesi. Haber, duyuru ve etkinlik yönetimi için modern bir platform.

> ⚠️ **Not**: Bu site resmi değildir; topluluk projesidir. Resmi bilgiler için [munzur.edu.tr](https://munzur.edu.tr) adresini ziyaret edin.
 
## 🚀 Teknolojiler

- **Next.js 15** (App Router) + TypeScript
- **PostgreSQL** (Supabase) + Prisma ORM
- **Supabase Auth** (Email/Password)
- **Tailwind CSS** + React Hook Form + Zod

## ✨ Özellikler

- 📰 Haber ve duyuru yayınlama
- 📅 Etkinlik takvimi ve detay sayfaları
- 🔐 Admin panel (CRUD işlemleri)
- 📱 Responsive tasarım
- 🌙 Dark/Light mode
- 🔒 Rol tabanlı yetkilendirme (ADMIN, EDITOR, MEMBER)

## 🛠️ Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- Supabase hesabı

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Environment variables ayarla
cp .env.example .env.local
# .env.local dosyasını Supabase bilgilerinizle doldurun

# Database migration
npx prisma generate
npx prisma db push

# Development server
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresine gidin.

## 📦 Environment Variables

```env
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="xxx"
```

## 🔐 Admin Erişimi

1. `/login` sayfasına gidin
2. Email/password ile giriş yapın
3. Admin kullanıcısı oluşturmak için Supabase Dashboard'dan:
   - **Authentication** > **Users** > Yeni kullanıcı ekle
   - **SQL Editor**'da kullanıcıyı `users` tablosuna ADMIN rolü ile ekle

## 🌐 Deployment

### Vercel

```bash
# GitHub'a push edin
git push origin main

# Vercel'de:
# 1. Projeyi import edin
# 2. Environment variables ekleyin
# 3. Deploy edin
```

**Canlı site**: [https://mun-psikoloji.vercel.app](https://mun-psikoloji.vercel.app)

## 📁 Proje Yapısı

```
app/
├── (auth)/         # Login sayfası
├── (public)/       # Public sayfalar (haberler, etkinlikler)
├── admin/          # Admin panel
└── api/            # API routes

components/
├── admin/          # Admin bileşenleri
├── ui/             # UI bileşenleri
└── layouts/        # Header, Footer

lib/
├── supabase/       # Supabase client
├── db/             # Prisma client
└── validations/    # Zod schemas
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Commit edin (`git commit -m 'Yeni özellik: ...'`)
4. Push edin (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## 📄 Lisans

Bu proje eğitim amaçlı bir topluluk projesidir.
