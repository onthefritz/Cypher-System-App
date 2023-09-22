import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { CharacterListComponent } from './character-list/character-list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AddCharacterDialogComponent } from './add-character-dialog/add-character-dialog.component'

import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { DialogModule } from '@angular/cdk/dialog'
import { MatInputModule } from '@angular/material/input'
import { TextFieldModule } from '@angular/cdk/text-field'
import { MatFormFieldModule } from '@angular/material/form-field';
import { CharacterSheetComponent } from './character-sheet/character-sheet.component'

@NgModule({
  declarations: [
    AppComponent,
    CharacterListComponent,
    AddCharacterDialogComponent,
    CharacterSheetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatButtonModule,
    MatCardModule,
    DialogModule,
    MatInputModule,
    TextFieldModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
