import { api, setBaseUrl } from '@/lib/api';
import axios from 'axios';

export type ApiDataResponse = {
    success: boolean;
    data: object | object[] | any;
    message: string;
    statusCode: number;
};

export const apiData = async <T>(
    method: string,
    url: string,
    data: unknown = {},
    params: unknown = {},
    headers: Record<string, string> = {},
    baseUrl: string,
): Promise<T> => {
    try {
        setBaseUrl(baseUrl);

        const response = await api<ApiDataResponse>({
            method,
            url,
            data,
            params,
            headers,
        });
        return response.data as T;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const errorData = error.response.data;
            const statusCode = error.response.status;

            if (statusCode >= 500) {
                const errorMessage =
                    errorData?.message || 'Internal Server Error';
                throw new Error(`ERROR_${statusCode}: ${errorMessage}`);
            }

            return errorData as T;
        }
        throw error;
    }
};

export const getData = async <T>(
    endPoint: string,
    baseURL: string = '',
    data: unknown = {},
    params: unknown = {},
    headers: Record<string, string> = {},
): Promise<T> => {
    return apiData<T>('get', endPoint, data, params, headers, baseURL);
};

export const postData = async <T>(
    endpoint: string,
    baseURL: string = '',
    data: unknown,
    headers: Record<string, string> = {},
): Promise<T> => {
    return apiData<T>('post', endpoint, data, {}, headers, baseURL);
};

export const putData = async <T>(
    endpoint: string,
    baseURL: string = '',
    data: unknown,
    headers: Record<string, string> = {},
): Promise<T> => {
    return apiData<T>('put', endpoint, data, {}, headers, baseURL);
};

export const deleteData = async <T>(
    endpoint: string,
    baseURL: string = '',
    data?: unknown,
    headers: Record<string, string> = {},
): Promise<T> => {
    return apiData<T>('delete', endpoint, data, {}, headers, baseURL);
};
