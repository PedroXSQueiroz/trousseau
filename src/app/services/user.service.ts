import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { constants } from 'buffer';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export default class  UserService {
  
  constructor(private _http:HttpClient)
  {

  }
  
  async save(user: User): Promise<User> {

    return await this._http.post<User>(`${environment.apiHost}/user/`, user).toPromise();

  }

  async update(user: User) : Promise<User> {
    
    return await this._http.put<User>(`${environment.apiHost}/user/${user.id}`, { name: user.name, email: user.email } ).toPromise();
  
  }

}
