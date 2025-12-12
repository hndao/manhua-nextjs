'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Comic } from '@/types/comic';
import { getImageUrl } from '@/lib/utils';

interface DailyUpdatesProps {
  comics: Comic[];
}

export default function DailyUpdates({ comics }: DailyUpdatesProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (!comics || comics.length === 0) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="container-responsive">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            {t('home.dailyUpdates')}
          </h2>
          <Link 
            href={`/${locale}/updates`}
            className="text-sm md:text-base text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Updates List */}
        <div className="space-y-3 md:space-y-4">
          {comics.slice(0, 10).map((comic) => (
            <Link
              key={comic.id}
              href={`/${locale}/comic/${comic.slug}`}
              className="flex gap-3 md:gap-4 p-3 md:p-4 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors group"
            >
              {/* Thumbnail */}
              <div className="relative w-16 h-20 md:w-20 md:h-28 lg:w-24 lg:h-32 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                <Image
                  src={getImageUrl(comic.cover_image)}
                  alt={comic.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 64px, (max-width: 1440px) 80px, 96px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {comic.title}
                </h3>
                
                {/* Latest Chapters */}
                {comic.latest_chapter && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm text-gray-600 truncate flex-1">
                        {comic.latest_chapter.title}
                      </span>
                      <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                        {new Date(comic.latest_chapter.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Genres */}
                {comic.genres && comic.genres.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {comic.genres.slice(0, 3).map((genre) => (
                      <span
                        key={genre.id}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  {comic.views_count && (
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {comic.views_count.toLocaleString()}
                    </span>
                  )}
                  {comic.chapters_count && (
                    <span>{comic.chapters_count} {t('comic.chapters')}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

