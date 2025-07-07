import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { SocialLinksType } from '@/types/api-data/social-links';

interface SocialLinkStoreState {
    socials: SocialLinksType[];
    selectedSocial: SocialLinksType | null;

    loadSocials: (data: SocialLinksType[]) => void;
    addSocial: (data: SocialLinksType) => void;
    updateSocial: (data: SocialLinksType) => void;
    deleteSocial: (id: number) => void;

    selectSocial: (data: SocialLinksType) => void;
    resetSelectedSocial: () => void;

    clearSocials: () => void;
}

export const useSocialLinkStore = create<SocialLinkStoreState>()(
    persist(
        (set) => ({
            socials: [],
            selectedSocial: null,

            loadSocials: (data) => {
                set({ socials: data });
            },

            addSocial: (data) => {
                set((state) => ({
                    socials: [...state.socials, data],
                }));
            },

            updateSocial: (data) => {
                set((state) => ({
                    socials: state.socials.map((skill) =>
                        skill.id === data.id ? data : skill,
                    ),
                }));
            },

            deleteSocial: (id) =>
                set((state) => ({
                    socials: state.socials.filter((skill) => skill.id !== id),
                })),

            selectSocial: (data) => {
                set({ selectedSocial: data });
            },

            resetSelectedSocial: () => {
                set({ selectedSocial: null });
            },

            clearSocials: () => {
                set({ socials: [], selectedSocial: null });
            },
        }),

        {
            name: 'socials',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                socials: state.socials,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Failed to rehydrate state', error);
                }
            },
        },
    ),
);
