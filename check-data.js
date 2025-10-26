import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkData() {
  try {
    console.log('🔍 Veritabanı durumu kontrol ediliyor...\n');
    
    // Post sayıları
    const totalPosts = await prisma.post.count();
    const newsPosts = await prisma.post.count({ where: { type: 'NEWS' } });
    const announcements = await prisma.post.count({ where: { type: 'ANNOUNCEMENT' } });
    const publishedPosts = await prisma.post.count({ where: { status: 'PUBLISHED' } });
    const draftPosts = await prisma.post.count({ where: { status: 'DRAFT' } });
    
    // Event sayıları
    const totalEvents = await prisma.event.count();
    const publishedEvents = await prisma.event.count({ where: { status: 'PUBLISHED' } });
    const draftEvents = await prisma.event.count({ where: { status: 'DRAFT' } });
    
    console.log('📊 POST İSTATİSTİKLERİ:');
    console.log(`   Toplam Post: ${totalPosts}`);
    console.log(`   Haberler: ${newsPosts}`);
    console.log(`   Duyurular: ${announcements}`);
    console.log(`   Yayında: ${publishedPosts}`);
    console.log(`   Taslak: ${draftPosts}\n`);
    
    console.log('📅 ETKİNLİK İSTATİSTİKLERİ:');
    console.log(`   Toplam Etkinlik: ${totalEvents}`);
    console.log(`   Yayında: ${publishedEvents}`);
    console.log(`   Taslak: ${draftEvents}\n`);
    
    // Son eklenen postları listele
    const recentPosts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    console.log('📝 SON EKLENEN POSTLAR:');
    recentPosts.forEach((post, index) => {
      console.log(`   ${index + 1}. ${post.title} (${post.type}, ${post.status})`);
      console.log(`      ID: ${post.id}`);
      console.log(`      Oluşturulma: ${post.createdAt.toLocaleString('tr-TR')}`);
      console.log(`      Güncellenme: ${post.updatedAt.toLocaleString('tr-TR')}\n`);
    });
    
    // Son eklenen etkinlikleri listele
    const recentEvents = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    console.log('🎉 SON EKLENEN ETKİNLİKLER:');
    recentEvents.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} (${event.status})`);
      console.log(`      ID: ${event.id}`);
      console.log(`      Oluşturulma: ${event.createdAt.toLocaleString('tr-TR')}`);
      console.log(`      Güncellenme: ${event.updatedAt.toLocaleString('tr-TR')}\n`);
    });
    
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();