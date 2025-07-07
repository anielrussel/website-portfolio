'use server';

import { z } from 'zod';

import { skillSchema } from '@/schema/skill-schema';
import {
    ApiDataResponse,
    deleteData,
    getData,
    postData,
    putData,
} from '@/types/api-data/api-response';

export async function createSkillAsync(
    request: z.infer<typeof skillSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/skills', '', {
        ...request,
    });

    return record;
}

export async function getSkillsAsync(): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>('/skills', '');

    return record;
}

export async function getSkillByIdAsync(id: number): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>(`/skills/${id}`, '', {}, {});

    return record;
}

export async function updateSkillAsync(
    skillId: number,
    request: z.infer<typeof skillSchema>,
): Promise<ApiDataResponse> {
    const record = await putData<ApiDataResponse>(`/skills/${skillId}`, '', {
        ...request,
    });

    return record;
}

export async function deleteSkillAsync(
    skillId: number,
): Promise<ApiDataResponse> {
    const record = await deleteData<ApiDataResponse>(
        `/skills/${skillId}`,
        '',
        {},
    );

    return record;
}
