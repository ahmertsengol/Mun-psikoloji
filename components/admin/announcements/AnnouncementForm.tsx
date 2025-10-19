'use client';

/**
 * Announcement Form Component
 * Used for both creating and editing announcements
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const announcementFormSchema = z.object({
  title: z.string().min(1, 'Başlık zorunludur'),
  content: z.string().min(1, 'İçerik zorunludur'),
  excerpt: z.string().optional(),
  coverImage: z.string().url('Geçerli bir URL olmalı').optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

type AnnouncementFormData = z.infer<typeof announcementFormSchema>;

interface AnnouncementFormProps {
  initialData?: AnnouncementFormData & { id?: string };
  mode: 'create' | 'edit';
}

export function AnnouncementForm({ initialData, mode }: AnnouncementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementFormSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      status: 'DRAFT',
    },
  });

  const coverImage = watch('coverImage');

  const onSubmit = async (data: AnnouncementFormData) => {
    setIsSubmitting(true);
    try {
      const url =
        mode === 'create'
          ? '/api/posts'
          : `/api/posts/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          type: 'ANNOUNCEMENT', // Önemli: Duyuru olarak işaretle
          coverImage: data.coverImage || null,
        }),
      });

      if (!response.ok) {
        throw new Error('İşlem başarısız');
      }

      router.push('/admin/announcements');
      router.refresh();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Duyuru kaydedilirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <Input
        label="Başlık"
        {...register('title')}
        error={errors.title?.message}
        placeholder="Duyuru başlığı"
      />

      <Textarea
        label="Özet (İsteğe Bağlı)"
        {...register('excerpt')}
        error={errors.excerpt?.message}
        placeholder="Duyuru özeti veya kısa açıklama"
        rows={3}
      />

      <ImageUpload
        value={coverImage}
        onChange={(url) => setValue('coverImage', url)}
        onRemove={() => setValue('coverImage', '')}
        label="Kapak Görseli (İsteğe Bağlı)"
        error={errors.coverImage?.message}
      />

      <Textarea
        label="İçerik"
        {...register('content')}
        error={errors.content?.message}
        placeholder="Duyuru içeriği"
        rows={10}
        className="sm:rows-15"
      />

      <div>
        <label className="mb-1 sm:mb-2 block text-sm font-medium text-[var(--color-fg)]">
          Durum
        </label>
        <select
          {...register('status')}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] text-[var(--color-fg)] px-3 sm:px-4 py-3 sm:py-2 text-base sm:text-sm focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/20 touch-manipulation"
        >
          <option value="DRAFT">Taslak</option>
          <option value="PUBLISHED">Yayınla</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting
            ? 'Kaydediliyor...'
            : mode === 'create'
              ? 'Duyuru Oluştur'
              : 'Güncelle'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/admin/announcements')}
          className="w-full sm:w-auto"
        >
          İptal
        </Button>
      </div>
    </form>
  );
}

