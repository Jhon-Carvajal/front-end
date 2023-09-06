import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdvpersonaComponent } from './hdvpersona.component';

describe('HdvpersonaComponent', () => {
  let component: HdvpersonaComponent;
  let fixture: ComponentFixture<HdvpersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HdvpersonaComponent]
    });
    fixture = TestBed.createComponent(HdvpersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
