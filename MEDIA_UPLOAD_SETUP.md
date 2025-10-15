# Medya Yükleme Kurulum Rehberi

Bu rehber, Supabase Storage üzerinden görsel yükleme özelliğinin kurulumu için gerekli adımları açıklar.

## 🗄️ Database Migration

Öncelikle database schema'sına `coverImage` alanlarını eklemek için migration'ı çalıştırın:

```bash
cd munzur-psikoloji-kulubu
npx prisma migrate deploy
# veya geliştirme ortamında:
npx prisma migrate dev
```

Migration otomatik olarak şu değişiklikleri yapacak:
- `posts` tablosuna `coverImage` kolonu eklenecek
- `events` tablosuna `coverImage` kolonu eklenecek

## 📦 Supabase Storage Kurulumu

### 1. Storage Bucket Oluşturma

Supabase Dashboard'da "Storage" bölümüne gidin ve:

1. **"media" adında bucket oluşturun** (zaten oluşturduğunuz bucket'ı kullanabilirsiniz)
2. **Public bucket olarak işaretleyin** (Public access: ✅)

### 2. Storage Policies (RLS) Kurulumu

"media" bucket'ı için aşağıdaki RLS (Row Level Security) policy'lerini ekleyin:

#### **Policy 1: Public Read Access** (Herkes görselleri görüntüleyebilir)

```sql
-- Policy Name: Public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');
```

#### **Policy 2: Authenticated Upload** (Sadece giriş yapmış kullanıcılar yükleyebilir)

```sql
-- Policy Name: Authenticated users can upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');
```

#### **Policy 3: Owner Delete** (Kullanıcı kendi yüklediği dosyaları silebilir)

```sql
-- Policy Name: Users can delete own uploads
CREATE POLICY "Users can delete own uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media' AND auth.uid() = owner);
```

### 3. Bucket Ayarları

Supabase Dashboard → Storage → media bucket → Settings:

- **File size limit**: 5 MB (isteğe göre artırabilirsiniz)
- **Allowed MIME types**: 
  - `image/jpeg`
  - `image/jpg`
  - `image/png`
  - `image/webp`
  - `image/gif`

## 🔗 Next.js Image Configuration

`next.config.ts` dosyasında Supabase Storage domain'i zaten eklendi:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: '**.supabase.co',
      port: '',
      pathname: '/storage/v1/object/**',
    },
  ],
}
```

## 🚀 Kullanım

### Admin Panelinde Görsel Yükleme

1. **Yeni Haber/Duyuru/Etkinlik Oluştururken:**
   - Form'da "Kapak Görseli" alanını göreceksiniz
   - Görseli sürükle-bırak yapabilir veya tıklayarak seçebilirsiniz
   - Yüklenen görsel otomatik olarak Supabase Storage'a kaydedilir
   - URL otomatik olarak form'a eklenir

2. **Mevcut İçerikleri Düzenlerken:**
   - Aynı şekilde görsel ekleyebilir veya mevcut görseli değiştirebilirsiniz
   - Kırmızı X butonuyla görseli kaldırabilirsiniz

### Görsellerin Görüntülenmesi

Görseller şu sayfalarda otomatik olarak gösterilecek:
- ✅ Haber detay sayfası (`/haberler/[slug]`)
- ✅ Duyuru detay sayfası (`/duyurular/[slug]`)
- ✅ Etkinlik detay sayfası (`/etkinlikler/[slug]`)
- ✅ Ana sayfa listelerinde (opsiyonel, tasarıma göre)

## 🔍 Doğrulama

Kurulumu test etmek için:

1. Admin paneline giriş yapın (`/admin`)
2. Yeni bir haber/duyuru/etkinlik oluşturun
3. Bir görsel yükleyin
4. Kaydettikten sonra detay sayfasında görselin göründüğünü kontrol edin

## 🐛 Sorun Giderme

### Görsel yüklenmiyor

1. **Supabase Storage Bucket kontrolü:**
   - `media` bucket'ının public olduğundan emin olun
   - RLS policy'lerinin doğru ayarlandığından emin olun

2. **Dosya boyutu kontrolü:**
   - Maksimum dosya boyutu: 5 MB
   - Daha büyük dosyalar için bucket ayarlarını güncelleyin

3. **Dosya formatı kontrolü:**
   - Sadece JPG, PNG, WebP ve GIF desteklenir
   - Diğer formatlar için `lib/utils/storage.ts` dosyasını güncelleyin

### Görsel görüntülenmiyor

1. **Next.js Image Configuration:**
   - `next.config.ts` dosyasındaki `remotePatterns` ayarını kontrol edin
   - Supabase project URL'inizin `**.supabase.co` pattern'iyle eşleştiğinden emin olun

2. **Storage Policies:**
   - "Public read access" policy'sinin aktif olduğundan emin olun

## 📝 Notlar

- Görseller Supabase Storage'da `media/posts/` ve `media/events/` klasörlerinde saklanır
- Her görsel benzersiz bir isimle kaydedilir (timestamp + random string)
- Görseller silinemez (manuel Supabase Dashboard üzerinden silebilirsiniz)
- Gelecekte otomatik dosya temizleme özelliği eklenebilir

