import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BASE_URL } from '../helpers/constants';
import { Dialog } from '@angular/cdk/dialog';
import { UpsertItemComponent } from '../dialogs/upsert-item/upsert-item.component';
import { UpsertWeaponComponent } from '../dialogs/upsert-weapon/upsert-weapon.component';
import { UpsertCypherComponent } from '../dialogs/upsert-cypher/upsert-cypher.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { InsertMoneyComponent } from '../dialogs/insert-money/insert-money.component';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
  @Input() equipmentData: any
  @Input() characterId: any

  @Output() reloadCharacter = new EventEmitter()

  itemDisplayedColumns: string[] = [ 'itemName', 'itemCount', 'itemDescription', 'menu' ]
  weaponDisplayedColumns: string[] = [ 'weaponName', 'weaponCount', 'weaponType', 'weaponDescription', 'menu' ]
  oddityDisplayedColumns: string[] = [ 'oddityName', 'oddityCount', 'oddityDescription', 'menu' ]
  cypherDisplayedColumns: string[] = [ 'cypherName', 'cypherTier', 'cypherDescription', 'menu' ]

  constructor(private http: HttpClient, private dialog: Dialog) { }

  upsertItem(isAdd: boolean, item: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      item: item,
      itemType: 'Item'
    }

    const dialogRef = this.dialog.open(UpsertItemComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/equipment/item/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteItem(itemName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/item/${this.characterId}/${itemName}`).subscribe({
            next: () => {
                this.reloadCharacter.emit()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  upsertWeapon(isAdd: boolean, weapon: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      weapon: weapon
    }

    const dialogRef = this.dialog.open(UpsertWeaponComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/equipment/weapon/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteWeapon(weaponName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/weapon/${this.characterId}/${weaponName}`).subscribe({
            next: () => {
                this.reloadCharacter.emit()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  upsertOddity(isAdd: boolean, oddity: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      item: oddity,
      itemType: 'Oddity'
    }

    const dialogRef = this.dialog.open(UpsertItemComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/equipment/oddity/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteOddity(oddityName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/oddity/${this.characterId}/${oddityName}`).subscribe({
            next: () => {
                this.reloadCharacter.emit()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  upsertCypher(isAdd: boolean, cypher: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      cypher: cypher
    }

    const dialogRef = this.dialog.open(UpsertCypherComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/equipment/cypher/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteCypher(cypherName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/cypher/${this.characterId}/${cypherName}`).subscribe({
            next: () => {
                this.reloadCharacter.emit()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  insertMoney() {
    let dialogData = {
      characterId: this.characterId
    }

    const dialogRef = this.dialog.open(InsertMoneyComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/equipment/money/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  updateMoney(data: any, moneyName: string) {
    let content = {
      name: moneyName,
      amount: data.value
    }
    this.http.post(`${BASE_URL}/equipment/money/${this.characterId}/`, content).subscribe((res) => {
      this.reloadCharacter.emit()
    })
  }

  deleteMoney(moneyName: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/money/${this.characterId}/${moneyName}`).subscribe({
            next: () => {
                this.reloadCharacter.emit()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }
}
