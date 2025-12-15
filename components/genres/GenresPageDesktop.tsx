'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Genre } from '@/types/comic';

interface GenresPageDesktopProps {
  genres: Genre[];
}

export default function GenresPageDesktop({ genres }: GenresPageDesktopProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container-responsive">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('genres.title')}
          </h1>
          <p className="text-gray-600">{t('genres.description')}</p>
        </div>

        {/* Genres Grid */}
        {genres.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">{t('genres.noGenres')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-6">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/search?genre=${genre.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-900 hover:shadow-lg transition-all"
              >
                {/* Genre Name */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {genre.name}
                </h3>

                {/* Comics Count */}
                <p className="text-sm text-gray-600">
                  {t('genres.comicsCount', { count: genre.comics_count || 0 })}
                </p>

                {/* View Link */}
                <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-700 font-medium">
                  {t('genres.viewComics')} →
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

