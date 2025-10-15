'use client';

/**
 * Image Upload Component
 * For uploading cover images
 */

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Loader2 } from 'lucide-react';
import { uploadImage, validateImageFile } from '@/lib/utils/storage';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  error?: string;
}

export function ImageUpload({
  value,
  onChange,
  onRemove,
  label = 'Kapak Görseli',
  error,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validationError = validateImageFile(file);
    if (validationError) {
      setUploadError(validationError);
      return;
    }

    setUploadError(null);
    setIsUploading(true);

    try {
      const url = await uploadImage(file, 'posts');
      onChange(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Yükleme başarısız');
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
    onChange('');
  };

  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-[var(--color-fg)]">
        {label}
      </label>

      {value ? (
        <div className="relative w-full h-64 rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-muted)]">
          <Image
            src={value}
            alt="Cover"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div>
          <label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
              isUploading
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5'
                : 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:bg-[var(--color-muted)]'
            }`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <>
                  <Loader2 className="w-12 h-12 text-[var(--color-accent)] animate-spin mb-3" />
                  <p className="text-sm text-[var(--color-fg)]/70">
                    Yükleniyor...
                  </p>
                </>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-[var(--color-fg)]/40 mb-3" />
                  <p className="mb-2 text-sm text-[var(--color-fg)]">
                    <span className="font-semibold">Tıklayın</span> veya sürükleyin
                  </p>
                  <p className="text-xs text-[var(--color-fg)]/60">
                    PNG, JPG, WebP veya GIF (Max. 5MB)
                  </p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              id="image-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </label>
        </div>
      )}

      {(uploadError || error) && (
        <p className="mt-2 text-sm text-red-600">{uploadError || error}</p>
      )}
    </div>
  );
}

