/**
 * Announcements List Page
 */

import { prisma } from "@/lib/db/prisma";
import { AnnouncementCard } from "@/components/cards/announcement-card";
import { Megaphone } from "lucide-react";

export const metadata = {
  title: "Duyurular | Munzur Psikoloji Kulübü",
  description: "Kulüp duyuruları ve güncellemeler",
};

// Aggressive caching: Revalidate every 5 minutes (300 seconds)
export const revalidate = 300;

export default async function AnnouncementsPage() {
  // Fetch all published announcements
  const announcements = await prisma.post.findMany({
    where: {
      type: "ANNOUNCEMENT",
      status: "PUBLISHED",
    },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true, // Kapak görseli
      publishedAt: true,
    },
  });

  // Format for client components
  const formattedAnnouncements = announcements.map((announcement) => ({
    ...announcement,
    publishedAt: announcement.publishedAt?.toISOString() || "",
  }));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-[var(--color-accent2)]/10 flex items-center justify-center">
            <Megaphone className="h-6 w-6 text-[var(--color-accent2)]" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-fg)]">
              Duyurular
            </h1>
            <p className="text-[var(--color-fg)]/70 mt-1">
              Kulüp duyuruları ve güncellemeler
            </p>
          </div>
        </div>
      </header>

      {/* Announcements Grid */}
      {formattedAnnouncements.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {formattedAnnouncements.map((announcement) => (
            <AnnouncementCard key={announcement.id} {...announcement} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-muted)] mb-4">
            <Megaphone className="h-8 w-8 text-[var(--color-fg)]/40" />
          </div>
          <h2 className="text-xl font-semibold text-[var(--color-fg)] mb-2">
            Henüz duyuru yok
          </h2>
          <p className="text-[var(--color-fg)]/60">
            Yeni duyurular burada görünecek
          </p>
        </div>
      )}
    </div>
  );
}

