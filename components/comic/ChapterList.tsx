'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Comic, Chapter } from '@/types/comic';
import { formatDate } from '@/lib/utils/format';

interface ChapterListProps {
  comic: Comic;
}

export default function ChapterList({ comic }: ChapterListProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [displayCount, setDisplayCount] = useState(50);

  const chapters = comic.chapters || [];
  
  // Sort chapters
  const sortedChapters = [...chapters].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.chapter_number - b.chapter_number;
    } else {
      return b.chapter_number - a.chapter_number;
    }
  });

  // Limit displayed chapters
  const displayedChapters = sortedChapters.slice(0, displayCount);
  const hasMore = sortedChapters.length > displayCount;

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const loadMore = () => {
    setDisplayCount(displayCount + 50);
  };

  if (chapters.length === 0) {
    return (
      <div className="bg-white">
        <div className="container mx-auto px-3 md:px-6 lg:px-10 py-6 md:py-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            {t('comic.chapterList')}
          </h2>
          <p className="text-gray-500 text-center py-8">
            {t('comic.noChapters')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-3 md:px-6 lg:px-10 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            {t('comic.chapterList')} ({chapters.length})
          </h2>
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <span>{sortOrder === 'desc' ? t('comic.descending') : t('comic.ascending')}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* Chapter Grid - Desktop: 3 columns, Tablet: 2 columns, Mobile: 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {displayedChapters.map((chapter) => {
            // Generate chapter slug from title or chapter number
            const chapterSlug = chapter.slug || `chuong-${chapter.chapter_number}-${chapter.id}`;

            return (
              <Link
                key={chapter.id}
                href={`/comic/${comic.slug}/${chapterSlug}`}
                className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
              >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {chapter.title || `${t('chapter.chapter')} ${chapter.chapter_number}`}
                  </h3>
                  {chapter.updated_at && (
                    <p className="text-xs text-gray-500 mt-1">
                      {t('time.updated')} {formatDate(chapter.updated_at)}
                    </p>
                  )}
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="mt-6 md:mt-8 text-center">
            <button
              onClick={loadMore}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              {t('comic.loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

