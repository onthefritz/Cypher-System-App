import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { BASE_URL } from '../helpers/constants';
import { character } from '../models/character';

@Component({
  selector: 'app-edit-sheet',
  templateUrl: './edit-sheet.component.html',
  styleUrls: ['./edit-sheet.component.scss']
})
export class EditSheetComponent implements OnInit {
  characterInfo: character = new character
  characterLoaded: boolean = false

  private characterId: any

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterId = params['id']
    });

    this.loadCharacter();
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

  viewSheet() {
    this.router.navigateByUrl(`/sheet/${this.characterId}`)
  }

  onNameChange(event: any, element: string) {
    let target = event.target || event.srcElement || event.currentTarget
    let newValue: string = target.value

    let characterRequest: any = this.characterInfo

    characterRequest.baseInfo[element] = newValue
    this.http.post(`${BASE_URL}/stat/edit/saveName/${this.characterId}`, characterRequest.baseInfo).subscribe((res) => {
      this.loadCharacter()
    })
  }

  onStatsArmorOrMovementChange(data: any) {
    let characterRequest: any = this.characterInfo
    characterRequest.baseInfo.stats[data.element] = data.value
    this.http.post(`${BASE_URL}/stat/edit/saveName/${this.characterId}`, characterRequest.baseInfo).subscribe((res) => {
      this.loadCharacter()
    })
  }

  onCypherCountChange(data: any) {
    let request = {
      cypherCount: data.value
    }
    this.http.post(`${BASE_URL}/equipment/cypherCount/${this.characterId}`, request).subscribe((res) => {
      this.loadCharacter()
    })
  }
}
