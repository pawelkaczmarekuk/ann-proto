/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JhipstermojTestModule } from '../../../test.module';
import { AnnotationSetUpdateComponent } from 'app/entities/annotation-set/annotation-set-update.component';
import { AnnotationSetService } from 'app/entities/annotation-set/annotation-set.service';
import { AnnotationSet } from 'app/shared/model/annotation-set.model';

describe('Component Tests', () => {
    describe('AnnotationSet Management Update Component', () => {
        let comp: AnnotationSetUpdateComponent;
        let fixture: ComponentFixture<AnnotationSetUpdateComponent>;
        let service: AnnotationSetService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipstermojTestModule],
                declarations: [AnnotationSetUpdateComponent]
            })
                .overrideTemplate(AnnotationSetUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AnnotationSetUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AnnotationSetService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AnnotationSet(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.annotationSet = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AnnotationSet();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.annotationSet = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
