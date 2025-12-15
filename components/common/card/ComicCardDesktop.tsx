'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Comic } from '@/lib/types';
import { getImageUrl } from '@/lib/utils/image';

interface ComicCardDesktopProps {
  comic: Comic;
}

/**
 * ComicCardDesktop - Desktop comic card (>= 1440px)
 * - Vertical layout with hover effects
 * - Large image
 * - Detailed information
 * - Rich interactions
 */
export default function ComicCardDesktop({ comic }: ComicCardDesktopProps) {
  return (
    <Link
      href={`/comic/${comic.slug}`}
      className="group block bg-white rounded-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden"
    >
      {/* Comic Cover - Large with Hover Effect */}
      <div className="relative w-full aspect-[3/4] overflow-hidden">
        <Image
          src={getImageUrl(comic.cover_image)}
          alt={comic.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(min-width: 1440px) 20vw, 33vw"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-sm line-clamp-3">{comic.description}</p>
          </div>
        </div>

        {/* Status Badge */}
        {comic.status && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 text-white text-xs font-medium rounded-full">
            {comic.status}
          </div>
        )}

        {/* Hot Badge */}
        {comic.is_hot && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            HOT
          </div>
        )}
      </div>

      {/* Comic Info */}
      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {comic.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-1">
          {comic.author?.name}
        </p>

        {/* Genres */}
        {comic.genres && comic.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {comic.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full hover:bg-blue-100 transition-colors"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          {comic.total_views > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              {comic.total_views.toLocaleString()}
            </span>
          )}

          {comic.average_rating > 0 && (
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{comic.average_rating.toFixed(1)}</span>
              <span className="text-gray-400">({comic.total_ratings})</span>
            </span>
          )}
        </div>

        {/* Latest Chapter */}
        {comic.latest_chapter && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Latest:</span>
              <span className="text-blue-600 font-medium">
                Chapter {comic.latest_chapter.chapter_number}
              </span>
            </div>
            {comic.latest_chapter.updated_at && (
              <div className="text-xs text-gray-400 mt-1 text-right">
                {new Date(comic.latest_chapter.updated_at).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}

