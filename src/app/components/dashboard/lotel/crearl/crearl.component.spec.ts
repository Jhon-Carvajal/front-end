import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearlComponent } from './crearl.component';

describe('CrearlComponent', () => {
  let component: CrearlComponent;
  let fixture: ComponentFixture<CrearlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearlComponent]
    });
    fixture = TestBed.createComponent(CrearlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
