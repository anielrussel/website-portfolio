import { NextRequest, NextResponse } from 'next/server';

import {
    ADMIN_ROUTE,
    LOGIN_ROUTE,
    NOT_PROTECTED_ROUTES,
    REFRESHTOKENKEYCOOKIENAME,
    TOKENKEYCOOKIENAME,
    USERIDCOOKIENAME,
} from './lib/constants';

export function middleware(request: NextRequest) {
    let isAuthenticated = false;

    // Check if the user is authenticated by checking the cookies
    const token = request.cookies.get(TOKENKEYCOOKIENAME)?.value;
    const refreshToken = request.cookies.get(REFRESHTOKENKEYCOOKIENAME)?.value;
    const id = request.cookies.get(USERIDCOOKIENAME)?.value;

    if (token && refreshToken && id) {
        isAuthenticated = true;
    }

    // Handle redirection based on authentication status
    if (!isAuthenticated) {
        // If the user is not authenticated and tries to access a protected route, redirect to login
        if (!NOT_PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
            const response = NextResponse.redirect(
                new URL(LOGIN_ROUTE, request.url),
            );

            return response;
        }
    } else {
        // If the user is authenticated and tries to access a public route, redirect to home
        if (NOT_PROTECTED_ROUTES.includes(request.nextUrl.pathname)) {
            return NextResponse.redirect(new URL(ADMIN_ROUTE, request.url));
        }
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|images|assets|favicon.ico).*)',
    ],
};
