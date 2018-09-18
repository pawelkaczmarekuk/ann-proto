import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnnotationSet } from 'app/shared/model/annotation-set.model';
import { AnnotationSetService } from './annotation-set.service';
import { AnnotationSetComponent } from './annotation-set.component';
import { AnnotationSetDetailComponent } from './annotation-set-detail.component';
import { AnnotationSetUpdateComponent } from './annotation-set-update.component';
import { AnnotationSetDeletePopupComponent } from './annotation-set-delete-dialog.component';
import { IAnnotationSet } from 'app/shared/model/annotation-set.model';

@Injectable({ providedIn: 'root' })
export class AnnotationSetResolve implements Resolve<IAnnotationSet> {
    constructor(private service: AnnotationSetService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((annotationSet: HttpResponse<AnnotationSet>) => annotationSet.body));
        }
        return of(new AnnotationSet());
    }
}

export const annotationSetRoute: Routes = [
    {
        path: 'annotation-set',
        component: AnnotationSetComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'AnnotationSets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annotation-set/:id/view',
        component: AnnotationSetDetailComponent,
        resolve: {
            annotationSet: AnnotationSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnotationSets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annotation-set/new',
        component: AnnotationSetUpdateComponent,
        resolve: {
            annotationSet: AnnotationSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnotationSets'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'annotation-set/:id/edit',
        component: AnnotationSetUpdateComponent,
        resolve: {
            annotationSet: AnnotationSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnotationSets'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const annotationSetPopupRoute: Routes = [
    {
        path: 'annotation-set/:id/delete',
        component: AnnotationSetDeletePopupComponent,
        resolve: {
            annotationSet: AnnotationSetResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AnnotationSets'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
