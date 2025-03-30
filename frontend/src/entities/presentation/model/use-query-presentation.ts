import { useQuery } from '@tanstack/react-query';

import { wait } from '@shared/lib';

import { generateMockPresentation } from '../lib';

import type { IPresentation } from '@shared/api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const usePresentationQuery = (id: string) => {
    return useQuery({
        queryKey: ['presentation', id],
        queryFn: async () => {
            await wait(100);
            // In real app, this would be an API call
            const presentation = generateMockPresentation();
            return presentation as IPresentation;
        },
    });
};
