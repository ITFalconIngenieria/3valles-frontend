import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformadoresComponent } from './transformadores.component';

describe('TransformadoresComponent', () => {
  let component: TransformadoresComponent;
  let fixture: ComponentFixture<TransformadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransformadoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
