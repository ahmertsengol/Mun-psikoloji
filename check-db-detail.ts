#!/usr/bin/env tsx
/**
 * Detailed Database Check
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkDetail() {
  console.log('🔍 Detailed Database Check\n');

  // Get event count
  const eventCount = await prisma.event.count();
  console.log(`Total Events in DB: ${eventCount}\n`);

  // Get all events with full details
  const events = await prisma.event.findMany({
    orderBy: { createdAt: 'desc' },
  });

  console.log('📋 All Events:');
  if (events.length === 0) {
    console.log('  No events found');
  } else {
    events.forEach((event, i) => {
      console.log(`\n  ${i + 1}. ${event.title}`);
      console.log(`     ID: ${event.id}`);
      console.log(`     Slug: ${event.slug}`);
      console.log(`     Status: ${event.status}`);
      console.log(`     Starts: ${event.startsAt}`);
      console.log(`     Location: ${event.location || 'N/A'}`);
      console.log(`     Created: ${event.createdAt}`);
    });
  }

  // Check audit logs to see delete history
  console.log('\n\n📜 Recent Audit Logs (Last 20):');
  const auditLogs = await prisma.auditLog.findMany({
    take: 20,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  if (auditLogs.length === 0) {
    console.log('  No audit logs found');
  } else {
    auditLogs.forEach((log, i) => {
      const metadata = log.metadata ? JSON.parse(log.metadata) : {};
      console.log(`\n  ${i + 1}. [${log.action}] ${log.entity}`);
      console.log(`     Entity ID: ${log.entityId}`);
      console.log(`     User: ${log.user?.email || 'Unknown'}`);
      console.log(`     Metadata: ${JSON.stringify(metadata)}`);
      console.log(`     Time: ${log.createdAt.toLocaleString()}`);
    });
  }
}

checkDetail()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
