import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesBeatenPage } from './games-beaten.page';

const routes: Routes = [
  {
    path: '',
    component: GamesBeatenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GamesBeatenPageRoutingModule {}
