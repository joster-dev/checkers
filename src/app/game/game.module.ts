
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormModule } from './form/form.module';

import { GameComponent } from './game.component';
import { CellComponent } from './cell/cell.component';

import { GameService } from './game.service';
import { IconComponent } from './icon/icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormModule
  ],
  declarations: [
    GameComponent,
    CellComponent,
    IconComponent
  ],
  exports: [
    GameComponent
  ],
  providers: [
    GameService
  ]
})
export class GameModule { }
