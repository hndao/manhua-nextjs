import SearchPageClient from './SearchPageClient';
import { searchComics } from '@/lib/api/comics';
import { Comic } from '@/types/comic';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';

  let results: Comic[] = [];
  let error = false;

  // Fetch search results if query exists
  if (query) {
    try {
      results = await searchComics(query);
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
    />
  );
}

