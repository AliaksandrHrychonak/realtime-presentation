import { Users } from 'lucide-react';
import React from 'react';

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@shared/ui';

import type { JSX, FC } from 'react';

interface PresentationPreviewCardProps {
    title: string;
    description: string;
    createdAt: string;
    participantsCount: number;
    onJoin: () => void;
}

export const PresentationPreviewCard: FC<PresentationPreviewCardProps> = ({
    title,
    description,
    createdAt,
    participantsCount,
    onJoin,
}): JSX.Element => {
    return (
        <Card className='min-w-[350px] flex-1 hover:shadow-lg transition-shadow'>
            <CardHeader>
                <CardTitle className='text-xl'>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground'>Created: {createdAt}</p>
            </CardContent>
            <CardFooter className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <Users className='h-4 w-4' />
                    <span className='text-sm text-muted-foreground'>{participantsCount} participants</span>
                </div>
                <Button onClick={onJoin} variant='secondary'>
                    Join Presentation
                </Button>
            </CardFooter>
        </Card>
    );
};
