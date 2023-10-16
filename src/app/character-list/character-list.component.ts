import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../helpers/constants'
import { characterList } from '../models/character-list'
import { Dialog } from '@angular/cdk/dialog'
import { AddCharacterDialogComponent } from '../dialogs/add-character-dialog/add-character-dialog.component'
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: characterList[] = []
  isUpdated: boolean = false
  hasIds: boolean = false

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router) { }

  ngOnInit() {
    this.loadCharacters()
  }

  loadCharacters() {
    this.http.get(`${BASE_URL}/character/getAll`).subscribe((res) => {
      this.characters = res as characterList[]
      this.isUpdated = !this.characters.some((char) => !char.isUpdated)
      this.hasIds = !this.characters.some((char) => !char.hasIds)
    })
  }

  addCharacterDialog() {
    const dialogRef = this.dialog.open(AddCharacterDialogComponent, {
      minWidth: '500px'
    })

    dialogRef.closed.subscribe(result => {
      this.loadCharacters()
    })
  }

  deleteCharacterDialog(characterId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/character/delete/${characterId}`).subscribe({
            next: () => {
                this.loadCharacters()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  updateCharactersBaseValue() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone.",
          okayButton: "Yes"
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.get(`${BASE_URL}/character/fix/updateBaseValues`).subscribe({
            next: () => {
                this.loadCharacters()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  addIdsToCharacter() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone.",
          okayButton: "Yes"
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.get(`${BASE_URL}/character/fix/addIdsToCharacter`).subscribe({
            next: () => {
                this.loadCharacters()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  openSheet(id: string) {
    this.router.navigateByUrl(`/sheet/${id}`)
  }

  openSheetEditor(id: string) {
    this.router.navigateByUrl(`/edit/${id}`)
  }
}
