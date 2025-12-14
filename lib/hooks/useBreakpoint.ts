'use client';

import { useState, useEffect } from 'react';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

/**
 * useBreakpoint - Hook to detect current screen breakpoint
 * 
 * Breakpoints (matching Tailwind config):
 * - Mobile: < 768px
 * - Tablet: 768px - 1439px
 * - Desktop: >= 1440px
 * 
 * Usage:
 * const breakpoint = useBreakpoint();
 * if (breakpoint === 'mobile') { ... }
 */
export function useBreakpoint(): Breakpoint {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1440) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    // Set initial breakpoint
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

/**
 * useIsMobile - Hook to check if current screen is mobile
 */
export function useIsMobile(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'mobile';
}

/**
 * useIsTablet - Hook to check if current screen is tablet
 */
export function useIsTablet(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'tablet';
}

/**
 * useIsDesktop - Hook to check if current screen is desktop
 */
export function useIsDesktop(): boolean {
  const breakpoint = useBreakpoint();
  return breakpoint === 'desktop';
}

