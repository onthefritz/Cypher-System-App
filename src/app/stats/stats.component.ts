import { Component, Input } from '@angular/core';
import { stats } from '../models/character';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent {
  @Input() characterStats: stats = new stats
}
