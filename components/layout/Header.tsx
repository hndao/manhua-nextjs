'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const switchLocale = (newLocale: Locale) => {
    const url = new URL(window.location.href);
    url.searchParams.set('locale', newLocale);
    window.location.href = url.toString();
  };

  const navItems = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.rankings', href: '/rankings' },
    { labelKey: 'nav.genres', href: '/genres' },
    { labelKey: 'nav.news', href: '/news' },
    { labelKey: 'nav.ipZone', href: '/ip' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Desktop & Tablet Header */}
      <div className="hidden md:block">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center">
              <div className="w-20 h-10 lg:w-24 lg:h-12 border border-gray-300 rounded flex items-center justify-center">
                <span className="text-xs lg:text-sm font-bold">LOGO</span>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-6">
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
            <div className="flex-1 max-w-xs lg:max-w-sm mx-4 lg:mx-8">
              <input
                type="search"
                placeholder={t('common.searchPlaceholder')}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Language Switcher */}
            <select
              value={locale}
              onChange={(e) => switchLocale(e.target.value as Locale)}
              className="px-2 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2"
            >
              {locales.map((loc) => (
                <option key={loc} value={loc}>
                  {localeNames[loc]}
                </option>
              ))}
            </select>

            {/* Login Button */}
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              {t('nav.login')}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between h-14 px-3">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center">
            <div className="w-20 h-8 border border-gray-300 rounded flex items-center justify-center">
              <span className="text-xs font-bold">LOGO</span>
            </div>
          </Link>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-6 h-5 flex flex-col justify-between"
            aria-label="Toggle menu"
          >
            <span className="w-full h-0.5 bg-gray-600"></span>
            <span className="w-full h-0.5 bg-gray-600"></span>
            <span className="w-full h-0.5 bg-gray-600"></span>
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-3 pb-3">
          <input
            type="search"
            placeholder={t('common.searchPlaceholder')}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                {/* Language Switcher - Mobile */}
                <div className="px-4 py-2">
                  <label className="text-xs text-gray-600 mb-1 block">{t('user.language')}</label>
                  <select
                    value={locale}
                    onChange={(e) => switchLocale(e.target.value as Locale)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {locales.map((loc) => (
                      <option key={loc} value={loc}>
                        {localeNames[loc]}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50">
                  {t('nav.login')}
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

