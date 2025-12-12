'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: '首页', labelEn: 'Home', href: '/' },
    { label: '排行榜', labelEn: 'Rankings', href: '/rankings' },
    { label: '分类', labelEn: 'Categories', href: '/categories' },
    { label: '漫说', labelEn: 'Community', href: '/community' },
    { label: 'IP专区', labelEn: 'IP Zone', href: '/ip-zone' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Desktop & Tablet Header */}
      <div className="hidden md:block">
        <div className="container-responsive">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
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
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-xs lg:max-w-sm mx-4 lg:mx-8">
              <input
                type="search"
                placeholder="Search..."
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              登录
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <div className="flex items-center justify-between h-14 px-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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
            placeholder="Search..."
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
                  {item.label} / {item.labelEn}
                </Link>
              ))}
              <div className="border-t border-gray-200 mt-2 pt-2">
                <button className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50">
                  登录 / Login
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

