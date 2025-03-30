import { faker } from '@faker-js/faker';

import type { IPresentation, IPresentationSlide } from '@shared/api';

const generateMockSlide = (order: number): IPresentationSlide => {
    return {
        id: faker.string.uuid(),
        order,
        content: faker.lorem.paragraphs(),
    };
};

export const generateMockPresentation = (): IPresentation => {
    const slidesCount = faker.number.int({ min: 1, max: 10 });
    return {
        id: faker.string.uuid(),
        title: faker.lorem.words({ min: 2, max: 5 }),
        description: faker.lorem.paragraph(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        owner: {
            id: faker.string.uuid(),
            username: faker.internet.username(),
            avatar: faker.image.avatar(),
        },
        slides: Array.from({ length: slidesCount }, (_, index) => generateMockSlide(index)),
    };
};
