import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../helpers/constants';
import { UpsertAbilityComponent } from '../dialogs/upsert-ability/upsert-ability.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { ability } from '../models/character';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-special-abilities',
  templateUrl: './special-abilities.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./special-abilities.component.scss']
})
export class SpecialAbilitiesComponent implements OnInit {
  @Input() abilitiesData: any
  @Input() isEditing: boolean = false
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

  abilitiesWithDropdownDisplayedColumns: string[] = [ 'name', 'cost' ]
  abilitiesWithDropdownDisplayedColumnsDisplays = { 
    name: 'Name',
    cost: 'Cost',
    costType: 'Cost Type',
  }

  columnsToDisplayWithExpand = [...this.abilitiesWithDropdownDisplayedColumns, 'expand']
  expandedElement!: ability | null

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.isEditing) {
      this.columnsToDisplayWithExpand = [...this.abilitiesWithDropdownDisplayedColumns, 'menu', 'expand']
    }
  }

  getDisplayTitle(column: string) {
    return this.abilitiesWithDropdownDisplayedColumnsDisplays[column as keyof typeof this.abilitiesWithDropdownDisplayedColumnsDisplays]
  }

  upsertAbility(isAdd: boolean, special: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      special: special
    }

    const dialogRef = this.dialog.open(UpsertAbilityComponent, {
      minWidth: '300px',
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
}
