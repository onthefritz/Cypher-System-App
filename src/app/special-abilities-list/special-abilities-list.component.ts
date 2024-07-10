import { Dialog } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BASE_URL } from '../helpers/constants';
import { ability } from '../models/ability';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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
  @Output() selectAbilityParent = new EventEmitter()

  abilitiesDisplayedColumns: string[] = [ 'name', 'cost', 'tier', 'costTime' ]
  columnsToDisplayWithExpand = [...this.abilitiesDisplayedColumns, 'menu', 'expand']

  abilitiesData = new MatTableDataSource<any>([])
  abilitiesLoaded: boolean = false
  expandedElement!: ability | null

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.selectAbilityParent)
    if (this.selectAbilityParent != new EventEmitter()) {
      this.columnsToDisplayWithExpand = [...this.abilitiesDisplayedColumns, 'expand', 'select']
    }
    this.loadAbilites()
  }

  ngAfterViewInit() {
    this.abilitiesData.filterPredicate = function(data: any, filter: string): boolean {
      let costField = data.cost.toString() + ' ' + data.costType.toString()
      return data.name.toLowerCase().includes(filter)
          || costField.toLowerCase().includes(filter)
    }

    this.abilitiesLoaded = true
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.abilitiesLoaded) {
      return
    }
    let changedSkills = changes['abilitiesData'].currentValue
    this.abilitiesData.data = changedSkills
  }

  loadAbilites() {
    this.http.get(`${BASE_URL}/ability/abilities`).subscribe((res) => {
      this.abilitiesData.data = res as ability[]
      this.abilitiesData.paginator = this.paginator
      this.abilitiesData.sort = this.sort
    })
  }

  characterList() {
    this.router.navigateByUrl(`/`)
  }

  upsertAbility(isAdd: boolean, special: any) {

  }

  deleteAbility(id: string) {

  }

  selectAbility(id: string) {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.abilitiesData.filter = filterValue.trim().toLowerCase()
    
    if (this.abilitiesData.paginator) {
      this.abilitiesData.paginator.firstPage();
    }
  }
}
