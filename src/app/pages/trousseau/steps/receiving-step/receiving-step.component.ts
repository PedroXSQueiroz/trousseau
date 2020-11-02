import { ChangeDetectorRef, Component, Host, Input, OnInit } from '@angular/core';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import Item from 'src/app/models/item';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';
import { StepContainerComponent } from '../step-container/step-container.component';
import StepContent from '../step-content';
import StepTrousseauContent from '../step-trousseau-content';

@Component({
  selector: 'receiving-step',
  templateUrl: './receiving-step.component.html',
  styleUrls: ['./receiving-step.component.scss'],
})
export class ReceivingStepComponent extends StepTrousseauContent implements OnInit {
  
  showFinishButtons(): boolean {
    return !this._trousseau?.isFinished;
  }
  async confirm() {
    await this.receiveTrousseau();

    return true;
  }
  
  // cancel() {
    
  // }
  
  getCancelLabel(): string {
    return 'EXTRAVIADA'
  }
  
  getConfirmLabel(): string {
    return 'RECEBIDA';
  }

  constructor(@Host() container: StepContainerComponent,
              private _trousseauService:TrousseauService,
              private _changeDetector: ChangeDetectorRef) 
  {
    super(container, _trousseauService);
  }

  ngOnInit() {}

  private async receiveTrousseau() {
    let trousseau = await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.RETRIEVED);
    Object.assign(this._trousseau, trousseau);
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
