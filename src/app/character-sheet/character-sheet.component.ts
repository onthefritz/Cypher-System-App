import { Dialog } from '@angular/cdk/dialog'
import { HttpClient } from '@angular/common/http'
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { BASE_URL } from '../helpers/constants'
import { character, skill } from '../models/character'
import { MatCheckboxChange } from '@angular/material/checkbox'
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component'
import { StatsComponent } from '../stats/stats.component'

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.scss']
})
export class CharacterSheetComponent implements OnInit, AfterViewInit {
  characterInfo: character = new character
  characterLoaded: boolean = false
  canLevelUp: boolean = false

  private characterId: string = ''

  @ViewChild(StatsComponent) private child!: StatsComponent

  constructor(private http: HttpClient, private router: Router,
    private route: ActivatedRoute, private dialog: Dialog) { }

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

      let advancementsMade = Object.values(this.characterInfo.baseInfo.tierAdvancement)
        .filter((advancement: any) => advancement === true).length
        
      if (advancementsMade > 3) {
        this.canLevelUp = true
      }
      else {
        this.canLevelUp = false
      }
    })
  }

  characterList() {
    this.router.navigateByUrl(`/`)
  }

  editSheet() {
    this.router.navigateByUrl(`/edit/${this.characterId}`)
  }

  shortRest() {
    this.child.shortRest()
  }

  longRest() {
    this.child.longRest()
  }

  refreshEdgeAndEffort() {
    this.child.refreshEdgeAndEffort()
  }

  tierAdvanced(event: MatCheckboxChange, element: string) {
    let newValue: boolean = event.checked

    let request: any = this.characterInfo.baseInfo.tierAdvancement

    request[element] = newValue
    this.http.post(`${BASE_URL}/character/setAdvancements/${this.characterId}`, request).subscribe((res) => {
      let advancementsMade = Object.values(this.characterInfo.baseInfo.tierAdvancement)
        .filter((advancement: any) => advancement === true).length
        
      if (advancementsMade > 3) {
        this.canLevelUp = true
      }
      else {
        this.canLevelUp = false
      }
    })
  }

  levelUp() {
    this.http.get(`${BASE_URL}/character/levelUp/${this.characterId}`).subscribe((res) => {
      this.characterLoaded = false
      this.loadCharacter()
    })
  }

  exportCharacter() {
    this.http.get(`${BASE_URL}/character/${this.characterId}`).subscribe((res) => {
      let characterInfo = res as character

      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(characterInfo))
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.style.display = 'none'
      downloadAnchorNode.setAttribute("href", dataStr)
      downloadAnchorNode.setAttribute("download", characterInfo.baseInfo.name + ".json")
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    })
  }
}
