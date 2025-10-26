import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDelete() {
  try {
    console.log('🧪 Silme işlemlerini test ediyorum...\n');
    
    // Önce mevcut verileri listele
    const posts = await prisma.post.findMany({
      select: { id: true, title: true, type: true },
      take: 3
    });
    
    const events = await prisma.event.findMany({
      select: { id: true, title: true },
      take: 2
    });
    
    console.log('📝 Test edilecek postlar:');
    posts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title} (ID: ${post.id})`);
    });
    
    console.log('\n🎉 Test edilecek etkinlikler:');
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} (ID: ${event.id})`);
    });
    
    console.log('\n⚠️  Bu sadece bir test scriptidir. Gerçek silme işlemi yapmayacağım.');
    console.log('Silme işlemlerinin çalışıp çalışmadığını kontrol etmek için:');
    console.log('1. Admin paneline giriş yapın');
    console.log('2. Herhangi bir post veya etkinliği silmeyi deneyin');
    console.log('3. Silme işlemi sonrası bu scripti tekrar çalıştırın\n');
    
    // API endpoint'lerini test etmek için örnek curl komutları
    if (posts.length > 0) {
      console.log('🔧 Manuel test için örnek API çağrıları:');
      console.log(`curl -X DELETE http://localhost:3000/api/posts/${posts[0].id}`);
      if (events.length > 0) {
        console.log(`curl -X DELETE http://localhost:3000/api/events/${events[0].id}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDelete();