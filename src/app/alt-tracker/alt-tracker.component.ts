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

  @Output() trackerChange = new EventEmitter()
  @Output() trackerDelete = new EventEmitter()

  onTrackerChange(data: any) {
    let content = {
      "id": this.trackerId,
      "element": data.element,
      "value": data.value
    }
    this.trackerChange.emit(content)
  }

  nameClearText() {

  }

  nameLoseFocus(event: any) {

  }

  deleteTracker(trackerId: string) {
    let trackerData = {
      trackerId: trackerId
    }

    this.trackerDelete.emit(trackerData)
  }

  resetTracker(trackerId: string) {
    
  }
}
