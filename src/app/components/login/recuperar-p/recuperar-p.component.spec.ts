import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarPComponent } from './recuperar-p.component';

describe('RecuperarPComponent', () => {
  let component: RecuperarPComponent;
  let fixture: ComponentFixture<RecuperarPComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarPComponent]
    });
    fixture = TestBed.createComponent(RecuperarPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
