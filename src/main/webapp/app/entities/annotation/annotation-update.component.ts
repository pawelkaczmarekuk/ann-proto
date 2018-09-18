import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from './annotation.service';
import { IAnnotationSet } from 'app/shared/model/annotation-set.model';
import { AnnotationSetService } from 'app/entities/annotation-set';

@Component({
    selector: 'jhi-annotation-update',
    templateUrl: './annotation-update.component.html'
})
export class AnnotationUpdateComponent implements OnInit {
    private _annotation: IAnnotation;
    isSaving: boolean;

    annotationsets: IAnnotationSet[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private annotationService: AnnotationService,
        private annotationSetService: AnnotationSetService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ annotation }) => {
            this.annotation = annotation;
        });
        this.annotationSetService.query().subscribe(
            (res: HttpResponse<IAnnotationSet[]>) => {
                this.annotationsets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.annotation.id !== undefined) {
            this.subscribeToSaveResponse(this.annotationService.update(this.annotation));
        } else {
            this.subscribeToSaveResponse(this.annotationService.create(this.annotation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IAnnotation>>) {
        result.subscribe((res: HttpResponse<IAnnotation>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackAnnotationSetById(index: number, item: IAnnotationSet) {
        return item.id;
    }
    get annotation() {
        return this._annotation;
    }

    set annotation(annotation: IAnnotation) {
        this._annotation = annotation;
    }
}
