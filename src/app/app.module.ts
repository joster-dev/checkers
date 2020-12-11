import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormControlModule } from '@joster-dev/form-control';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CellComponent } from './game/cell/cell.component';
import { FormComponent } from './game/form/form.component';
import { IconComponent } from './game/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CellComponent,
    FormComponent,
    IconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FormControlModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
