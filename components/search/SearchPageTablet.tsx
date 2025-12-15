'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Comic } from '@/types/comic';
import SearchFilterChips, { SearchFilterChipsProps } from './SearchFilterChips';

interface SearchPageTabletProps {
  query: string;
  results: Comic[];
  error: boolean;
  filterProps: Omit<SearchFilterChipsProps, 'genres'>;
  genres: Array<{ id: number; name: string; slug: string }>;
}

export default function SearchPageTablet({
  query,
  results,
  error,
  filterProps,
  genres,
}: SearchPageTabletProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white">
      {/* Page Title */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">
          {t('search.results')}
        </h1>
      </div>

      {/* Filter Chips */}
      <SearchFilterChips {...filterProps} genres={genres} />

      {/* Results Container */}
      <div className="px-6 py-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Results Header */}
          {query && results.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-1">
                {t('search.results')}
              </h2>
              <p className="text-sm text-gray-600">
                {t('search.foundResults', { count: results.length })}
              </p>
            </div>
          )}

          {/* No Query */}
          {!query && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('search.enterQuery')}
              </h3>
              <p className="text-gray-500">
                {t('search.enterQueryDescription')}
              </p>
            </div>
          )}

          {/* Error State */}
          {error && query && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('search.error')}
              </h3>
              <p className="text-gray-500">
                {t('search.errorDescription')}
              </p>
            </div>
          )}

          {/* No Results */}
          {!error && query && results.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {t('common.noResults')}
              </h3>
              <p className="text-gray-500">
                {t('search.noResultsDescription')}
              </p>
            </div>
          )}

          {/* Results Grid - 3 columns */}
          {!error && results.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {results.map((comic) => (
                <Link
                  key={comic.id}
                  href={`/comic/${comic.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <Image
                      src={comic.cover_image || 'https://placehold.co/210x280/e2e8f0/64748b?text=No+Cover'}
                      alt={comic.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="210px"
                    />
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors mb-1">
                    {comic.title}
                  </h3>
                  {comic.authors && comic.authors.length > 0 && (
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {comic.authors.map(a => a.name).join(', ')}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {results.length > 0 && (
            <div className="mt-8 text-center">
              <button className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors">
                {t('common.loadMore')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

