import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './lib/i18n-config';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

export default function middleware(req: NextRequest) {
  // Pass through next-intl unchanged. Admin auth is enforced inside the
  // /admin layout via getServerSession to keep the middleware lightweight.
  return intlMiddleware(req);
}

export const config = {
  // Skip API, _next, and static files
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
