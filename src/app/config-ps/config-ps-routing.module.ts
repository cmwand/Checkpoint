import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigPsPage } from './config-ps.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigPsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigPsPageRoutingModule {}
