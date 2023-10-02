import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alt-pool-stats',
  templateUrl: './alt-pool-stats.component.html',
  styleUrls: ['./alt-pool-stats.component.scss']
})
export class AltPoolStatsComponent {
  @Input() poolName: string = ''
  @Input() poolTotal: number = 0
  @Input() poolCurrent: number = 0
  @Input() poolLeftEdgeName: string = ''
  @Input() poolLeftEdgeTotal: number = 0
  @Input() poolLeftEdgeCurrent: number = 0
  @Input() poolRightEdgeName: string = ''
  @Input() poolRightEdgeTotal: number = 0
  @Input() poolRightEdgeCurrent: number = 0

  @Input() element: string = ''
  @Output() statChange = new EventEmitter()

  onStatChange(data: any) {
    let content = {
      "element": data.element,
      "value": data.value
    }
    this.statChange.emit(content)
  }
}
