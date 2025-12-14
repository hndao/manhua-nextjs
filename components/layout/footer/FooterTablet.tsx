'use client';

import Link from 'next/link';
import { useFooterLogic } from '@/lib/hooks/useFooterLogic';

/**
 * FooterTablet - Tablet footer component (768px - 1439px)
 * - Centered layout
 * - Shows all links
 * - Medium padding
 */
export default function FooterTablet() {
  const { t, footerLinks } = useFooterLogic();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container-responsive py-8">
        <div className="text-center">
          <div className="flex justify-center gap-3 text-xs text-gray-600 mb-4">
            {footerLinks.map((link, index) => (
              <span key={link.href}>
                <Link href={link.href} className="hover:text-gray-900">
                  {t(link.labelKey)}
                </Link>
                {index < footerLinks.length - 1 && (
                  <span className="ml-3">|</span>
                )}
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

