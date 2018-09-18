import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAnnotationSet } from 'app/shared/model/annotation-set.model';

@Component({
    selector: 'jhi-annotation-set-detail',
    templateUrl: './annotation-set-detail.component.html'
})
export class AnnotationSetDetailComponent implements OnInit {
    annotationSet: IAnnotationSet;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ annotationSet }) => {
            this.annotationSet = annotationSet;
        });
    }

    previousState() {
        window.history.back();
    }
}
