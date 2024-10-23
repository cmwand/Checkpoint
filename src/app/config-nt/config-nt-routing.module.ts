import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigNtPage } from './config-nt.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigNtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigNtPageRoutingModule {}
