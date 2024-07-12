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
import { UpsertAbilityComponent } from '../dialogs/upsert-ability/upsert-ability.component';
import { DeleteConfirmationComponent } from '../dialogs/delete-confirmation/delete-confirmation.component';

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

  showTitle = true

  abilitiesData = new MatTableDataSource<any>([])
  abilitiesLoaded: boolean = false
  expandedElement!: ability | null

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private dialog: Dialog,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.selectAbilityParent.observed) {
      this.columnsToDisplayWithExpand = [...this.abilitiesDisplayedColumns, 'expand', 'select']
      this.showTitle = false
    }

    this.abilitiesData.sortingDataAccessor = (data: any, sortHeaderId: string): string => {
      if (typeof data[sortHeaderId] === 'string') {
        return data[sortHeaderId].toLocaleLowerCase();
      }
    
      return data[sortHeaderId];
    };

    this.loadAbilites()
  }

  ngAfterViewInit() {
    this.abilitiesData.filterPredicate = function(data: any, filter: string): boolean {
      let nameColumn = 'name: ' + data.name
      let costColumn = 'cost: ' + data.cost.toString() + ' ' + data.costType.toString()
      let costColumnType = 'cost: ' + data.costType.toString()
      let tierColumn = 'tier: ' + data.tier
      return nameColumn.toLowerCase().includes(filter)
          || costColumn.toLowerCase().includes(filter)
          || costColumnType.toLowerCase().includes(filter)
          || tierColumn.toLowerCase().includes(filter)
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
    this.http.get(`${BASE_URL}/ability/base-specials`).subscribe((res) => {
      this.abilitiesData.data = res as ability[]
      this.abilitiesData.paginator = this.paginator
      this.abilitiesData.sort = this.sort
    })
  }

  characterList() {
    this.router.navigateByUrl(`/`)
  }

  upsertAbility(isAdd: boolean, special: any, name: string) {
    let dialogData = {
      isAdd: isAdd,
      special: special,
      isCharacterAbility: false
    }

    const dialogRef = this.dialog.open(UpsertAbilityComponent, {
      minWidth: '600px',
      data: dialogData
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.post(`${BASE_URL}/ability/base-special/${name}`, result).subscribe((res) => {
          this.loadAbilites()
        })
      }
    })
  }

  deleteAbility(name: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
        minWidth: '300px',
        data: {
          title: "Are you sure?",
          message: "This action cannot be undone."
        }
    })

    dialogRef.closed.subscribe(result => {
      if (result) {
        this.http.delete(`${BASE_URL}/ability/base-special/${name}`).subscribe((res) => {
            this.loadAbilites()
        })
      }
    })
  }

  selectAbility(name: string) {
    let ability = this.abilitiesData.data.filter(x => x.name == name)

    this.selectAbilityParent.emit(ability)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.abilitiesData.filter = filterValue.trim().toLowerCase()
    
    if (this.abilitiesData.paginator) {
      this.abilitiesData.paginator.firstPage();
    }
  }
}
