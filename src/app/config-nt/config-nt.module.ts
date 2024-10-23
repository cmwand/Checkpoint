import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigNtPageRoutingModule } from './config-nt-routing.module';

import { ConfigNtPage } from './config-nt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigNtPageRoutingModule
  ],
  declarations: [ConfigNtPage]
})
export class ConfigNtPageModule {}
