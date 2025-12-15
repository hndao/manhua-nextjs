'use client';

import { useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface RankingsPageDesktopProps {
  activeTab: 'popular' | 'topRated' | 'newReleases';
  comics: Comic[];
  onTabChange: (tab: 'popular' | 'topRated' | 'newReleases') => void;
}

export default function RankingsPageDesktop({
  activeTab,
  comics,
  onTabChange,
}: RankingsPageDesktopProps) {
  const t = useTranslations();
  const [period, setPeriod] = useState('week');
  const [sortBy, setSortBy] = useState('popularity');
  const [category, setCategory] = useState('all');
  const [onlyOngoing, setOnlyOngoing] = useState(false);
  const [onlyCompleted, setOnlyCompleted] = useState(false);

  const tabs = [
    { id: 'popular' as const, label: t('rankings.tabs.popular') },
    { id: 'topRated' as const, label: t('rankings.tabs.topRated') },
    { id: 'newReleases' as const, label: t('rankings.tabs.newReleases') },
  ];

  // Split comics into top 10 and rest
  const top10 = comics.slice(0, 10);
  const moreComics = comics.slice(10);

  return (
    <div className="py-8 bg-white">
      <div className="container-responsive">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t('rankings.title')}</h1>

      {/* Tabs Row */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-6 py-2 text-sm rounded-full transition-colors ${
                activeTab === tab.id
                  ? 'bg-white border-2 border-gray-900 text-gray-900 font-medium'
                  : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Period dropdown */}
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">{t('rankings.filters.thisWeek')}</option>
            <option value="month">{t('rankings.filters.thisMonth')}</option>
            <option value="all">{t('rankings.filters.allTime')}</option>
          </select>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">{t('rankings.filters.byPopularity')}</option>
            <option value="rating">{t('rankings.filters.byRating')}</option>
            <option value="latest">{t('rankings.filters.byLatest')}</option>
          </select>

          {/* Category dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{t('rankings.filters.allCategories')}</option>
            <option value="action">{t('rankings.filters.action')}</option>
            <option value="romance">{t('rankings.filters.romance')}</option>
            <option value="fantasy">{t('rankings.filters.fantasy')}</option>
          </select>

          <div className="flex-1"></div>

          {/* Toggle pills */}
          <button
            onClick={() => {
              setOnlyOngoing(!onlyOngoing);
              if (!onlyOngoing) setOnlyCompleted(false);
            }}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              onlyOngoing
                ? 'bg-white border-2 border-gray-900 text-gray-900'
                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('rankings.filters.onlyOngoing')}

          </button>

          <button
            onClick={() => {
              setOnlyCompleted(!onlyCompleted);
              if (!onlyCompleted) setOnlyOngoing(false);
            }}
            className={`px-4 py-2 text-sm rounded-full transition-colors ${
              onlyCompleted
                ? 'bg-white border-2 border-gray-900 text-gray-900'
                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {t('rankings.filters.onlyCompleted')}
          </button>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="flex gap-6">
        {/* Left Column: Top 10 */}
        <div className="w-[420px] bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Top 10</h2>
          <div className="space-y-4">
            {top10.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {t('rankings.noComics')}
              </div>
            ) : (
              top10.map((comic, index) => (
                <Link
                  key={comic.id}
                  href={`/comic/${comic.slug}`}
                  className={`flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all ${
                    index === 0 ? 'h-[120px]' : 'h-[92px]'
                  }`}
                >
                  {/* Rank Number */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span
                      className={`text-xl font-bold ${
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
                  <div
                    className={`flex-shrink-0 relative bg-gray-100 rounded overflow-hidden ${
                      index === 0 ? 'w-20 h-[100px]' : 'w-16 h-[72px]'
                    }`}
                  >
                    <Image
                      src={comic.cover_image || '/placeholder-comic.svg'}
                      alt={comic.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Comic Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-gray-900 mb-1 truncate ${index === 0 ? 'text-base' : 'text-sm'}`}>
                      {comic.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-1">
                      {activeTab === 'popular' && `${t('rankings.views')}: ${comic.total_views?.toLocaleString()}`}
                      {activeTab === 'topRated' && comic.average_rating && `⭐ ${comic.average_rating}`}
                      {' · '}
                      {comic.chapters_count || 0} {t('rankings.chapters')}
                    </p>
                    {index === 0 && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {comic.genres?.map((g) => g.name).join(' · ')}
                      </p>
                    )}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Middle Column: More Rankings */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">{t('rankings.more')}</h2>
          </div>
          <div className="space-y-3">
            {moreComics.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                {t('rankings.noMoreComics')}
              </div>
            ) : (
              moreComics.map((comic, index) => (
                <Link
                  key={comic.id}
                  href={`/comic/${comic.slug}`}
                  className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all h-[84px]"
                >
                  {/* Rank Number */}
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-sm font-medium text-gray-600">{index + 11}</span>
                  </div>

                  {/* Cover Image */}
                  <div className="flex-shrink-0 w-[60px] h-[70px] relative bg-gray-100 rounded overflow-hidden">
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
                    <p className="text-xs text-gray-600">
                      {activeTab === 'popular' && `${t('rankings.views')}: ${comic.total_views?.toLocaleString()}`}
                      {activeTab === 'topRated' && comic.average_rating && `⭐ ${comic.average_rating}`}
                      {' · '}
                      {comic.chapters_count || 0} {t('rankings.chapters')}
                      {' · '}
                      {comic.genres?.[0]?.name}
                    </p>
                  </div>

                  {/* Details Button */}
                  <button className="flex-shrink-0 px-4 py-1.5 text-xs border border-gray-300 rounded hover:bg-gray-50">
                    {t('common.details')}
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Sidebar */}
        <div className="w-[260px] space-y-6">
          {/* Hot Tags */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('rankings.sidebar.hotTags')}</h3>
            <div className="flex flex-wrap gap-2">
              {['Action', 'Romance', 'Fantasy', 'Comedy'].map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1.5 text-xs bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recently Updated */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{t('rankings.sidebar.recentlyUpdated')}</h3>
            <div className="space-y-3">
              {comics.slice(0, 3).map((comic) => (
                <Link key={comic.id} href={`/comic/${comic.slug}`} className="flex gap-2 hover:bg-gray-50 p-1 rounded">
                  <div className="flex-shrink-0 w-[50px] h-[70px] relative bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={comic.cover_image || '/placeholder-comic.svg'}
                      alt={comic.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate">{comic.title}</p>
                    <p className="text-xs text-gray-500">{t('rankings.updated')} {comic.chapters_count}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

