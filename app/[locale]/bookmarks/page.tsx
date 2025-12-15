import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getBookmarksServer } from '@/lib/api/server-user';
import BookmarksPageClient from './BookmarksPageClient';

export const metadata = {
  title: 'Bookmarks - Manhua Reader',
  description: 'Your bookmarked comics',
};

export default async function BookmarksPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('auth_token');

  if (!tokenCookie?.value) {
    redirect('/login?redirect=/bookmarks');
  }

  try {
    const bookmarks = await getBookmarksServer(tokenCookie.value);
    return <BookmarksPageClient bookmarks={bookmarks} />;
  } catch (error) {
    console.error('Failed to fetch bookmarks:', error);
    // Token is invalid or expired - redirect to login
    redirect('/login?redirect=/bookmarks&expired=true');
  }
}

