'use client';

import Link from 'next/link';
import { useFooterLogic } from '@/lib/hooks/useFooterLogic';

/**
 * FooterMobile - Mobile footer component (< 768px)
 * - Compact layout
 * - Shows only first 3 links
 * - Minimal copyright text
 */
export default function FooterMobile() {
  const { t, footerLinks } = useFooterLogic();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="px-3 py-6">
        <div className="text-center">
          <div className="flex justify-center gap-2 text-xs text-gray-600 mb-3">
            {footerLinks.slice(0, 3).map((link, index) => (
              <span key={link.href}>
                <Link href={link.href} className="hover:text-gray-900">
                  {t(link.labelKey)}
                </Link>
                {index < 2 && <span className="ml-2">|</span>}
              </span>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            {t('footer.copyright')}
          </div>
        </div>
      </div>
    </footer>
  );
}

