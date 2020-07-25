import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Item from '../models/item';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import TypeUtils from '../utils/type-utils';
import FlatItem from '../dtos/flat-item';

@Injectable({
  providedIn: 'root'
})
export class ItemService implements Resolve<FlatItem[]> {

  constructor(private _httpClient:HttpClient) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FlatItem[]> {
    
    let flatCode:string = route.paramMap.get('flat');
    
    let itens: FlatItem[] = await this.getByFlat(flatCode);

    return itens;

  }

  public async getByFlat(flatCode: string) {
    
    let itensSrc: any[] = await this._httpClient.get<any[]>(`${environment.apiHost}/flats/${flatCode}/itens`).toPromise();
    let typeUtilsItem: TypeUtils<FlatItem> = new TypeUtils<FlatItem>(FlatItem);
    let itens: FlatItem[] = itensSrc.map(item => typeUtilsItem.fromAny(item));
    
    return itens;
  }
}
