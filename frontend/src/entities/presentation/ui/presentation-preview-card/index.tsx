'use client';

import { Users } from 'lucide-react';
import React from 'react';

import { cn } from '@shared/lib';
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/ui';

import type { IPresentation } from '@shared/api/types/presentation';
import type { JSX, FC, ComponentProps } from 'react';

interface PresentationPreviewCardProps extends ComponentProps<typeof Card> {
    data: IPresentation;
    onJoin: () => void;
}

export const PresentationPreviewCard: FC<PresentationPreviewCardProps> = ({
    data,
    onJoin,
    className,
    ...props
}): JSX.Element => {
    return (
        <Card
            className={cn(' transition-shadow relative w-full h-full flex flex-col justify-between', className)}
            {...props}
        >
            <CardHeader className='p-2 truncate'>
                <CardTitle className='text-m'>{data.title}</CardTitle>
                <p className='text-sm text-muted-foreground'>Created: {data.createdAt.toISOString()}</p>
            </CardHeader>
            <CardContent className='p-2 flex'></CardContent>
            <CardFooter className='flex justify-between items-center p-2'>
                <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span className='text-sm text-muted-foreground'>12 joined</span>
                </div>
                <Button onClick={onJoin} variant='secondary'>
                    Join
                </Button>
            </CardFooter>
        </Card>
    );
};
