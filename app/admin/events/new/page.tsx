/**
 * New Event Page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { EventForm } from '@/components/admin/events/EventForm';

export const metadata = {
  title: 'Yeni Etkinlik | Admin Panel',
  description: 'Yeni etkinlik oluştur',
};

export default function NewEventPage() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">
          Yeni Etkinlik
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-fg)]/70">Yeni bir etkinlik oluşturun</p>
      </div>

      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Etkinlik Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <EventForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
