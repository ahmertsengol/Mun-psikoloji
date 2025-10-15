# Supabase Kurulum Rehberi

Bu rehber, Munzur Üniversitesi Psikoloji Kulübü web sitesini Supabase ile çalıştırmak için gerekli tüm adımları içerir.

## İçindekiler

1. [Supabase Projesi Oluşturma](#1-supabase-projesi-oluşturma)
2. [Environment Variables Ayarlama](#2-environment-variables-ayarlama)
3. [Veritabanı Migration](#3-veritabanı-migration)
4. [Row Level Security (RLS) Politikaları](#4-row-level-security-rls-politikaları)
5. [OAuth Providers Kurulumu](#5-oauth-providers-kurulumu)
6. [Storage Bucket Oluşturma](#6-storage-bucket-oluşturma)
7. [İlk Admin Kullanıcı Oluşturma](#7-i̇lk-admin-kullanıcı-oluşturma)
8. [Projeyi Çalıştırma](#8-projeyi-çalıştırma)

---

## 1. Supabase Projesi Oluşturma

1. [supabase.com](https://supabase.com) adresine gidin ve hesap oluşturun/giriş yapın
2. "New Project" butonuna tıklayın
3. Proje bilgilerini doldurun:
   - **Name**: munzur-psikoloji-kulubu (veya istediğiniz bir isim)
   - **Database Password**: Güçlü bir şifre oluşturun (kaydedin!)
   - **Region**: Türkiye'ye en yakın bölge (örn: Frankfurt, Europe West)
4. "Create new project" butonuna tıklayın ve projenin hazır olmasını bekleyin (~2 dakika)

## 2. Environment Variables Ayarlama

### 2.1. Supabase Credentials

1. Supabase projenizde **Settings > API** bölümüne gidin
2. Aşağıdaki değerleri kopyalayın:
   - `Project URL`
   - `anon public` key

### 2.2. Database URL

1. **Settings > Database** bölümüne gidin
2. **Connection String** sekmesinde:
   - **Transaction pooler** modunu seçin
   - Connection string'i kopyalayın
   - `[YOUR-PASSWORD]` kısmını proje oluştururken belirlediğiniz şifre ile değiştirin

### 2.3. .env.local Dosyası Oluşturma

Proje kök dizininde `.env.local` dosyası oluşturun:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database Configuration
DATABASE_URL="postgresql://postgres.your-project-ref:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.your-project-ref.supabase.co:5432/postgres"

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Önemli**: Yukarıdaki değerleri kendi Supabase proje bilgilerinizle değiştirin!

## 3. Veritabanı Migration

### 3.1. Prisma Migration Çalıştırma

Terminal'de aşağıdaki komutları sırayla çalıştırın:

```bash
# Prisma Client'ı oluştur
npx prisma generate

# Migration dosyalarını oluştur ve veritabanına uygula
npx prisma migrate dev --name init

# Prisma Studio ile veritabanını görüntüle (opsiyonel)
npx prisma studio
```

Bu komutlar:
- User, Post, Event, Media ve AuditLog tablolarını oluşturur
- Enum'ları (Role, PostStatus, EventStatus) tanımlar
- Index'leri ve relation'ları kurar

## 4. Row Level Security (RLS) Politikaları

Supabase'de **SQL Editor** bölümüne gidin ve aşağıdaki SQL komutlarını çalıştırın:

### 4.1. RLS'i Etkinleştirme

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
```

### 4.2. Users Tablosu Politikaları

```sql
-- Users: Anyone can read users
CREATE POLICY "Users are viewable by everyone"
ON users FOR SELECT
USING (true);

-- Users: Users can insert themselves (via auth callback)
CREATE POLICY "Users can insert themselves"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- Users: Users can update their own record
CREATE POLICY "Users can update own record"
ON users FOR UPDATE
USING (auth.uid() = id);
```

### 4.3. Posts Tablosu Politikaları

```sql
-- Posts: Anyone can read published posts
CREATE POLICY "Published posts are viewable by everyone"
ON posts FOR SELECT
USING (status = 'PUBLISHED' OR auth.uid() IS NOT NULL);

-- Posts: Admins and editors can insert posts
CREATE POLICY "Admins and editors can insert posts"
ON posts FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);

-- Posts: Admins and editors can update posts
CREATE POLICY "Admins and editors can update posts"
ON posts FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);

-- Posts: Admins and editors can delete posts
CREATE POLICY "Admins and editors can delete posts"
ON posts FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);
```

### 4.4. Events Tablosu Politikaları

```sql
-- Events: Anyone can read published events
CREATE POLICY "Published events are viewable by everyone"
ON events FOR SELECT
USING (status = 'PUBLISHED' OR auth.uid() IS NOT NULL);

-- Events: Admins and editors can insert events
CREATE POLICY "Admins and editors can insert events"
ON events FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);

-- Events: Admins and editors can update events
CREATE POLICY "Admins and editors can update events"
ON events FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);

-- Events: Admins and editors can delete events
CREATE POLICY "Admins and editors can delete events"
ON events FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);
```

### 4.5. Media ve Audit Logs Politikaları

```sql
-- Media: Anyone can read media
CREATE POLICY "Media is viewable by everyone"
ON media FOR SELECT
USING (true);

-- Media: Admins and editors can manage media
CREATE POLICY "Admins and editors can manage media"
ON media FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);

-- Audit Logs: Only viewable by admins
CREATE POLICY "Audit logs viewable by admins"
ON audit_logs FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'ADMIN'
  )
);

