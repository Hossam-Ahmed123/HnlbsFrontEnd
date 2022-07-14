import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToTrackComponent } from './how-to-track.component';

describe('HowToTrackComponent', () => {
  let component: HowToTrackComponent;
  let fixture: ComponentFixture<HowToTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowToTrackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowToTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
