import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserPageRoutingModule } from './user-routing.module';

import { UserPage } from './user.page';
import { ErrorsContainerComponent } from 'src/app/shared-components/errors-container/errors-container.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserPageRoutingModule
  ],
  declarations: [UserPage,ErrorsContainerComponent]
})
export class UserPageModule {}
