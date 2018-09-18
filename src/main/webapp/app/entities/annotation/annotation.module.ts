import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipstermojSharedModule } from 'app/shared';
import {
    AnnotationComponent,
    AnnotationDetailComponent,
    AnnotationUpdateComponent,
    AnnotationDeletePopupComponent,
    AnnotationDeleteDialogComponent,
    annotationRoute,
    annotationPopupRoute
} from './';

const ENTITY_STATES = [...annotationRoute, ...annotationPopupRoute];

@NgModule({
    imports: [JhipstermojSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnnotationComponent,
        AnnotationDetailComponent,
        AnnotationUpdateComponent,
        AnnotationDeleteDialogComponent,
        AnnotationDeletePopupComponent
    ],
    entryComponents: [AnnotationComponent, AnnotationUpdateComponent, AnnotationDeleteDialogComponent, AnnotationDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipstermojAnnotationModule {}
