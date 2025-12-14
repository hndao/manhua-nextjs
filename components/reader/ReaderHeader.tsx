'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Chapter } from '@/types/comic';

interface ReaderHeaderProps {
  chapter: Chapter;
  show: boolean;
  onToggle: () => void;
}

export default function ReaderHeader({ chapter, show, onToggle }: ReaderHeaderProps) {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();

  const comic = chapter.comic;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 transition-transform duration-300 ${
        show ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-3 md:px-6 lg:px-10">
        <div className="flex items-center justify-between h-12 md:h-14">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="hidden md:inline text-sm">{t('common.back')}</span>
          </button>

          {/* Title */}
          <div className="flex-1 mx-4 text-center truncate">
            <Link
              href={`/comic/${comic?.slug || chapter.comic_id}`}
              className="text-sm md:text-base font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              {comic?.title || 'Comic Title'}
            </Link>
            <span className="mx-2 text-gray-400">·</span>
            <span className="text-xs md:text-sm text-gray-600">
              {chapter.title || `${t('chapter.chapter')} ${chapter.chapter_number}`}
            </span>
          </div>

          {/* Chapter List Button */}
          <Link
            href={`/comic/${comic?.slug || chapter.comic_id}`}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden md:inline">{t('chapter.chapterList')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

