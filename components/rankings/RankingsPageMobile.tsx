'use client';

import { useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface RankingsPageMobileProps {
  activeTab: 'popular' | 'topRated' | 'newReleases';
  comics: Comic[];
  onTabChange: (tab: 'popular' | 'topRated' | 'newReleases') => void;
}

export default function RankingsPageMobile({
  activeTab,
  comics,
  onTabChange,
}: RankingsPageMobileProps) {
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
      <div className="bg-white border-b border-gray-200 px-4 py-3.5">
        <div className="flex items-center">
          <button className="text-gray-600 mr-3">←</button>
          <h1 className="text-base font-bold text-gray-900 flex-1 text-center">{t('rankings.title')}</h1>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-3 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
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
      <div className="bg-white border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:outline-none"
        >
          <option value="week">{t('rankings.filters.thisWeek')}</option>
          <option value="month">{t('rankings.filters.thisMonth')}</option>
          <option value="all">{t('rankings.filters.allTime')}</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-2 py-1 text-xs text-gray-900 border border-gray-300 rounded focus:outline-none"
        >
          <option value="popularity">{t('rankings.filters.byPopularity')}</option>
          <option value="rating">{t('rankings.filters.byRating')}</option>
          <option value="latest">{t('rankings.filters.byLatest')}</option>
        </select>
      </div>

      {/* Rankings List */}
      <div className="bg-white px-3 py-3 space-y-3">
        {comics.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            {t('rankings.noComics')}
          </div>
        ) : (
          comics.map((comic, index) => (
            <Link
              key={comic.id}
              href={`/comic/${comic.slug}`}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 active:bg-gray-50 transition-colors h-[92px]"
            >
              {/* Rank Number */}
              <div className="flex-shrink-0 w-6 text-center">
                <span
                  className={`text-base font-bold ${
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
              <div className="flex-shrink-0 w-16 h-20 relative bg-gray-100 rounded overflow-hidden">
                <Image
                  src={comic.cover_image || '/placeholder-comic.svg'}
                  alt={comic.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Comic Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-900 mb-1 line-clamp-2">
                  {comic.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {activeTab === 'popular' && `${t('rankings.views')}: ${(comic.total_views || 0) > 1000000
                    ? `${(comic.total_views / 1000000).toFixed(1)}M`
                    : (comic.total_views || 0) > 1000
                    ? `${(comic.total_views / 1000).toFixed(1)}K`
                    : comic.total_views}`}
                  {activeTab === 'topRated' && comic.average_rating && `⭐ ${comic.average_rating}`}
                  {' · '}
                  {t('rankings.updated')} {comic.chapters_count} {t('rankings.chapters')}
                </p>
              </div>
            </Link>
          ))
        )}

        {/* Load More Button */}
        {comics.length > 0 && (
          <div className="pt-3 text-center">
            <button className="px-10 py-2 text-xs border-2 border-gray-900 rounded-full hover:bg-gray-900 hover:text-white transition-colors">
              {t('common.loadMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

