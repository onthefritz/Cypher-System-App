import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-edit-stats',
  templateUrl: './edit-stats.component.html',
  styleUrls: ['./edit-stats.component.scss']
})
export class EditStatsComponent {
  usedPoints: number = 0
  usedOnMight: number = 0
  usedOnSpeed: number = 0
  usedOnIntellect: number = 0
  usedOnCharm: number = 0

  @Output() saveStat = new EventEmitter()
  
  constructor(private http: HttpClient, private dialogRef: DialogRef) { }

  increaseCount(element: string) {
    if (element === 'might') {
      this.usedOnMight += 1
    }
    else if (element === 'speed') {
      this.usedOnSpeed += 1
    }
    else if (element === 'intellect') {
      this.usedOnIntellect += 1
    }
    else if (element === 'charm') {
      this.usedOnCharm += 1
    }

    this.usedPoints += 1
  }

  decreaseCount(element: string) {
    if (element === 'might') {
      this.usedOnMight -= 1
    }
    else if (element === 'speed') {
      this.usedOnSpeed -= 1
    }
    else if (element === 'intellect') {
      this.usedOnIntellect -= 1
    }
    else if (element === 'charm') {
      this.usedOnCharm -= 1
    }

    this.usedPoints -= 1
  }

  addStats() {
  }

  close() {
    this.dialogRef.close()
  }
}
