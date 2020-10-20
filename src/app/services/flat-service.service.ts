import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import Flat from '../models/flat';
import { Observable } from 'rxjs';
import BuildingSpecs from '../contants/building-specs';
import Trousseau from '../models/trousseau';
import { TrousseauService } from './trousseau.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import TypeUtils from '../utils/type-utils';
import Page from '../dtos/page';
import FlatItem from '../dtos/flat-item';

@Injectable({
  providedIn: 'root'
})
export class FlatService implements Resolve<Flat[]> {
  
  constructor(private _httpClient:HttpClient) { }
  
  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Flat[] | Observable<Flat[]> | Promise<Flat[]> {
    return this.listFlats();
  }

  async listFlats(page:number = 0): Promise<Flat[]>
  {
    return await this.list(page);
  }

  createTrousseauOnFlat(flat:Flat)
  {
    return new Trousseau(flat);
  }

  getFlatByCode(code:string)
  {
    let floor = parseInt( code.substring( 0, code.length - 2 ) );
    let unity = parseInt( code.substring( code.length - 2, code.length ) );
    
    return new Flat(floor, unity);
  }

  private async list(page:number = 0) {
    
    let typeUtils: TypeUtils<Flat> = new TypeUtils<Flat>(Flat);
    let flatsSrc: Page<Flat> = await this._httpClient.get<Page<Flat>>(`${environment.apiHost}/flats/`, {
      params: {
        page: page.toString(),
        size: BuildingSpecs.UNITIES_PER_FLOOR.toString()
      }
    }).toPromise();
    let flats: Flat[] = flatsSrc.content.map(flat => typeUtils.fromAny(flat));
    
    return flats;
  }
  
  private getFlat(currentFloor: number, currentUnityOnFloor: number) 
  {
    const flat:Flat = new Flat(currentFloor, currentUnityOnFloor);
    
    return flat;
  }

  public async createItemOnFlat(flatCode:string, flatItem:FlatItem)
  {
    await this._httpClient.post(`${environment.apiHost}/flats/${flatCode}/item`, flatItem).toPromise();
  }

  public async updateItemOnFlat(flatCode: string, itemName: string, flatItem: FlatItem) {
    await this._httpClient.put(`${environment.apiHost}/flats/${flatCode}/item/${itemName}`, flatItem).toPromise();
  }

  public async removeItemFromFLat(flatCode: string, itemName: string) {
    await this._httpClient.delete(`${environment.apiHost}/flats/${flatCode}/item/${itemName}`).toPromise();
  }
}



