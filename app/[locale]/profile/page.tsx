'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const t = useTranslations();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-200px)] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-8">{t('auth.myProfile')}</h1>

          <div className="space-y-6">
            {/* User Info */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">{t('auth.accountInfo')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.fullName')}
                  </label>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.email')}
                  </label>
                  <p className="text-gray-900">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('auth.memberSince')}
                  </label>
                  <p className="text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-semibold mb-4">{t('auth.quickLinks')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/bookmarks"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{t('user.myBookmarks')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('auth.viewBookmarks')}</p>
                </a>
                <a
                  href="/history"
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{t('nav.readingHistory')}</h3>
                  <p className="text-sm text-gray-600 mt-1">{t('auth.continueReading')}</p>
                </a>
              </div>
            </div>

            {/* Actions */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{t('auth.accountActions')}</h2>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors font-medium"
              >
                {t('nav.logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

