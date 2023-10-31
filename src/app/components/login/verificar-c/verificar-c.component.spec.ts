import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarCComponent } from './verificar-c.component';

describe('VerificarCComponent', () => {
  let component: VerificarCComponent;
  let fixture: ComponentFixture<VerificarCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerificarCComponent]
    });
    fixture = TestBed.createComponent(VerificarCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
