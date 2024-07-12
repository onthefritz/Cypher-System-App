import { Component, Input } from '@angular/core';
import { character } from '../../models/character';
import { BASE_URL } from '../../helpers/constants';
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
  @Input() class!: string

  isTreeCypher = false

  constructor(private http: HttpClient, private dialogRef: DialogRef) { }

  addCharacter() {
    let characterInfo = new character
    characterInfo.id = crypto.randomUUID()
    characterInfo.baseInfo.name = this.name
    characterInfo.baseInfo.descriptor = this.descriptor
    characterInfo.baseInfo.class = this.class
    characterInfo.baseInfo.focus = this.focus
    characterInfo.settings.usingTrees = this.isTreeCypher
    this.http.post(`${BASE_URL}/character/add`, characterInfo).subscribe({
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
