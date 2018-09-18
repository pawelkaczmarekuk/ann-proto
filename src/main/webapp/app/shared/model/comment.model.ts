export interface IComment {
    id?: number;
    content?: string;
    annotationId?: number;
}

export class Comment implements IComment {
    constructor(public id?: number, public content?: string, public annotationId?: number) {}
}
