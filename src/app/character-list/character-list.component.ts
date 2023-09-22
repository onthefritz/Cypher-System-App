import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BASE_URL } from '../helpers/constants'
import { characterList } from '../models/character-list'

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  characters: characterList[] = []

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCharacters()
  }

  loadCharacters() {
    this.http.get(`${BASE_URL}/character/getAll`).subscribe((res) => {
      this.characters = res as characterList[]
    })
  }

  addCharacter() {
    let character = new characterList
    character.id = crypto.randomUUID()
    character.name = 'Maxis'
    this.http.post(`${BASE_URL}/character/add`, character).subscribe({
        next: () => {
            this.loadCharacters()
        },
        error: (error) => {
            console.log(error)
        }
    })
  }

  goToCharacter(id: string) {
    console.log(id)
  }
}
