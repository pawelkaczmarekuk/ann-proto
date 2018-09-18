import { NgModule } from '@angular/core';

import { JhipstermojSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [JhipstermojSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [JhipstermojSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class JhipstermojSharedCommonModule {}