-- Audit Logs: System can insert audit logs
CREATE POLICY "System can insert audit logs"
ON audit_logs FOR INSERT
WITH CHECK (true);
```

## 5. OAuth Providers Kurulumu

### 5.1. Google OAuth

1. Supabase Dashboard'da **Authentication > Providers** bölümüne gidin
2. **Google** provider'ını bulun ve "Enable" yapın
3. Google Cloud Console'da OAuth 2.0 Client oluşturun:
   - [Google Cloud Console](https://console.cloud.google.com) > APIs & Services > Credentials
   - "Create Credentials" > "OAuth client ID" seçin
   - Application type: Web application
   - Authorized redirect URIs:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
4. Client ID ve Client Secret'ı kopyalayın
5. Supabase'de Google provider ayarlarına yapıştırın ve kaydedin

### 5.2. GitHub OAuth

1. Supabase Dashboard'da **Authentication > Providers** bölümüne gidin
2. **GitHub** provider'ını bulun ve "Enable" yapın
3. GitHub'da OAuth App oluşturun:
   - [GitHub Settings](https://github.com/settings/developers) > OAuth Apps > New OAuth App
   - Application name: Munzur Psikoloji Kulübü
   - Homepage URL: `http://localhost:3000` (geliştirme için)
   - Authorization callback URL:
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
4. Client ID ve Client Secret'ı kopyalayın
5. Supabase'de GitHub provider ayarlarına yapıştırın ve kaydedin

### 5.3. Email Confirmations (Opsiyonel)

Development ortamında email confirmation'ı devre dışı bırakabilirsiniz:

1. **Authentication > Settings** bölümüne gidin
2. **Email Auth** sekmesinde:
   - "Enable email confirmations" seçeneğini KAPATIN
3. Save butonuna tıklayın

**Üretim ortamında mutlaka email confirmation'ı açın!**

## 6. Storage Bucket Oluşturma

Medya dosyaları için Storage bucket oluşturun:

### 6.1. Bucket Oluşturma

1. Supabase Dashboard'da **Storage** bölümüne gidin
2. "Create a new bucket" butonuna tıklayın
3. Bucket bilgileri:
   - **Name**: `media`
   - **Public bucket**: ✅ (İşaretli)
4. "Create bucket" butonuna tıklayın

### 6.2. Storage Policies

SQL Editor'de aşağıdaki komutu çalıştırın:

