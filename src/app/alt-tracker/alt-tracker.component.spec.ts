import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltTrackerComponent } from './alt-tracker.component';

describe('AltTrackerComponent', () => {
  let component: AltTrackerComponent;
  let fixture: ComponentFixture<AltTrackerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltTrackerComponent]
    });
    fixture = TestBed.createComponent(AltTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
