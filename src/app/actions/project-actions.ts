'use server';

import { z } from 'zod';

import { projectSchema } from '@/schema/project-schema';
import {
    ApiDataResponse,
    deleteData,
    getData,
    postData,
    putData,
} from '@/types/api-data/api-response';

export async function createProjectAsync(
    request: z.infer<typeof projectSchema>,
): Promise<ApiDataResponse> {
    const record = await postData<ApiDataResponse>('/projects', '', {
        ...request,
    });

    return record;
}

export async function getProjectsAsync(): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>('/projects', '');

    return record;
}

export async function getProjectByIdAsync(
    id: number,
): Promise<ApiDataResponse> {
    const record = await getData<ApiDataResponse>(
        `/projects/${id}`,
        '',
        {},
        {},
    );

    return record;
}

export async function updateProjectAsync(
    projectId: number,
    request: z.infer<typeof projectSchema>,
): Promise<ApiDataResponse> {
    const record = await putData<ApiDataResponse>(
        `/projects/${projectId}`,
        '',
        {
            ...request,
        },
    );

    return record;
}

export async function deleteProjectAsync(
    projectId: number,
): Promise<ApiDataResponse> {
    const record = await deleteData<ApiDataResponse>(
        `/projects/${projectId}`,
        '',
        {},
    );

    return record;
}
