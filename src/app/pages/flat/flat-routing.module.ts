import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatPage } from './flat.page';

const routes: Routes = [
  {
    path: '',
    component: FlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatPageRoutingModule {}
