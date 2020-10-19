import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatItemFormPage } from './flat-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: FlatItemFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatItemFormPageRoutingModule {}
