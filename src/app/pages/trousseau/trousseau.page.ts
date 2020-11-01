import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import { NavController } from '@ionic/angular';
import { __spreadArrays } from 'tslib';
import FlatItem from 'src/app/dtos/flat-item';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-trousseau',
  templateUrl: './trousseau.page.html',
  styleUrls: ['./trousseau.page.scss'],
  providers:[FormBuilder]
})
export class TrousseauPage implements OnInit {

  get TrousseauStatus(): typeof TrousseauStatus
  {
    return TrousseauStatus;
  }
  
  private _itens:FlatItem[];

  get itens():FlatItem[]
  {
    return this._itens;
  }

  private _flatCode:string;

  get flatCode():string
  {
    return this._flatCode;
  }

  private _trousseau:Trousseau;

  get trousseau():Trousseau
  {
    return this._trousseau;
  }

  constructor(
      private _route:             ActivatedRoute,
      private _navController:     NavController) 
  { 
    this._itens                   = this._route.snapshot.data._itens;
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
        this._itens     = this._trousseau.flat.itens;
      }
    })
  }

  ngOnInit() {
  }

  get statusMessage():string
  {
    return TrousseauStatus.getLabel(this._trousseau.status);
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
