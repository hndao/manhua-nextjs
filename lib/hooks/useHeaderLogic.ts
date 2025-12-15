'use client';

import { useTranslations, useLocale } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n';
import { useAuth } from '@/lib/contexts/AuthContext';

/**
 * Shared hook for header logic
 * Used by all header variants (Mobile, Tablet, Desktop)
 */
export function useHeaderLogic() {
  const t = useTranslations();
  const locale = useLocale();
  const { user, isAuthenticated, logout } = useAuth();

  const switchLocale = (newLocale: Locale) => {
    const url = new URL(window.location.href);
    // Remove existing locale parameter if present
    url.searchParams.delete('locale');
    // Add new locale parameter
    url.searchParams.set('locale', newLocale);
    window.location.href = url.toString();
  };

  const navItems = [
    { labelKey: 'nav.home', href: '/' },
    { labelKey: 'nav.rankings', href: '/rankings' },
    { labelKey: 'nav.genres', href: '/genres' },
  ];

  return {
    t,
    locale,
    locales,
    localeNames,
    user,
    isAuthenticated,
    logout,
    switchLocale,
    navItems,
  };
}

