/**
 * Individual Post Page
 */

import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { Separator } from '@/components/ui/Separator';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="mx-auto max-w-4xl">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl sm:text-4xl font-bold text-[var(--color-fg)] leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mb-6 text-lg text-[var(--color-fg)]/70 leading-relaxed">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-fg)]/60">
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
                <time dateTime={post.publishedAt.toISOString()}>
                  {format(new Date(post.publishedAt), 'dd MMMM yyyy', {
                    locale: tr,
                  })}
                </time>
              </div>
            )}
          </div>
        </header>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative w-full h-64 sm:h-96 lg:h-[500px] mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
            />
          </div>
        )}

        <Separator className="mb-8" />

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <div className="whitespace-pre-wrap text-[var(--color-fg)]/80 leading-relaxed">
            {post.content}
          </div>
        </div>
      </article>
    </div>
  );
}
