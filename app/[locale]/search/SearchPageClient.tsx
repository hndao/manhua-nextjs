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
}

export default function SearchPageClient({
  initialQuery,
  initialResults,
  initialError,
}: SearchPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { genres } = useGenres();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState(initialResults);
  const [error, setError] = useState(initialError);

  // Filter states
  const [searchType, setSearchType] = useState<'comics' | 'authors' | 'tags'>('comics');
  const [status, setStatus] = useState('');
  const [genre, setGenre] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  // Update when URL changes
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== query) {
      setQuery(q);
      // In a real app, you'd fetch new results here
      // For now, we'll use the initial results
    }
  }, [searchParams, query]);

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

