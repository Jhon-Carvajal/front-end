import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarlComponent } from './actualizarl.component';

describe('ActualizarlComponent', () => {
  let component: ActualizarlComponent;
  let fixture: ComponentFixture<ActualizarlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarlComponent]
    });
    fixture = TestBed.createComponent(ActualizarlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
