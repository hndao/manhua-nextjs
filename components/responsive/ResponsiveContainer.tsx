'use client';

import { ReactNode } from 'react';

interface ResponsiveContainerProps {
  mobile?: ReactNode;
  tablet?: ReactNode;
  desktop?: ReactNode;
  children?: ReactNode;
}

/**
 * ResponsiveContainer - Renders different components based on screen size
 * 
 * Breakpoints (matching Tailwind config):
 * - Mobile: < 768px
 * - Tablet: 768px - 1439px
 * - Desktop: >= 1440px
 * 
 * Usage:
 * <ResponsiveContainer
 *   mobile={<MobileComponent />}
 *   tablet={<TabletComponent />}
 *   desktop={<DesktopComponent />}
 * />
 * 
 * Or use children for all breakpoints:
 * <ResponsiveContainer>
 *   <SharedComponent />
 * </ResponsiveContainer>
 */
export default function ResponsiveContainer({
  mobile,
  tablet,
  desktop,
  children,
}: ResponsiveContainerProps) {
  // If children is provided, render it for all breakpoints
  if (children) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Mobile: < 768px */}
      {mobile && (
        <div className="block md:hidden">
          {mobile}
        </div>
      )}

      {/* Tablet: 768px - 1439px */}
      {tablet && (
        <div className="hidden md:block xl:hidden">
          {tablet}
        </div>
      )}

      {/* Desktop: >= 1440px */}
      {desktop && (
        <div className="hidden xl:block">
          {desktop}
        </div>
      )}
    </>
  );
}

