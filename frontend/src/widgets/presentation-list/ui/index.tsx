'use client';

import { useWindowVirtualizer } from '@tanstack/react-virtual';
import { useMemo } from 'react';

import { PresentationPreviewCard, useInfiniteQueryPresentation } from '@entities/presentation';
import { Skeleton } from '@shared/ui';

import type { JSX } from 'react';

const PRESENTATION_HEIGHT = 140;

export const PresentationListSkeleton = ({ count = 4 }: { count?: number }): JSX.Element => {
    return (
        <div className='grid grid-cols-4 gap-4 p-5'>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className='w-full'>
                    <Skeleton className='w-full h-[140px] rounded-lg' />
                </div>
            ))}
        </div>
    );
};

export const PresentationList = (): JSX.Element => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQueryPresentation();

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

    if (isLoading) {
        return <PresentationListSkeleton />;
    }

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
                                    onJoin={() => undefined}
                                />
                            ))}
                        </div>
                    );
                })}
            </div>
            {isFetchingNextPage && <PresentationListSkeleton />}
        </section>
    );
};
