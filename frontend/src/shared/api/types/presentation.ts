import type { IViewer } from './viewer';

export interface IPresentationSlide {
    id: string;
    order: number;
    content: string;
}

export interface IPresentation {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    owner: IViewer;
    slides: IPresentationSlide[];
}
