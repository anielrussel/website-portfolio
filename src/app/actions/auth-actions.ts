'use server';

import { z } from 'zod';

import { loginSchema, refreshTokenSchema } from '@/schema/auth-schema';
import { ApiDataResponse, postData } from '@/types/api-data/api-response';

export async function loginAsync(
    request: z.infer<typeof loginSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/auth/login', '', {
        ...request,
    });

    return record;
}

export async function refreshTokenAsync(
    request: z.infer<typeof refreshTokenSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/auth/refresh-token', '', {
        ...request,
    });

    return record;
}
