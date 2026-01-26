/**
 * useRecaptcha Hook
 * Loads and executes Google reCAPTCHA v3
 */

import { useEffect, useState, useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export function useRecaptcha() {
  const [isLoaded, setIsLoaded] = useState(false);
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  useEffect(() => {
    // Check if reCAPTCHA is already loaded
    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script when component unmounts
      const existingScript = document.querySelector(
        `script[src^="https://www.google.com/recaptcha/api.js"]`
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [siteKey]);

  /**
   * Execute reCAPTCHA and get token
   * @param action - The action name for this reCAPTCHA execution
   * @returns Promise<string> - The reCAPTCHA token
   */
  const executeRecaptcha = useCallback(
    async (action: string): Promise<string> => {
      if (!isLoaded || !siteKey) {
        throw new Error('reCAPTCHA not loaded or site key not configured');
      }

      try {
        const token = await window.grecaptcha.execute(siteKey, { action });
        return token;
      } catch (error) {
        console.error('reCAPTCHA execution failed:', error);
        throw error;
      }
    },
    [isLoaded, siteKey]
  );

  return {
    isLoaded,
    executeRecaptcha,
  };
}

