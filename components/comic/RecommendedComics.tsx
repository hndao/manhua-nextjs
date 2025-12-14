'use client';

import { useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import ComicCard from '@/components/common/ComicCard';

interface RecommendedComicsProps {
  comics: Comic[];
}

export default function RecommendedComics({ comics }: RecommendedComicsProps) {
  const t = useTranslations();

  if (comics.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-3 md:px-6 lg:px-10 py-6 md:py-8 lg:py-10">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
          {t('comic.youMayLike')}
        </h2>
        
        {/* Responsive Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {comics.map((comic) => (
            <ComicCard
              key={comic.id}
              comic={comic}
              size="small"
              showStatus={false}
              showRating={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

