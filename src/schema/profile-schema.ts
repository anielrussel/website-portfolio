import { z } from 'zod';

export const profileSchema = z.object({
    id: z.number().nonnegative(),
    firstName: z.string().min(1, {
        message: 'First name is required',
    }),
    middleName: z.union([z.string(), z.null()]),
    lastName: z.string().min(1, {
        message: 'Last name is required',
    }),
    position: z.union([z.string(), z.null()]),
    image: z.union([z.string(), z.null()]),
    address: z.union([z.string(), z.null()]),
    userId: z.union([z.number(), z.null()]).optional(),
    email: z.union([z.string(), z.null()]),
    contactNo: z.union([z.string(), z.null()]),
    socialLinks: z.array(z.string()),
    skills: z.array(z.string()),
    projects: z.array(z.string()),
});
