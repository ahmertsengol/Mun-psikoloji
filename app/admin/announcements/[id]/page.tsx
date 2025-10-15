/**
 * Edit Announcement Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnnouncementForm } from '@/components/admin/announcements/AnnouncementForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const announcement = await prisma.post.findUnique({
    where: { id, type: 'ANNOUNCEMENT' },
    select: { title: true },
  });

  return {
    title: announcement ? `${announcement.title} - Düzenle | Admin Panel` : 'Duyuru Bulunamadı',
  };
}

export default async function EditAnnouncementPage({ params }: PageProps) {
  const { id } = await params;
  const announcement = await prisma.post.findUnique({
    where: { id, type: 'ANNOUNCEMENT' },
  });

  if (!announcement) {
    notFound();
  }

  const initialData = {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    excerpt: announcement.excerpt || '',
    coverImage: announcement.coverImage || '',
    status: announcement.status,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-fg)]">
          Duyuru Düzenle
        </h1>
        <p className="text-[var(--color-fg)]/70">{announcement.title}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Duyuru Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <AnnouncementForm mode="edit" initialData={initialData} />
        </CardContent>
      </Card>
    </div>
  );
}

