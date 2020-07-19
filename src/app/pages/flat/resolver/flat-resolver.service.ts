import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Flat from 'src/app/models/flat';
import { FlatService } from 'src/app/services/flat-service.service';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';

@Injectable({
  providedIn: 'root'
})
export class FlatResolverService implements Resolve<{ ['flat']:Flat , ['trousseaus']:Trousseau[] }> {

  constructor(private _flatService:FlatService, private _trousseauService:TrousseauService) { }
  
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<{ ['flat']:Flat , ['trousseaus']:Trousseau[] }> {
    
    const flatCode:string = route.paramMap.get('flat');
    let flat:Flat = await this._flatService.getFlatByCode(flatCode);

    let trousseaus:Trousseau[] = await this._trousseauService.listTrousseausByFlat( flat );

    return {
      flat: flat,
      trousseaus: trousseaus
    }

  }
}
