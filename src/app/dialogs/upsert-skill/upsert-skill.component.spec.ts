import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertSkillComponent } from './upsert-skill.component';

describe('UpsertSkillComponent', () => {
  let component: UpsertSkillComponent;
  let fixture: ComponentFixture<UpsertSkillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertSkillComponent]
    });
    fixture = TestBed.createComponent(UpsertSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
