'use client';

import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { usePresentationQuery } from '@entities/presentation';
import { AutoPlayPresentationButton, useAutoPlayPresentation } from '@features/presentation-view';
import { Button, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui';

import type { CarouselApi } from '@shared/ui';
import type { FC, JSX } from 'react';

interface IPresentationView {
    presentationId: string;
}

export const PresentationView: FC<IPresentationView> = ({ presentationId }): JSX.Element => {
    const { data } = usePresentationQuery(presentationId);
    const [api, setApi] = useState<CarouselApi>();
    const playback = useAutoPlayPresentation(api, 1500);
    const router = useRouter();

    return (
        <main className='relative w-screen h-screen p-8'>
            <Button variant='ghost' size='icon' className='absolute top-4 right-4  z-10' onClick={() => router.back()}>
                <X className='h-6 w-6' />
            </Button>

            <Carousel setApi={setApi} className='w-full h-full'>
                <CarouselContent>
                    {data?.slides.map((slide) => (
                        <CarouselItem key={slide.id} className='flex items-center justify-center'>
                            <div className='w-full h-full flex items-center justify-center'>{slide.content}</div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <div className='fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 py-3 rounded-full bg-accent backdrop-blur-sm px-[64px]'>
                    <div className='relative'>
                        <CarouselPrevious variant='ghost' />
                        <AutoPlayPresentationButton playbackState={playback} />
                        <CarouselNext variant='ghost' />
                    </div>
                </div>
            </Carousel>
        </main>
    );
};
