import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItensToFlatResolverService } from 'src/app/resolvers/itens-to-flat/itens-to-flat-resolver.service';
import { TrousseausToFlatResolverService } from 'src/app/resolvers/trousseus-to-flat/trousseaus-to-flat-resolver.service';

import { FlatPage } from './flat.page';

const routes: Routes = [
  {
    path: '',
    component: FlatPage,
    children:[
      
      {
        path: 'flat-trousseaus',
        resolve:{
          _trousseaus: TrousseausToFlatResolverService
        },
        loadChildren: () => import('./flat-trousseaus/flat-trousseaus.module').then( m => m.FlatTrousseausPageModule)
      },
      {
        path: 'flat-itens',
        resolve:{
          _itens: ItensToFlatResolverService
        },
        loadChildren: () => import('./flat-itens/flat-itens.module').then( m => m.FlatItensPageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatPageRoutingModule {}
