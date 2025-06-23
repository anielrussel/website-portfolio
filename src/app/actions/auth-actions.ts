'use server';

import { z } from 'zod';

import { loginSchema } from '@/schema/auth-schema';
import { ApiDataResponse, postData } from '@/types/api-response';

export async function loginAsync(
    request: z.infer<typeof loginSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/auth/login', '', {
        ...request,
    });

    return record;
}
