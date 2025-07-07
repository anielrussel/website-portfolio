import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ProjectType } from '@/types/api-data/project';

interface ProjectStoreState {
    projects: ProjectType[];
    selectedProject: ProjectType | null;

    loadProjects: (data: ProjectType[]) => void;
    addProject: (data: ProjectType) => void;
    updateProject: (data: ProjectType) => void;
    deleteProject: (id: number) => void;

    selectProject: (data: ProjectType) => void;
    resetSelectedProject: () => void;

    clearProjects: () => void;
}

export const useProjectStore = create<ProjectStoreState>()(
    persist(
        (set) => ({
            projects: [],
            selectedProject: null,

            loadProjects: (data) => {
                set({ projects: data });
            },

            addProject: (data) => {
                set((state) => ({
                    projects: [...state.projects, data],
                }));
            },

            updateProject: (data) => {
                set((state) => ({
                    projects: state.projects.map((skill) =>
                        skill.id === data.id ? data : skill,
                    ),
                }));
            },

            deleteProject: (id) =>
                set((state) => ({
                    projects: state.projects.filter((skill) => skill.id !== id),
                })),

            selectProject: (data) => {
                set({ selectedProject: data });
            },

            resetSelectedProject: () => {
                set({ selectedProject: null });
            },

            clearProjects: () => {
                set({ projects: [], selectedProject: null });
            },
        }),

        {
            name: 'projects',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                projects: state.projects,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Failed to rehydrate state', error);
                }
            },
        },
    ),
);
