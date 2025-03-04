import { NextRequest, NextResponse } from 'next/server';
import { getToken } from '@/lib/token';

export async function middleware(req: NextRequest) {
  const token = await getToken();
  const { pathname } = req.nextUrl;

  const protectedRoutes = ['/dashboard', '/profile'];

  // Redirect to login if trying to access protected routes without a token
  if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'], // Protect these routes
};
