import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipstermojAnnotationSetModule } from './annotation-set/annotation-set.module';
import { JhipstermojAnnotationModule } from './annotation/annotation.module';
import { JhipstermojCommentModule } from './comment/comment.module';
import { JhipstermojRectangleModule } from './rectangle/rectangle.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        JhipstermojAnnotationSetModule,
        JhipstermojAnnotationModule,
        JhipstermojCommentModule,
        JhipstermojRectangleModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipstermojEntityModule {}
