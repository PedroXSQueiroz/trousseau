import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Item from '../models/item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import TypeUtils from '../utils/type-utils';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements Resolve<Item[]> {

  constructor(private _httpClient:HttpClient) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Item[]> {
    
    let itensSrc:any[] =  await this._httpClient.get<any[]>(`${environment.apiHost}/flats/101/itens`).toPromise()

    let typeUtilsItem:TypeUtils<Item> = new TypeUtils<Item>(Item);
    
    let itens:Item[] = itensSrc.map( item => typeUtilsItem.fromAny(item) );

    return itens;

  }
}
