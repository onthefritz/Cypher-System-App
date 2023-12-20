import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../helpers/constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() baseCharacterInfo: any
  @Input() characterId: any
  @Input() isAltSheet: boolean = false

  @Output() reloadCharacter = new EventEmitter()

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
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
}