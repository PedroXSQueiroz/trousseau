import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrousseauReportPage } from './trousseau-report.page';

const routes: Routes = [
  {
    path: '',
    component: TrousseauReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrousseauReportPageRoutingModule {}
