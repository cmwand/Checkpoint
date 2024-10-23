import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigXbPageRoutingModule } from './config-xb-routing.module';

import { ConfigXbPage } from './config-xb.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigXbPageRoutingModule
  ],
  declarations: [ConfigXbPage]
})
export class ConfigXbPageModule {}
