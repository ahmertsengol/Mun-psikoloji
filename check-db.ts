#!/usr/bin/env tsx
/**
 * Database Check Script
 * Checks current database state
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDatabase() {
  console.log('🔍 Checking database...\n');

  // Count posts by type
  const announcementsCount = await prisma.post.count({
    where: { type: 'ANNOUNCEMENT' },
  });

  const newsCount = await prisma.post.count({
    where: { type: 'NEWS' },
  });

  const eventsCount = await prisma.event.count();

  console.log('📊 Current Database State:');
  console.log('  - Announcements (Duyurular):', announcementsCount);
  console.log('  - News (Haberler):', newsCount);
  console.log('  - Events (Etkinlikler):', eventsCount);
  console.log('  - Total Posts:', announcementsCount + newsCount);

  console.log('\n📝 Seed File Creates:');
  console.log('  - Announcements: 3');
  console.log('  - News: 3');
  console.log('  - Events: 12');

  if (announcementsCount === 3 && newsCount === 3 && eventsCount === 12) {
    console.log('\n⚠️  WARNING: Database matches seed data EXACTLY!');
    console.log('This means seed.ts was run and deleted all your custom data.');
  } else {
    console.log('\n✅ Database has custom data (seed not run recently)');
  }

  // List all posts
  console.log('\n📋 All Posts:');
  const allPosts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  allPosts.forEach((post, index) => {
    console.log(`  ${index + 1}. [${post.type}] ${post.title} (${post.status})`);
    console.log(`     Created: ${post.createdAt.toLocaleString()}`);
  });

  // List all events
  console.log('\n🎉 All Events:');
  const allEvents = await prisma.event.findMany({
    select: {
      id: true,
      title: true,
      status: true,
      startsAt: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  allEvents.forEach((event, index) => {
    console.log(`  ${index + 1}. ${event.title} (${event.status})`);
    console.log(`     Starts: ${event.startsAt.toLocaleString()}`);
    console.log(`     Created: ${event.createdAt.toLocaleString()}`);
  });
}

checkDatabase()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
