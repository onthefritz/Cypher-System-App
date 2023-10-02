import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-upsert-attack',
  templateUrl: './upsert-attack.component.html',
  styleUrls: ['./upsert-attack.component.scss']
})
export class UpsertAttackComponent implements OnInit {
  upsertType!: string
  characterId!: string
  name!: string
  modifier!: number
  damage!: number
  range!: number

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.name = this.data.attack.name
      this.modifier = this.data.attack.modifier
      this.damage = this.data.attack.damage
      this.range = this.data.attack.range
    }
    else {
      this.name = ''
      this.modifier = 0
      this.damage = 0
      this.range = 0
    }
  }

  addAttack() {
    let attack = {
      name: this.name,
      modifier: this.modifier,
      damage: this.damage,
      range: this.range
    }

    this.dialogRef.close(attack)
  }

  close() {
    this.dialogRef.close()
  }
}
