import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigXbPage } from './config-xb.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigXbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigXbPageRoutingModule {}
