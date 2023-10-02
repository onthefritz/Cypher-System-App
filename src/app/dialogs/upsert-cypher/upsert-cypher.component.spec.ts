import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertCypherComponent } from './upsert-cypher.component';

describe('UpsertCypherComponent', () => {
  let component: UpsertCypherComponent;
  let fixture: ComponentFixture<UpsertCypherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpsertCypherComponent]
    });
    fixture = TestBed.createComponent(UpsertCypherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
