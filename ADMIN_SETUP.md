# 🔐 Admin Kullanıcı Kurulum Rehberi

## Admin Hesabı Oluşturma

### Adım 1: Supabase Dashboard'a Git

1. [Supabase Dashboard](https://supabase.com/dashboard) adresine git
2. Projenizi seçin
3. Sol menüden **Authentication** > **Users** sekmesine git

### Adım 2: Admin Kullanıcısı Oluştur

**Yöntem 1: Supabase Dashboard ile**

1. **"Add User"** butonuna tıkla
2. **"Create new user"** seçeneğini seç
3. Bilgileri doldur:
   - **Email:** admin@munzurpsikoloji.com (veya istediğin email)
   - **Password:** Güçlü bir şifre belirle (min 6 karakter)
   - ✅ **Auto Confirm User** seçeneğini işaretle
4. **"Create user"** butonuna tıkla
5. Oluşturulan kullanıcının **User UID**'sini kopyala

### Adım 3: Veritabanına Admin Rolü Ekle

**Yöntem 1: SQL Editor ile**

1. Sol menüden **SQL Editor** sekmesine git
2. Aşağıdaki SQL'i çalıştır (USER_UID'yi değiştir):

```sql
-- Admin kullanıcısı ekle
INSERT INTO users (id, email, role, created_at, updated_at)
VALUES (
  'USER_UID_BURAYA_YAPISTIR',  -- Supabase'den kopyaladığın UID
  'admin@munzurpsikoloji.com',  -- Email adresin
  'ADMIN',
  NOW(),
  NOW()
)
ON CONFLICT (id) 
DO UPDATE SET role = 'ADMIN';
```

**Yöntem 2: Prisma Studio ile**

```bash
# Terminal'de çalıştır
npm run db:studio
```

1. Tarayıcıda `http://localhost:5555` açılır
2. **users** tablosuna git
3. **"Add record"** butonuna tıkla
4. Bilgileri doldur:
   - **id:** Supabase'den kopyaladığın User UID
   - **email:** admin@munzurpsikoloji.com
   - **role:** ADMIN
5. **"Save"** butonuna tıkla

### Adım 4: Giriş Yap

1. Uygulamaya git: `http://localhost:3000/login`
2. Email ve şifrenle giriş yap
3. Admin paneline yönlendirileceksin: `/admin`

---

## 🔑 Varsayılan Admin Bilgileri

**Email:** admin@munzurpsikoloji.com  
**Şifre:** [Supabase'de oluşturduğun şifre]

> ⚠️ **Güvenlik Uyarısı:** Production'a deploy etmeden önce şifreyi değiştir!

---

## 🚀 Hızlı Kurulum (Development)

Eğer hızlıca test etmek istiyorsan:

### 1. Supabase'de User Oluştur
```
Email: admin@example.com
Password: admin123
✅ Auto Confirm User
```

### 2. SQL Çalıştır
```sql
INSERT INTO users (id, email, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  'ADMIN',
  NOW(),
  NOW()
FROM auth.users au
WHERE au.email = 'admin@example.com'
ON CONFLICT (id) DO UPDATE SET role = 'ADMIN';
```

### 3. Giriş Yap
- Email: admin@example.com
- Password: admin123

---

## 📝 Roller

| Rol | Yetki |
|-----|-------|
| **ADMIN** | Tüm yetkilere sahip (haber, etkinlik, medya, kullanıcı yönetimi) |
| **EDITOR** | Haber ve etkinlik oluşturabilir/düzenleyebilir |
| **MEMBER** | Sadece public sayfalara erişebilir |

---

## 🔧 Sorun Giderme

### "Email veya şifre hatalı" hatası
- Supabase'de kullanıcı oluşturduğunu kontrol et
- **Auto Confirm User** seçeneğinin işaretli olduğunu kontrol et
- Email ve şifreyi doğru girdiğini kontrol et

### "Forbidden" hatası (Admin panelde)
- `users` tablosunda rolün **ADMIN** olduğunu kontrol et
- Çıkış yapıp tekrar giriş yap (session yenilenir)

### Kullanıcı `users` tablosunda görünmüyor
- Supabase **Authentication > Users** bölümünde kullanıcının olduğunu kontrol et
- Yukarıdaki SQL scriptini tekrar çalıştır

---

## 📚 Ek Kaynaklar

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Prisma Studio Docs](https://www.prisma.io/docs/concepts/components/prisma-studio)

