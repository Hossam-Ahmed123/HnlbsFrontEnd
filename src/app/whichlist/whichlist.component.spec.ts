import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhichlistComponent } from './whichlist.component';

describe('WhichlistComponent', () => {
  let component: WhichlistComponent;
  let fixture: ComponentFixture<WhichlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhichlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhichlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
