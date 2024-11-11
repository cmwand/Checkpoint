import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamesBeatenPageRoutingModule } from './games-beaten-routing.module';

import { GamesBeatenPage } from './games-beaten.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamesBeatenPageRoutingModule
  ],
  declarations: [GamesBeatenPage]
})
export class GamesBeatenPageModule {}
