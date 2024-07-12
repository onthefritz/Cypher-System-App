import { Dialog } from '@angular/cdk/dialog'
import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BASE_URL } from '../helpers/constants'
import { UpsertAbilityComponent } from '../dialogs/upsert-ability/upsert-ability.component'
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component'
import { ability } from '../models/character'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-special-abilities',
  templateUrl: './special-abilities.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./special-abilities.component.scss']
})
export class SpecialAbilitiesComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() abilitiesData: any
  @Input() isEditing: boolean = false
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

  loaded: boolean = false

  abilitiesWithDropdownDisplayedColumns: string[] = [ 'name', 'source', 'cost' ]
  abilitiesWithDropdownDisplayedColumnsDisplays = { 
    name: 'Name',
    cost: 'Cost',
    costType: 'Cost Type',
  }

  columnsToDisplayWithExpand = [...this.abilitiesWithDropdownDisplayedColumns, 'expand']
  expandedElement!: ability | null

  @ViewChild(MatSort) sort!: MatSort

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.columnsToDisplayWithExpand = [...this.abilitiesWithDropdownDisplayedColumns, 'menu', 'expand']
    }
    this.abilitiesData = new MatTableDataSource(this.abilitiesData)
    this.abilitiesData.filterPredicate = function(data: any, filter: string): boolean {
      let costField = data.cost.toString() + ' ' + data.costType.toString()
      return data.name.toLowerCase().includes(filter)
          || data.source.toLowerCase().includes(filter)
          || costField.toLowerCase().includes(filter)
    }
    this.abilitiesData.sort = this.sort
  }

  ngAfterViewInit() {
    this.loaded = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.loaded) {
      return
    }
    let changedSkills = changes['abilitiesData'].currentValue
    this.abilitiesData = new MatTableDataSource(changedSkills)
    this.abilitiesData.sort = this.sort
  }

  getDisplayTitle(column: string) {
    return this.abilitiesWithDropdownDisplayedColumnsDisplays[column as keyof typeof this.abilitiesWithDropdownDisplayedColumnsDisplays]
  }

  upsertAbility(isAdd: boolean, special: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      special: special,
      isCharacterAbility: true
    }

    const dialogRef = this.dialog.open(UpsertAbilityComponent, {
      minWidth: '600px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/ability/special/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteAbility(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/ability/special/${this.characterId}/${id}`).subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.abilitiesData.filter = filterValue.trim().toLowerCase()
  }

  lowerSortOrder(id: string, sortOrder: number) {
    let request = {
      sortOrder: sortOrder - 1
    }
    this.http.post(`${BASE_URL}/ability/special/${this.characterId}/${id}`, request).subscribe({
      next: () => {
        this.reloadCharacter.emit()
      }
    })
  }

  higherSortOrder(id: string, sortOrder: number) {
    let request = {
      sortOrder: sortOrder + 1
    }
    this.http.post(`${BASE_URL}/ability/special/${this.characterId}/${id}`, request).subscribe({
      next: () => {
        this.reloadCharacter.emit()
      }
    })
  }
}
