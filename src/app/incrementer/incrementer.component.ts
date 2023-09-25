import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styleUrls: ['./incrementer.component.scss']
})
export class IncrementerComponent implements OnInit {
  @Input() numberValueTotal: number = 0
  @Input() numberValueCurrent: number = 0

  ngOnInit(): void {
  }
}
