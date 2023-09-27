import { ComponentFixture, TestBed } from '@angular/core/testing';
import {MatTableModule} from '@angular/material/table';

import { TablafincaComponent } from './tablafinca.component';


describe('TablafincaComponent', () => {
  let component: TablafincaComponent;
  let fixture: ComponentFixture<TablafincaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TablafincaComponent]
    });
    fixture = TestBed.createComponent(TablafincaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
