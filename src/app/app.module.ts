import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'
import { NgIf } from '@angular/common'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { CharacterListComponent } from './character-list/character-list.component'
import { CharacterSheetComponent } from './character-sheet/character-sheet.component'
import { StatsComponent } from './stats/stats.component'
import { IncrementerComponent } from './incrementer/incrementer.component'
import { PoolStatComponent } from './pool-stat/pool-stat.component'
import { SkillsComponent } from './skills/skills.component'
import { CheckboxComponent } from './checkbox/checkbox.component'
import { AttacksComponent } from './attacks/attacks.component'
import { SpecialAbilitiesComponent } from './special-abilities/special-abilities.component'
import { EquipmentComponent } from './equipment/equipment.component'
import { EditSheetComponent } from './edit-sheet/edit-sheet.component'
import { HistoryComponent } from './history/history.component'

import { AddCharacterDialogComponent } from './dialogs/add-character-dialog/add-character-dialog.component'
import { DeleteConfirmationComponent } from './dialogs/delete-confirmation/delete-confirmation.component'
import { EditStatsComponent } from './dialogs/edit-stats/edit-stats.component'
import { UpsertSkillComponent } from './dialogs/upsert-skill/upsert-skill.component'
import { UpsertAttackComponent } from './dialogs/upsert-attack/upsert-attack.component'
import { UpsertAbilityComponent } from './dialogs/upsert-ability/upsert-ability.component'
import { UpsertItemComponent } from './dialogs/upsert-item/upsert-item.component'
import { UpsertWeaponComponent } from './dialogs/upsert-weapon/upsert-weapon.component'
import { UpsertCypherComponent } from './dialogs/upsert-cypher/upsert-cypher.component'
import { InsertMoneyComponent } from './dialogs/insert-money/insert-money.component'
import { SettingsComponent } from './dialogs/settings/settings.component'
import { OptionsComponent } from './options/options.component'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { DialogModule } from '@angular/cdk/dialog'
import { MatInputModule } from '@angular/material/input'
import { TextFieldModule } from '@angular/cdk/text-field'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatDividerModule } from '@angular/material/divider'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatTabsModule } from '@angular/material/tabs'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { AltPoolStatsComponent } from './alt-pool-stats/alt-pool-stats.component'
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    AddCharacterDialogComponent,
    CharacterSheetComponent,
    DeleteConfirmationComponent,
    StatsComponent,
    IncrementerComponent,
    PoolStatComponent,
    SkillsComponent,
    CheckboxComponent,
    AttacksComponent,
    SpecialAbilitiesComponent,
    EquipmentComponent,
    EditSheetComponent,
    HistoryComponent,
    EditStatsComponent,
    UpsertSkillComponent,
    UpsertAttackComponent,
    UpsertAbilityComponent,
    UpsertItemComponent,
    UpsertWeaponComponent,
    UpsertCypherComponent,
    InsertMoneyComponent,
    SettingsComponent,
    AltPoolStatsComponent,
    OptionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgIf,

    MatButtonModule,
    MatCardModule,
    DialogModule,
    MatInputModule,
    TextFieldModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatSelectModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatMenuModule,
    MatSortModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
