import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pool-stat',
  templateUrl: './pool-stat.component.html',
  styleUrls: ['./pool-stat.component.scss']
})
export class PoolStatComponent {
  @Input() poolName: string = ''
  @Input() poolTotal: number = 0
  @Input() poolCurrent: number = 0
  @Input() poolEdgeTotal: number = 0
  @Input() poolEdgeCurrent: number = 0

  @Input() element: string = ''
  @Output() statChange = new EventEmitter();

  onStatChange(data: any) {
    let content = {
      "element": data.element,
      "value": data.value
    }
    this.statChange.emit(content)
  }
}
