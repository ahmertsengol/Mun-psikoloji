'use client';

/**
 * Delete Event Button Component
 */

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeleteEventButtonProps {
  eventId: string;
}

export function DeleteEventButton({ eventId }: DeleteEventButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Bu etkinliği silmek istediğinizden emin misiniz?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Silme işlemi başarısız');
      }

      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Etkinlik silinirken bir hata oluştu');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button
      size="sm"
      variant="danger"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Siliniyor...' : 'Sil'}
    </Button>
  );
}
