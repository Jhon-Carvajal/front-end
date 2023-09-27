import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TLotesComponent } from './t-lotes.component';

describe('TLotesComponent', () => {
  let component: TLotesComponent;
  let fixture: ComponentFixture<TLotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TLotesComponent]
    });
    fixture = TestBed.createComponent(TLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
