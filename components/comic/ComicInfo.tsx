'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import { getPlaceholderImage } from '@/lib/utils/image';

interface ComicInfoProps {
  comic: Comic;
}

export default function ComicInfo({ comic }: ComicInfoProps) {
  const t = useTranslations();
  const locale = useLocale();

  // Get first chapter for "Start Reading" button
  const firstChapter = comic.chapters && comic.chapters.length > 0 
    ? comic.chapters[0] 
    : null;

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-3 md:px-6 lg:px-10 py-6 md:py-8 lg:py-10">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Cover Image */}
          <div className="flex-shrink-0">
            <div className="relative w-[110px] h-[160px] md:w-[180px] md:h-[260px] lg:w-[260px] lg:h-[380px] rounded-lg overflow-hidden bg-gray-100 shadow-lg">
              <Image
                src={comic.cover_image || getPlaceholderImage()}
                alt={comic.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Comic Info */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              {comic.title}
            </h1>

            {/* Authors */}
            {comic.authors && comic.authors.length > 0 && (
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <span className="text-sm md:text-base text-gray-600">{t('comic.author')}:</span>
                <div className="flex flex-wrap gap-2">
                  {comic.authors.map((author) => (
                    <Link
                      key={author.id}
                      href={`/author/${author.slug}`}
                      className="text-sm md:text-base text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      {author.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Genres */}
            {comic.genres && comic.genres.length > 0 && (
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <span className="text-sm md:text-base text-gray-600">{t('comic.genres')}:</span>
                <div className="flex flex-wrap gap-2">
                  {comic.genres.map((genre) => (
                    <Link
                      key={genre.id}
                      href={`/genre/${genre.slug}`}
                      className="px-2 py-1 text-xs md:text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
                    >
                      {genre.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <span className="text-sm md:text-base text-gray-600">{t('comic.status')}:</span>
              <span className={`px-2 py-1 text-xs md:text-sm rounded ${
                comic.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                comic.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                comic.status === 'hiatus' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {t(`status.${comic.status}`)}
              </span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 md:gap-6 mb-4 md:mb-6 text-sm md:text-base text-gray-600">
              {comic.total_views > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{comic.total_views.toLocaleString()}</span>
                </div>
              )}
              {comic.average_rating > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span>{comic.average_rating.toFixed(1)}</span>
                  <span className="text-gray-400">({comic.total_ratings})</span>
                </div>
              )}
              {comic.chapters_count > 0 && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{comic.chapters_count} {t('comic.chapters')}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {firstChapter && (
                <Link
                  href={`/comic/${comic.slug}/${firstChapter.slug || `chuong-${firstChapter.chapter_number}-${firstChapter.id}`}`}
                  className="px-6 md:px-8 py-2 md:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm md:text-base"
                >
                  {t('comic.startReading')}
                </Link>
              )}
              <button className="px-6 md:px-8 py-2 md:py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm md:text-base">
                {t('comic.bookmark')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

