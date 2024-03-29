import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../helpers/constants';
import { UpsertSkillComponent } from '../dialogs/upsert-skill/upsert-skill.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() skillsData: any
  @Input() isEditing: boolean = false
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

  loaded: boolean = false

  skillsDisplayedColumns: string[] = [ 'name', 'source', 'inability', 'trained', 'specialized' ]
  skillsDisplayedColumnsWithEdit: string[] = [ 'name', 'source', 'inability', 'trained', 'specialized', 'menu' ]

  @ViewChild(MatSort) sort: MatSort | undefined

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.skillsData = new MatTableDataSource(this.skillsData)
  }

  ngAfterViewInit() {
    this.skillsData.sort = this.sort
    this.loaded = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.loaded) {
      return
    }
    let changedSkills = changes['skillsData'].currentValue
    this.skillsData = new MatTableDataSource(changedSkills)
  }

  upsertSkill(isAdd: boolean, skill: any) {
    let dialogData = {
      isAdd: isAdd,
      characterId: this.characterId,
      skill: skill
    }

    const dialogRef = this.dialog.open(UpsertSkillComponent, {
      minWidth: '300px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/ability/skill/${this.characterId}/`, result).subscribe((res) => {
          this.reloadCharacter.emit()
        })
      }
    })
  }

  deleteSkill(id: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/ability/skill/${this.characterId}/${id}`).subscribe({
            next: () => {
                this.reloadCharacter.emit()
            },
            error: (error) => {
                console.log(error)
            }
        })
      }
    })
  }

  lowerSortOrder(id: string, sortOrder: number) {
    let request = {
      sortOrder: sortOrder - 1
    }
    this.http.post(`${BASE_URL}/ability/skill/${this.characterId}/${id}`, request).subscribe({
      next: () => {
        this.reloadCharacter.emit()
      }
    })
  }

  higherSortOrder(id: string, sortOrder: number) {
    let request = {
      sortOrder: sortOrder + 1
    }
    this.http.post(`${BASE_URL}/ability/skill/${this.characterId}/${id}`, request).subscribe({
      next: () => {
        this.reloadCharacter.emit()
      }
    })
  }
}
