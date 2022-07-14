import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsForAdminComponent } from './product-details-for-admin.component';

describe('ProductDetailsForAdminComponent', () => {
  let component: ProductDetailsForAdminComponent;
  let fixture: ComponentFixture<ProductDetailsForAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsForAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsForAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
