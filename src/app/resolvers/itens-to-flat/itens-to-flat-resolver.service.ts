import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import FlatItem from 'src/app/dtos/flat-item';
import Item from 'src/app/models/item';
import TypeUtils from 'src/app/utils/type-utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItensToFlatResolverService implements Resolve<FlatItem[]> {

  constructor(private http: HttpClient) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<FlatItem[]> {
    
    const flatCode = state.url.match(/flat\/([0-9]+)\/flat-itens/)[1];

    let typeUtils:TypeUtils<FlatItem> = new TypeUtils<FlatItem>(FlatItem);

    let response = await this.http.get<any[]>(`${environment.apiHost}/flats/${flatCode}/itens`).toPromise();
    
    return response.map( currentItem => typeUtils.fromAny(currentItem) );
  }
}
