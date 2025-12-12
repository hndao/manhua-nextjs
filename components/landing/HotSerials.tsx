'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Comic } from '@/types/comic';
import ComicCard from '@/components/common/ComicCard';

interface HotSerialsProps {
  comics: Comic[];
}

export default function HotSerials({ comics }: HotSerialsProps) {
  const t = useTranslations();
  const locale = useLocale();

  if (!comics || comics.length === 0) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50">
      <div className="container-responsive">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            {t('home.hotSerials')}
          </h2>
          <Link 
            href={`/${locale}/rankings`}
            className="text-sm md:text-base text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            {t('common.viewAll')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Comics Grid */}
        {/* Mobile: 2 columns, vertical scroll */}
        {/* Tablet: 3×2 grid (6 items) */}
        {/* Desktop: 6×2 grid (12 items) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {comics.slice(0, 12).map((comic) => (
            <div key={comic.id}>
              <ComicCard comic={comic} size="medium" showRating />
            </div>
          ))}
        </div>

        {/* Load More Button - Mobile Only */}
        <div className="md:hidden mt-6 text-center">
          <Link
            href={`/${locale}/rankings`}
            className="inline-block px-6 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            {t('common.loadMore')}
          </Link>
        </div>
      </div>
    </section>
  );
}

