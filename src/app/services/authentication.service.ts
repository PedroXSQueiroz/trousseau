import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import TokenDto from '../dtos/token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private static  _CURRENT_TOKEN:string;
  
  static get CURRENT_TOKEN():string
  {
    return AuthenticationService._CURRENT_TOKEN;
  }
  
  constructor(private _httpClient: HttpClient,
              private _storage:Storage) 
  { 
    
  }
  
  async authenticate(email: string, password: string) {
    
    let tokenDto:TokenDto = await this.login(email, password);

    await this._storage.set( 'token', tokenDto.token );

    AuthenticationService._CURRENT_TOKEN = tokenDto.token;

  }
  
  async login(email: string, password: string): Promise<TokenDto> {
    
    return await this._httpClient.post<TokenDto>(`${environment.apiHost}/auth/`, {login: email, password: password}).toPromise();
  
  }
}