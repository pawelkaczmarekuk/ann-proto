export interface IRectangle {
    id?: number;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    annotationId?: number;
}

export class Rectangle implements IRectangle {
    constructor(
        public id?: number,
        public x?: number,
        public y?: number,
        public width?: number,
        public height?: number,
        public annotationId?: number
    ) {}
}
