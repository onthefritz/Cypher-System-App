import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  @Input() baseInfo: any
  tierDisplayedColumns: string[] = [ 'tier', 'stats', 'edge', 'effort', 'ability', 'train', 'other' ]
  statsDisplayedColumns: string[] = [ 'statsTier', 'pointsToMight', 'pointsToSpeed', 'pointsToIntellect', 'pointsToCharm' ]
  edgeDisplayedColumns: string[] = [ 'edgeTier', 'pointsToMightEdge', 'pointsToSpeedEdge', 'pointsToIntellectEdge', 'pointsToCharmEdge' ]

}
