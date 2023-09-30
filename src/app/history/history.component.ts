import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EditStatsComponent } from '../dialogs/edit-stats/edit-stats.component'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() baseInfo: any
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

  tierDisplayedColumns: string[] = [ 'tier', 'stats', 'edge', 'effort', 'train', 'other', 'editAdvancement' ]
  statsDisplayedColumns: string[] = [ 'statsTier', 'pointsToMight', 'pointsToSpeed', 'pointsToIntellect', 'pointsToCharm', 'editPoints' ]
  edgeDisplayedColumns: string[] = [ 'edgeTier', 'pointsToMightEdge', 'pointsToSpeedEdge', 'pointsToIntellectEdge', 'pointsToCharmEdge', 'editEdge' ]

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router) { }

  deleteTier(tier: number) {
    
  }

  addStatsDialog() {
    const dialogRef = this.dialog.open(EditStatsComponent, {
      minWidth: '300px'
    })

    dialogRef.closed.subscribe(result => {
      this.reloadCharacter.emit()
    })
  }
}
