import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getReadingHistoryServer } from '@/lib/api/server-user';
import HistoryPageClient from './HistoryPageClient';

export const metadata = {
  title: 'Reading History - Manhua Reader',
  description: 'Your reading history',
};

export default async function HistoryPage() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('auth_token');

  if (!tokenCookie?.value) {
    redirect('/login?redirect=/history');
  }

  try {
    const history = await getReadingHistoryServer(tokenCookie.value);
    return <HistoryPageClient history={history} />;
  } catch (error) {
    console.error('Failed to fetch reading history:', error);
    // Token is invalid or expired - redirect to login
    redirect('/login?redirect=/history&expired=true');
  }
}

