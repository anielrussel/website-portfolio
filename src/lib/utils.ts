import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useAuthStore } from '@/store/api-data/auth-store';
import { useProfileStore } from '@/store/api-data/profile-store';
import { useProjectStore } from '@/store/api-data/project-store';
import { useSkillStore } from '@/store/api-data/skill-store';
import { useSocialLinkStore } from '@/store/api-data/social-link-store';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function clearAllStores() {
    useAuthStore.getState().clearAuthUser();
    useProfileStore.getState().clearProfile();
    useProjectStore.getState().clearProjects();
    useSkillStore.getState().clearSkills();
    useSocialLinkStore.getState().clearSocials();
}
