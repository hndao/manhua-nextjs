import SearchPageClient from './SearchPageClient';
import { searchComics } from '@/lib/api/comics';
import { Comic } from '@/types/comic';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    status?: string;
    genre?: string;
    sort?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const status = params.status || '';
  const genre = params.genre || '';
  const sortBy = params.sort || 'relevance';

  let results: Comic[] = [];
  let error = false;

  // Fetch search results if query or filters exist
  if (query || status || genre) {
    try {
      results = await searchComics(query, {
        status: status || undefined,
        genre: genre || undefined,
        sort_by: sortBy !== 'relevance' ? sortBy : undefined,
      });
    } catch (err) {
      console.error('Search error:', err);
      error = true;
    }
  }

  return (
    <SearchPageClient
      initialQuery={query}
      initialResults={results}
      initialError={error}
      initialStatus={status}
      initialGenre={genre}
      initialSortBy={sortBy}
    />
  );
}

