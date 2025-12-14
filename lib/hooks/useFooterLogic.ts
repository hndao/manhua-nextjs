import { useTranslations, useLocale } from 'next-intl';

/**
 * useFooterLogic - Shared logic for all footer variants (mobile, tablet, desktop)
 * 
 * Extracts common footer logic to avoid duplication across separated components
 */
export function useFooterLogic() {
  const t = useTranslations();
  const locale = useLocale();

  const footerLinks = [
    { labelKey: 'footer.about', href: '/about' },
    { labelKey: 'footer.contact', href: '/contact' },
    { labelKey: 'footer.terms', href: '/terms' },
    { labelKey: 'footer.privacy', href: '/privacy' },
    { labelKey: 'footer.help', href: '/help' },
  ];

  return {
    t,
    locale,
    footerLinks,
  };
}

