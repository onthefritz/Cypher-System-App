import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  @Input() skillsData: any
  @Input() isEditing: boolean = false
  skillsDisplayedColumns: string[] = [ 'name', 'inability', 'trained', 'specialized' ]
  skillsDisplayedColumnsWithEdit: string[] = [ 'name', 'inability', 'trained', 'specialized', 'menu' ]

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  editSkill(name: string) {

  }

  deleteSkill(name: string) {

  }
}
