import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatsPageRoutingModule } from './flats-routing.module';

import { FlatsPage } from './flats.page';
import { ProfileComponent } from '../../shared-components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlatsPageRoutingModule    
  ],
  declarations: [
    FlatsPage,
    ProfileComponent
  ]
})
export class FlatsPageModule {}
