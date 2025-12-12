'use client';

import { useTranslations } from 'next-intl';
import { Comic } from '@/types/comic';
import ComicCard from '@/components/common/ComicCard';

interface EditorPicksProps {
  comics: Comic[];
}

export default function EditorPicks({ comics }: EditorPicksProps) {
  const t = useTranslations();

  if (!comics || comics.length === 0) {
    return null;
  }

  return (
    <section className="py-6 md:py-8 lg:py-10">
      <div className="container-responsive">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900">
            {t('home.editorPicks')}
          </h2>
        </div>

        {/* Comics Grid */}
        {/* Mobile: 3 items horizontal scroll */}
        {/* Tablet: 4 items in 1 row */}
        {/* Desktop: 6 items in 1 row */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-3 px-3">
            <div className="flex gap-3 pb-2">
              {comics.slice(0, 6).map((comic) => (
                <div key={comic.id} className="flex-shrink-0">
                  <ComicCard comic={comic} size="small" />
                </div>
              ))}
            </div>
          </div>

          {/* Tablet & Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
            {comics.slice(0, 6).map((comic) => (
              <div key={comic.id}>
                <ComicCard comic={comic} size="medium" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

