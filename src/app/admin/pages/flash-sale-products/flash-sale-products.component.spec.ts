import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashSaleProductsComponent } from './flash-sale-products.component';

describe('FlashSaleProductsComponent', () => {
  let component: FlashSaleProductsComponent;
  let fixture: ComponentFixture<FlashSaleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashSaleProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashSaleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
