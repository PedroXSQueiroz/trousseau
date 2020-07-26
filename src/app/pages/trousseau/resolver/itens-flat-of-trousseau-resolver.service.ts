import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import FlatItem from 'src/app/dtos/flat-item';
import { FlatService } from 'src/app/services/flat-service.service';
import { TrousseauService } from 'src/app/services/trousseau.service';
import { ItemService } from 'src/app/services/item.service';

@Injectable({
  providedIn: 'root'
})
export class ItensFlatOfTrousseauResolverService implements Resolve<FlatItem[]>{

  constructor(
                private _trouService:TrousseauService,
                private _itemService:ItemService
              ) 
  {

  }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FlatItem[]> {
    
    let trousseau = await this._trouService.get( route.paramMap.get('trousseau') );
    
    return this._itemService.getByFlat(trousseau.flat.code);

  }
}
