import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-attacks',
  templateUrl: './attacks.component.html',
  styleUrls: ['./attacks.component.scss']
})
export class AttacksComponent {
  @Input() attacksData: any
  attacksDisplayedColumns: string[] = [ 'name', 'modifier', 'damage', 'range' ]
}
