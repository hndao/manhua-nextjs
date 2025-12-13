'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Comic } from '@/types/comic';
import { getPlaceholderImage } from '@/lib/utils/image';

interface RankingsProps {
  overall: Comic[];
  male: Comic[];
  female: Comic[];
  newComics: Comic[];
}

type TabType = 'overall' | 'male' | 'female' | 'new';

export default function Rankings({ overall, male, female, newComics }: RankingsProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<TabType>('overall');

  const tabs: { key: TabType; label: string }[] = [
    { key: 'overall', label: t('rankings.overall') },
    { key: 'male', label: t('rankings.male') },
    { key: 'female', label: t('rankings.female') },
    { key: 'new', label: t('rankings.new') },
  ];

  const getCurrentComics = () => {
    switch (activeTab) {
      case 'overall':
        return overall;
      case 'male':
        return male;
      case 'female':
        return female;
      case 'new':
        return newComics;
      default:
        return overall;
    }
  };

  const currentComics = getCurrentComics().slice(0, 5);

  return (
    <section className="py-6 md:py-8 lg:py-10 bg-gray-50">
      <div className="container-responsive">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            {t('home.rankings')}
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

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-sm md:text-base font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Rankings List */}
        <div className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-200">
          {currentComics.map((comic, index) => (
            <Link
              key={comic.id}
              href={`/${locale}/comic/${comic.slug}`}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 hover:bg-gray-50 transition-colors group"
            >
              {/* Rank Number */}
              <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-bold text-sm md:text-base ${
                index === 0 ? 'text-yellow-500' :
                index === 1 ? 'text-gray-400' :
                index === 2 ? 'text-orange-600' :
                'text-gray-500'
              }`}>
                {index + 1}
              </div>

              {/* Thumbnail */}
              <div className="relative w-12 h-16 md:w-14 md:h-20 flex-shrink-0 rounded overflow-hidden bg-gray-100">
                <Image
                  src={comic.cover_image || getPlaceholderImage()}
                  alt={comic.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 48px, 56px"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {comic.title}
                </h3>
                {comic.authors && comic.authors.length > 0 && (
                  <p className="text-xs md:text-sm text-gray-500 mt-1 truncate">
                    {comic.authors[0].name}
                  </p>
                )}
                {comic.chapters_count > 0 && (
                  <p className="text-xs text-gray-400 mt-1 truncate">
                    {comic.chapters_count} {t('comic.chapters')}
                  </p>
                )}
              </div>

              {/* Rating */}
              {comic.average_rating > 0 && (
                <div className="flex-shrink-0 flex items-center gap-1">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                  <span className="text-sm md:text-base font-medium text-gray-700">
                    {comic.average_rating.toFixed(1)}
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

