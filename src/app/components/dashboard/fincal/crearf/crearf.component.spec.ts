import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearFComponent } from './crearf.component';

describe('CrearFComponent', () => {
  let component: CrearFComponent;
  let fixture: ComponentFixture<CrearFComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearFComponent]
    });
    fixture = TestBed.createComponent(CrearFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
