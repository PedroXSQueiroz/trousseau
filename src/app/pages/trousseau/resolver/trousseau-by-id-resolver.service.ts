import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Trousseau from 'src/app/models/trousseau';
import { TrousseauService } from 'src/app/services/trousseau.service';

@Injectable({
  providedIn: 'root'
})
export class TrousseauByIdResolverService implements Resolve<Trousseau> {

  constructor(private _trousseauService:TrousseauService) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Trousseau> {
    
    let id = route.paramMap.get('trousseau');
    
    return await this._trousseauService.get(id);
  }
}
