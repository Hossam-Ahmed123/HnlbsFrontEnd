import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildCategoryProductsComponent } from './child-category-products.component';

describe('ChildCategoryProductsComponent', () => {
  let component: ChildCategoryProductsComponent;
  let fixture: ComponentFixture<ChildCategoryProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildCategoryProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildCategoryProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
