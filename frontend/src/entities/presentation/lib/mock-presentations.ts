import { faker } from '@faker-js/faker';

import type { IParticipantUser, IPresentation, IPresentationChangelog, IPresentationSlide, IViewer } from '@shared/api';

const generateMockSlide = (order: number): IPresentationSlide => {
    return {
        id: faker.string.uuid(),
        order,
        content: faker.lorem.paragraphs({ min: 10, max: 50 }),
    };
};

const generateMockUser = (): IViewer => ({
    id: faker.string.uuid(),
    username: faker.internet.username(),
    avatar: faker.image.avatar(),
});

const generateMockParticipant = (): IParticipantUser => ({
    ...generateMockUser(),
    role: faker.helpers.arrayElement(['creator', 'admin'] as const),
});

const generateMockChangelog = (user: IParticipantUser): IPresentationChangelog => ({
    user: user,
    message: faker.lorem.sentence(),
    createdAt: faker.date.past(),
    id: faker.string.uuid(),
});

export const generateMockPresentation = (): IPresentation => {
    const slidesCount = faker.number.int({ min: 10, max: 25 });
    const participantsCount = faker.number.int({ min: 2, max: 5 });
    const participants = Array.from({ length: participantsCount }, () => generateMockParticipant());

    return {
        id: faker.string.uuid(),
        title: faker.lorem.words({ min: 2, max: 5 }),
        description: faker.lorem.paragraph(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        owner: generateMockUser(),
        slides: Array.from({ length: slidesCount }, (_, index) => generateMockSlide(index)),
        participants: Array.from({ length: participantsCount }, () => generateMockParticipant()),
        changelogs: participants.map((p) => generateMockChangelog(p)),
    };
};
