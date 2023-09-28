import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
  @Input() equipmentData: any
  itemDisplayedColumns: string[] = [ 'itemName', 'itemCount', 'itemDescription' ]
  weaponDisplayedColumns: string[] = [ 'weaponName', 'weaponCount', 'weaponType', 'weaponDescription' ]
  oddityDisplayedColumns: string[] = [ 'oddityName', 'oddityCount', 'oddityDescription' ]
  cypherDisplayedColumns: string[] = [ 'cypherName', 'cypherTier', 'cypherDescription' ]
}
