import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === '/login') {
    return NextResponse.next();
  }

  // https://github.com/nextauthjs/next-auth/discussions/4265#discussioncomment-2611194
  const url = req.nextUrl.clone();

  // fetch here requires an absolute URL to the auth API route
  const response = await fetch(`${url.origin}/api/middleauth`, {
    headers: {
      'Content-Type': 'application/json',
      Cookie: req.headers.get('cookie') || '',
    },
    method: 'GET',
  });

  const { auth } = await response.json();

  // we patch the callback to send the user back to where auth was required
  url.search = new URLSearchParams(`return=${url}`).toString();
  url.pathname = `/login`;

  return !auth ? NextResponse.redirect(url) : NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon\..*|images|manifest\..*).*)',
  ],
};
