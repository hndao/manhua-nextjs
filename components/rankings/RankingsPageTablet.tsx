'use client';

import { useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface RankingsPageTabletProps {
  activeTab: 'popular' | 'topRated' | 'newReleases';
  comics: Comic[];
  onTabChange: (tab: 'popular' | 'topRated' | 'newReleases') => void;
}

export default function RankingsPageTablet({
  activeTab,
  comics,
  onTabChange,
}: RankingsPageTabletProps) {
  const t = useTranslations();
  const [period, setPeriod] = useState('week');
  const [sortBy, setSortBy] = useState('popularity');

  const tabs = [
    { id: 'popular' as const, label: t('rankings.tabs.popular') },
    { id: 'topRated' as const, label: t('rankings.tabs.topRated') },
    { id: 'newReleases' as const, label: t('rankings.tabs.newReleases') },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-bold text-gray-900 text-center">{t('rankings.title')}</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                  : 'bg-gray-100 border border-gray-300 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Row */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="week">{t('rankings.filters.thisWeek')}</option>
          <option value="month">{t('rankings.filters.thisMonth')}</option>
          <option value="all">{t('rankings.filters.allTime')}</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1.5 text-sm text-gray-900 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="popularity">{t('rankings.filters.byPopularity')}</option>
          <option value="rating">{t('rankings.filters.byRating')}</option>
          <option value="latest">{t('rankings.filters.byLatest')}</option>
        </select>
      </div>

      {/* Rankings Content - 2 Column Grid */}
      <div className="bg-white mx-6 my-4 rounded-lg border border-gray-200 p-6">
        {comics.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t('rankings.noComics')}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {comics.map((comic, index) => (
              <Link
                key={comic.id}
                href={`/comic/${comic.slug}`}
                className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all h-[96px]"
              >
                {/* Rank Number */}
                <div className="flex-shrink-0 w-6 text-center">
                  <span
                    className={`text-lg font-bold ${
                      index === 0
                        ? 'text-yellow-500'
                        : index === 1
                        ? 'text-gray-400'
                        : index === 2
                        ? 'text-orange-400'
                        : 'text-orange-600'
                    }`}
                  >
                    {index + 1}
                  </span>
                </div>

                {/* Cover Image */}
                <div className="flex-shrink-0 w-[72px] h-[84px] relative bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={comic.cover_image || '/placeholder-comic.svg'}
                    alt={comic.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Comic Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1 truncate">
                    {comic.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-1">
                    {activeTab === 'popular' && `${t('rankings.views')}: ${comic.total_views?.toLocaleString()}`}
                    {activeTab === 'topRated' && comic.average_rating && `⭐ ${comic.average_rating}`}
                    {' · '}
                    {comic.chapters_count || 0} {t('rankings.chapters')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {comics.length > 0 && (
          <div className="mt-6 text-center">
            <button className="px-12 py-2.5 text-sm border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
              {t('common.loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

