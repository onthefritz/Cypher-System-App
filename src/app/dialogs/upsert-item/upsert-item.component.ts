import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-upsert-item',
  templateUrl: './upsert-item.component.html',
  styleUrls: ['./upsert-item.component.scss']
})
export class UpsertItemComponent {
  upsertType!: string
  itemType!: string
  characterId!: string
  name!: string
  count!: number
  description!: string

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId
    this.itemType = this.data.itemType

    if (!this.data.isAdd) {
      this.name = this.data.item.name
      this.count = this.data.item.count
      this.description = this.data.item.description
    }
    else {
      this.name = ''
      this.count = 0
      this.description = ''
    }
  }

  addItem() {
    let item = {
      name: this.name,
      count: this.count,
      description: this.description
    }

    this.dialogRef.close(item)
  }

  close() {
    this.dialogRef.close()
  }
}
