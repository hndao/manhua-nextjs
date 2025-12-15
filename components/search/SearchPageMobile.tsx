'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Comic } from '@/types/comic';
import SearchFilterChips, { SearchFilterChipsProps } from './SearchFilterChips';

interface SearchPageMobileProps {
  query: string;
  results: Comic[];
  error: boolean;
  filterProps: Omit<SearchFilterChipsProps, 'genres'>;
  genres: Array<{ id: number; name: string; slug: string }>;
}

export default function SearchPageMobile({
  query,
  results,
  error,
  filterProps,
  genres,
}: SearchPageMobileProps) {
  const t = useTranslations();
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Search Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="px-3 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-gray-900">
            {t('search.results')}
          </h1>
          <div className="w-6"></div> {/* Spacer for centering */}
        </div>
      </div>

      {/* Filter Chips */}
      <SearchFilterChips {...filterProps} genres={genres} />

      {/* Results Container */}
      <div className="px-3 py-4">
        {/* No Query */}
        {!query && (
          <div className="text-center py-16">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {t('search.enterQuery')}
            </h3>
            <p className="text-sm text-gray-500">
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {t('search.error')}
            </h3>
            <p className="text-sm text-gray-500">
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
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {t('common.noResults')}
            </h3>
            <p className="text-sm text-gray-500">
              {t('search.noResultsDescription')}
            </p>
          </div>
        )}

        {/* Results List - Vertical cards */}
        {!error && results.length > 0 && (
          <div className="space-y-3">
            {results.map((comic) => (
              <Link
                key={comic.id}
                href={`/comic/${comic.slug}`}
                className="flex gap-3 bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
              >
                {/* Cover Image */}
                <div className="relative w-[70px] h-[93px] flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                  <Image
                    src={comic.cover_image || 'https://placehold.co/70x93/e2e8f0/64748b?text=No+Cover'}
                    alt={comic.title}
                    fill
                    className="object-cover"
                    sizes="70px"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
                    {comic.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {comic.genres && comic.genres.slice(0, 2).map((genre) => (
                      <span
                        key={genre.id}
                        className="text-xs text-gray-600"
                      >
                        {genre.name}
                      </span>
                    ))}
                    {comic.status && (
                      <span className="text-xs text-gray-600">
                        • {comic.status === 'ongoing' ? t('search.filters.ongoing') : t('search.filters.completed')}
                      </span>
                    )}
                    {comic.chapters_count !== undefined && (
                      <span className="text-xs text-gray-600">
                        • {comic.chapters_count} {t('comic.chapters')}
                      </span>
                    )}
                  </div>
                  {comic.total_views && (
                    <p className="text-xs text-gray-500">
                      {t('comic.views')}: {(comic.total_views / 10000000).toFixed(1)}亿
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {results.length > 0 && (
          <div className="mt-6 text-center">
            <button className="px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-colors">
              {t('common.loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

