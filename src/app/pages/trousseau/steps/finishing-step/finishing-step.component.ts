import { ChangeDetectorRef, Component, Host, Input, OnInit, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import FlatItem from 'src/app/dtos/flat-item';
import Item from 'src/app/models/item';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';
import { StepContainerComponent } from '../step-container/step-container.component';
import StepContent from '../step-content';
import StepTrousseauContent from '../step-trousseau-content';

@Component({
  selector: 'finishing-step',
  templateUrl: './finishing-step.component.html',
  styleUrls: ['./finishing-step.component.scss'],
})
export class FinishingStepComponent extends StepTrousseauContent implements OnInit {
  
  @ViewChild('quantitySelect') quantitySelect:IonSelect;
  
  private _originalItens:FlatItem[];
  
  private _itens:FlatItem[];
  
  @Input() 
  set itens(itens:FlatItem[])
  {
    this._itens = [ ... itens];
    this._originalItens = itens;
  }

  get itens():FlatItem[]
  {
    return this._itens;
  }

  @Input() flatCode:string;

  private _comparingItens:Map<Item, number> = new Map();



  constructor(@Host() container:StepContainerComponent,
              private _trousseauService:TrousseauService,
              private _changeDetector: ChangeDetectorRef) 
  {
    super(container, _trousseauService);
  }
  
  showFinishButtons(): boolean {
    return !this._trousseau?.isFinished;
  }
  
  async confirm() {
    await this.finishTrousseau();
  }
  
  // cancel() {
    
  // }
  
  getCancelLabel(): string {
    return 'INVALIDAR'
  }
  
  getConfirmLabel(): string {
    return 'FINALIZAR'
  }

  ngOnInit() 
  {
    console.log(this.itens);
  }

  private _currentItemQuantity:number[] = [];

  get currentItemQuantity(): number[]
  {
    return this._currentItemQuantity;
  }

  private _currentSelectedItem:FlatItem;

  async selectItem(flatItem:FlatItem)
  {
    this._currentSelectedItem = flatItem;
    
    await this.quantitySelect.open();
    
    this._currentItemQuantity = this.getArrayQuantitiesOfFlatItem(flatItem);
  }

  private getArrayQuantitiesOftItem(item:Item)
  {
    let flatItem = this._originalItens.find( flatItem => flatItem.item.id == item.id );

    return this.getArrayQuantitiesOfFlatItem(flatItem);
  }
  
  private getArrayQuantitiesOfFlatItem(flatItem: FlatItem): number[] {
    
    return [...Array(flatItem.quantity).keys()].map(quant => quant + 1);
  
  }

  selectQuantity(quantity:number)
  {
    this._comparingItens.set(this._currentSelectedItem.item, quantity);

    let itemIndex = this._itens.findIndex( item => item == this._currentSelectedItem );
    this._itens.splice(itemIndex, 1);

    this._currentItemQuantity = null;
    this._currentSelectedItem = null;
  }

  get selectedItens():Item[]
  {
    if(!this._trousseau)
    {
      return [];
    }
    
    return Array.from(this._comparingItens.keys());
  }

  get trousseauItens():Item[]
  {
    if(!this._trousseau)
    {
      return [];
    }
    
    return Array.from(this._trousseau.itens.keys());
  }

  public getQuantityOfItem(item:Item):number
  {
    return this._comparingItens.get(item);
  }

  public getQuantityOfTrousseauItem(item:Item):number
  {
    if(!this._trousseau)
    {
      return null;
    }

    return this._trousseau.itens.get(item);
  }

  async finishTrousseau()
  {
    let updatedTrousseau = await this._trousseauService.validate(this._trousseau.id, this._comparingItens);

    Object.assign(this._trousseau, updatedTrousseau);
  }

  addItem(item, quantity:number)
  {
    if(quantity)
    {
      this._comparingItens.set(item, quantity);
    }
    else
    {
      this._comparingItens.delete(item);
      
      let flatItem = this._originalItens.find( flatItem => flatItem.item.id == item.id );
  
      this._itens.push(flatItem);
    }

  }

  hasDiff(item:Item)
  {
    return Array.from( this._trousseau.diff.keys() ).find( currentIitem => currentIitem.compare(item) );
  }

  getDiff(item:Item)
  {
    const diff:Map<Item, number> = this._trousseau.diff;
    let itemWithDiff:Item = Array.from( diff.keys() ).find( currentIitem => currentIitem.compare(item) );
    const diffQuantity = diff.get(itemWithDiff);

    if( !diffQuantity )
    {
      return '---';
    }
    
    return ( diffQuantity > 0 ? '+' : '-' ) + Math.abs( diffQuantity );
  }

}
