'use server';

import { z } from 'zod';

import { profileSchema } from '@/schema/profile-schema';
import { profileSkillSchema } from '@/schema/profile-skill-schema';
import {
    ApiDataResponse,
    getData,
    postData,
    putData,
} from '@/types/api-data/api-response';

export async function createProfileAsync(
    request: z.infer<typeof profileSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/profiles', '', {
        ...request,
    });

    return record;
}

export async function getProfilesAsync(): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>('/profiles', '');

    return record;
}

export async function getProfileByIdAsync(
    id: number,
): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>(
        `/profiles/${id}`,
        '',
        {},
        {},
    );

    return record;
}

export async function updateProfileAsync(
    profileId: number,
    request: z.infer<typeof profileSchema>,
): Promise<ApiDataResponse> {
    const record = await putData<ApiDataResponse>(
        `/profiles/${profileId}`,
        '',
        {
            ...request,
        },
    );

    return record;
}

export async function deleteProfileAsync(
    profileId: number,
): Promise<ApiDataResponse> {
    const record = await putData<ApiDataResponse>(
        `/profiles${profileId}`,
        '',
        {},
    );

    return record;
}

// ASSIGN SKILLS TO PROFILE

export async function createProfileSkillAsync(
    request: z.infer<typeof profileSkillSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/profiles/skills', '', {
        ...request,
    });

    return record;
}
