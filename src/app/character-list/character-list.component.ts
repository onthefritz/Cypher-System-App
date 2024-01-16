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

  clickImport() {
    let importInput = document.getElementById('importCharacter')
    importInput?.click()
  }

  importCharacter(event: any) {
    let importInput = (<HTMLInputElement>document.getElementById('importCharacter'))
    let files = importInput?.files

    if (files != null && files.length > 0) {
      let reader = new FileReader()

      reader.onload = (readerEvt: any) => {
        let fileData = JSON.parse(readerEvt.target.result)

        let characterFound = this.characters.some(x => x.id == fileData.id)

        if (characterFound) {
          const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
            minWidth: '300px',
            data: {
              title: "Are you sure?",
              message: `There is a pre-existing character with the same ID. 
                This will overwrite your current character. 
                This cannot be undone.`,
                okayButton: "YES"
            }
          })
      
          dialogRef.closed.subscribe(result => {
            if (result) {
              this.http.post(`${BASE_URL}/character/importCharacter`, fileData).subscribe((res) => {
                this.loadCharacters()
              })
            }
          })
        }
        else {
          this.http.post(`${BASE_URL}/character/importCharacter`, fileData).subscribe((res) => {
            this.loadCharacters()
          })
        }
      }

      reader.readAsText(files[0])

      importInput.value = ''
    }
  }
}
