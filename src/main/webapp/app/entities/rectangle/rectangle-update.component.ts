import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IRectangle } from 'app/shared/model/rectangle.model';
import { RectangleService } from './rectangle.service';
import { IAnnotation } from 'app/shared/model/annotation.model';
import { AnnotationService } from 'app/entities/annotation';

@Component({
    selector: 'jhi-rectangle-update',
    templateUrl: './rectangle-update.component.html'
})
export class RectangleUpdateComponent implements OnInit {
    private _rectangle: IRectangle;
    isSaving: boolean;

    annotations: IAnnotation[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private rectangleService: RectangleService,
        private annotationService: AnnotationService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ rectangle }) => {
            this.rectangle = rectangle;
        });
        this.annotationService.query().subscribe(
            (res: HttpResponse<IAnnotation[]>) => {
                this.annotations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.rectangle.id !== undefined) {
            this.subscribeToSaveResponse(this.rectangleService.update(this.rectangle));
        } else {
            this.subscribeToSaveResponse(this.rectangleService.create(this.rectangle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IRectangle>>) {
        result.subscribe((res: HttpResponse<IRectangle>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAnnotationById(index: number, item: IAnnotation) {
        return item.id;
    }
    get rectangle() {
        return this._rectangle;
    }

    set rectangle(rectangle: IRectangle) {
        this._rectangle = rectangle;
    }
}