```sql
-- Media bucket: Anyone can read
CREATE POLICY "Public media access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Media bucket: Admins and editors can upload
CREATE POLICY "Admins and editors can upload media"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'media' AND
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);

-- Media bucket: Admins and editors can delete
CREATE POLICY "Admins and editors can delete media"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'media' AND
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('ADMIN', 'EDITOR')
  )
);
```

## 7. İlk Admin Kullanıcı Oluşturma

İlk admin kullanıcıyı oluşturmak için iki yöntem:

### Yöntem 1: OAuth ile Giriş Yap + SQL ile Güncelle

1. Uygulamayı başlatın: `npm run dev`
2. `http://localhost:3000/login` adresine gidin
3. Google veya GitHub ile giriş yapın
4. Supabase **SQL Editor**'de kullanıcınızın role'ünü güncelleyin:

```sql
-- Email adresinizi yazın
UPDATE users
SET role = 'ADMIN'
WHERE email = 'your-email@example.com';

-- Kontrol edin
SELECT id, email, role FROM users;
```

### Yöntem 2: Direkt SQL ile Kullanıcı Oluşturma

```sql
-- UUID oluşturun (örnek)
-- Gerçek UUID için: https://www.uuidgenerator.net/
INSERT INTO users (id, email, role, created_at, updated_at)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'admin@example.com',
  'ADMIN',
  NOW(),
  NOW()
);
```

**Not**: Bu yöntemde Supabase Auth'da da kullanıcı oluşturmanız gerekir:
1. **Authentication > Users** bölümüne gidin
2. "Add user" > "Create new user"
3. Email ve şifre belirleyin
4. User ID'yi yukarıdaki SQL'deki ID ile eşleştirin

## 8. Projeyi Çalıştırma

### 8.1. Development Modunda Çalıştırma

```bash
# Bağımlılıkları yükleyin (ilk seferde)
npm install

# Prisma generate (ilk seferde)
npx prisma generate

# Development server'ı başlatın
npm run dev
```

Tarayıcınızda `http://localhost:3000` adresine gidin.

### 8.2. Production Build

```bash
# Production build oluştur
npm run build

# Production server'ı başlat
npm start
```

## Kontrol Listesi

Kurulumu tamamladıktan sonra aşağıdakileri kontrol edin:

- [ ] `.env.local` dosyası oluşturuldu ve doğru bilgiler girildi
- [ ] Prisma migration çalıştırıldı (`npx prisma migrate dev`)
- [ ] RLS politikaları eklendi
- [ ] Google OAuth yapılandırıldı
- [ ] GitHub OAuth yapılandırıldı
- [ ] Storage bucket oluşturuldu
- [ ] İlk admin kullanıcı oluşturuldu
- [ ] Uygulama çalışıyor ve giriş yapabiliyorsunuz

## Sorun Giderme

### "Invalid API Key" Hatası

- `.env.local` dosyasındaki `NEXT_PUBLIC_SUPABASE_ANON_KEY` doğru mu?
- Development server'ı yeniden başlattınız mı?

### "Connection Timeout" Hatası

- `DATABASE_URL` doğru mu?
- Supabase projesi aktif mi?
- Internet bağlantınız stabil mi?

### "Forbidden" Hatası (Admin Panelde)

- Kullanıcınızın role'ü ADMIN veya EDITOR mi?
- RLS politikaları doğru kuruldu mu?

### OAuth Redirect Hatası

- Callback URL'ler doğru yapılandırıldı mı?
- Provider'lar Supabase'de aktif mi?

## Yardım ve Destek

- Supabase Dökümanları: [supabase.com/docs](https://supabase.com/docs)
- Prisma Dökümanları: [prisma.io/docs](https://www.prisma.io/docs)
- Next.js Dökümanları: [nextjs.org/docs](https://nextjs.org/docs)

---

**Önemli Hatırlatma**: Bu site resmi değildir; Munzur Üniversitesi Psikoloji Kulübü topluluk sayfasıdır. Resmi duyurular için munzur.edu.tr adresini takip ediniz.
