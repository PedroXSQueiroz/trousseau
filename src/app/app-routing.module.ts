import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FlatService } from './services/flat-service.service';
import { ItemService } from './services/item.service';
import { TrousseauService } from './services/trousseau.service';
import { FlatResolverService } from './pages/flat/resolver/flat-resolver.service';
import { TrousseauByIdResolverService } from './pages/trousseau/resolver/trousseau-by-id-resolver.service';
import { ItensFlatOfTrousseauResolverService } from './pages/trousseau/resolver/itens-flat-of-trousseau-resolver.service';
import { LoggedUserService } from './resolvers/logged-user/logged-user.service';

const routes: Routes = [
  {
    path: 'home',
    resolve: {
      _flats: FlatService
    },
    loadChildren: () => import('./pages/flats/flats.module').then( m => m.FlatsPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },   
  {
    path: 'flats',
    loadChildren: () => import('./pages/flats/flats.module').then( m => m.FlatsPageModule)
  },
  {
    path: 'flat/:flat/trousseau',
    resolve: {
      _itens: ItemService,
      _trousseau: TrousseauService
    },
    loadChildren: () => import('./pages/trousseau/trousseau.module').then( m => m.TrousseauPageModule)
  },
  {
    path: 'trousseau/:trousseau',
    resolve: {
      _trousseau: TrousseauByIdResolverService,
      _itens: ItensFlatOfTrousseauResolverService
    },
    loadChildren: () => import('./pages/trousseau/trousseau.module').then( m => m.TrousseauPageModule)
  },
  {
    path: 'trousseau-report/:trousseau',
    resolve: {
      _itens: ItensFlatOfTrousseauResolverService,
      _trousseau: TrousseauService
    },
    loadChildren: () => import('./pages/trousseau-report/trousseau-report.module').then( m => m.TrousseauReportPageModule)
  },
  {
    path: 'flat/:flat',
    resolve: {
      _flatData: FlatResolverService
    },
    loadChildren: () => import('./pages/flat/flat.module').then( m => m.FlatPageModule)
    
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'user',
    resolve: {
      _loggedUser: LoggedUserService
    },
    loadChildren: () => import('./pages/user/user.module').then( m => m.UserPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
