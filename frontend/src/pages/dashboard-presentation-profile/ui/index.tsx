import { PresentationProfile } from '@widgets/presentation-profile';

import type { FC, JSX } from 'react';

interface IDashboardPresentationProfileProps {
    params: Promise<{
        id: string;
    }>;
}

export const DashboardPresentationProfile: FC<IDashboardPresentationProfileProps> = async ({
    params,
}): Promise<JSX.Element> => {
    return <PresentationProfile presentationId={(await params).id} />;
};
