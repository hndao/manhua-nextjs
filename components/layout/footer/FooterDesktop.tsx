'use client';

import Link from 'next/link';
import { useFooterLogic } from '@/lib/hooks/useFooterLogic';

/**
 * FooterDesktop - Desktop footer component (>= 1440px)
 * - Full layout with QR code
 * - Shows all links
 * - Spacious padding
 */
export default function FooterDesktop() {
  const { t, footerLinks } = useFooterLogic();

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container-responsive py-12">
        <div className="flex justify-between items-start">
          {/* Links Section */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Footer Links</h3>
            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
              {footerLinks.map((link, index) => (
                <span key={link.href}>
                  <Link href={link.href} className="hover:text-gray-900">
                    {t(link.labelKey)}
                  </Link>
                  {index < footerLinks.length - 1 && (
                    <span className="ml-4">|</span>
                  )}
                </span>
              ))}
            </div>
            <div className="mt-6 text-xs text-gray-500">
              {t('footer.copyright')}
            </div>
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 border border-gray-300 rounded flex items-center justify-center bg-gray-50">
              <span className="text-xs text-gray-500">APP QR</span>
            </div>
            <p className="mt-2 text-xs text-gray-600">扫码下载APP</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

