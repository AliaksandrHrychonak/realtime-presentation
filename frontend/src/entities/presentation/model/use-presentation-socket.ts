import { io } from 'socket.io-client';
import { create } from 'zustand';

import type { Socket } from 'socket.io-client';

interface PresentationStore {
    socket: Socket | null;
    connect: () => void;
    disconnect: () => void;
}

export const usePresentationSocket = create<PresentationStore>((set) => ({
    socket: null,
    connect: (): void => {
        const socket = io('ws://echo.websocket.org', {
            reconnection: true,
            reconnectionDelay: 1000,
        });
        set({ socket });
    },
    disconnect: (): void => {
        set((state) => {
            state.socket?.disconnect();
            return { socket: null };
        });
    },
}));
