'use client';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useMemo } from 'react';
import { toast } from 'sonner';

import { PresentationPreviewCard, useInfiniteQueryPresentation } from '@entities/presentation';

import type { JSX } from 'react';

const PRESENTATION_HEIGHT = 140;

export const PresentationList = (): JSX.Element => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQueryPresentation();

    const flatPresentations = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

    const rowCount = Math.ceil(flatPresentations.length / 4);

    const virtualizer = useWindowVirtualizer({
        count: rowCount,
        estimateSize: () => PRESENTATION_HEIGHT,
        overscan: 5,
        onChange: (instance) => {
            const virtualItems = instance.getVirtualItems();
            const lastItem = virtualItems[virtualItems.length - 1];
            if (lastItem && !isFetchingNextPage && hasNextPage && lastItem.index >= rowCount - 4) {
                void fetchNextPage();
            }
        },
        gap: 16,
    });

    return (
        <section className='w-full min-h-screen p-5'>
            <div className='relative w-full' style={{ height: `${virtualizer.getTotalSize()}px` }}>
                {virtualizer.getVirtualItems().map((virtualRow) => {
                    const startIndex = virtualRow.index * 4;
                    const rowPresentations = flatPresentations.slice(startIndex, startIndex + 4);

                    return (
                        <div
                            key={virtualRow.index}
                            className='absolute top-0 left-0 w-full flex flex-wrap gap-4'
                            style={{
                                transform: `translateY(${virtualRow.start}px)`,
                                height: `${PRESENTATION_HEIGHT}px`,
                            }}
                        >
                            {rowPresentations.map((presentation) => (
                                <PresentationPreviewCard
                                    key={presentation.id}
                                    className='w-[calc(25%-12px)]'
                                    data={presentation}
                                    onJoin={() => toast.info(presentation.id)}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
            {isFetchingNextPage && (
                <div className='flex justify-center p-4'>
                    <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900' />
                </div>
            )}
        </section>
    );
};
