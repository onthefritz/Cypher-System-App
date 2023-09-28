import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() baseInfo: any
  @Input() characterId: string = ''
  tierDisplayedColumns: string[] = [ 'tier', 'stats', 'edge', 'effort', 'train', 'other', 'editAdvancement' ]
  statsDisplayedColumns: string[] = [ 'statsTier', 'pointsToMight', 'pointsToSpeed', 'pointsToIntellect', 'pointsToCharm', 'editPoints' ]
  edgeDisplayedColumns: string[] = [ 'edgeTier', 'pointsToMightEdge', 'pointsToSpeedEdge', 'pointsToIntellectEdge', 'pointsToCharmEdge', 'editEdge' ]

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router) { }

  deleteTier(tier: number) {
    
  }
}
