import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterListComponent } from './character-list/character-list.component'
import { CharacterSheetComponent } from './character-sheet/character-sheet.component'
import { EditSheetComponent } from './edit-sheet/edit-sheet.component'

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'sheet/:id', component: CharacterSheetComponent },
  { path: 'edit/:id', component: EditSheetComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
