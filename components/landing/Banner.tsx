'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Comic } from '@/types/comic';
import { getImageUrl } from '@/lib/utils';

interface BannerProps {
  comics: Comic[];
  autoPlayInterval?: number;
}

export default function Banner({ comics, autoPlayInterval = 5000 }: BannerProps) {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || comics.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % comics.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, comics.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + comics.length) % comics.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % comics.length);
    setIsAutoPlaying(false);
  };

  if (!comics || comics.length === 0) {
    return null;
  }

  const currentComic = comics[currentIndex];

  return (
    <div className="relative w-full overflow-hidden bg-gray-900">
      {/* Banner Container - Responsive Heights */}
      {/* Mobile: 160px, Tablet: 260px, Desktop: 320px */}
      <div className="relative h-[160px] md:h-[260px] lg:h-[320px]">
        {/* Slides */}
        <div className="relative h-full">
          {comics.map((comic, index) => (
            <div
              key={comic.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Link href={`/${locale}/comic/${comic.slug}`}>
                <div className="relative h-full w-full">
                  <Image
                    src={getImageUrl(comic.banner_image || comic.cover_image)}
                    alt={comic.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                    sizes="100vw"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  
                  {/* Content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container-responsive">
                      <div className="max-w-xl">
                        <h2 className="text-white text-xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 line-clamp-2">
                          {comic.title}
                        </h2>
                        <p className="text-white/90 text-xs md:text-sm lg:text-base line-clamp-2 md:line-clamp-3 mb-3 md:mb-6">
                          {comic.description}
                        </p>
                        <button className="px-4 md:px-6 lg:px-8 py-2 md:py-2.5 lg:py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base rounded-lg transition-colors">
                          Read Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Arrow Controls - Desktop & Tablet Only */}
        {comics.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
              aria-label="Previous slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors z-10"
              aria-label="Next slide"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {comics.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {comics.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white w-6 md:w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

