import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { settings } from '../models/character';
import { BASE_URL } from '../helpers/constants';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  characterSettings: settings = new settings
  characterLoaded: boolean = false

  private characterId: any

  @Output() reloadCharacter = new EventEmitter()

  constructor(private http: HttpClient,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.characterId = params['id']
    });

    this.loadCharacterSettings();
  }
  
  loadCharacterSettings() {
    this.http.get(`${BASE_URL}/character/settings/${this.characterId}`).subscribe((res) => {
      this.characterSettings = res as settings

      this.characterLoaded = true
    })
  }

  updateSettings() {
    this.http.post(`${BASE_URL}/settings/${this.characterId}/`, this.characterSettings).subscribe((res) => {
      this.reloadCharacter.emit()
    })
  }
}
