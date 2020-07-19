import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Trousseau from '../models/trousseau';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { FlatService } from './flat-service.service';
import Flat from '../models/flat';
import TypeUtils from '../utils/type-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TrousseauStatus } from '../contants/trousseau-status';
import TrousseauTypeUtilsFactory from '../factories/type-utils-factories/trousseau-type-utils-factory';
import Item from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class TrousseauService implements Resolve<Trousseau> {
  
  private _trousseauTypeUtils:TypeUtils<Trousseau>;
  
  constructor(  private _flatService:FlatService,
                private _httpClient: HttpClient) 
  {
    this._trousseauTypeUtils = new TrousseauTypeUtilsFactory().build();
  }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Trousseau> {
    
    let id = route.paramMap.get('trousseau');
    
    if(id)
    {
      return await this.get(id);
    }
    
    let flatCode = route.paramMap.get('flat');
    
    let flat:Flat = await this._flatService.getFlatByCode(flatCode);

    return new Trousseau(flat);

  }

  async saveTrousseauOnFLat(flatCode:string, trousseau:Trousseau):Promise<Trousseau>
  {

    console.log(JSON.stringify(trousseau))

    let trousseauSrc = await this._httpClient.post<Trousseau>(`${environment.apiHost}/flats/${flatCode}/trousseau`, trousseau.toDto()).toPromise();

    const trousseauSaved:Trousseau = this._trousseauTypeUtils.fromAny(trousseauSrc);
    return trousseauSaved;
  }

  async get(id:string):Promise<Trousseau>
  {
    const trousseauSrc = await this._httpClient.get(`${environment.apiHost}/trousseaus/${id}`).toPromise();
    return  this._trousseauTypeUtils.fromAny(trousseauSrc);
  }

  async setStatus(id: string, status: TrousseauStatus, complement = null):Promise<Trousseau>
  {
    
    let trousseuUpdatedSrc = await this._httpClient.put(`${environment.apiHost}/trousseaus/${id}/status/${status}`, complement).toPromise();

    const trousseau = this._trousseauTypeUtils.fromAny(trousseuUpdatedSrc);
    
    return trousseau;
  }

  async getDiff(id: string, itensToCompare: { item: Item; quantity: number; }[]): Promise<Map<Item, number>> {
    
    let itensDiff = await this._httpClient.post<{ ['item']:Item , ['quantity']:number } []>(`${environment.apiHost}/trousseaus/${id}/diff`, itensToCompare).toPromise()
    
    return Trousseau.itensArrayToMap(itensDiff);
  }

  async listTrousseausByFlat(flat: Flat): Promise<Trousseau[]> {
    
    let trousseausSrcs:Trousseau[] = await this._httpClient.get<Trousseau[]>(`${environment.apiHost}/flats/${flat.code}/trousseaus`).toPromise();

    return trousseausSrcs.map( currentTrousseausSrc => this._trousseauTypeUtils.fromAny(currentTrousseausSrc)  );

  }
}
