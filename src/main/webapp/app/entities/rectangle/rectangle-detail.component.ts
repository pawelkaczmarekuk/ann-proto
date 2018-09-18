import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IRectangle } from 'app/shared/model/rectangle.model';

@Component({
    selector: 'jhi-rectangle-detail',
    templateUrl: './rectangle-detail.component.html'
})
export class RectangleDetailComponent implements OnInit {
    rectangle: IRectangle;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rectangle }) => {
            this.rectangle = rectangle;
        });
    }

    previousState() {
        window.history.back();
    }
}
