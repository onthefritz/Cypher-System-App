import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../helpers/constants';
import { UpsertAbilityComponent } from '../dialogs/upsert-ability/upsert-ability.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-special-abilities',
  templateUrl: './special-abilities.component.html',
  styleUrls: ['./special-abilities.component.scss']
})
export class SpecialAbilitiesComponent {
  @Input() abilitiesData: any
  @Input() isEditing: boolean = false
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

  abilitiesDisplayedColumns: string[] = [ 'name', 'cost', 'description' ]
  abilitiesDisplayedColumnsWithEdit: string[] = [ 'name', 'cost', 'description', 'menu' ]

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

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

  deleteAbility(name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/ability/special/${this.characterId}/${name}`).subscribe({
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
