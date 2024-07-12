import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { ability } from 'src/app/models/character';

@Component({
  selector: 'app-select-ability',
  templateUrl: './select-ability.component.html',
  styleUrls: ['./select-ability.component.scss']
})
export class SelectAbilityComponent {

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  selectAbility(data: any) {
    if (data.length === 1) {
      this.dialogRef.close(data[0]) 
    }
    else {
      this.dialogRef.close()
    }
  }

  close() {
    this.dialogRef.close()
  }
}
