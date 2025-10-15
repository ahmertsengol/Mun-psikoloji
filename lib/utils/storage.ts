/**
 * Supabase Storage Utilities
 * File upload and management functions
 */

import { createClient } from '@/lib/supabase/client';

const BUCKET_NAME = 'media';

/**
 * Upload an image to Supabase Storage
 * @param file - File object to upload
 * @param folder - Optional folder path (e.g., 'posts', 'events')
 * @returns Public URL of the uploaded file
 */
export async function uploadImage(
  file: File,
  folder: string = 'uploads'
): Promise<string> {
  const supabase = createClient();

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

  // Upload file
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error('Dosya yüklenirken hata oluştu');
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return publicUrl;
}

/**
 * Delete an image from Supabase Storage
 * @param url - Full public URL of the image
 */
export async function deleteImage(url: string): Promise<void> {
  const supabase = createClient();

  // Extract file path from URL
  const urlParts = url.split(`/${BUCKET_NAME}/`);
  if (urlParts.length < 2 || !urlParts[1]) {
    throw new Error('Geçersiz dosya URL');
  }

  const filePath = urlParts[1];

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error('Delete error:', error);
    throw new Error('Dosya silinirken hata oluştu');
  }
}

/**
 * Validate image file
 * @param file - File to validate
 * @param maxSizeMB - Maximum file size in MB (default: 5MB)
 */
export function validateImageFile(file: File, maxSizeMB: number = 5): string | null {
  // Check file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!validTypes.includes(file.type)) {
    return 'Sadece JPG, PNG, WebP ve GIF formatları desteklenir';
  }

  // Check file size
  const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes
  if (file.size > maxSize) {
    return `Dosya boyutu en fazla ${maxSizeMB}MB olmalıdır`;
  }

  return null; // No error
}

