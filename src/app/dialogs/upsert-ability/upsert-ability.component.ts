import { DialogRef, DIALOG_DATA, Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { SelectAbilityComponent } from '../select-ability/select-ability.component';
import { ability } from 'src/app/models/ability';

@Component({
  selector: 'app-upsert-ability',
  templateUrl: './upsert-ability.component.html',
  styleUrls: ['./upsert-ability.component.scss']
})
export class UpsertAbilityComponent {
  upsertType!: string
  characterId!: string
  name!: string
  source!: string
  cost!: number
  costString!: string
  costType!: string
  description!: string
  abilityId!: string
  tier!: string
  costTime!: string
  isCharacterAbility!: boolean

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any, private dialog: Dialog) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId
    this.isCharacterAbility = this.data.isCharacterAbility

    if (!this.data.isAdd) {
      this.abilityId = this.data.special.id
      this.name = this.data.special.name
      this.source = this.data.special.source
      this.cost = this.data.special.cost
      this.costString = this.data.special.cost
      this.costType = this.data.special.costType
      this.description = this.data.special.description
      this.tier = this.data.special.tier
      this.costTime = this.data.special.costTime
    }
    else {
      this.name = ''
      this.source = ''
      this.cost = 0
      this.costString = ''
      this.costType = ''
      this.description = ''
      this.tier = ''
      this.costTime = ''
    }
  }

  addAbility() {
    let special = {
      id: !this.abilityId ? crypto.randomUUID() : this.abilityId,
      name: this.name,
      source: this.source,
      cost: this.isCharacterAbility ? this.cost : this.costString,
      costType: this.costType,
      description: this.description,
      tier: this.tier,
      costTime: this.costTime
    }

    this.dialogRef.close(special)
  }

  openAbilitiesModal() {
    const newDialogRef = this.dialog.open(SelectAbilityComponent, {
      minWidth: '600px',
      maxWidth: '80%'
    })

    newDialogRef.closed.subscribe(result => {
      if (result) {
        let selectedAbility = result as ability
        this.name = selectedAbility.name
        this.cost = selectedAbility.cost ? parseInt(selectedAbility.cost) : 0
        this.costString = selectedAbility.cost
        this.costType = selectedAbility.costType
        this.description = selectedAbility.description
        this.tier = selectedAbility.tier
        this.costTime = selectedAbility.costTime
      }
    })
  }

  close() {
    this.dialogRef.close()
  }
}
