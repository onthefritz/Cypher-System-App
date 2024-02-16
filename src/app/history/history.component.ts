import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EditStatsComponent } from '../dialogs/edit-stats/edit-stats.component'
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { BASE_URL } from '../helpers/constants';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() baseInfo: any
  @Input() characterId: string = ''
  @Input() settings: any

  @Output() reloadCharacter = new EventEmitter()

  tierDisplayedColumns: string[] = [ 'tier', 'stats', 'edge', 'effort', 'train', 'other', 'editAdvancement' ]
  statsDisplayedColumns: string[] = [ 'statsTier', 'pointsToMight', 'pointsToSpeed', 'pointsToIntellect', 'pointsToCharm', 'editPoints' ]
  edgeDisplayedColumns: string[] = [ 'edgeTier', 'pointsToMightEdge', 'pointsToSpeedEdge', 'pointsToIntellectEdge', 'pointsToCharmEdge', 'editEdge' ]

  cypherStatsDisplayedColumns: string[] = [ 'statsTier', 'pointsToMight', 'pointsToSpeed', 'pointsToIntellect', 'editPoints' ]
  cypherEdgeDisplayedColumns: string[] = [ 'edgeTier', 'pointsToMightEdge', 'pointsToSpeedEdge', 'pointsToIntellectEdge', 'editEdge' ]

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router) { }

  deleteTier(tier: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      minWidth: '300px',
      data: {
        title: "Are you sure?",
        message: "This action cannot be undone."
      }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/character/removeTier/${this.characterId}/${tier}`).subscribe({
          next: () => {
              this.reloadCharacter.emit()
          },
          error: (error) => {
              console.log(error)
          }
        })
      }
    })
  }

  addStatsDialog(isPools: boolean) {
    let dialogData = {
      isPools: isPools,
      isCypher: !this.settings.usingCharm,
      characterId: this.characterId,
      tier: this.baseInfo.statHistory.length > 0 ? Math.max(...this.baseInfo.statHistory.map((o: any) => o.tier)) + 1 : 1
    }

    const dialogRef = this.dialog.open(EditStatsComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      this.reloadCharacter.emit()
    })
  }

  editStatsDialog(isPools: boolean, tier: number) {
    let dialogData = {
      isPools: isPools,
      isCypher: !this.settings.usingCharm,
      characterId: this.characterId,
      tier: tier,
      rowData: this.baseInfo.statHistory.find((data: any) => data.tier === tier)
    }
    
    const dialogRef = this.dialog.open(EditStatsComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      this.reloadCharacter.emit()
    })
  }

  deleteStatsDialog(tier: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      minWidth: '300px',
      data: {
        title: "Are you sure?",
        message: "This will delete the Stats and Edge for this Tier. This action cannot be undone."
      }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/character/removeStats/${this.characterId}/${tier}`).subscribe({
          next: () => {
              this.reloadCharacter.emit()
          },
          error: (error) => {
              console.log(error)
          }
        })
      }
    })
  }
}
