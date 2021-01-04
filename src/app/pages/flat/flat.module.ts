import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatPageRoutingModule } from './flat-routing.module';

import { FlatPage } from './flat.page';
import { ProfileComponent } from '../../shared-components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlatPageRoutingModule
  ],
  declarations: [
    FlatPage,
    ProfileComponent
  ]
})
export class FlatPageModule {}
