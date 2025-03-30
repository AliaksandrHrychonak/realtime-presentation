import { create } from 'zustand/react';

interface PresentationStore {
    currentSlide: number;
    isPlaying: boolean;
    setCurrentSlide: (index: number) => void;
    togglePlay: () => void;
}

export const usePresentationStore = create<PresentationStore>((set) => ({
    currentSlide: 0,
    isPlaying: false,
    setCurrentSlide: (index): void => set({ currentSlide: index }),
    togglePlay: (): void => set((state) => ({ isPlaying: !state.isPlaying })),
}));
