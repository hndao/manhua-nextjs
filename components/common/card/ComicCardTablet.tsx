'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Comic } from '@/lib/types';
import { getImageUrl } from '@/lib/utils/image';

interface ComicCardTabletProps {
  comic: Comic;
}

/**
 * ComicCardTablet - Tablet comic card (768px - 1439px)
 * - Vertical layout
 * - Medium image
 * - Balanced information
 */
export default function ComicCardTablet({ comic }: ComicCardTabletProps) {
  return (
    <Link
      href={`/comic/${comic.slug}`}
      className="block bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow overflow-hidden"
    >
      {/* Comic Cover - Medium */}
      <div className="relative w-full aspect-[3/4]">
        <Image
          src={getImageUrl(comic.cover_image)}
          alt={comic.title}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 33vw, 50vw"
        />
        
        {/* Status Badge */}
        {comic.status && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
            {comic.status}
          </div>
        )}
      </div>

      {/* Comic Info */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">
          {comic.title}
        </h3>
        
        <p className="text-xs text-gray-600 mb-2 line-clamp-1">
          {comic.author?.name}
        </p>

        {/* Genres */}
        {comic.genres && comic.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {comic.genres.slice(0, 2).map((genre) => (
              <span
                key={genre.id}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          {comic.total_views > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {comic.total_views.toLocaleString()}
            </span>
          )}

          {comic.average_rating > 0 && (
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {comic.average_rating.toFixed(1)}
            </span>
          )}
        </div>

        {/* Latest Chapter */}
        {comic.latest_chapter && (
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-blue-600">
            Chapter {comic.latest_chapter.chapter_number}
          </div>
        )}
      </div>
    </Link>
  );
}

