import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatItemFormPageRoutingModule } from './flat-item-form-routing.module';

import { FlatItemFormPage } from './flat-item-form.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FlatItemFormPageRoutingModule
  ],
  declarations: [FlatItemFormPage]
})
export class FlatItemFormPageModule {}
