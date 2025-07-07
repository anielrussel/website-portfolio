import { z } from 'zod';

export const socialLinkSchema = z.object({
    id: z.number().nonnegative(),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    url: z.union([z.string(), z.null()]).optional(),
    icon: z.union([z.string(), z.null()]).optional(),
    profileId: z.union([z.number(), z.null()]).optional(),
});
