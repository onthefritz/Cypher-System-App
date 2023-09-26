import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, AfterViewInit {
  @Input() skillsData: any

  skillsDisplayedColumns: string[] = ['name', 'inability', 'trained', 'specialized']

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    
  }
}
