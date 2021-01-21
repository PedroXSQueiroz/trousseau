import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrousseauPageRoutingModule } from './trousseau-routing.module';

import { TrousseauPage } from './trousseau.page';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatStepperModule } from "@angular/material/stepper";
import { InitStepComponent } from './steps/init-step/init-step.component';
import { StepContainerComponent } from './steps/step-container/step-container.component';
import { SendingStepComponent } from './steps/sending-step/sending-step.component';
import { ReceivingStepComponent } from './steps/receiving-step/receiving-step.component';
import { FinishingStepComponent } from './steps/finishing-step/finishing-step.component';
import { StatusLabelComponent } from 'src/app/shared-components/status-label/status-label.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrousseauPageRoutingModule,
    NgSelectModule,
    MatStepperModule
  ],
  declarations: [
    TrousseauPage,
    StepContainerComponent,
    InitStepComponent,
    SendingStepComponent,
    ReceivingStepComponent,
    FinishingStepComponent,
    StatusLabelComponent
  ],

})
export class TrousseauPageModule {}
