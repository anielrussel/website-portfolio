import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AuthResponseType } from '@/types/api-data/auth';

interface AuthStoreState {
    authUser: AuthResponseType | null;

    loadAuthUser: (data: AuthResponseType) => void;

    clearAuthUser: () => void;
}

export const useAuthStore = create<AuthStoreState>()(
    persist(
        (set) => ({
            authUser: null,

            loadAuthUser: (data) => {
                set({ authUser: data });
            },

            clearAuthUser: () => {
                set({ authUser: null });
            },
        }),

        {
            name: 'authUser',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                authUser: state.authUser,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error) {
                    console.error('Failed to rehydrate state', error);
                }
            },
        },
    ),
);
