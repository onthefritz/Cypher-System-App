import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../helpers/constants'
import { characterList } from '../models/character-list'
import { Dialog } from '@angular/cdk/dialog'
import { AddCharacterDialogComponent } from '../add-character-dialog/add-character-dialog.component'
import { Router } from '@angular/router'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: characterList[] = []

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router) { }

  ngOnInit() {
    this.loadCharacters()
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

  deleteCharacter(characterId: string) {
    this.http.delete(`${BASE_URL}/character/delete/${characterId}`).subscribe((res) => {
      this.loadCharacters()
    })
  }

  openSheet(id: string) {
    this.router.navigateByUrl(`/sheet/${id}`)
  }

  openSheetEditor(id: string) {
    
  }
}
