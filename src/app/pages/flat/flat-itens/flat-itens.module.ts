import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatItensPageRoutingModule } from './flat-itens-routing.module';

import { FlatItensPage } from './flat-itens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlatItensPageRoutingModule
  ],
  declarations: [FlatItensPage]
})
export class FlatItensPageModule {}
