import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../helpers/constants';
import { UpsertAttackComponent } from '../dialogs/upsert-attack/upsert-attack.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.scss']
})
export class AttacksComponent {
  @Input() attacksData: any
  @Input() isEditing: boolean = false
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

  attacksDisplayedColumns: string[] = [ 'name', 'modifier', 'damage', 'range' ]
  attacksDisplayedColumnsWithEdit: string[] = [ 'name', 'modifier', 'damage', 'range', 'menu' ]

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  upsertAttack(isAdd: boolean, attack: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      attack: attack
    }

    const dialogRef = this.dialog.open(UpsertAttackComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/ability/attack/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteAttack(name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/ability/attack/${this.characterId}/${name}`).subscribe({
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
