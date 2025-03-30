import { PresentationView } from '@widgets/presentation-view';

import type { FC, JSX } from 'react';

interface PresentationPageProps {
    params: {
        id: string;
    };
}

export const PresentationPage: FC<PresentationPageProps> = async ({ params }): Promise<JSX.Element> => {
    return <PresentationView presentationId={params.id} />;
};
