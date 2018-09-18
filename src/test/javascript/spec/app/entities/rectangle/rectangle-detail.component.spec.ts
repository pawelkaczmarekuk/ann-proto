/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipstermojTestModule } from '../../../test.module';
import { RectangleDetailComponent } from 'app/entities/rectangle/rectangle-detail.component';
import { Rectangle } from 'app/shared/model/rectangle.model';

describe('Component Tests', () => {
    describe('Rectangle Management Detail Component', () => {
        let comp: RectangleDetailComponent;
        let fixture: ComponentFixture<RectangleDetailComponent>;
        const route = ({ data: of({ rectangle: new Rectangle(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipstermojTestModule],
                declarations: [RectangleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(RectangleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(RectangleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.rectangle).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
