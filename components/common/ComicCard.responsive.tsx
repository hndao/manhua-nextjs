'use client';

import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import ComicCardMobile from './card/ComicCardMobile';
import ComicCardTablet from './card/ComicCardTablet';
import ComicCardDesktop from './card/ComicCardDesktop';
import { Comic } from '@/types/comic';

interface ComicCardProps {
  comic: Comic;
}

/**
 * ComicCard - Responsive comic card component
 * 
 * Renders different layouts based on screen size:
 * - Mobile (< 768px): Horizontal compact layout
 * - Tablet (768px - 1439px): Vertical medium layout
 * - Desktop (>= 1440px): Vertical large layout with rich interactions
 * 
 * Usage:
 * <ComicCard comic={comic} />
 */
export default function ComicCard({ comic }: ComicCardProps) {
  return (
    <ResponsiveContainer
      mobile={<ComicCardMobile comic={comic} />}
      tablet={<ComicCardTablet comic={comic} />}
      desktop={<ComicCardDesktop comic={comic} />}
    />
  );
}

