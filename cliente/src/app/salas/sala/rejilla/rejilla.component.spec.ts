import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejillaComponent } from './rejilla.component';

describe('RejillaComponent', () => {
    let component: RejillaComponent;
    let fixture: ComponentFixture<RejillaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RejillaComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RejillaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
