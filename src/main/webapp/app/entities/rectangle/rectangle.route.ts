import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Rectangle } from 'app/shared/model/rectangle.model';
import { RectangleService } from './rectangle.service';
import { RectangleComponent } from './rectangle.component';
import { RectangleDetailComponent } from './rectangle-detail.component';
import { RectangleUpdateComponent } from './rectangle-update.component';
import { RectangleDeletePopupComponent } from './rectangle-delete-dialog.component';
import { IRectangle } from 'app/shared/model/rectangle.model';

@Injectable({ providedIn: 'root' })
export class RectangleResolve implements Resolve<IRectangle> {
    constructor(private service: RectangleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((rectangle: HttpResponse<Rectangle>) => rectangle.body));
        }
        return of(new Rectangle());
    }
}

export const rectangleRoute: Routes = [
    {
        path: 'rectangle',
        component: RectangleComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Rectangles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rectangle/:id/view',
        component: RectangleDetailComponent,
        resolve: {
            rectangle: RectangleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rectangles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rectangle/new',
        component: RectangleUpdateComponent,
        resolve: {
            rectangle: RectangleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rectangles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rectangle/:id/edit',
        component: RectangleUpdateComponent,
        resolve: {
            rectangle: RectangleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rectangles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rectanglePopupRoute: Routes = [
    {
        path: 'rectangle/:id/delete',
        component: RectangleDeletePopupComponent,
        resolve: {
            rectangle: RectangleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Rectangles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
