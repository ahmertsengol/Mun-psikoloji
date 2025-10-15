'use client';

/**
 * Post Form Component
 * Used for both creating and editing posts
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { postFormSchema, type PostFormData } from '@/lib/validations/post';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PostFormProps {
  initialData?: PostFormData & { id?: string };
  mode: 'create' | 'edit';
}

export function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
    defaultValues: initialData || {
      title: '',
      content: '',
      excerpt: '',
      status: 'DRAFT',
    },
  });

  const onSubmit = async (data: PostFormData) => {
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
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('İşlem başarısız');
      }

      router.push('/admin/posts');
      router.refresh();
    } catch (error) {
      console.error('Submit error:', error);
      alert('Haber kaydedilirken bir hata oluştu');
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
        placeholder="Haber başlığı"
      />

      <Textarea
        label="Özet (İsteğe Bağlı)"
        {...register('excerpt')}
        error={errors.excerpt?.message}
        placeholder="Haber özeti veya kısa açıklama"
        rows={3}
      />

      <Textarea
        label="İçerik"
        {...register('content')}
        error={errors.content?.message}
        placeholder="Haber içeriği"
        rows={15}
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
              ? 'Haber Oluştur'
              : 'Güncelle'}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/admin/posts')}
        >
          İptal
        </Button>
      </div>
    </form>
  );
}
