/**
 * Event validation schemas
 */

import { z } from 'zod';

export const eventFormSchema = z.object({
  title: z.string().min(1, 'Başlık gereklidir').max(200, 'Başlık çok uzun'),
  description: z.string().min(1, 'Açıklama gereklidir'),
  startsAt: z.string().min(1, 'Başlangıç tarihi gereklidir'),
  endsAt: z.string().optional(),
  location: z.string().max(200, 'Konum çok uzun').optional(),
  coverImage: z.string().url('Geçerli bir URL olmalı').optional().or(z.literal('')).nullable(),
  status: z.enum(['DRAFT', 'PUBLISHED']),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
