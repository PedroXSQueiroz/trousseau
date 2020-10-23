import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrousseauPageRoutingModule } from './trousseau-routing.module';

import { TrousseauPage } from './trousseau.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatStepperModule } from "@angular/material/stepper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrousseauPageRoutingModule,
    NgSelectModule,
    MatStepperModule
  ],
  declarations: [TrousseauPage]
})
export class TrousseauPageModule {}
