import { useInfiniteQuery } from '@tanstack/react-query';

import { wait } from '@shared/lib';

import { generateMockPresentation } from '../lib';

// TODO fix return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useInfiniteQueryPresentation = () => {
    return useInfiniteQuery({
        queryKey: ['presentations'],
        queryFn: async ({ pageParam = 0 }) => {
            await wait(1000);
            const items = Array.from({ length: 30 }, () => generateMockPresentation());
            return {
                items,
                nextPage: pageParam + 1,
                totalPages: null,
            };
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};
