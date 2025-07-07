import { z } from 'zod';

export const profileSkillSchema = z.object({
    profileId: z.number().min(1, {
        message: 'Profile is required',
    }),
    addedSkillIds: z.array(z.number()),
    deletedSkillIds: z.array(z.number()),
});
