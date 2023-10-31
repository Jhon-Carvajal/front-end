import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarfComponent } from './actualizarf.component';

describe('ActualizarfComponent', () => {
  let component: ActualizarfComponent;
  let fixture: ComponentFixture<ActualizarfComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarfComponent]
    });
    fixture = TestBed.createComponent(ActualizarfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
