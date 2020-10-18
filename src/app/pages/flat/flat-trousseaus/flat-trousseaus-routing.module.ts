import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatTrousseausPage } from './flat-trousseaus.page';

const routes: Routes = [
  {
    path: '',
    component: FlatTrousseausPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatTrousseausPageRoutingModule {}
