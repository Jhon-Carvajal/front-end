import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanFumigacionComponent } from './plan-fumigacion.component';

describe('PlanFumigacionComponent', () => {
  let component: PlanFumigacionComponent;
  let fixture: ComponentFixture<PlanFumigacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanFumigacionComponent]
    });
    fixture = TestBed.createComponent(PlanFumigacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
