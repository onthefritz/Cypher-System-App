import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alt-tracker',
  templateUrl: './alt-tracker.component.html',
  styleUrls: ['./alt-tracker.component.scss']
})
export class AltTrackerComponent {
  @Input() trackerName: string = ''
  @Input() trackerTotal: number = 0
  @Input() trackerCurrent: number = 0
  @Input() trackerId: string = ''
  @Input() canReset: boolean = true

  @Output() trackerChange = new EventEmitter()
  @Output() trackerDelete = new EventEmitter()

  showSettings: boolean = false
  currentName: string = ''

  onTrackerChange(data: any) {
    switch (data.element) {
      case "current":
        this.trackerCurrent = data.value
        break
      case "total":
        this.trackerTotal = data.value
        break
      case "canReset":
        this.canReset = data.value
        break
      default:
        break
    }

    this.sendTrackerChangeData()
  }

  sendTrackerChangeData() {
    let content = {
      "id": this.trackerId,
      "name": this.trackerName,
      "total": this.trackerTotal,
      "current": this.trackerCurrent,
      "canReset": this.canReset
    }

    this.trackerChange.emit(content)
  }

  nameClearText() {
    this.currentName = this.trackerName
    this.trackerName = ''
  }

  nameLoseFocus(event: any) {
    let target = event.target || event.srcElement || event.currentTarget
    let newValue: string = target.value

    if (newValue === '') {
      this.trackerName = this.currentName
      return
    }

    this.trackerName = newValue

    this.sendTrackerChangeData()
  }

  nameApplyChange(event: any) {
    let target = event.target || event.srcElement || event.currentTarget

    target.blur()
  }

  deleteTracker(trackerId: string) {
    let trackerData = {
      trackerId: trackerId
    }

    this.trackerDelete.emit(trackerData)
  }

  onCanResetChange(event: any) {
    let target = event.target || event.srcElement || event.currentTarget

    this.canReset = target.checked

    this.sendTrackerChangeData()
  }

  resetTracker(trackerId: string) {
    this.trackerCurrent = this.trackerTotal

    this.sendTrackerChangeData()
  }
}
