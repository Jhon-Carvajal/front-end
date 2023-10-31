import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FincalComponent } from './fincal.component';

describe('FincalComponent', () => {
  let component: FincalComponent;
  let fixture: ComponentFixture<FincalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FincalComponent]
    });
    fixture = TestBed.createComponent(FincalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
