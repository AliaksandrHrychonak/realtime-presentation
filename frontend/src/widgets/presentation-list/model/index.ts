import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { usePresentationSocket } from '@entities/presentation';

import type { IPresentation } from '@shared/api';

interface PresentationPage {
    items: IPresentation[];
    nextCursor?: string;
}

interface PresentationsData {
    pages: PresentationPage[];
    pageParams: (string | undefined)[];
}

export const useSocketPresentations = (): void => {
    const queryClient = useQueryClient();
    const { socket, connect } = usePresentationSocket();

    useEffect(() => {
        if (!socket) {
            connect();
        }

        socket?.on('presentation:created', (data: IPresentation | IPresentation[]) => {
            queryClient.setQueryData<PresentationsData>(['presentations'], (old) => {
                if (!old) return { pages: [], pageParams: [] };

                const newPresentations = Array.isArray(data) ? data : [data];

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: [...newPresentations, ...page.items],
                    })),
                };
            });
        });

        socket?.on('presentation:deleted', (data: string | string[]) => {
            queryClient.setQueryData<PresentationsData>(['presentations'], (old) => {
                if (!old) return { pages: [], pageParams: [] };

                const idsToDelete = Array.isArray(data) ? data : [data];

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        items: page.items.filter((item) => !idsToDelete.includes(item.id)),
                    })),
                };
            });
        });

        return (): void => {
            socket?.off('presentation:created');
            socket?.off('presentation:deleted');
        };
    }, [connect, queryClient, socket]);
};
