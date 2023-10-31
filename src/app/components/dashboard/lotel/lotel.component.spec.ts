import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotelComponent } from './lotel.component';

describe('LotelComponent', () => {
  let component: LotelComponent;
  let fixture: ComponentFixture<LotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotelComponent]
    });
    fixture = TestBed.createComponent(LotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
