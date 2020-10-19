import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import Item from 'src/app/models/item';
import TypeUtils from 'src/app/utils/type-utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItensToFlatResolverService implements Resolve<Item[]> {

  constructor(private http: HttpClient) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Item[]> {
    
    const flatCode = state.url.match(/flat\/([0-9]+)\/flat-itens/)[1];

    let typeUtils:TypeUtils<Item> = new TypeUtils<Item>(Item);

    let response = await this.http.get<any[]>(`${environment.apiHost}/flats/${flatCode}/itens`).toPromise();
    
    return response.map( currentItem => typeUtils.fromAny(currentItem) );
  }
}
