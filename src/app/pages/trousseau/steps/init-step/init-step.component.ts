import { ChangeDetectorRef, Component, Host, Input, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSelect } from '@ionic/angular';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import FlatItem from 'src/app/dtos/flat-item';
import Flat from 'src/app/models/flat';
import Item from 'src/app/models/item';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';
import { StepContainerComponent } from '../step-container/step-container.component';
import StepContent from '../step-content';
import StepTrousseauContent from '../step-trousseau-content';

@Component({
  selector: 'init-step',
  templateUrl: './init-step.component.html',
  styleUrls: ['./init-step.component.scss'],
})
export class InitStepComponent extends StepTrousseauContent implements OnInit {

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

  constructor(@Host() container:StepContainerComponent,
              private _trousseauService:TrousseauService,
              private _alertController:AlertController) 
  {
    super(container, _trousseauService, true);
  }
  
  showFinishButtons(): boolean {
    return !this._trousseau?.isFinished;
  }
  
  async confirm() {
    
    if(this._trousseau.itens.size == 0)
    {
      let alert = await this._alertController.create({
        header: 'Atencão',
        message: 'O Enxoval precisa ter pelo menos um item',
        buttons: ['OK']
      });

      await alert.present();

      return false;
    }
    
    await this.initTrousseau();
    
    return true;
  }
  
  getCancelLabel(): string {
    return 'CANCELAR'
  }
  
  getConfirmLabel(): string {
    return 'OK'
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

  get currentSelectedItem():FlatItem
  {
    return this._currentSelectedItem;
  }

  set currentSelectedItem( item:FlatItem )
  {
    this._currentSelectedItem = item;
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

  private _currentSelectedQuantity: number;

  get currentSelectedQuantity():number
  {
    return this._currentSelectedQuantity;
  }

  set currentSelectedQuantity(quantity:number)
  {
    this._currentSelectedQuantity = quantity;
  }

  selectQuantity(quantity:number)
  {
    this._trousseau.addItem(this._currentSelectedItem.item, quantity);

    let itemIndex = this._itens.findIndex( item => item == this._currentSelectedItem );
    this._itens.splice(itemIndex, 1);

    this._currentItemQuantity = null;
    this._currentSelectedItem = null;

    this._currentSelectedQuantity = null;
  }

  get selectedItens():Item[]
  {
    if(!this._trousseau)
    {
      return [];
    }
    
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

  async initTrousseau()
  {
    let trousseau = await this._trousseauService.saveTrousseauOnFLat(this.flatCode,  this._trousseau);
    let upatedTrousseau = await this._trousseauService.setStatus(trousseau.id, TrousseauStatus.INITIAL);

    Object.assign(this._trousseau, upatedTrousseau);
  }

  addItem(item, quantity:number)
  {
    if(quantity)
    {
      this._trousseau.addItem(item, quantity);
    }
    else
    {
      this._trousseau.removeItem(item, true);

      let flatItem = this._originalItens.find( flatItem => flatItem.item.id == item.id );

      this._itens.push(flatItem);
    }
    
  }

}
