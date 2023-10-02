import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltPoolStatsComponent } from './alt-pool-stats.component';

describe('AltPoolStatsComponent', () => {
  let component: AltPoolStatsComponent;
  let fixture: ComponentFixture<AltPoolStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AltPoolStatsComponent]
    });
    fixture = TestBed.createComponent(AltPoolStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
