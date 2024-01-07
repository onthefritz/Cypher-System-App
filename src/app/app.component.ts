import { HttpClient } from '@angular/common/http'
import { Component, Inject, OnInit } from '@angular/core'
import { BASE_URL } from './helpers/constants'
import { settings } from './models/settings'
import { DOCUMENT } from "@angular/common"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'electron-tree-cypher'

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.http.get(`${BASE_URL}/app-settings/get`).subscribe((res) => {
      let appSettings = res as settings

      this.document.body.classList.add(appSettings.theme)
    })
  }
}
