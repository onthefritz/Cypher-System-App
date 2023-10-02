import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-upsert-cypher',
  templateUrl: './upsert-cypher.component.html',
  styleUrls: ['./upsert-cypher.component.scss']
})
export class UpsertCypherComponent {
  upsertType!: string
  characterId!: string
  name!: string
  tier!: number
  description!: string

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.name = this.data.cypher.name
      this.tier = this.data.cypher.tier
      this.description = this.data.cypher.description
    }
    else {
      this.name = ''
      this.tier = 0
      this.description = ''
    }
  }

  addCypher() {
    let cypher = {
      name: this.name,
      tier: this.tier,
      description: this.description
    }

    this.dialogRef.close(cypher)
  }

  close() {
    this.dialogRef.close()
  }
}
