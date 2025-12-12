'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import { getImageUrl } from '@/lib/utils';

interface ComicCardProps {
  comic: Comic;
  size?: 'small' | 'medium' | 'large';
  showStatus?: boolean;
  showRating?: boolean;
}

export default function ComicCard({ 
  comic, 
  size = 'medium',
  showStatus = true,
  showRating = false 
}: ComicCardProps) {
  const locale = useLocale();
  const t = useTranslations();

  // Responsive sizes based on breakpoint
  // Mobile: 105×140px, Tablet: 165×220px, Desktop: 210×280px
  const sizeClasses = {
    small: 'w-[105px] h-[140px] md:w-[140px] md:h-[187px] lg:w-[165px] lg:h-[220px]',
    medium: 'w-[105px] h-[140px] md:w-[165px] md:h-[220px] lg:w-[210px] lg:h-[280px]',
    large: 'w-[120px] h-[160px] md:w-[180px] md:h-[240px] lg:w-[240px] lg:h-[320px]',
  };

  return (
    <Link 
      href={`/${locale}/comic/${comic.slug}`}
      className="group block"
    >
      <div className="flex flex-col">
        {/* Comic Cover */}
        <div className={`${sizeClasses[size]} relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0`}>
          <Image
            src={getImageUrl(comic.cover_image)}
            alt={comic.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 105px, (max-width: 1440px) 165px, 210px"
          />
          
          {/* Status Badge */}
          {showStatus && comic.status && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-xs rounded">
              {t(`status.${comic.status}`)}
            </div>
          )}

          {/* Hot/Featured Badge */}
          {comic.featured && (
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded">
              {t('common.hot')}
            </div>
          )}

          {/* Chapter Count Overlay */}
          {comic.chapters_count > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
              <p className="text-white text-xs truncate">
                {comic.chapters_count} {t('comic.chapters')}
              </p>
            </div>
          )}
        </div>

        {/* Comic Info */}
        <div className="mt-2 flex-1">
          <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {comic.title}
          </h3>
          
          {/* Author */}
          {comic.authors && comic.authors.length > 0 && (
            <p className="text-xs text-gray-500 mt-1 truncate">
              {comic.authors[0].name}
            </p>
          )}

          {/* Rating */}
          {showRating && comic.average_rating > 0 && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-xs text-gray-600 ml-1">{comic.average_rating.toFixed(1)}</span>
              </div>
            </div>
          )}

          {/* Views */}
          {comic.total_views > 0 && (
            <p className="text-xs text-gray-400 mt-1">
              {comic.total_views.toLocaleString()} {t('comic.views')}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}

