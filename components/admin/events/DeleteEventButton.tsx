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
      console.log('🗑️ Silme işlemi başlatılıyor, Event ID:', eventId);
      
      const response = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 API Response Status:', response.status);
      console.log('📡 API Response OK:', response.ok);

      if (!response.ok) {
        const errorData = await response.text();
        console.error('❌ API Error Response:', errorData);
        throw new Error(`Silme işlemi başarısız: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log('✅ Silme işlemi başarılı:', result);

      // Sayfayı yenile
      router.refresh();
      
      // Başarı mesajı
      alert('Etkinlik başarıyla silindi!');
    } catch (error) {
      console.error('❌ Delete error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen hata';
      alert(`Etkinlik silinirken bir hata oluştu: ${errorMessage}`);
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
