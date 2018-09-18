import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipstermojSharedModule } from 'app/shared';
import {
    RectangleComponent,
    RectangleDetailComponent,
    RectangleUpdateComponent,
    RectangleDeletePopupComponent,
    RectangleDeleteDialogComponent,
    rectangleRoute,
    rectanglePopupRoute
} from './';

const ENTITY_STATES = [...rectangleRoute, ...rectanglePopupRoute];

@NgModule({
    imports: [JhipstermojSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RectangleComponent,
        RectangleDetailComponent,
        RectangleUpdateComponent,
        RectangleDeleteDialogComponent,
        RectangleDeletePopupComponent
    ],
    entryComponents: [RectangleComponent, RectangleUpdateComponent, RectangleDeleteDialogComponent, RectangleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipstermojRectangleModule {}
