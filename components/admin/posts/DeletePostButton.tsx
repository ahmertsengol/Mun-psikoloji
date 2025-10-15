'use client';

/**
 * Delete Post Button Component
 */

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeletePostButtonProps {
  postId: string;
}

export function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Bu haberi silmek istediğinizden emin misiniz?')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Silme işlemi başarısız');
      }

      router.refresh();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Haber silinirken bir hata oluştu');
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
