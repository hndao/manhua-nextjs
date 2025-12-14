'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { searchComics } from '@/lib/api/comics';
import { Comic } from '@/types/comic';
import Link from 'next/link';
import Image from 'next/image';

interface SearchBarProps {
  variant?: 'mobile' | 'tablet' | 'desktop';
  className?: string;
}

export default function SearchBar({ variant = 'desktop', className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Comic[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchComics(query);
        setSuggestions(results.slice(0, 5)); // Show top 5 suggestions
        setIsOpen(true);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleSuggestionClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  const inputClasses = {
    mobile: 'w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500',
    tablet: 'w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
    desktop: 'w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('common.searchPlaceholder')}
            className={inputClasses[variant]}
          />
          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <p className="text-xs text-gray-500 px-2 py-1 font-semibold">
              {t('search.suggestions')}
            </p>
            {suggestions.map((comic) => (
              <Link
                key={comic.id}
                href={`/comic/${comic.slug}`}
                onClick={handleSuggestionClick}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="relative w-12 h-16 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                  <Image
                    src={comic.cover_image || 'https://placehold.co/120x160/e2e8f0/64748b?text=No+Cover'}
                    alt={comic.title}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {comic.title}
                  </h4>
                  {comic.authors && comic.authors.length > 0 && (
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {comic.authors.map(a => a.name).join(', ')}
                    </p>
                  )}
                  {comic.chapters_count !== undefined && (
                    <p className="text-xs text-gray-400">
                      {comic.chapters_count} {t('comic.chapters')}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
          {suggestions.length >= 5 && (
            <Link
              href={`/search?q=${encodeURIComponent(query)}`}
              onClick={handleSuggestionClick}
              className="block text-center py-2 text-sm text-blue-600 hover:bg-gray-50 border-t border-gray-200 font-medium"
            >
              {t('search.viewAllResults')} →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

