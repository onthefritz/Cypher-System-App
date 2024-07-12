import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterListComponent } from './character-list/character-list.component'
import { CharacterSheetComponent } from './character-sheet/character-sheet.component'
import { EditSheetComponent } from './edit-sheet/edit-sheet.component'
import { SpecialAbilitiesListComponent } from './special-abilities-list/special-abilities-list.component'

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'sheet/:id', component: CharacterSheetComponent },
  { path: 'edit/:id', component: EditSheetComponent },
  { path: 'abilities-list/', component: SpecialAbilitiesListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
