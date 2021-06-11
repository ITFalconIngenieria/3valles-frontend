import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JerarquiaComponent } from './jerarquia.component';

describe('JerarquiaComponent', () => {
  let component: JerarquiaComponent;
  let fixture: ComponentFixture<JerarquiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JerarquiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JerarquiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
