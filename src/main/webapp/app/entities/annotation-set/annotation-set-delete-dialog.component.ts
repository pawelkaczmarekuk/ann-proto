import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAnnotationSet } from 'app/shared/model/annotation-set.model';
import { AnnotationSetService } from './annotation-set.service';

@Component({
    selector: 'jhi-annotation-set-delete-dialog',
    templateUrl: './annotation-set-delete-dialog.component.html'
})
export class AnnotationSetDeleteDialogComponent {
    annotationSet: IAnnotationSet;

    constructor(
        private annotationSetService: AnnotationSetService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.annotationSetService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'annotationSetListModification',
                content: 'Deleted an annotationSet'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-annotation-set-delete-popup',
    template: ''
})
export class AnnotationSetDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ annotationSet }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AnnotationSetDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.annotationSet = annotationSet;
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
