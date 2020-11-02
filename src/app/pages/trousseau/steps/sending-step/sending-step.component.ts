import { ChangeDetectorRef, Component, Host, Input, OnInit } from '@angular/core';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import Item from 'src/app/models/item';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';
import { StepContainerComponent } from '../step-container/step-container.component';
import StepContent from '../step-content';
import StepTrousseauContent from '../step-trousseau-content';

@Component({
  selector: 'sending-step',
  templateUrl: './sending-step.component.html',
  styleUrls: ['./sending-step.component.scss'],
})
export class SendingStepComponent extends StepTrousseauContent implements OnInit {
  
  showFinishButtons(): boolean {
    return !this._trousseau?.isFinished;
  }

  async confirm() {
    await this.sendTrousseau();

    return true;
  }
  
  // async cancel() {
    
  // }

  getCancelLabel(): string {
    return 'VOLTAR';
  }
  
  getConfirmLabel(): string {
    return 'ENVIAR';
  }

  constructor(@Host() container:StepContainerComponent,
              private _trousseauService:TrousseauService) 
  { 
    super(container, _trousseauService);
  }

  ngOnInit() {}

  async sendTrousseau()
  {
    let updatedTrousseau = await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.SENT);
    Object.assign(this._trousseau, updatedTrousseau);
  }

  get itens():Item[]
  {
    return Array.from(this._trousseau.itens.keys());
  }

  public getQuantityOfItem(item:Item):number
  {
    if(!this._trousseau)
    {
      return null;
    }
    
    return this._trousseau.itens.get(item);
  }

}
