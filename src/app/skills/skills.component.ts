import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent {
  @Input() skillsData: any
  skillsDisplayedColumns: string[] = [ 'name', 'inability', 'trained', 'specialized' ]
}
