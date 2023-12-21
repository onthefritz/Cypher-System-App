import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  characterId!: string
  altSheet!: boolean
  cypherSystem!: boolean

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.altSheet = this.data.settings.altSheet
      this.cypherSystem = this.data.settings.cypherSystem
    }
    else {
      this.altSheet = false
      this.cypherSystem = false
    }
  }

  updateSettings() {
    let settings = {
      altSheet: this.altSheet,
      cypherSystem: this.cypherSystem
    }

    this.dialogRef.close(settings)
  }

  close() {
    this.dialogRef.close()
  }
}
