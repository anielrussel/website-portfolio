'use server';

import { z } from 'zod';

import { socialLinkSchema } from '@/schema/social-link-schema';
import {
    ApiDataResponse,
    deleteData,
    getData,
    postData,
    putData,
} from '@/types/api-data/api-response';

export async function createSocialLinkAsync(
    request: z.infer<typeof socialLinkSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/sociallinks', '', {
        ...request,
    });

    return record;
}

export async function getSocialLinksAsync(): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>('/sociallinks', '');

    return record;
}

export async function getSocialLinkByIdAsync(
    id: number,
): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>(
        `/sociallinks/${id}`,
        '',
        {},
        {},
    );

    return record;
}

export async function updateSocialLinkAsync(
    SocialLinkId: number,
    request: z.infer<typeof socialLinkSchema>,
): Promise<ApiDataResponse> {
    const record = await putData<ApiDataResponse>(
        `/sociallinks/${SocialLinkId}`,
        '',
        {
            ...request,
        },
    );

    return record;
}

export async function deleteSocialLinkAsync(
    SocialLinkId: number,
): Promise<ApiDataResponse> {
    const record = await deleteData<ApiDataResponse>(
        `/sociallinks/${SocialLinkId}`,
        '',
        {},
    );

    return record;
}
