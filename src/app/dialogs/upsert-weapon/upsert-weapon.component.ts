import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-upsert-weapon',
  templateUrl: './upsert-weapon.component.html',
  styleUrls: ['./upsert-weapon.component.scss']
})
export class UpsertWeaponComponent {
  upsertType!: string
  characterId!: string
  name!: string
  count!: number
  type!: string
  description!: string

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.name = this.data.weapon.name
      this.count = this.data.weapon.count
      this.type = this.data.weapon.type
      this.description = this.data.weapon.description
    }
    else {
      this.name = ''
      this.count = 0
      this.type = ''
      this.description = ''
    }
  }

  addWeapon() {
    let weapon = {
      name: this.name,
      count: this.count,
      type: this.type,
      description: this.description
    }

    this.dialogRef.close(weapon)
  }

  close() {
    this.dialogRef.close()
  }
}
