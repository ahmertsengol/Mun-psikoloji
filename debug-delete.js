import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function debugDelete() {
  try {
    console.log('🔍 Silme işlemlerini debug ediyorum...\n');
    
    // Test için bir post oluştur
    const testPost = await prisma.post.create({
      data: {
        title: 'Test Silme İşlemi',
        slug: 'test-silme-islemi-' + Date.now(),
        content: 'Bu test amaçlı oluşturulmuş bir post.',
        excerpt: 'Test excerpt',
        type: 'NEWS',
        status: 'DRAFT'
      }
    });
    
    console.log('✅ Test post oluşturuldu:', testPost.id);
    
    // Test için bir event oluştur
    const testEvent = await prisma.event.create({
      data: {
        title: 'Test Etkinlik Silme',
        slug: 'test-etkinlik-silme-' + Date.now(),
        description: 'Bu test amaçlı oluşturulmuş bir etkinlik.',
        startsAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Yarın
        status: 'DRAFT'
      }
    });
    
    console.log('✅ Test event oluşturuldu:', testEvent.id);
    
    // Şimdi silme işlemini test et
    console.log('\n🗑️  Silme işlemini test ediyorum...');
    
    // Post silme
    const deletedPost = await prisma.post.delete({
      where: { id: testPost.id }
    });
    console.log('✅ Post başarıyla silindi:', deletedPost.id);
    
    // Event silme
    const deletedEvent = await prisma.event.delete({
      where: { id: testEvent.id }
    });
    console.log('✅ Event başarıyla silindi:', deletedEvent.id);
    
    console.log('\n🎉 Prisma seviyesinde silme işlemleri çalışıyor!');
    console.log('\nSorun muhtemelen şu alanlardan birinde:');
    console.log('1. 🔐 Authentication/Authorization (requireAdminOrEditor)');
    console.log('2. 🌐 Frontend-Backend iletişimi');
    console.log('3. 🔄 Router.refresh() çalışmıyor');
    console.log('4. 🎯 UI state management');
    
    // Mevcut kullanıcıları kontrol et
    const users = await prisma.user.findMany({
      select: { id: true, email: true, role: true }
    });
    
    console.log('\n👥 Mevcut kullanıcılar:');
    users.forEach(user => {
      console.log(`   - ${user.email} (${user.role}) - ID: ${user.id}`);
    });
    
    if (users.length === 0) {
      console.log('⚠️  Hiç kullanıcı yok! Bu silme işlemlerinin başarısız olmasının sebebi olabilir.');
      console.log('   Admin paneline giriş yapmadan önce bir kullanıcı oluşturulması gerekiyor.');
    }
    
  } catch (error) {
    console.error('❌ Debug sırasında hata:', error);
    
    if (error.code === 'P2025') {
      console.log('ℹ️  Bu hata, silinmeye çalışılan kayıt bulunamadığında oluşur.');
    }
  } finally {
    await prisma.$disconnect();
  }
}

debugDelete();