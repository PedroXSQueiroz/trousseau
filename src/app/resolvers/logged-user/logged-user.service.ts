import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import User from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService implements Resolve<User> {

  constructor(private httpClient: HttpClient, private _authenticationService: AuthenticationService) { }
  
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
    
    return this._authenticationService.isAuthenticated() ? 
      this.httpClient.get<User>(`${environment.apiHost}/user/logged/`).toPromise() :
      null ;
  }
}
