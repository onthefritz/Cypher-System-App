import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertMoneyComponent } from './insert-money.component';

describe('InsertMoneyComponent', () => {
  let component: InsertMoneyComponent;
  let fixture: ComponentFixture<InsertMoneyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertMoneyComponent]
    });
    fixture = TestBed.createComponent(InsertMoneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
