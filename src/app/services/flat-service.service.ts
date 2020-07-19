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

@Injectable({
  providedIn: 'root'
})
export class FlatService implements Resolve<Flat[]> {

  constructor(private _httpClient:HttpClient) { }
  
  resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): Flat[] | Observable<Flat[]> | Promise<Flat[]> {
    return this.listFlats();
  }

  async listFlats(): Promise<Flat[]>
  {
    return await this.list();
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

  private async list() {
    
    let typeUtils: TypeUtils<Flat> = new TypeUtils<Flat>(Flat);
    let flatsSrc: Page<Flat> = await this._httpClient.get<Page<Flat>>(`${environment.apiHost}/flats/`).toPromise();
    let flats: Flat[] = flatsSrc.content.map(flat => typeUtils.fromAny(flat));
    
    return flats;
  }
  
  private getFlat(currentFloor: number, currentUnityOnFloor: number) 
  {
    const flat:Flat = new Flat(currentFloor, currentUnityOnFloor);
    
    return flat;
  }
}



