import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-insert-money',
  templateUrl: './insert-money.component.html',
  styleUrls: ['./insert-money.component.scss']
})
export class InsertMoneyComponent {
  characterId!: string
  name!: string
  amount!: number

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.characterId = this.data.characterId

    this.name = ''
    this.amount = 0
  }

  addMoney() {
    let money = {
      id: crypto.randomUUID(),
      name: this.name,
      amount: this.amount
    }

    this.dialogRef.close(money)
  }

  close() {
    this.dialogRef.close()
  }
}
