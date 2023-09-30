import { Dialog } from '@angular/cdk/dialog'
import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BASE_URL } from '../helpers/constants'
import { character, skill } from '../models/character'

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit, AfterViewInit {
  characterInfo: character = new character
  characterLoaded: boolean = false

  private characterId: string = ''

  constructor(private http: HttpClient, private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterId = params['id']
    });

    this.loadCharacter();
  }

  ngAfterViewInit() {
    
  }

  loadCharacter() {
    this.http.get(`${BASE_URL}/character/${this.characterId}`).subscribe((res) => {
      this.characterInfo = res as character
    
      this.characterLoaded = true
    })
  }

  characterList() {
    this.router.navigateByUrl(`/`)
  }

  editSheet() {
    this.router.navigateByUrl(`/edit/${this.characterId}`)
  }

  shortRest() {
    this.http.get(`${BASE_URL}/character/shortRest/${this.characterId}/1`).subscribe((res) => {
      location.reload()
    })
  }

  longRest() {
    this.http.get(`${BASE_URL}/character/longRest/${this.characterId}`).subscribe((res) => {
      location.reload()
    })
  }

  refreshEdgeAndEffort() {
    this.http.get(`${BASE_URL}/character/refreshEdgeAndEffort/${this.characterId}`).subscribe((res) => {
      location.reload()
    })
  }
}
