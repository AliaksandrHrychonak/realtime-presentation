import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest): NextResponse<unknown> {
    const path = request.nextUrl.pathname;

    const sessionData = request.cookies.get('session-store')?.value;
    const isAuthenticated = sessionData && JSON.parse(sessionData).state?.isAuthenticated;

    if (!path.startsWith('/auth') && !isAuthenticated) {
        return NextResponse.redirect(new URL('/auth', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
