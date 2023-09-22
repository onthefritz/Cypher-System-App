import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCharacterDialogComponent } from './add-character-dialog.component';

describe('AddCharacterDialogComponent', () => {
  let component: AddCharacterDialogComponent;
  let fixture: ComponentFixture<AddCharacterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCharacterDialogComponent]
    });
    fixture = TestBed.createComponent(AddCharacterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
