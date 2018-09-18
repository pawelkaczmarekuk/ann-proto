/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipstermojTestModule } from '../../../test.module';
import { AnnotationSetDetailComponent } from 'app/entities/annotation-set/annotation-set-detail.component';
import { AnnotationSet } from 'app/shared/model/annotation-set.model';

describe('Component Tests', () => {
    describe('AnnotationSet Management Detail Component', () => {
        let comp: AnnotationSetDetailComponent;
        let fixture: ComponentFixture<AnnotationSetDetailComponent>;
        const route = ({ data: of({ annotationSet: new AnnotationSet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipstermojTestModule],
                declarations: [AnnotationSetDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AnnotationSetDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AnnotationSetDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.annotationSet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
