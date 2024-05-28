import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialAbilitiesListComponent } from './special-abilities-list.component';

describe('SpecialAbilitiesListComponent', () => {
  let component: SpecialAbilitiesListComponent;
  let fixture: ComponentFixture<SpecialAbilitiesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecialAbilitiesListComponent]
    });
    fixture = TestBed.createComponent(SpecialAbilitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
