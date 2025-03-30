import { useEffect } from 'react';

import { usePresentationStore } from '@entities/presentation';

import type { CarouselApi } from '@shared/ui';

export const useAutoPlayPresentation = (
    api: CarouselApi | undefined,
    interval = 5000
): {
    isPlaying: boolean;
    togglePlay: () => void;
} => {
    const { isPlaying, togglePlay } = usePresentationStore();

    useEffect(() => {
        if (!api || !isPlaying) return;

        const timer = setInterval(() => {
            api.scrollNext();
        }, interval);

        return (): void => clearInterval(timer);
    }, [api, isPlaying, interval]);

    return {
        isPlaying,
        togglePlay,
    };
};
