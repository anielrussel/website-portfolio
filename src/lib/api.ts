import axios from 'axios';

import { refreshTokenAsync } from '@/app/actions/auth-actions';
import {
    deleteCookie,
    getCookie,
    setAuthCookies,
} from '@/app/actions/cookie-actions';

import {
    REFRESHTOKENKEYCOOKIENAME,
    TOKENKEYCOOKIENAME,
    USERIDCOOKIENAME,
} from './constants';

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export const setBaseUrl = (
    url: string | undefined = process.env.NEXT_PUBLIC_API_URL,
) => {
    api.defaults.baseURL = url === '' ? process.env.NEXT_PUBLIC_API_URL : url;
};

api.interceptors.request.use(
    async (config) => {
        const token = await getCookie(TOKENKEYCOOKIENAME);

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Token refresh flag to prevent multiple refresh attempts
let isRefreshing = false;
// Store for requests to be executed after token refresh
let failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
    config: any;
}> = [];

// Process the queue of failed requests
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error);
        } else {
            request.config.headers['Authorization'] = `Bearer ${token}`;
            request.resolve(api(request.config));
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        let retry = false;
        console.log('Error config:', error.config);
        console.log('Error status:', error.response?.status);

        // If the error is 401 and we haven't already tried to refresh the token
        if (error.response?.status === 401 && !retry) {
            if (isRefreshing) {
                // If we're already refreshing, add the request to queue
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve,
                        reject,
                        config: originalRequest,
                    });
                });
            }

            retry = true;
            isRefreshing = true;

            try {
                const userId = await getCookie(USERIDCOOKIENAME);
                const rtk = await getCookie(REFRESHTOKENKEYCOOKIENAME);

                // If we don't have a refresh token or userId or email, redirect to login
                if (!userId || !rtk) {
                    console.log(
                        'Missing userId or refresh token, redirecting to login',
                    );
                    // Clear any invalid cookies before redirecting
                    await deleteCookie([
                        USERIDCOOKIENAME,
                        TOKENKEYCOOKIENAME,
                        REFRESHTOKENKEYCOOKIENAME,
                    ]);

                    return Promise.reject(error);
                }

                // const refreshToken = await getCookie(REFRESHTOKENKEYCOOKIENAME);

                const response = await refreshTokenAsync({
                    userId: parseInt(userId),
                    refreshToken: rtk,
                });

                // console.log('Refresh Token Response status:', response.success);

                if (response.success) {
                    console.log('Token refresh successful, setting new tokens');
                    await setAuthCookies(
                        userId,
                        response.data.token,
                        response.data.refreshToken,
                    );

                    // Update authorization header for the original request
                    originalRequest.headers['Authorization'] =
                        `Bearer ${response.data.token}`;

                    // Process any queued requests with the new token
                    processQueue(null, response.data.token);

                    return api(originalRequest);
                } else {
                    console.log(
                        'Token refresh failed with response:',
                        response,
                    );

                    throw new Error('Token refresh failed');
                }
            } catch (refreshError) {
                console.error('Error during token refresh:', refreshError);
                processQueue(refreshError, null);

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    },
);
