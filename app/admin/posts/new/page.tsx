/**
 * New Post Page
 */

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { PostForm } from '@/components/admin/posts/PostForm';

export const metadata = {
  title: 'Yeni Haber | Admin Panel',
  description: 'Yeni haber oluştur',
};

export default function NewPostPage() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl sm:text-3xl font-bold text-[var(--color-fg)]">Yeni Haber</h1>
        <p className="text-sm sm:text-base text-[var(--color-fg)]/70">Yeni bir haber oluşturun</p>
      </div>

      <Card>
        <CardHeader className="pb-4 sm:pb-6">
          <CardTitle className="text-lg sm:text-xl">Haber Bilgileri</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <PostForm mode="create" />
        </CardContent>
      </Card>
    </div>
  );
}
