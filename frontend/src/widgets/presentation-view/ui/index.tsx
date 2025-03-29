'use client';

import { faker } from '@faker-js/faker';
import { useState } from 'react';

import type { JSX } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const generateMockPresentation = () => {
    return {
        id: faker.string.uuid(),
        title: faker.company.catchPhrase(),
        description: faker.lorem.sentence(),
        createdAt: faker.date.recent().toISOString(),
        createdBy: faker.person.fullName(),
        participantsCount: faker.number.int({ min: 1, max: 20 }),
        slides: Array.from({ length: faker.number.int({ min: 10, max: 20 }) }, () => ({
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
    };
};

const presentation = generateMockPresentation();

export const PresentationView = (): JSX.Element => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    const nextSlide = (): void => {
        if (currentSlideIndex < presentation.slides.length - 1) {
            setCurrentSlideIndex((prev) => prev + 1);
        }
    };

    const prevSlide = (): void => {
        if (currentSlideIndex > 0) {
            setCurrentSlideIndex((prev) => prev - 1);
        }
    };

    return (
        <div className='presentation-viewer'>
            <h1>{presentation.title}</h1>

            <div className='slide-container'>
                {presentation.slides[currentSlideIndex] && (
                    <div className='slide'>{presentation.slides[currentSlideIndex].content}</div>
                )}
            </div>

            <div className='navigation'>
                <button onClick={prevSlide} disabled={currentSlideIndex === 0}>
                    Предыдущий
                </button>
                <span>
                    {currentSlideIndex + 1} / {presentation.slides.length}
                </span>
                <button onClick={nextSlide} disabled={currentSlideIndex === presentation.slides.length - 1}>
                    Следующий
                </button>
            </div>
        </div>
    );
};
