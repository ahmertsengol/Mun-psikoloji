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
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialData || {
      title: '',
      description: '',
      startsAt: '',
      endsAt: '',
      location: '',
      status: 'DRAFT',
    },
  });

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
        body: JSON.stringify(data),
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
        rows={10}
      />

      <div className="grid gap-6 md:grid-cols-2">
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
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Durum
        </label>
        <select
          {...register('status')}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="DRAFT">Taslak</option>
          <option value="PUBLISHED">Yayınla</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
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
        >
          İptal
        </Button>
      </div>
    </form>
  );
}
