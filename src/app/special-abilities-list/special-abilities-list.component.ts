import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../helpers/constants';
import { ability } from '../models/ability';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-special-abilities-list',
  templateUrl: './special-abilities-list.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./special-abilities-list.component.scss']
})
export class SpecialAbilitiesListComponent implements AfterViewInit, OnInit, OnChanges {
  abilitiesDisplayedColumns: string[] = [ 'name', 'cost', 'tier', 'costTime' ]
  columnsToDisplayWithExpand = [...this.abilitiesDisplayedColumns, 'expand']

  abilitiesData: any
  abilitiesLoaded: boolean = false
  expandedElement!: ability | null

  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadAbilites()
    
    this.abilitiesData = new MatTableDataSource(this.abilitiesData)
    this.abilitiesData.filterPredicate = function(data: any, filter: string): boolean {
      let costField = data.cost.toString() + ' ' + data.costType.toString()
      return data.name.toLowerCase().includes(filter)
          || data.source.toLowerCase().includes(filter)
          || costField.toLowerCase().includes(filter)
    }
  }

  ngAfterViewInit() {
    this.abilitiesData.paginator = this.paginator;
    this.abilitiesLoaded = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.abilitiesLoaded) {
      return
    }
    let changedSkills = changes['abilitiesData'].currentValue
    this.abilitiesData = new MatTableDataSource(changedSkills)
  }

  loadAbilites() {
    this.http.get(`${BASE_URL}/ability/abilities`).subscribe((res) => {
      this.abilitiesData = res as ability[]
    })
  }

  characterList() {
    this.router.navigateByUrl(`/`)
  }

  upsertAbility(isAdd: boolean, special: any) {

  }

  deleteAbility(id: string) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.abilitiesData.filter = filterValue.trim().toLowerCase()
  }
}
