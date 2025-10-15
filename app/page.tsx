/**
 * Home Page - 3 Column Layout
 * Left: Announcements | Center: Events (paginated) | Right: News
 */

import { prisma } from "@/lib/db/prisma";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { EventsList } from "@/components/lists/events-list";
import { AnnouncementsList } from "@/components/lists/announcements-list";
import { NewsList } from "@/components/lists/news-list";
import { Separator } from "@/components/ui/Separator";

export const metadata = {
  title: "Anasayfa | Munzur Psikoloji Kulübü",
  description:
    "Munzur Üniversitesi Psikoloji Kulübü topluluk sitesi. Haberler, etkinlikler ve duyurular.",
};

const EVENTS_PER_PAGE = 4;

interface PageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;

  // Fetch announcements (latest 5)
  const announcements = await prisma.post.findMany({
    where: {
      type: "ANNOUNCEMENT",
      status: "PUBLISHED",
    },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  // Fetch news (latest 5)
  const news = await prisma.post.findMany({
    where: {
      type: "NEWS",
      status: "PUBLISHED",
    },
    orderBy: { publishedAt: "desc" },
    take: 5,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      publishedAt: true,
    },
  });

  // Fetch events with pagination
  const totalEvents = await prisma.event.count({
    where: { status: "PUBLISHED" },
  });

  const events = await prisma.event.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { startsAt: "desc" },
    skip: (currentPage - 1) * EVENTS_PER_PAGE,
    take: EVENTS_PER_PAGE,
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      startsAt: true,
      endsAt: true,
      location: true,
      coverImage: true, // Kapak görseli eklendi
    },
  });

  const totalPages = Math.ceil(totalEvents / EVENTS_PER_PAGE);

  // Format data for components
  const formattedEvents = events.map((event: typeof events[number]) => ({
    ...event,
    startsAt: event.startsAt.toISOString(),
    endsAt: event.endsAt?.toISOString() || null,
  }));

  const formattedAnnouncements = announcements.map((announcement: typeof announcements[number]) => ({
    ...announcement,
    publishedAt: announcement.publishedAt?.toISOString() || "",
  }));

  const formattedNews = news.map((item: typeof news[number]) => ({
    ...item,
    publishedAt: item.publishedAt?.toISOString() || "",
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 3 Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* LEFT COLUMN - Announcements (3 cols on lg) */}
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[var(--color-fg)]">Duyurular</h2>
              </div>
              <Separator className="mb-4" />
              <AnnouncementsList
                announcements={formattedAnnouncements}
                showViewAll={announcements.length >= 5}
              />
            </div>
          </aside>

          {/* CENTER COLUMN - Events (6 cols on lg, MAIN FOCUS) */}
          <section className="lg:col-span-6 order-1 lg:order-2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-[var(--color-fg)] mb-2">Etkinlikler</h1>
              <p className="text-[var(--color-fg)]/70">
                Kulüp etkinliklerimizi keşfedin ve katılın
              </p>
            </div>
            <Separator className="mb-6" />
            <EventsList
              events={formattedEvents}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </section>

          {/* RIGHT COLUMN - News (3 cols on lg) */}
          <aside className="lg:col-span-3 order-3">
            <div className="sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[var(--color-fg)]">Haberler</h2>
              </div>
              <Separator className="mb-4" />
              <NewsList news={formattedNews} showViewAll={news.length >= 5} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
