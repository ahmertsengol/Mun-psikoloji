/**
 * Post validation schemas
 */

import { z } from 'zod';

export const postFormSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir').max(200, 'Başlık çok uzun'),
  content: z.string().min(1, 'İçerik gereklidir'),
  excerpt: z.string().max(500, 'Özet çok uzun').optional(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type PostFormData = z.infer<typeof postFormSchema>;
