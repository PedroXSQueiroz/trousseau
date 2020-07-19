import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrousseauReportPageRoutingModule } from './trousseau-report-routing.module';

import { TrousseauReportPage } from './trousseau-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrousseauReportPageRoutingModule
  ],
  declarations: [TrousseauReportPage],
})
export class TrousseauReportPageModule {}
