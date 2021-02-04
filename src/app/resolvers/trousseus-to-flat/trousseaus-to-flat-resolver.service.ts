import { EventEmitter } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';

@Injectable({
  providedIn: 'root'
})
export class TrousseausToFlatResolverService implements Resolve<Trousseau[]>{

  constructor(private _trousseauService:TrousseauService) { }
  
  public static onReloadFlats = new EventEmitter; 

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Trousseau[]> {
    
    const flatCode = state.url.match(/flat\/([0-9]+)\/flat-trousseaus/)[1];

    const trousseaus = await this._trousseauService.listTrousseausByFlat(flatCode);
    
    TrousseausToFlatResolverService.onReloadFlats.emit(trousseaus);
    
    return trousseaus;

  }
}
