import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
export class SkillsComponent implements OnInit, AfterViewInit {
  @Input() skillsData: any
  @Input() isEditing: boolean = false
  @Input() characterId: string = ''

  @Output() reloadCharacter = new EventEmitter()

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
}
