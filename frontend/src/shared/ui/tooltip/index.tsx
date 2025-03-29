'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '../../lib';

import type { ComponentProps, JSX } from 'react';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

interface TooltipContentProps extends ComponentProps<typeof TooltipPrimitive.Content> {
    className?: string;
    sideOffset?: number;
}

const TooltipContent = ({ className, sideOffset = 4, ...props }: TooltipContentProps): JSX.Element => (
    <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
            data-slot='tooltip-content'
            sideOffset={sideOffset}
            className={cn(
                'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-tooltip-content-transform-origin]',
                className
            )}
            {...props}
        />
    </TooltipPrimitive.Portal>
);

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
