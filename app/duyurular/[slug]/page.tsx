import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Badge } from "@/components/ui/Badge";
import { formatDateFull, formatDateBadge } from "@/lib/date";
import { Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const announcement = await prisma.post.findUnique({
    where: { slug, type: "ANNOUNCEMENT" },
    select: { title: true, excerpt: true },
  });

  if (!announcement) {
    return {
      title: "Duyuru Bulunamadı",
    };
  }

  return {
    title: `${announcement.title} | Munzur Psikoloji Kulübü`,
    description: announcement.excerpt || announcement.title,
  };
}

export default async function AnnouncementDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const announcement = await prisma.post.findUnique({
    where: {
      slug,
      type: "ANNOUNCEMENT",
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!announcement) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-fg)]/70 hover:text-[var(--color-accent2)] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana sayfaya dön
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--color-accent2)]/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-[var(--color-accent2)]" />
              </div>
              <div className="flex flex-col gap-1">
                <Badge variant="default" title={formatDateFull(announcement.publishedAt!)}>
                  {formatDateBadge(announcement.publishedAt!)}
                </Badge>
                <span className="text-xs text-[var(--color-fg)]/60">Duyuru</span>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-fg)] mb-4">
              {announcement.title}
            </h1>

            {announcement.excerpt && (
              <p className="text-lg text-[var(--color-fg)]/70 leading-relaxed">
                {announcement.excerpt}
              </p>
            )}
          </div>

          {/* Cover Image */}
          {announcement.coverImage && (
            <div className="relative w-full h-64 sm:h-96 lg:h-[500px] mb-8 rounded-xl overflow-hidden">
              <Image
                src={announcement.coverImage}
                alt={announcement.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="bg-[var(--color-card-bg)] rounded-2xl border border-[var(--color-border)] p-6 md:p-8 shadow-[var(--shadow-soft)]">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: announcement.content }}
            />
          </div>

          {/* Footer Meta */}
        
        </article>
      </div>

      <Footer />
    </div>
  );
}
