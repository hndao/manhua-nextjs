import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import FooterMobile from './footer/FooterMobile';
import FooterTablet from './footer/FooterTablet';
import FooterDesktop from './footer/FooterDesktop';

/**
 * Footer Component - Responsive footer that renders different layouts for mobile, tablet, and desktop
 *
 * Breakpoints:
 * - Mobile: < 768px - Compact layout with 3 links
 * - Tablet: 768px - 1439px - Centered layout with all links
 * - Desktop: >= 1440px - Full layout with QR code
 *
 * Features:
 * - Footer links (About, Contact, Terms, Privacy, Help)
 * - Copyright text
 * - QR code (desktop only)
 */
export default function Footer() {
  return (
    <ResponsiveContainer
      mobile={<FooterMobile />}
      tablet={<FooterTablet />}
      desktop={<FooterDesktop />}
    />
  );
}

