import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigPsPageRoutingModule } from './config-ps-routing.module';

import { ConfigPsPage } from './config-ps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigPsPageRoutingModule
  ],
  declarations: [ConfigPsPage]
})
export class ConfigPsPageModule {}
