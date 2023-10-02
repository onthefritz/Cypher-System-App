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

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.altSheet = this.data.settings.altSheet
    }
    else {
      this.altSheet = false
    }
  }

  updateSettings() {
    let settings = {
      altSheet: this.altSheet
    }

    this.dialogRef.close(settings)
  }

  close() {
    this.dialogRef.close()
  }
}
