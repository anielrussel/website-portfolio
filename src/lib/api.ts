import axios from 'axios';

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
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        return Promise.reject(error);
    },
);
