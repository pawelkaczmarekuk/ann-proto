import { IComment } from 'app/shared/model//comment.model';
import { IRectangle } from 'app/shared/model//rectangle.model';

export const enum AnnotationType {
    AREA = 'AREA',
    HIGHLIGHT = 'HIGHLIGHT',
    POINT = 'POINT',
    TEXTBOX = 'TEXTBOX'
}

export interface IAnnotation {
    id?: number;
    annotationType?: AnnotationType;
    page?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    comments?: IComment[];
    rectangles?: IRectangle[];
    annotationSetId?: number;
}

export class Annotation implements IAnnotation {
    constructor(
        public id?: number,
        public annotationType?: AnnotationType,
        public page?: number,
        public x?: number,
        public y?: number,
        public width?: number,
        public height?: number,
        public comments?: IComment[],
        public rectangles?: IRectangle[],
        public annotationSetId?: number
    ) {}
}
