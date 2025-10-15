/**
 * Edit Post Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PostForm } from '@/components/admin/posts/PostForm';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id, type: 'NEWS' },
    select: { title: true },
  });

  return {
    title: post ? `${post.title} - Düzenle | Admin Panel` : 'Haber Bulunamadı',
  };
}

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id, type: 'NEWS' },
  });

  if (!post) {
    notFound();
  }

  const initialData = {
    id: post.id,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt || '',
    coverImage: post.coverImage || '',
    status: post.status,
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-fg)]">
          Haber Düzenle
        </h1>
        <p className="text-[var(--color-fg)]/70">{post.title}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Haber Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm mode="edit" initialData={initialData} />
        </CardContent>
      </Card>
    </div>
  );
}
