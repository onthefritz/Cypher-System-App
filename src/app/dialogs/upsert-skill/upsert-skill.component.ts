import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-upsert-skill',
  templateUrl: './upsert-skill.component.html',
  styleUrls: ['./upsert-skill.component.scss']
})
export class UpsertSkillComponent implements OnInit {
  upsertType!: string
  characterId!: string
  name!: string
  source!: string
  inability!: boolean
  trained!: boolean
  specialized!: boolean
  skillId!: string

  constructor(private http: HttpClient, private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.upsertType = this.data.isAdd ? 'Add' : 'Edit'
    this.characterId = this.data.characterId

    if (!this.data.isAdd) {
      this.skillId = this.data.skill.id
      this.name = this.data.skill.name
      this.source = this.data.skill.source
      this.inability = this.data.skill.inability
      this.trained = this.data.skill.trained
      this.specialized = this.data.skill.specialized
    }
    else {
      this.name = ''
      this.source = ''
      this.inability = false
      this.trained = false
      this.specialized = false
    }
  }

  addSkill() {
    let skill = {
      id: !this.skillId ? crypto.randomUUID() : this.skillId,
      name: this.name,
      source: this.source,
      inability: this.inability,
      trained: this.trained,
      specialized: this.specialized
    }

    this.dialogRef.close(skill)
  }

  close() {
    this.dialogRef.close()
  }
}
