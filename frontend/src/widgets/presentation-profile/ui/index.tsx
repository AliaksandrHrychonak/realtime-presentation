'use client';

import { Share2, Trash2, Play, Clock, User, Users } from 'lucide-react';
import Link from 'next/link';

import { usePresentationQuery } from '@entities/presentation';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    ScrollArea,
    Separator,
} from '@shared/ui';

import type { FC } from 'react';

interface IPresentationProfileProps {
    presentationId: string;
}

export const PresentationProfile: FC<IPresentationProfileProps> = ({ presentationId }) => {
    const { data } = usePresentationQuery(presentationId);

    return (
        <Card className='w-full mx-auto shadow-none rounded-none'>
            <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle className='text-2xl font-bold'>{data?.title}</CardTitle>
                        <CardDescription>{data?.description}</CardDescription>
                    </div>
                    <div className='flex gap-2'>
                        <Button variant='outline' size='icon' disabled>
                            <Share2 className='h-4 w-4' />
                        </Button>
                        <Button variant='outline' size='icon' disabled>
                            <Trash2 className='h-4 w-4' />
                        </Button>
                        <Button size='icon' asChild>
                            <Link href={`/presentation/view/${presentationId}`}>
                                <Play className='h-4 w-4' />
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className='grid gap-6'>
                    <div className='flex gap-4 text-sm text-muted-foreground'>
                        <div className='flex items-center'>
                            <Clock className='h-4 w-4 mr-1' />
                            Created: {data?.createdAt.toISOString()}
                        </div>
                        <div className='flex items-center'>
                            <Clock className='h-4 w-4 mr-1' />
                            Last edited: {data?.updatedAt.toISOString()}
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <User className='h-4 w-4' />
                        <span className='font-medium'>Owner:</span>
                        <Avatar className='h-6 w-6'>
                            <AvatarImage src='https://github.com/shadcn.png' alt={data?.owner.username} />
                            <AvatarFallback className='uppercase'>{data?.owner.username[0]}</AvatarFallback>
                        </Avatar>
                        <span>{data?.owner.username}</span>
                    </div>

                    <div>
                        <div className='flex items-center gap-2 mb-2'>
                            <Users className='h-4 w-4' />
                            <span className='font-medium'>Connected Users</span>
                        </div>
                        <div className='flex gap-2'>
                            {data?.participants.map((user) => (
                                <Avatar className='h-8 w-8' key={user.id}>
                                    <AvatarImage src={user.avatar} alt={user.username} />
                                    <AvatarFallback className='uppercase'>{user.username[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className='font-medium mb-2'>Changelog</h3>
                        <ScrollArea className='h-32 rounded-md border p-2'>
                            <div className='space-y-2'>
                                {data?.changelogs.map((changelog) => (
                                    <div key={changelog.id}>
                                        <div className='flex items 2 justify-between'>
                                            <span className='text-sm font-medium'>
                                                {changelog.user.username}: updated content
                                            </span>
                                            <span className='text-xs text-muted-foreground'>
                                                {changelog.createdAt.toISOString()}
                                            </span>
                                        </div>
                                        <p className='text-sm text-muted-foreground'>{changelog.message}</p>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
