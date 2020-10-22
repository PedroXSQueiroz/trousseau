import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';

@Injectable({
  providedIn: 'root'
})
export class TrousseausToFlatResolverService implements Resolve<Trousseau[]>{

  constructor(private _trousseauService:TrousseauService) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Trousseau[]> {
    
    const flatCode = state.url.match(/flat\/([0-9]+)\/flat-trousseaus/)[1];

    return await this._trousseauService.listTrousseausByFlat(flatCode);

  }
}
