import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../helpers/constants';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { Dialog } from '@angular/cdk/dialog';
import { baseInfo, settings, tracker } from '../models/character';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() characterId: any

  baseCharacterInfo: baseInfo = new baseInfo
  settings: settings = new settings
  trackers: any

  infoLoaded: boolean = false
  settingsLoaded: boolean = false
  trackersLoaded: boolean = false

  constructor(private http: HttpClient, private dialog: Dialog,
    private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getBaseInfo()
  }

  getBaseInfo() {
    this.http.get(`${BASE_URL}/character/baseInfo/${this.characterId}`).subscribe((res) => {
      this.baseCharacterInfo = res as baseInfo
      this.infoLoaded = true

      this.getSettings()
    })
  }

  getSettings() {
    this.http.get(`${BASE_URL}/character/settings/${this.characterId}`).subscribe((res) => {
      this.settings = res as settings
      this.settingsLoaded = true

      this.getTrackers()
    })
  }

  getTrackers() {
    this.http.get(`${BASE_URL}/character/trackers/${this.characterId}`).subscribe((res) => {
      this.trackers = res as tracker[]
      this.trackersLoaded = true
    })
  }

  onStatChange(data: any) {
    let genericObject = this.baseCharacterInfo as any
    genericObject.stats[data.element] = data.value
    let stats = genericObject
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.getBaseInfo()
    })
  }

  onInfoChange(data: any) {
    let genericObject = this.baseCharacterInfo as any
    genericObject[data.element] = data.value
    let stats = genericObject
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.getBaseInfo()
    })
  }

  onDamageTrackChange(data: any) {
    let genericObject = this.baseCharacterInfo as any
    genericObject.stats.damageTrack[data.element] = data.value
    let stats = genericObject
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.getBaseInfo()
    })
  }

  recoveryUsed(data: any) {
    let genericObject = this.baseCharacterInfo as any
    genericObject.stats[data.element] = data.value
    let stats = genericObject
    this.http.post(`${BASE_URL}/stat/setStats/${this.characterId}`, stats).subscribe((res) => {
      this.getBaseInfo()
    })
  }

  shortRest() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone.",
          okayButton: "YES"
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.get(`${BASE_URL}/character/shortRest/${this.characterId}`).subscribe((res) => {
          this.getBaseInfo()
        })
      }
    })
  }

  longRest() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone.",
          okayButton: "YES"
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.get(`${BASE_URL}/character/longRest/${this.characterId}`).subscribe((res) => {
          this.getBaseInfo()
        })
      }
    })
  }

  refreshEdgeAndEffort() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone.",
          okayButton: "YES"
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.get(`${BASE_URL}/character/refreshEdgeAndEffort/${this.characterId}`).subscribe((res) => {
          this.getBaseInfo()
        })
      }
    })
  }

  addTracker() {
    let newTracker = {
      trackerId: crypto.randomUUID()
    }

    this.http.put(`${BASE_URL}/character/tracker/${this.characterId}`, newTracker).subscribe((res) => {
      this.getTrackers()
    })
  }

  deleteTracker(data: any) {
    this.http.delete(`${BASE_URL}/character/tracker/${this.characterId}/${data.trackerId}`).subscribe((res) => {
      this.getTrackers()
    })
  }

  updateTracker(data: any) {
    this.http.post(`${BASE_URL}/character/tracker/${this.characterId}/${data.id}`, data).subscribe((res) => {
      this.getTrackers()
    })
  }
}
