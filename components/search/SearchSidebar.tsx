'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

export default function SearchSidebar() {
  const t = useTranslations();
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      try {
        setRecentSearches(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recent searches:', e);
      }
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const trendingTags = [
    { label: t('search.trending.action'), slug: 'action' },
    { label: t('search.trending.romance'), slug: 'romance' },
    { label: t('search.trending.fantasy'), slug: 'fantasy' },
    { label: t('search.trending.comedy'), slug: 'comedy' },
    { label: t('search.trending.drama'), slug: 'drama' },
    { label: t('search.trending.adventure'), slug: 'adventure' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">{t('search.sidebar.title')}</h2>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-700">
              {t('search.recentSearches')}
            </h3>
            <button
              onClick={clearHistory}
              className="text-xs text-gray-500 hover:text-gray-700"
            >
              {t('search.clearHistory')}
            </button>
          </div>
          <ul className="space-y-2">
            {recentSearches.slice(0, 5).map((search, index) => (
              <li key={index}>
                <a
                  href={`/search?q=${encodeURIComponent(search)}`}
                  className="text-sm text-gray-600 hover:text-gray-900 block"
                >
                  • {search}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Trending Tags */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          {t('search.trending.title')}
        </h3>
        <div className="flex flex-wrap gap-2">
          {trendingTags.map((tag) => (
            <a
              key={tag.slug}
              href={`/search?q=${encodeURIComponent(tag.label)}`}
              className="px-3 py-1.5 text-xs bg-gray-100 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {tag.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

