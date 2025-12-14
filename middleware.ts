import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Get locale from query parameter, cookie, or use default
  const localeFromQuery = searchParams.get('locale');
  const localeFromCookie = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = localeFromQuery || localeFromCookie || routing.defaultLocale;

  // Validate locale
  const validLocale = routing.locales.includes(locale as any) ? locale : routing.defaultLocale;

  // Rewrite to include locale in the path internally
  const url = request.nextUrl.clone();
  url.pathname = `/${validLocale}${pathname}`;

  const response = NextResponse.rewrite(url);

  // Set cookie if locale was provided via query parameter
  if (localeFromQuery && routing.locales.includes(localeFromQuery as any)) {
    response.cookies.set('NEXT_LOCALE', localeFromQuery, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }

  return response;
}

export const config = {
  // Match all pathnames except static files and API routes
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

