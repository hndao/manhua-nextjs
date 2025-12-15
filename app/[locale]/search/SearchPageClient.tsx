'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Comic } from '@/types/comic';
import SearchPageDesktop from '@/components/search/SearchPageDesktop';
import SearchPageTablet from '@/components/search/SearchPageTablet';
import SearchPageMobile from '@/components/search/SearchPageMobile';
import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import { useGenres } from '@/lib/contexts/GenresContext';

interface SearchPageClientProps {
  initialQuery: string;
  initialResults: Comic[];
  initialError: boolean;
  initialStatus?: string;
  initialGenre?: string;
  initialSortBy?: string;
}

export default function SearchPageClient({
  initialQuery,
  initialResults,
  initialError,
  initialStatus = '',
  initialGenre = '',
  initialSortBy = 'relevance',
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { genres } = useGenres();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [error, setError] = useState(initialError);

  // Filter states
  const [searchType, setSearchType] = useState<'comics' | 'authors' | 'tags'>('comics');
  const [status, setStatus] = useState(initialStatus);
  const [genre, setGenre] = useState(initialGenre);
  const [sortBy, setSortBy] = useState(initialSortBy);

  // Sync state with URL parameters when URL changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const s = searchParams.get('status') || '';
    const g = searchParams.get('genre') || '';
    const sort = searchParams.get('sort') || 'relevance';

    setQuery(q);
    setStatus(s);
    setGenre(g);
    setSortBy(sort);
  }, [searchParams]);

  // Save recent searches to localStorage
  useEffect(() => {
    if (query && results.length > 0) {
      const saved = localStorage.getItem('recentSearches');
      let recentSearches: string[] = [];
      
      if (saved) {
        try {
          recentSearches = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse recent searches:', e);
        }
      }
      
      // Add to recent searches (avoid duplicates)
      if (!recentSearches.includes(query)) {
        recentSearches.unshift(query);
        recentSearches = recentSearches.slice(0, 10); // Keep only last 10
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
      }
    }
  }, [query, results.length]);

  const applyFilters = (newStatus?: string, newGenre?: string, newSortBy?: string) => {
    const params = new URLSearchParams();
    if (query) params.set('q', query);

    const statusValue = newStatus !== undefined ? newStatus : status;
    const genreValue = newGenre !== undefined ? newGenre : genre;
    const sortByValue = newSortBy !== undefined ? newSortBy : sortBy;

    if (statusValue) params.set('status', statusValue);
    if (genreValue) params.set('genre', genreValue);
    if (sortByValue && sortByValue !== 'relevance') params.set('sort', sortByValue);

    router.push(`/search?${params.toString()}`);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    applyFilters(newStatus, undefined, undefined);
  };

  const handleGenreChange = (newGenre: string) => {
    setGenre(newGenre);
    applyFilters(undefined, newGenre, undefined);
  };

  const handleSortByChange = (newSortBy: string) => {
    setSortBy(newSortBy);
    applyFilters(undefined, undefined, newSortBy);
  };

  const handleResetFilters = () => {
    setSearchType('comics');
    setStatus('');
    setGenre('');
    setSortBy('relevance');
    router.push(`/search?q=${query}`);
  };

  const filterProps = {
    searchType,
    status,
    genre,
    sortBy,
    onSearchTypeChange: setSearchType,
    onStatusChange: handleStatusChange,
    onGenreChange: handleGenreChange,
    onSortByChange: handleSortByChange,
    onReset: handleResetFilters,
  };

  return (
    <ResponsiveContainer
      mobile={
        <SearchPageMobile
          query={query}
          results={results}
          error={error}
          filterProps={filterProps}
          genres={genres}
        />
      }
      tablet={
        <SearchPageTablet
          query={query}
          results={results}
          error={error}
          filterProps={filterProps}
          genres={genres}
        />
      }
      desktop={
        <SearchPageDesktop
          query={query}
          results={results}
          error={error}
          filterProps={filterProps}
          genres={genres}
        />
      }
    />
  );
}

