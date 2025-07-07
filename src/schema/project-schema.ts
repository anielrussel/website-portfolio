import { z } from 'zod';

export const projectSchema = z.object({
    id: z.number().nonnegative(),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    description: z.string().min(1, {
        message: 'Description is required',
    }),
    image: z.union([z.string(), z.null()]).optional(),
    url: z.union([z.string(), z.null()]).optional(),
    repoLink: z.union([z.string(), z.null()]).optional(),
    profileId: z.union([z.number(), z.null()]).optional(),
});
