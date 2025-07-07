import { z } from 'zod';

export const skillSchema = z.object({
    id: z.number().nonnegative(),
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    icon: z.union([z.string(), z.null()]).optional(),
    category: z.string().min(1, {
        message: 'Category is required',
    }),
});
