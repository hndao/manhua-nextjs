'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useHeaderLogic } from '@/lib/hooks/useHeaderLogic';
import SearchBar from '@/components/common/SearchBar';

export default function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <div className="flex items-center justify-between h-14 px-3">
        <Link href={`/${locale}`} className="flex items-center">
          <div className="w-20 h-8 border border-gray-300 rounded flex items-center justify-center">
            <span className="text-xs font-bold">LOGO</span>
          </div>
        </Link>
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
      <div className="px-3 pb-3">
        <SearchBar variant="mobile" />
      </div>
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
              <div className="px-4 py-2">
                <label className="text-xs text-gray-600 mb-1 block">{t('user.language')}</label>
                <select
                  value={locale}
                  onChange={(e) => switchLocale(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {locales.map((loc) => (
                    <option key={loc} value={loc}>
                      {localeNames[loc]}
                    </option>
                  ))}
                </select>
              </div>
              {isAuthenticated && user ? (
                <>
                  <Link href="/profile" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    👤 {user.name}
                  </Link>
                  <Link href="/bookmarks" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    📚 {t('nav.bookmarks')}
                  </Link>
                  <Link href="/history" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    📖 {t('nav.readingHistory')}
                  </Link>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full px-4 py-3 text-sm text-left text-red-600 hover:bg-gray-50">
                    🚪 {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.login')}
                  </Link>
                  <Link href="/register" className="block px-4 py-3 text-sm text-blue-600 font-medium hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
