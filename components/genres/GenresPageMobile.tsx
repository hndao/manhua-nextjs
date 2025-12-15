'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Genre } from '@/types/comic';

interface GenresPageMobileProps {
  genres: Genre[];
}

export default function GenresPageMobile({ genres }: GenresPageMobileProps) {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-white py-4">
      <div className="container-responsive">
        <div className="mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">
            {t('genres.title')}
          </h1>
          <p className="text-sm text-gray-600">{t('genres.description')}</p>
        </div>

        {genres.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('genres.noGenres')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                href={`/search?genre=${genre.slug}`}
                className="group bg-white border border-gray-200 rounded-lg p-3 hover:border-gray-900 hover:shadow-md transition-all"
              >
                <h3 className="text-sm font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-xs text-gray-600">
                  {t('genres.comicsCount', { count: genre.comics_count || 0 })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

