import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanNutricionComponent } from './plan-nutricion.component';

describe('PlanNutricionComponent', () => {
  let component: PlanNutricionComponent;
  let fixture: ComponentFixture<PlanNutricionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanNutricionComponent]
    });
    fixture = TestBed.createComponent(PlanNutricionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
