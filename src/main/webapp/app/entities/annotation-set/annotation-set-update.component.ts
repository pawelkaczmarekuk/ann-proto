import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAnnotationSet } from 'app/shared/model/annotation-set.model';
import { AnnotationSetService } from './annotation-set.service';

@Component({
    selector: 'jhi-annotation-set-update',
    templateUrl: './annotation-set-update.component.html'
})
export class AnnotationSetUpdateComponent implements OnInit {
    private _annotationSet: IAnnotationSet;
    isSaving: boolean;

    constructor(private annotationSetService: AnnotationSetService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ annotationSet }) => {
            this.annotationSet = annotationSet;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.annotationSet.id !== undefined) {
            this.subscribeToSaveResponse(this.annotationSetService.update(this.annotationSet));
        } else {
            this.subscribeToSaveResponse(this.annotationSetService.create(this.annotationSet));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotationSet>>) {
        result.subscribe((res: HttpResponse<IAnnotationSet>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get annotationSet() {
        return this._annotationSet;
    }

    set annotationSet(annotationSet: IAnnotationSet) {
        this._annotationSet = annotationSet;
    }
}
