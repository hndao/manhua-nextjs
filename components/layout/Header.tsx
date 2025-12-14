import ResponsiveContainer from '@/components/responsive/ResponsiveContainer';
import HeaderMobile from './header/HeaderMobile';
import HeaderTablet from './header/HeaderTablet';
import HeaderDesktop from './header/HeaderDesktop';

/**
 * Header Component - Responsive header that renders different layouts for mobile, tablet, and desktop
 *
 * Breakpoints:
 * - Mobile: < 768px - Hamburger menu with full-screen navigation
 * - Tablet: 768px - 1439px - Compact navigation with dropdown menu
 * - Desktop: >= 1440px - Full navigation with all links visible
 *
 * Features:
 * - Authentication (login/register/logout)
 * - Language switcher (en/vi/zh)
 * - Search bar
 * - User dropdown menu
 * - Navigation links
 */
export default function Header() {

  return (
    <ResponsiveContainer
      mobile={<HeaderMobile />}
      tablet={<HeaderTablet />}
      desktop={<HeaderDesktop />}
    />
  );
}

