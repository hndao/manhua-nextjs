'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useHeaderLogic } from '@/lib/hooks/useHeaderLogic';
import SearchBar from '@/components/common/SearchBar';

/**
 * HeaderDesktop - Desktop header component (>= 1440px)
 * - Full horizontal navigation with all links visible
 * - User dropdown menu
 * - Spacious layout
 * - Language switcher
 */
export default function HeaderDesktop() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const {
    t,
    locale,
    locales,
    localeNames,
    user,
    isAuthenticated,
    logout,
    switchLocale,
    navItems,
  } = useHeaderLogic();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <div className="w-24 h-12 border border-gray-300 rounded flex items-center justify-center">
              <span className="text-sm font-bold">LOGO</span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-sm mx-8">
            <SearchBar variant="desktop" />
          </div>

          {/* Language Switcher */}
          <select
            value={locale}
            onChange={(e) => switchLocale(e.target.value as any)}
            className="px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
          >
            {locales.map((loc) => (
              <option key={loc} value={loc}>
                {localeNames[loc]}
              </option>
            ))}
          </select>

          {/* Auth Section */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                <span>{user.name}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t('nav.myProfile')}
                  </Link>
                  <Link
                    href="/bookmarks"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t('nav.bookmarks')}
                  </Link>
                  <Link
                    href="/history"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    {t('nav.readingHistory')}
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                href="/login"
                className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                {t('nav.login')}
              </Link>
              <Link
                href="/register"
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {t('nav.register')}
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

