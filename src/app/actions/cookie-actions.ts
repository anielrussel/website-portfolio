'use server';

import { cookies } from 'next/headers';

import {
    REFRESHTOKENKEYCOOKIENAME,
    TOKENKEYCOOKIENAME,
    USERIDCOOKIENAME,
} from '@/lib/constants';

export async function setCookie(cookieName: string, cookieValue: string) {
    const cookieStore = await cookies();

    cookieStore.set({
        name: cookieName,
        value: cookieValue,
        path: '/', // default path
        httpOnly: true, // recommended for auth/session cookies
        secure: process.env.NODE_ENV === 'production', // Only use HTTPS in production
        sameSite: 'lax',
    });
}

export async function setAuthCookies(
    id: string,
    token: string,
    refreshToken: string,
) {
    await setCookie(TOKENKEYCOOKIENAME, token);

    await setCookie(REFRESHTOKENKEYCOOKIENAME, refreshToken);

    await setCookie(USERIDCOOKIENAME, id);
}

export async function getCookie(name: string) {
    const cookieStore = await cookies();

    cookieStore.get(name)?.value;
}

export async function deleteCookie(cookieName: string | string[]) {
    const cookieStore = await cookies();

    if (Array.isArray(cookieName)) {
        Promise.all(cookieName.map((cookie) => cookieStore.delete(cookie)));
    } else {
        cookieStore.delete(cookieName);
    }
}
