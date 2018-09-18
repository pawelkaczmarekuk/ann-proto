import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRectangle } from 'app/shared/model/rectangle.model';

type EntityResponseType = HttpResponse<IRectangle>;
type EntityArrayResponseType = HttpResponse<IRectangle[]>;

@Injectable({ providedIn: 'root' })
export class RectangleService {
    private resourceUrl = SERVER_API_URL + 'api/rectangles';

    constructor(private http: HttpClient) {}

    create(rectangle: IRectangle): Observable<EntityResponseType> {
        return this.http.post<IRectangle>(this.resourceUrl, rectangle, { observe: 'response' });
    }

    update(rectangle: IRectangle): Observable<EntityResponseType> {
        return this.http.put<IRectangle>(this.resourceUrl, rectangle, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IRectangle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IRectangle[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
