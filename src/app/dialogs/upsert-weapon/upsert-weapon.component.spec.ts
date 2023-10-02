import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertWeaponComponent } from './upsert-weapon.component';

describe('UpsertWeaponComponent', () => {
  let component: UpsertWeaponComponent;
  let fixture: ComponentFixture<UpsertWeaponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertWeaponComponent]
    });
    fixture = TestBed.createComponent(UpsertWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
