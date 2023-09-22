import { Component, Input } from '@angular/core';
import { characterList } from '../models/character-list';
import { BASE_URL } from '../helpers/constants';
import { HttpClient } from '@angular/common/http';
import { DialogRef } from '@angular/cdk/dialog'

@Component({
  selector: 'app-add-character-dialog',
  templateUrl: './add-character-dialog.component.html',
  styleUrls: ['./add-character-dialog.component.scss']
})
export class AddCharacterDialogComponent {
  @Input() name!: string
  @Input() descriptor!: string
  @Input() focus!: string

  constructor(private http: HttpClient, private dialogRef: DialogRef) { }

  addCharacter() {
    let character = new characterList
    character.id = crypto.randomUUID()
    character.name = this.name
    character.descriptor = this.descriptor
    character.focus = this.focus
    this.http.post(`${BASE_URL}/character/add`, character).subscribe({
        next: () => {
            this.dialogRef.close()
        },
        error: (error) => {
            console.log(error)
        }
    })
  }

  close() {
    this.dialogRef.close()
  }
}
