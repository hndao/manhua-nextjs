import { getGenres } from '@/lib/api/genres';
import GenresPageClient from './GenresPageClient';

export const metadata = {
  title: 'Genres - Manhua Reader',
  description: 'Browse comics by genre',
};

export default async function GenresPage() {
  const genres = await getGenres();

  return <GenresPageClient genres={genres} />;
}

