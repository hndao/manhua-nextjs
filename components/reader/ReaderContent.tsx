'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Page } from '@/types/comic';
import { getPlaceholderImage } from '@/lib/utils/image';

interface ReaderContentProps {
  pages: Page[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onClick: () => void;
  isDarkMode: boolean;
}

export default function ReaderContent({
  pages,
  currentPage,
  onPageChange,
  onClick,
  isDarkMode,
}: ReaderContentProps) {
  const t = useTranslations();
  const contentRef = useRef<HTMLDivElement>(null);

  // Set up Intersection Observer to track current page
  useEffect(() => {
    if (typeof window === 'undefined' || pages.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const pageIndex = parseInt(entry.target.getAttribute('data-page-index') || '0');
            onPageChange(pageIndex);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all page elements
    const pageElements = document.querySelectorAll('[data-page-index]');
    pageElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [pages.length, onPageChange]);

  if (pages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('chapter.noPages')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={contentRef}
      className="pt-12 md:pt-14 pb-32 md:pb-40 lg:pb-20"
    >
      {/* Vertical scroll mode - show all pages */}
      <div className="container mx-auto px-0 md:px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          {pages.map((page, index) => (
            <div
              key={page.id}
              data-page-index={index}
              className="relative mb-1 md:mb-2"
              onClick={onClick}
            >
              <Image
                src={page.image_url || getPlaceholderImage(page.width || 800, page.height || 1200)}
                alt={`Page ${page.page_number}`}
                width={page.width || 800}
                height={page.height || 1200}
                className="w-full h-auto"
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Page number indicator */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                {page.page_number}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

