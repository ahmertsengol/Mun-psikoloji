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
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[var(--color-fg)]">
          Yeni Etkinlik
        </h1>
        <p className="text-[var(--color-fg)]/70">Yeni bir etkinlik oluşturun</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Etkinlik Bilgileri</CardTitle>
        </CardHeader>
        <CardContent>
          <EventForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
