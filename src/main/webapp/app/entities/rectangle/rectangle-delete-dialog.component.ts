import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRectangle } from 'app/shared/model/rectangle.model';
import { RectangleService } from './rectangle.service';

@Component({
    selector: 'jhi-rectangle-delete-dialog',
    templateUrl: './rectangle-delete-dialog.component.html'
})
export class RectangleDeleteDialogComponent {
    rectangle: IRectangle;

    constructor(private rectangleService: RectangleService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rectangleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rectangleListModification',
                content: 'Deleted an rectangle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rectangle-delete-popup',
    template: ''
})
export class RectangleDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ rectangle }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(RectangleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.rectangle = rectangle;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
