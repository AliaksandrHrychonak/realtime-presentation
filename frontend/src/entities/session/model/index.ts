import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand/react';

import type { IViewer } from '@shared/api';

interface ISessionState {
    user: IViewer | null;
    isAuthenticated: boolean;
}

const initialState: ISessionState = {
    user: null,
    isAuthenticated: false,
};

export interface ISessionStore extends ISessionState {
    setViewer: (user: IViewer) => void;
    reset: () => void;
}

export const useSessionStore = create<ISessionStore>()(
    persist(
        (set) => ({
            ...initialState,
            reset: (): void => set(initialState),
            setViewer: (user: IViewer): void => {
                if (user) {
                    set({ user, isAuthenticated: true });
                }
            },
        }),
        {
            // TODO fix cast
            name: 'session-store',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
