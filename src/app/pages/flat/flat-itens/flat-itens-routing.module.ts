import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatItensPage } from './flat-itens.page';

const routes: Routes = [
  {
    path: '',
    component: FlatItensPage
  },
  {
    path: 'flat-item-form',
    loadChildren: () => import('./flat-item-form/flat-item-form.module').then( m => m.FlatItemFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatItensPageRoutingModule {}
