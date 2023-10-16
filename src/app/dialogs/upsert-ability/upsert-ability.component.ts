import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-upsert-ability',
  templateUrl: './upsert-ability.component.html',
  styleUrls: ['./upsert-ability.component.scss']
})
export class UpsertAbilityComponent {
  upsertType!: string
  characterId!: string
  name!: string
  cost!: number
  costType!: string
  description!: string
  abilityId!: string

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.abilityId = this.data.special.id
      this.name = this.data.special.name
      this.cost = this.data.special.cost
      this.costType = this.data.special.costType
      this.description = this.data.special.description
    }
    else {
      this.name = ''
      this.cost = 0
      this.costType = ''
      this.description = ''
    }
  }

  addAbility() {
    let special = {
      id: !this.abilityId ? crypto.randomUUID() : this.abilityId,
      name: this.name,
      cost: this.cost,
      costType: this.costType,
      description: this.description
    }

    this.dialogRef.close(special)
  }

  close() {
    this.dialogRef.close()
  }
}
