import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertItemComponent } from './upsert-item.component';

describe('UpsertItemComponent', () => {
  let component: UpsertItemComponent;
  let fixture: ComponentFixture<UpsertItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertItemComponent]
    });
    fixture = TestBed.createComponent(UpsertItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
