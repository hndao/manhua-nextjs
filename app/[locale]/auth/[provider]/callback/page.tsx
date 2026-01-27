'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { handleSocialAuthCallback } from '@/lib/api/auth';
import { useAuth } from '@/lib/contexts/AuthContext';

export default function SocialAuthCallbackPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const t = useTranslations('auth');
  const { setUserData } = useAuth();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const provider = params.provider as 'google' | 'facebook' | 'twitter';
        const code = searchParams.get('code');
        const state = searchParams.get('state');

        if (!code) {
          setError('No authorization code received');
          setProcessing(false);
          return;
        }

        // Handle the OAuth callback
        const response = await handleSocialAuthCallback(provider, code, state || undefined);

        // Check if verification is required
        if ('requires_verification' in response && response.requires_verification) {
          router.push(`/verify-email?email=${encodeURIComponent(response.email)}`);
        } else if ('user' in response) {
          // Login successful, update auth context
          setUserData(response.user);
          router.push('/');
        }
      } catch (err: any) {
        console.error('Social auth callback error:', err);
        setError(err.response?.data?.message || t('socialLogin.error'));
        setProcessing(false);
      }
    };

    handleCallback();
  }, [params.provider, searchParams, router, setUserData, t]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        {processing ? (
          <div>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Processing authentication...
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Please wait while we complete your login
            </p>
          </div>
        ) : (
          <div>
            <div className="text-red-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Authentication Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {error}
            </p>
            <button
              onClick={() => router.push('/login')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

