import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Flat from 'src/app/models/flat';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.page.html',
  styleUrls: ['./flat.page.scss'],
})
export class FlatPage implements OnInit {

  private _flat:Flat;
  private _trousseaus:Trousseau[]
  
  constructor( private _route: ActivatedRoute ) 
  {
    this._flat        = this._route.snapshot.data._flatData.flat;
    this._trousseaus  = this._route.snapshot.data._flatData.trousseaus;

  }

  get flat():Flat
  {
    return this._flat;
  }

  get trousseaus():Trousseau[]
  {
    return this._trousseaus;
  }

  ngOnInit() {
  }

  public getLabel(status:TrousseauStatus):string
  {
    return TrousseauStatus.getLabel(status);
  }

  public getViewButtonLabel(trousseau: Trousseau)
  {
    if(trousseau.status == TrousseauStatus.OK || trousseau.status == TrousseauStatus.NOT_OK)
    {
      return 'Visualizar';
    }

    return 'Continuar';
  }

}
