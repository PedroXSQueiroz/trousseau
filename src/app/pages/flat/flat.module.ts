import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatPageRoutingModule } from './flat-routing.module';

import { FlatPage } from './flat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlatPageRoutingModule
  ],
  declarations: [FlatPage]
})
export class FlatPageModule {}
