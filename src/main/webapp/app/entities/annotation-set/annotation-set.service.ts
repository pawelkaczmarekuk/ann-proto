import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnnotationSet } from 'app/shared/model/annotation-set.model';

type EntityResponseType = HttpResponse<IAnnotationSet>;
type EntityArrayResponseType = HttpResponse<IAnnotationSet[]>;

@Injectable({ providedIn: 'root' })
export class AnnotationSetService {
    private resourceUrl = SERVER_API_URL + 'api/annotation-sets';

    constructor(private http: HttpClient) {}

    create(annotationSet: IAnnotationSet): Observable<EntityResponseType> {
        return this.http.post<IAnnotationSet>(this.resourceUrl, annotationSet, { observe: 'response' });
    }

    update(annotationSet: IAnnotationSet): Observable<EntityResponseType> {
        return this.http.put<IAnnotationSet>(this.resourceUrl, annotationSet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAnnotationSet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAnnotationSet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
