import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantulaComponent } from './plantula.component';

describe('PlantulaComponent', () => {
  let component: PlantulaComponent;
  let fixture: ComponentFixture<PlantulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantulaComponent]
    });
    fixture = TestBed.createComponent(PlantulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
