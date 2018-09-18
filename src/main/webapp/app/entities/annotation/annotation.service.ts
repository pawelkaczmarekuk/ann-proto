import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAnnotation } from 'app/shared/model/annotation.model';

type EntityResponseType = HttpResponse<IAnnotation>;
type EntityArrayResponseType = HttpResponse<IAnnotation[]>;

@Injectable({ providedIn: 'root' })
export class AnnotationService {
    private resourceUrl = SERVER_API_URL + 'api/annotations';

    constructor(private http: HttpClient) {}

    create(annotation: IAnnotation): Observable<EntityResponseType> {
        return this.http.post<IAnnotation>(this.resourceUrl, annotation, { observe: 'response' });
    }

    update(annotation: IAnnotation): Observable<EntityResponseType> {
        return this.http.put<IAnnotation>(this.resourceUrl, annotation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAnnotation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAnnotation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
