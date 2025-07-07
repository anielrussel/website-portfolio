import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SkillType } from '@/types/api-data/skill';

interface SkillStoreState {
    skills: SkillType[];
    selectedSkill: SkillType | null;

    loadSkills: (data: SkillType[]) => void;
    addSkill: (data: SkillType) => void;
    updateSkill: (data: SkillType) => void;
    deleteSkill: (id: number) => void;

    selectSkill: (data: SkillType) => void;
    resetSelectedSkill: () => void;

    clearSkills: () => void;
}

export const useSkillStore = create<SkillStoreState>()(
    persist(
        (set) => ({
            skills: [],
            selectedSkill: null,

            loadSkills: (data) => {
                set({ skills: data });
            },

            addSkill: (data) => {
                set((state) => ({
                    skills: [...state.skills, data],
                }));
            },

            updateSkill: (data) => {
                set((state) => ({
                    skills: state.skills.map((skill) =>
                        skill.id === data.id ? data : skill,
                    ),
                }));
            },

            deleteSkill: (id) =>
                set((state) => ({
                    skills: state.skills.filter((skill) => skill.id !== id),
                })),

            selectSkill: (data) => {
                set({ selectedSkill: data });
            },

            resetSelectedSkill: () => {
                set({ selectedSkill: null });
            },

            clearSkills: () => {
                set({ skills: [], selectedSkill: null });
            },
        }),

        {
            name: 'skills',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                skills: state.skills,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Failed to rehydrate state', error);
                }
            },
        },
    ),
);
