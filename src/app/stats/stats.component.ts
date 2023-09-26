import { Component, Input, OnInit } from '@angular/core';
import { character, stats } from '../models/character';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  @Input() characterStats: any

  ngOnInit(): void {
    console.log(this.characterStats)
  }
}