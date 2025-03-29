'use client';

import { faker } from '@faker-js/faker';
import { toast } from 'sonner';

import { PresentationPreviewCard } from '@entities/presentation';

import type { JSX } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const generateMockPresentations = (count: number) => {
    return Array.from({ length: count }, () => ({
        id: faker.string.uuid(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.recent().toISOString(),
        createdBy: faker.person.fullName(),
        participantsCount: faker.number.int({ min: 1, max: 20 }),
        slides: Array.from({ length: faker.number.int({ min: 3, max: 10 }) }, () => ({
            id: faker.string.uuid(),
            content: faker.lorem.paragraph(),
            order: faker.number.int({ min: 1, max: 10 }),
        })),
        participants: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => ({
            id: faker.string.uuid(),
            name: faker.person.fullName(),
            role: faker.helpers.arrayElement(['viewer', 'editor']),
            joinedAt: faker.date.recent().toISOString(),
        })),
    }));
};

export const PresentationList = (): JSX.Element => {
    return (
        <section className='flex flex-wrap gap-6 p-6'>
            {generateMockPresentations(20).map(({ id, ...props }) => (
                <PresentationPreviewCard key={id} {...props} onJoin={() => toast.info(`onJoin ${id}`)} />
            ))}
        </section>
    );
};
