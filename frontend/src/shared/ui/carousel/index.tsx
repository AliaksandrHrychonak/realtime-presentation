'use client';

import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import * as React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { cn } from '../../lib';
import { Button } from '../button';

import type { ComponentProps, JSX } from 'react';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: 'horizontal' | 'vertical';
    setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
    carouselRef: ReturnType<typeof useEmblaCarousel>[0];
    api: ReturnType<typeof useEmblaCarousel>[1];
    scrollPrev: () => void;
    scrollNext: () => void;
    canScrollPrev: boolean;
    canScrollNext: boolean;
} & CarouselProps;

const CarouselContext = createContext<CarouselContextProps | null>(null);

const useCarousel = (): CarouselContextProps => {
    const context = useContext(CarouselContext);

    if (!context) {
        throw new Error('useCarousel must be used within a <Carousel />');
    }

    return context;
};

type CarouselElementProps = ComponentProps<'div'> & CarouselProps;

const Carousel = ({
    orientation = 'horizontal',
    opts,
    setApi,
    plugins,
    className,
    children,
    ...props
}: CarouselElementProps): JSX.Element => {
    const [carouselRef, api] = useEmblaCarousel(
        {
            ...opts,
            axis: orientation === 'horizontal' ? 'x' : 'y',
        },
        plugins
    );
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
        if (!api) {
            return;
        }

        setCanScrollPrev(api.canScrollPrev());
        setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
        api?.scrollPrev();
    }, [api]);

    const scrollNext = useCallback(() => {
        api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                scrollPrev();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                scrollNext();
            }
        },
        [scrollPrev, scrollNext]
    );

    useEffect(() => {
        if (!api || !setApi) {
            return;
        }

        setApi(api);
    }, [api, setApi]);

    useEffect(() => {
        if (!api) {
            return;
        }

        onSelect(api);
        api.on('reInit', onSelect);
        api.on('select', onSelect);

        return (): void => {
            api?.off('select', onSelect);
        };
    }, [api, onSelect]);

    return (
        <CarouselContext.Provider
            value={{
                carouselRef,
                api: api,
                opts,
                orientation: orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
                scrollPrev,
                scrollNext,
                canScrollPrev,
                canScrollNext,
            }}
        >
            <div
                data-slot='carousel'
                onKeyDownCapture={handleKeyDown}
                className={cn('relative', className)}
                role='region'
                aria-roledescription='carousel'
                {...props}
            >
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

type CarouselContentProps = ComponentProps<'div'>;

const CarouselContent = ({ className, ...props }: CarouselContentProps): JSX.Element => {
    const { carouselRef, orientation } = useCarousel();

    return (
        <div ref={carouselRef} className='overflow-hidden'>
            <div
                data-slot='content'
                className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
                {...props}
            />
        </div>
    );
};

type CarouselItemProps = ComponentProps<'div'>;

const CarouselItem = ({ className, ...props }: CarouselItemProps): JSX.Element => {
    const { orientation } = useCarousel();

    return (
        <div
            data-slot='item'
            role='group'
            aria-roledescription='slide'
            className={cn(
                'min-w-0 shrink-0 grow-0 basis-full',
                orientation === 'horizontal' ? 'pl-4' : 'pt-4',
                className
            )}
            {...props}
        />
    );
};

type CarouselPreviousProps = ComponentProps<typeof Button>;

const CarouselPrevious = ({
    className,
    variant = 'outline',
    size = 'icon',
    ...props
}: CarouselPreviousProps): JSX.Element => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
        <Button
            data-slot='previous'
            variant={variant}
            size={size}
            className={cn(
                'absolute h-8 w-8 rounded-full',
                orientation === 'horizontal'
                    ? '-left-12 top-1/2 -translate-y-1/2'
                    : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
                className
            )}
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            {...props}
        >
            <ArrowLeft className='h-4 w-4' />
            <span className='sr-only'>Previous slide</span>
        </Button>
    );
};

type CarouselNextProps = ComponentProps<typeof Button>;

const CarouselNext = ({ className, variant = 'outline', size = 'icon', ...props }: CarouselNextProps): JSX.Element => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
        <Button
            data-slot='next'
            variant={variant}
            size={size}
            className={cn(
                'absolute h-8 w-8 rounded-full',
                orientation === 'horizontal'
                    ? '-right-12 top-1/2 -translate-y-1/2'
                    : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
                className
            )}
            disabled={!canScrollNext}
            onClick={scrollNext}
            {...props}
        >
            <ArrowRight className='h-4 w-4' />
            <span className='sr-only'>Next slide</span>
        </Button>
    );
};

export { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
