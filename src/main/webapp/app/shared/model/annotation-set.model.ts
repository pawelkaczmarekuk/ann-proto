import { IAnnotation } from 'app/shared/model//annotation.model';

export interface IAnnotationSet {
    id?: number;
    documentId?: string;
    annotations?: IAnnotation[];
}

export class AnnotationSet implements IAnnotationSet {
    constructor(public id?: number, public documentId?: string, public annotations?: IAnnotation[]) {}
}
