'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Genre } from '@/types/comic';

interface GenresPageTabletProps {
  genres: Genre[];
}

export default function GenresPageTablet({ genres }: GenresPageTabletProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container-responsive">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('genres.title')}
          </h1>
          <p className="text-gray-600">{t('genres.description')}</p>
        </div>

        {genres.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500">{t('genres.noGenres')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/search?genre=${genre.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-900 hover:shadow-lg transition-all"
              >
                <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {t('genres.comicsCount', { count: genre.comics_count || 0 })}
                </p>
                <div className="mt-3 text-sm text-blue-600 group-hover:text-blue-700 font-medium">
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

