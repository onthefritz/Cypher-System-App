import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output, Inject, OnInit } from '@angular/core';
import { BASE_URL } from 'src/app/helpers/constants';

@Component({
  selector: 'app-edit-stats',
  templateUrl: './edit-stats.component.html',
  styleUrls: ['./edit-stats.component.scss']
})
export class EditStatsComponent implements OnInit {
  usedPoints: number = 0
  usedOnMight: number = 0
  usedOnSpeed: number = 0
  usedOnIntellect: number = 0
  usedOnCharm: number = 0
  isCypher: boolean = false

  isPools: boolean = false
  characterId: string = ''
  tier: number = 0

  @Output() saveStat = new EventEmitter()
  
  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.characterId = this.data.characterId
    this.isPools = this.data.isPools
    this.tier = this.data.tier

    this.isCypher = this.data.isCypher

    if (this.data.rowData) {
      if (this.isPools) {
        this.usedOnMight = this.data.rowData.pointsToMight
        this.usedOnSpeed = this.data.rowData.pointsToSpeed
        this.usedOnIntellect = this.data.rowData.pointsToIntellect
        this.usedOnCharm = this.data.rowData.pointsToCharm
      }
      else {
        this.usedOnMight = this.data.rowData.pointsToMightEdge
        this.usedOnSpeed = this.data.rowData.pointsToSpeedEdge
        this.usedOnIntellect = this.data.rowData.pointsToIntellectEdge
        this.usedOnCharm = this.data.rowData.pointsToCharmEdge
      }
    }

    this.usedPoints = this.usedOnMight + this.usedOnSpeed + this.usedOnIntellect + (this.isCypher ? 0 : this.usedOnCharm)
  }

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
    let statsRequest = {
      isPools: this.isPools,
      tier: this.tier,
      might: this.usedOnMight,
      speed: this.usedOnSpeed,
      intellect: this.usedOnIntellect,
      charm: this.usedOnCharm
    }
    this.http.post(`${BASE_URL}/character/saveHistoryStats/${this.data.characterId}`, statsRequest).subscribe({
      next: () => {
          this.dialogRef.close()
      },
      error: (error) => {
          console.log(error)
      }
    })
  }

  close() {
    this.dialogRef.close()
  }
}
