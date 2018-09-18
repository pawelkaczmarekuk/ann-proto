import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipstermojSharedModule } from 'app/shared';
import {
    AnnotationSetComponent,
    AnnotationSetDetailComponent,
    AnnotationSetUpdateComponent,
    AnnotationSetDeletePopupComponent,
    AnnotationSetDeleteDialogComponent,
    annotationSetRoute,
    annotationSetPopupRoute
} from './';

const ENTITY_STATES = [...annotationSetRoute, ...annotationSetPopupRoute];

@NgModule({
    imports: [JhipstermojSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AnnotationSetComponent,
        AnnotationSetDetailComponent,
        AnnotationSetUpdateComponent,
        AnnotationSetDeleteDialogComponent,
        AnnotationSetDeletePopupComponent
    ],
    entryComponents: [
        AnnotationSetComponent,
        AnnotationSetUpdateComponent,
        AnnotationSetDeleteDialogComponent,
        AnnotationSetDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipstermojAnnotationSetModule {}
