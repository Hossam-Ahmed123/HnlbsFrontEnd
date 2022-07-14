import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscripbtionsComponent } from './subscripbtions.component';

describe('SubscripbtionsComponent', () => {
  let component: SubscripbtionsComponent;
  let fixture: ComponentFixture<SubscripbtionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscripbtionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscripbtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
