import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAttackComponent } from './upsert-attack.component';

describe('UpsertAttackComponent', () => {
  let component: UpsertAttackComponent;
  let fixture: ComponentFixture<UpsertAttackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertAttackComponent]
    });
    fixture = TestBed.createComponent(UpsertAttackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
