import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerbarComponent } from './spinnerbar.component';

describe('SpinnerbarComponent', () => {
  let component: SpinnerbarComponent;
  let fixture: ComponentFixture<SpinnerbarComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [SpinnerbarComponent]
    });
    fixture = TestBed.createComponent(SpinnerbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
