import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashProductsComponent } from './dash-products.component';

describe('DashProductsComponent', () => {
  let component: DashProductsComponent;
  let fixture: ComponentFixture<DashProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashProductsComponent]
    });
    fixture = TestBed.createComponent(DashProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
