'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';

interface ComicDescriptionProps {
  comic: Comic;
}

export default function ComicDescription({ comic }: ComicDescriptionProps) {
  const t = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!comic.description) {
    return null;
  }

  const shouldTruncate = comic.description.length > 300;
  const displayText = isExpanded || !shouldTruncate 
    ? comic.description 
    : comic.description.substring(0, 300) + '...';

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-3 md:px-6 lg:px-10 py-6 md:py-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">
          {t('comic.introduction')}
        </h2>
        <div className="text-sm md:text-base text-gray-700 leading-relaxed">
          <p className="whitespace-pre-wrap">{displayText}</p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              {isExpanded ? t('common.showLess') : t('common.showMore')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

