import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-special-abilities',
  templateUrl: './special-abilities.component.html',
  styleUrls: ['./special-abilities.component.scss']
})
export class SpecialAbilitiesComponent {
  @Input() abilitiesData: any
  abilitiesDisplayedColumns: string[] = [ 'name', 'cost', 'costType' ]

}
