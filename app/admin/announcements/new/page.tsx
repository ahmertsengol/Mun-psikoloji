/**
 * New Announcement Page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { AnnouncementForm } from '@/components/admin/announcements/AnnouncementForm';

export const metadata = {
  title: 'Yeni Duyuru | Admin Panel',
  description: 'Yeni duyuru oluştur',
};

export default function NewAnnouncementPage() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">Yeni Duyuru</h1>
        <p className="text-sm sm:text-base text-[var(--color-fg)]/70">Yeni bir duyuru oluşturun</p>
      </div>

      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Duyuru Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <AnnouncementForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}

