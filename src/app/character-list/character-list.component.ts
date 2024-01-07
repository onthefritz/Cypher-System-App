import { Component, Inject, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../helpers/constants'
import { characterList } from '../models/character-list'
import { settings } from '../models/settings'
import { Dialog } from '@angular/cdk/dialog'
import { AddCharacterDialogComponent } from '../dialogs/add-character-dialog/add-character-dialog.component'
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component'
import { Router } from '@angular/router'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: characterList[] = []
  isUpdated: boolean = false
  hasIds: boolean = false
  theme: string = ''
  themeIcon: string = ''
  
  lightThemeIcon: string = 'brightness_5'
  darkThemeIcon: string = 'brightness_2'

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.loadSettings()
    this.loadCharacters()
  }

  loadSettings() {
    this.http.get(`${BASE_URL}/app-settings/get`).subscribe((res) => {
      let settings = res as settings

      this.theme = settings.theme

      if (this.theme == 'light') {
        this.themeIcon = this.darkThemeIcon
      }
      else {
        this.themeIcon = this.lightThemeIcon
      }
    })
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

  changeTheme() {
    this.document.body.classList.toggle('light')
    this.document.body.classList.toggle('dark')

    if (this.theme == 'light') {
      this.theme = 'dark'
      this.themeIcon = this.lightThemeIcon
    }
    else {
      this.theme = 'light'
      this.themeIcon = this.darkThemeIcon
    }

    let newTheme = {
      theme: this.theme
    }

    this.http.post(`${BASE_URL}/app-settings/theme`, newTheme).subscribe((res) => {
      
    })
  }
}
