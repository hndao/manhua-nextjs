'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Chapter } from '@/types/comic';

interface ReaderToolbarProps {
  chapter: Chapter;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  brightness: number;
  onBrightnessChange: (brightness: number) => void;
}

export default function ReaderToolbar({
  chapter,
  prevChapter,
  nextChapter,
  isDarkMode,
  onDarkModeToggle,
  brightness,
  onBrightnessChange,
}: ReaderToolbarProps) {
  const t = useTranslations();
  const locale = useLocale();

  const comic = chapter.comic;

  return (
    <div className="fixed right-6 top-32 z-40">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-3 space-y-4 w-16">
        {/* Chapter List */}
        <Link
          href={`/${locale}/comic/${comic?.id || chapter.comic_id}`}
          className="flex flex-col items-center gap-1 p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
          title={t('chapter.chapterList')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-xs">{t('chapter.chapterList')}</span>
        </Link>

        {/* Brightness */}
        <div className="flex flex-col items-center gap-1 p-2">
          <button className="text-gray-600 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <span className="text-xs text-gray-600">{t('chapter.brightness')}</span>
        </div>

        {/* Dark Mode */}
        <div className="flex flex-col items-center gap-1 p-2">
          <button
            onClick={onDarkModeToggle}
            className={`${isDarkMode ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <span className="text-xs text-gray-600">{t('chapter.nightMode')}</span>
        </div>

        {/* Report */}
        <div className="flex flex-col items-center gap-1 p-2">
          <button className="text-gray-600 hover:text-red-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </button>
          <span className="text-xs text-gray-600">{t('chapter.reportIssue')}</span>
        </div>
      </div>

      {/* Next Chapter Button (if available) */}
      {nextChapter && (
        <Link
          href={`/${locale}/reader/${comic?.id || chapter.comic_id}/${nextChapter.id}`}
          className="mt-4 block bg-blue-600 text-white rounded-xl shadow-lg p-4 text-center hover:bg-blue-700 transition-colors"
        >
          <div className="text-sm font-medium">{t('chapter.nextChapter')}</div>
          <div className="text-xs mt-1 opacity-90">
            {nextChapter.title || `${t('chapter.chapter')} ${nextChapter.chapter_number}`}
          </div>
        </Link>
      )}
    </div>
  );
}

