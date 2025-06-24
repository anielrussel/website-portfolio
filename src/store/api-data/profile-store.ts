import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ProfileType } from '@/types/api-data/profile';

interface ProfileStoreState {
    profile: ProfileType | null;

    loadProfile: (data: ProfileType) => void;
    updateProfile: (data: ProfileType) => void;
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
