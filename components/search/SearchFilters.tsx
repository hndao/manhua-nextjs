'use client';

import { useTranslations } from 'next-intl';

export interface SearchFiltersProps {
  searchType: 'comics' | 'authors' | 'tags';
  status: string;
  genre: string;
  sortBy: string;
  onSearchTypeChange: (type: 'comics' | 'authors' | 'tags') => void;
  onStatusChange: (status: string) => void;
  onGenreChange: (genre: string) => void;
  onSortByChange: (sortBy: string) => void;
  onReset: () => void;
  genres: Array<{ id: number; name: string; slug: string }>;
}

export default function SearchFilters({
  searchType,
  status,
  genre,
  sortBy,
  onSearchTypeChange,
  onStatusChange,
  onGenreChange,
  onSortByChange,
  onReset,
  genres,
}: SearchFiltersProps) {
  const t = useTranslations();

  const searchTypes: Array<{ value: 'comics' | 'authors' | 'tags'; label: string }> = [
    { value: 'comics', label: t('search.filters.comics') },
    { value: 'authors', label: t('search.filters.authors') },
    { value: 'tags', label: t('search.filters.tags') },
  ];

  const statuses = [
    { value: '', label: t('search.filters.allStatus') },
    { value: 'ongoing', label: t('search.filters.ongoing') },
    { value: 'completed', label: t('search.filters.completed') },
    { value: 'hiatus', label: t('search.filters.hiatus') },
    { value: 'cancelled', label: t('search.filters.cancelled') },
  ];

  const sortOptions = [
    { value: 'relevance', label: t('search.filters.relevance') },
    { value: 'total_views', label: t('search.filters.popularity') },
    { value: 'created_at', label: t('search.filters.latest') },
    { value: 'average_rating', label: t('search.filters.rating') },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">{t('search.filters.title')}</h2>

      {/* Search Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('search.filters.type')}
        </label>
        <div className="flex flex-wrap gap-2">
          {searchTypes.map((type) => (
            <button
              key={type.value}
              onClick={() => onSearchTypeChange(type.value)}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                searchType === type.value
                  ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                  : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter (only for comics) */}
      {searchType === 'comics' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('search.filters.status')}
          </label>
          <div className="flex flex-wrap gap-2">
            {statuses.map((s) => (
              <button
                key={s.value}
                onClick={() => onStatusChange(s.value)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  status === s.value
                    ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                    : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Genre Filter (only for comics) */}
      {searchType === 'comics' && Array.isArray(genres) && genres.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {t('search.filters.genre')}
          </label>
          <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
            <button
              onClick={() => onGenreChange('')}
              className={`px-4 py-2 text-sm rounded-full transition-colors ${
                genre === ''
                  ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                  : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t('search.filters.allGenres')}
            </button>
            {genres.slice(0, 20).map((g) => (
              <button
                key={g.id}
                onClick={() => onGenreChange(g.slug)}
                className={`px-4 py-2 text-sm rounded-full transition-colors ${
                  genre === g.slug
                    ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                    : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sort */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {t('search.filters.sortBy')}
        </label>
        <select
          value={sortBy}
          onChange={(e) => onSortByChange(e.target.value)}
          className="w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Button */}
      <div className="pt-4">
        <button
          onClick={onReset}
          className="w-full px-6 py-3 bg-gray-100 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
        >
          {t('search.filters.reset')}
        </button>
      </div>
    </div>
  );
}

