'use client';

/**
 * Event Form Component
 * Used for both creating and editing events
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, type EventFormData } from '@/lib/validations/event';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EventFormProps {
  initialData?: EventFormData & { id?: string };
  mode: 'create' | 'edit';
}

export function EventForm({ initialData, mode }: EventFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      startsAt: '',
      endsAt: '',
      location: '',
      coverImage: '',
      status: 'DRAFT',
    },
  });

  const coverImage = watch('coverImage');

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    try {
      const url =
        mode === 'create'
          ? '/api/events'
          : `/api/events/${initialData?.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          coverImage: data.coverImage || null,
        }),
      });

      if (!response.ok) {
        throw new Error('İşlem başarısız');
      }

      router.push('/admin/events');
      router.refresh();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Etkinlik kaydedilirken bir hata oluştu');
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
        placeholder="Etkinlik başlığı"
      />

      <Textarea
        label="Açıklama"
        {...register('description')}
        error={errors.description?.message}
        placeholder="Etkinlik açıklaması"
        rows={8}
        className="sm:rows-10"
      />

      <ImageUpload
        value={coverImage || null}
        onChange={(url) => setValue('coverImage', url)}
        onRemove={() => setValue('coverImage', '')}
        label="Kapak Görseli (İsteğe Bağlı)"
        error={errors.coverImage?.message}
      />

      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <Input
          label="Başlangıç Tarihi ve Saati"
          type="datetime-local"
          {...register('startsAt')}
          error={errors.startsAt?.message}
        />

        <Input
          label="Bitiş Tarihi ve Saati (İsteğe Bağlı)"
          type="datetime-local"
          {...register('endsAt')}
          error={errors.endsAt?.message}
        />
      </div>

      <Input
        label="Konum (İsteğe Bağlı)"
        {...register('location')}
        error={errors.location?.message}
        placeholder="Örn: Konferans Salonu A"
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
              ? 'Etkinlik Oluştur'
              : 'Güncelle'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/admin/events')}
          className="w-full sm:w-auto"
        >
          İptal
        </Button>
      </div>
    </form>
  );
}
