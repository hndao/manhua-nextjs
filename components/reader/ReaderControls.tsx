'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Chapter } from '@/types/comic';

interface ReaderControlsProps {
  chapter: Chapter;
  currentPage: number;
  totalPages: number;
  prevChapter: Chapter | null;
  nextChapter: Chapter | null;
  show: boolean;
  onPageChange: (page: number) => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  brightness: number;
  onBrightnessChange: (brightness: number) => void;
}

export default function ReaderControls({
  chapter,
  currentPage,
  totalPages,
  prevChapter,
  nextChapter,
  show,
  onPageChange,
  isDarkMode,
  onDarkModeToggle,
  brightness,
  onBrightnessChange,
}: ReaderControlsProps) {
  const t = useTranslations();
  const locale = useLocale();

  const comic = chapter.comic;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="px-4 py-3">
        {/* Progress Slider */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={totalPages - 1}
            value={currentPage}
            onChange={(e) => onPageChange(Number(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500">
            <span>{t('chapter.pageOf', { current: currentPage + 1, total: totalPages })}</span>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mb-3">
          {prevChapter ? (
            <Link
              href={`/comic/${comic?.slug || chapter.comic_id}/${prevChapter.slug || `chuong-${prevChapter.chapter_number}-${prevChapter.id}`}`}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              {t('chapter.prevChapter')}
            </Link>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">
              {t('chapter.prevChapter')}
            </div>
          )}

          <Link
            href={`/comic/${comic?.slug || chapter.comic_id}`}
            className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            {t('chapter.chapterList')}
          </Link>

          {nextChapter ? (
            <Link
              href={`/comic/${comic?.slug || chapter.comic_id}/${nextChapter.slug || `chuong-${nextChapter.chapter_number}-${nextChapter.id}`}`}
              className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              {t('chapter.nextChapter')}
            </Link>
          ) : (
            <div className="px-4 py-2 text-sm text-gray-400">
              {t('chapter.nextChapter')}
            </div>
          )}
        </div>

        {/* Settings Row */}
        <div className="flex items-center justify-around border-t border-gray-200 pt-3">
          {/* Brightness */}
          <div className="flex flex-col items-center gap-1">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <span className="text-xs text-gray-600">{t('chapter.brightness')}</span>
          </div>

          {/* Dark Mode */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={onDarkModeToggle}
              className={`p-2 ${isDarkMode ? 'text-blue-600' : 'text-gray-600'} hover:text-gray-900`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            <span className="text-xs text-gray-600">{t('chapter.nightMode')}</span>
          </div>

          {/* Settings */}
          <div className="flex flex-col items-center gap-1">
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            <span className="text-xs text-gray-600">{t('chapter.settings')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

