import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ProfileType } from '@/types/api-data/profile';

interface ProfileStoreState {
    profile: ProfileType | null;

    loadProfile: (data: ProfileType) => void;
    updateProfile: (data: ProfileType) => void;
    updateProfileSkills: (
        addedSkillIds: number[],
        deletedSkillIds: number[],
    ) => void;
    addSkillToProfile: (skillId: number) => void;
    removeSkillFromProfile: (skillId: number) => void;
    clearProfile: () => void;
}

export const useProfileStore = create<ProfileStoreState>()(
    persist(
        (set) => ({
            profile: null,

            loadProfile: (data) => {
                set({ profile: data });
            },

            updateProfile: (data) => {
                set((state) => ({
                    profile: state.profile
                        ? { ...state.profile, ...data }
                        : data,
                }));
            },

            updateProfileSkills: (addedSkillIds, deletedSkillIds) => {
                set((state) => {
                    if (!state.profile) return state;

                    let updatedSkills = [...state.profile.skills];

                    // Remove deleted skills
                    updatedSkills = updatedSkills.filter(
                        (skill) => !deletedSkillIds.includes(skill.skillId),
                    );

                    // Add new skills
                    const newSkills = addedSkillIds.map((skillId) => ({
                        profileId: state.profile!.id,
                        skillId,
                    }));

                    updatedSkills = [...updatedSkills, ...newSkills];

                    return {
                        profile: {
                            ...state.profile,
                            skills: updatedSkills,
                        },
                    };
                });
            },

            addSkillToProfile: (skillId) => {
                set((state) => {
                    if (!state.profile) return state;

                    // Check if skill already exists
                    const skillExists = state.profile.skills.some(
                        (skill) => skill.skillId === skillId,
                    );

                    if (skillExists) return state;

                    const newSkill = {
                        profileId: state.profile.id,
                        skillId,
                    };

                    return {
                        profile: {
                            ...state.profile,
                            skills: [...state.profile.skills, newSkill],
                        },
                    };
                });
            },

            removeSkillFromProfile: (skillId) => {
                set((state) => {
                    if (!state.profile) return state;

                    const updatedSkills = state.profile.skills.filter(
                        (skill) => skill.skillId !== skillId,
                    );

                    return {
                        profile: {
                            ...state.profile,
                            skills: updatedSkills,
                        },
                    };
                });
            },

            clearProfile: () => {
                set({ profile: null });
            },
        }),

        {
            name: 'profile',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                profile: state.profile,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Failed to rehydrate state', error);
                }
            },
        },
    ),
);
