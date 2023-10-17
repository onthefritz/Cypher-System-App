import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BASE_URL } from '../helpers/constants';
import { Dialog } from '@angular/cdk/dialog';
import { UpsertItemComponent } from '../dialogs/upsert-item/upsert-item.component';
import { UpsertWeaponComponent } from '../dialogs/upsert-weapon/upsert-weapon.component';
import { UpsertCypherComponent } from '../dialogs/upsert-cypher/upsert-cypher.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { InsertMoneyComponent } from '../dialogs/insert-money/insert-money.component';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit, AfterViewInit {
  @Input() equipmentData: any
  @Input() characterId: any

  @Output() reloadCharacter = new EventEmitter()

  itemData: any
  weaponData: any
  oddityData: any
  cypherData: any

  itemDisplayedColumns: string[] = [ 'name', 'count', 'description', 'menu' ]
  weaponDisplayedColumns: string[] = [ 'name', 'type', 'count', 'description', 'menu' ]
  oddityDisplayedColumns: string[] = [ 'name', 'count', 'description', 'menu' ]
  cypherDisplayedColumns: string[] = [ 'name', 'tier', 'description', 'menu' ]
  
  @ViewChild('itemsTable') itemsTableSort: MatSort | undefined
  @ViewChild('weaponsTable') weaponsTableSort: MatSort | undefined
  @ViewChild('odditiesTable') odditiesTableSort: MatSort | undefined
  @ViewChild('cyphersTable') cyphersTableSort: MatSort | undefined

  constructor(private http: HttpClient, private dialog: Dialog) { }

  ngOnInit(): void {
    this.itemData = new MatTableDataSource(this.equipmentData.items)
    this.weaponData = new MatTableDataSource(this.equipmentData.weapons)
    this.oddityData = new MatTableDataSource(this.equipmentData.oddities)
    this.cypherData = new MatTableDataSource(this.equipmentData.cyphers)
  }

  ngAfterViewInit() {
    this.itemData.sort = this.itemsTableSort
    this.weaponData.sort = this.weaponsTableSort
    this.oddityData.sort = this.odditiesTableSort
    this.cypherData.sort = this.cyphersTableSort
  }

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

  deleteItem(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/item/${this.characterId}/${id}`).subscribe({
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

  deleteWeapon(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/weapon/${this.characterId}/${id}`).subscribe({
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

  deleteOddity(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/oddity/${this.characterId}/${id}`).subscribe({
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

  deleteCypher(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/cypher/${this.characterId}/${id}`).subscribe({
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

  deleteMoney(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/equipment/money/${this.characterId}/${id}`).subscribe({
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
