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

  async listTrousseausByFlat(flat: Flat | string): Promise<Trousseau[]> {
    
    let flatCode = flat instanceof Flat ?
                    flat.code :
                    flat;
    
    let trousseausSrcs:Trousseau[] = await this._httpClient.get<Trousseau[]>(`${environment.apiHost}/flats/${flatCode}/trousseaus`).toPromise();

    return trousseausSrcs.map( currentTrousseausSrc => this._trousseauTypeUtils.fromAny(currentTrousseausSrc)  );

  }

  async validate(trousseauId:string, comparingItens:Map<Item, number>):Promise<Trousseau>
  {
    let receivedItens: Item[] = Array.from( comparingItens.keys() );

    let itensToCompare: { ['item']:Item , ['quantity']:number }[] = receivedItens.map( currentItem => {
      return {
        item: currentItem,
        quantity: comparingItens.get(currentItem)
      }
    });

    let diff:Map<Item, number> = await this.getDiff( trousseauId, itensToCompare );

    if(diff.size > 0)
    {
      return await this.setStatus( trousseauId, TrousseauStatus.NOT_OK, Trousseau.mapToItensArray( diff ) );
    }
    else
    {
      return  await this.setStatus(trousseauId, TrousseauStatus.OK);
    }
  }
}
