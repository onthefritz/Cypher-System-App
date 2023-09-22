import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CharacterListComponent } from './character-list/character-list.component'
import { CharacterSheetComponent } from './character-sheet/character-sheet.component'

const routes: Routes = [
  { path: '', component: CharacterListComponent },
  { path: 'sheet/:id', component: CharacterSheetComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
