import { PauseIcon, PlayIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@shared/ui';

import type { JSX, ComponentProps, FC } from 'react';

interface IAutoPlayPresentationButtonProps extends Omit<ComponentProps<typeof Button>, 'onClick'> {
    playbackState: {
        isPlaying: boolean;
        togglePlay: () => void;
    };
}

export const AutoPlayPresentationButton: FC<IAutoPlayPresentationButtonProps> = ({ playbackState }): JSX.Element => {
    return (
        <Button variant='ghost' size='icon' onClick={playbackState.togglePlay}>
            {playbackState.isPlaying ? <PauseIcon className='h-4 w-4' /> : <PlayIcon className='h-4 w-4' />}
        </Button>
    );
};
