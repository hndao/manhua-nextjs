import Link from 'next/link';

export default function Footer() {
  const footerLinks = [
    { label: '关于我们', labelEn: 'About Us', href: '/about' },
    { label: '联系方式', labelEn: 'Contact', href: '/contact' },
    { label: '使用条款', labelEn: 'Terms', href: '/terms' },
    { label: '隐私政策', labelEn: 'Privacy', href: '/privacy' },
  ];

  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      {/* Desktop Footer */}
      <div className="hidden lg:block">
        <div className="container-responsive py-12">
          <div className="flex justify-between items-start">
            {/* Links Section */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Footer Links</h3>
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                {footerLinks.map((link, index) => (
                  <span key={link.href}>
                    <Link href={link.href} className="hover:text-gray-900">
                      {link.label}
                    </Link>
                    {index < footerLinks.length - 1 && (
                      <span className="ml-4">|</span>
                    )}
                  </span>
                ))}
              </div>
              <div className="mt-6 text-xs text-gray-500">
                © 2025 Manhua Platform. All rights reserved.
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
      </div>

      {/* Tablet Footer */}
      <div className="hidden md:block lg:hidden">
        <div className="container-responsive py-8">
          <div className="text-center">
            <div className="flex justify-center gap-3 text-xs text-gray-600 mb-4">
              {footerLinks.map((link, index) => (
                <span key={link.href}>
                  <Link href={link.href} className="hover:text-gray-900">
                    {link.label}
                  </Link>
                  {index < footerLinks.length - 1 && (
                    <span className="ml-3">|</span>
                  )}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              © 2025 Manhua Platform. All rights reserved.
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden">
        <div className="px-3 py-6">
          <div className="text-center">
            <div className="flex justify-center gap-2 text-xs text-gray-600 mb-3">
              {footerLinks.slice(0, 3).map((link, index) => (
                <span key={link.href}>
                  <Link href={link.href} className="hover:text-gray-900">
                    {link.label}
                  </Link>
                  {index < 2 && <span className="ml-2">|</span>}
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500">
              © 2025 Manhua Platform
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

