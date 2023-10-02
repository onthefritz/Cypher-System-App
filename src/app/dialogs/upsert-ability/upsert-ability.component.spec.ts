import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertAbilityComponent } from './upsert-ability.component';

describe('UpsertAbilityComponent', () => {
  let component: UpsertAbilityComponent;
  let fixture: ComponentFixture<UpsertAbilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertAbilityComponent]
    });
    fixture = TestBed.createComponent(UpsertAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
