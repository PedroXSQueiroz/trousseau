import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatTrousseausPageRoutingModule } from './flat-trousseaus-routing.module';

import { FlatTrousseausPage } from './flat-trousseaus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlatTrousseausPageRoutingModule
  ],
  declarations: [FlatTrousseausPage]
})
export class FlatTrousseausPageModule {}
