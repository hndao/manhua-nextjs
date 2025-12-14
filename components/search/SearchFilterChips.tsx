'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export interface SearchFilterChipsProps {
  searchType: 'comics' | 'authors' | 'tags';
  status: string;
  genre: string;
  sortBy: string;
  onSearchTypeChange: (type: 'comics' | 'authors' | 'tags') => void;
  onStatusChange: (status: string) => void;
  onGenreChange: (genre: string) => void;
  onSortByChange: (sortBy: string) => void;
  genres: Array<{ id: number; name: string; slug: string }>;
}

export default function SearchFilterChips({
  searchType,
  status,
  genre,
  sortBy,
  onSearchTypeChange,
  onStatusChange,
  onGenreChange,
  onSortByChange,
  genres,
}: SearchFilterChipsProps) {
  const t = useTranslations();
  const [showFilters, setShowFilters] = useState(false);

  const searchTypes: Array<{ value: 'comics' | 'authors' | 'tags'; label: string }> = [
    { value: 'comics', label: t('search.filters.comics') },
    { value: 'authors', label: t('search.filters.authors') },
    { value: 'tags', label: t('search.filters.tags') },
  ];

  const statuses = [
    { value: '', label: t('search.filters.allStatus') },
    { value: 'ongoing', label: t('search.filters.ongoing') },
    { value: 'completed', label: t('search.filters.completed') },
  ];

  const sortOptions = [
    { value: 'relevance', label: t('search.filters.relevance') },
    { value: 'total_views', label: t('search.filters.popularity') },
    { value: 'created_at', label: t('search.filters.latest') },
    { value: 'average_rating', label: t('search.filters.rating') },
  ];

  const getStatusLabel = () => {
    const found = statuses.find((s) => s.value === status);
    return found ? found.label : t('search.filters.status');
  };

  const getGenreLabel = () => {
    if (!genre) return t('search.filters.genre');
    const found = genres.find((g) => g.slug === genre);
    return found ? found.name : t('search.filters.genre');
  };

  const getSortLabel = () => {
    const found = sortOptions.find((s) => s.value === sortBy);
    return found ? found.label : t('search.filters.sortBy');
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-3 py-3 flex items-center gap-2 overflow-x-auto">
        {/* Search Type Tabs */}
        {searchTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => onSearchTypeChange(type.value)}
            className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors flex-shrink-0 ${
              searchType === type.value
                ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                : 'bg-gray-100 border border-gray-300 text-gray-700'
            }`}
          >
            {type.label}
          </button>
        ))}

        {/* Filter Dropdowns (only for comics) */}
        {searchType === 'comics' && (
          <>
            {/* Status Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
                className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-full appearance-none pr-8 cursor-pointer"
              >
                {statuses.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                ▼
              </span>
            </div>

            {/* Genre Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={genre}
                onChange={(e) => onGenreChange(e.target.value)}
                className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-full appearance-none pr-8 cursor-pointer"
              >
                <option value="">{t('search.filters.allGenres')}</option>
                {Array.isArray(genres) && genres.map((g) => (
                  <option key={g.id} value={g.slug}>
                    {g.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                ▼
              </span>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-shrink-0">
              <select
                value={sortBy}
                onChange={(e) => onSortByChange(e.target.value)}
                className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-full appearance-none pr-8 cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {t('search.filters.sortBy')}: {option.label}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
                ▼
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

