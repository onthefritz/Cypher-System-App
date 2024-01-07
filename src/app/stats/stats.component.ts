import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../helpers/constants';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() baseCharacterInfo: any
  @Input() characterId: any
  @Input() settings: any

  @Output() reloadCharacter = new EventEmitter()

  isAltSheet: boolean = false
  isCypher: boolean = false

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.isAltSheet = this.settings.altSheet
    this.isCypher = this.settings.cypherSystem
  }

  onStatChange(data: any) {
    this.baseCharacterInfo.stats[data.element] = data.value
    let stats = this.baseCharacterInfo
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.reloadCharacter.emit()
    })
  }

  onInfoChange(data: any) {
    this.baseCharacterInfo[data.element] = data.value
    let stats = this.baseCharacterInfo
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.reloadCharacter.emit()
    })
  }

  onDamageTrackChange(data: any) {
    this.baseCharacterInfo.stats.damageTrack[data.element] = data.value
    let stats = this.baseCharacterInfo
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.reloadCharacter.emit()
    })
  }

  recoveryUsed(event: MatCheckboxChange, element: string) {
    this.baseCharacterInfo.stats[element] = event.checked
    let stats = this.baseCharacterInfo
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.reloadCharacter.emit()
    })
  }
}