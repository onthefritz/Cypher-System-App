import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAbilityComponent } from './select-ability.component';

describe('SelectAbilityComponent', () => {
  let component: SelectAbilityComponent;
  let fixture: ComponentFixture<SelectAbilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAbilityComponent]
    });
    fixture = TestBed.createComponent(SelectAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
