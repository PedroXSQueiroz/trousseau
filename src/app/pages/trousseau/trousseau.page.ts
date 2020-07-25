import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Item from 'src/app/models/item';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import { NavController } from '@ionic/angular';
import { __spreadArrays } from 'tslib';
import { IfStmt } from '@angular/compiler';
import { TrousseauService } from 'src/app/services/trousseau.service';
import FlatItem from 'src/app/dtos/flat-item';

@Component({
  selector: 'app-trousseau',
  templateUrl: './trousseau.page.html',
  styleUrls: ['./trousseau.page.scss'],
})
export class TrousseauPage implements OnInit {

  private _itens:Item[];

  get itens():Item[]
  {
    return this._itens;
  }

  get selectedItens():Item[]
  {
    return Array.from(this._trousseau.itens.keys());
  }

  private _selectedValiationsItensToQuantity: Map<Item, number> = new Map();

  get selectedValiationsItens():Item[]
  {
    return Array.from( this._selectedValiationsItensToQuantity.keys() ) ;
  }

  public getQuantityOfValidationItem(item:Item):number
  {
    return this._selectedValiationsItensToQuantity.get(item);
  }

  get isEmpty():boolean
  {
    return this._trousseau.itens.size == 0;
  }

  public getQuantityOfItem(item:Item):number
  {
    return this._trousseau.itens.get(item);
  }

  private _flatCode:string;

  get flatCode():string
  {
    return this._flatCode;
  }

  get isFinished()
  {
    return this._trousseau.status == TrousseauStatus.NOT_OK || this._trousseau.status == TrousseauStatus.OK ;
  }

  get isValidating()
  {
    return this._trousseau.status == TrousseauStatus.RETRIEVED;
  }

  private _trousseau:Trousseau;

  @ViewChild('inicialActions')
  public initialActions: TemplateRef<any>;
  
  @ViewChild('sendActions')
  public sendActions: TemplateRef<any>;

  @ViewChild('retrieveActions')
  public retrieveActions: TemplateRef<any>;

  @ViewChild('validateActions')
  public validateActions: TemplateRef<any>;

  
  @ViewChild('itensList')
  public itensList: TemplateRef<any>;

  @ViewChild('validationItensList')
  public validationItensList: TemplateRef<any>;

  @ViewChild('incosistentItensList')
  public incosistentItensList: TemplateRef<any>;


  constructor(
      private _route:             ActivatedRoute,
      private _navController:     NavController,
      private _trousseauService:  TrousseauService) 
  { 
    let flatItem:FlatItem[]       = this._route.snapshot.data._itens;
    this._itens                   = flatItem.map( itemFlat => itemFlat.item );
    this._trousseau               = this._route.snapshot.data._trousseau;
    
    this._route.paramMap.subscribe(params => {
      const flatCode = params.get('flat');

      if(flatCode)
      {
        this._flatCode  = flatCode;
      }
      else
      {
        this._flatCode  = this._trousseau.flat.code;
        this._itens     = this._trousseau.flat.itens.map( itemFlat => itemFlat.item );
      }
    })
  }

  ngOnInit() {
  }

  addItem(item:Item)
  {
    this._trousseau.addItem(item);
  }

  addValidationItem(item:Item)
  {
    let quantity:number = this._selectedValiationsItensToQuantity.has(item) ?
                          this._selectedValiationsItensToQuantity.get(item) + 1 :
                          1;

    this._selectedValiationsItensToQuantity.set(item, quantity);
  }

  removeItem(item:Item)
  {
    this._trousseau.removeItem(item);
  }

  removeValidationItem(item:Item)
  {
    if(this._selectedValiationsItensToQuantity.has(item))
    {
      let quantity:number = this._selectedValiationsItensToQuantity.get(item) - 1;
      
      if(quantity == 0)
      {
        this._selectedValiationsItensToQuantity.delete(item);
      }else
      {
        this._selectedValiationsItensToQuantity.set(item, quantity);
      }

    } 
  }

  get total()
  {
    return this._trousseau.total;
  }

  get editionEnabled():boolean
  {
    return !this._trousseau.status;
  }

  get currentActions():TemplateRef<any>
  {
    switch(this._trousseau.status)
    {
      case TrousseauStatus.INITIAL:
        return this.sendActions;
      case TrousseauStatus.SENT:
        return this.retrieveActions;
      case TrousseauStatus.RETRIEVED:
        return this.validateActions;
        case TrousseauStatus.NOT_OK:
          return null;
      default: 
        return this.initialActions;
    }
  }

  get currentTemplateList():TemplateRef<any>
  {
    switch(this._trousseau.status)
    {
      case TrousseauStatus.RETRIEVED:
        return this.validationItensList;
      case TrousseauStatus.NOT_OK:
        return this.incosistentItensList;
      default:
        return this.itensList;
    }
  }

  get statusMessage():string
  {
    return TrousseauStatus.getLabel(this._trousseau.status);
  }

  get isInitiated():boolean
  {
    return !!this._trousseau.status;
  }
  
  cancelRegister()
  {
    this._navController.back();
  }

  async cancelInit()
  {
    this._trousseau.status = null;
    // await this._trousseauService.saveTrousseauOnFLat(this._trousseau);
  }

  async invalidateTrosseau()
  {
    this._trousseau = await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.NOT_OK);
  }

  async initTrousseau()
  {
    this._trousseau = await this._trousseauService.saveTrousseauOnFLat(this._flatCode,  this._trousseau);
    this._trousseau = await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.INITIAL);
  }

  async sendTrousseau()
  {
    this._trousseau = await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.SENT);
  }

  async retrieveTrousseau()
  {
    this._trousseau =  await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.RETRIEVED);
  }

  async validateTrousseau()
  {
    let itens:Item[] = Array.from( this._trousseau.itens.keys() );
    let receivedItens: Item[] = Array.from( this._selectedValiationsItensToQuantity.keys() );

    let itensToCompare: { ['item']:Item , ['quantity']:number }[] = receivedItens.map( currentItem => {
      return {
        item: currentItem,
        quantity: this._selectedValiationsItensToQuantity.get(currentItem)
      }
    });

    let diff:Map<Item, number> = await this._trousseauService.getDiff( this._trousseau.id, itensToCompare );

    if(diff.size > 0)
    {
      this._trousseau = await this._trousseauService.setStatus( this._trousseau.id, TrousseauStatus.NOT_OK, Trousseau.mapToItensArray( diff ) );
    }
    else
    {
      this._trousseau = await this._trousseauService.setStatus(this._trousseau.id, TrousseauStatus.OK);
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
    
    return ( diffQuantity > 0 ? '+' : '-' ) + Math.abs( diffQuantity );
  }

  report()
  {
    this._navController.navigateForward(`trousseau-report/${this._trousseau.id}`, {
      queryParams: {
        trousseau: this._trousseau.id
      }
    })
  }

}
