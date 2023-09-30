import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BASE_URL } from '../helpers/constants';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent {
  @Input() equipmentData: any
  @Input() characterId: any

  @Output() reloadCharacter = new EventEmitter()

  itemDisplayedColumns: string[] = [ 'itemName', 'itemCount', 'itemDescription' ]
  weaponDisplayedColumns: string[] = [ 'weaponName', 'weaponCount', 'weaponType', 'weaponDescription' ]
  oddityDisplayedColumns: string[] = [ 'oddityName', 'oddityCount', 'oddityDescription' ]
  cypherDisplayedColumns: string[] = [ 'cypherName', 'cypherTier', 'cypherDescription' ]

  constructor(private http: HttpClient) { }

  onMoneyChange(data: any) {
    let money = this.equipmentData.money.find((money: any) => money.name === data.element)
    money.amount = data.value
    this.http.post(`${BASE_URL}/equipment/save/${this.characterId}`, this.equipmentData).subscribe((res) => {
      console.log(res)
      this.reloadCharacter.emit()
    })
  }
}
