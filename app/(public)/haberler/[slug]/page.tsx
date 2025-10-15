/**
 * Individual Post Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    select: { title: true, excerpt: true },
  });

  if (!post) {
    return {
      title: 'Haber Bulunamadı',
    };
  }

  return {
    title: `${post.title} | Munzur Psikoloji Kulübü`,
    description: post.excerpt || post.title,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug, status: 'PUBLISHED' },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {post.publishedAt && (
              <time dateTime={post.publishedAt.toISOString()}>
                {format(new Date(post.publishedAt), 'dd MMMM yyyy', {
                  locale: tr,
                })}
              </time>
            )}
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="whitespace-pre-wrap text-gray-800">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
