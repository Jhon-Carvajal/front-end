import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarPersonaComponent } from './actualizar-persona.component';

describe('ActualizarPersonaComponent', () => {
  let component: ActualizarPersonaComponent;
  let fixture: ComponentFixture<ActualizarPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActualizarPersonaComponent]
    });
    fixture = TestBed.createComponent(ActualizarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
