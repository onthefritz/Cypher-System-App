import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolStatComponent } from './pool-stat.component';

describe('PoolStatComponent', () => {
  let component: PoolStatComponent;
  let fixture: ComponentFixture<PoolStatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoolStatComponent]
    });
    fixture = TestBed.createComponent(PoolStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
