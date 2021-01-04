import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerInterceptorService implements HttpInterceptor {

  constructor(private _router:Router,
              private _alertController:AlertController) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log('intercepting request');
    
    let headers = new HttpHeaders().append('Access-Control-Allow-Origin', '*');

    if(AuthenticationService.CURRENT_TOKEN)
    {
      headers = headers.append('Authorization', `Bearer ${AuthenticationService.CURRENT_TOKEN}`);
    } 
      
    const forwardRequest = next.handle(
      req.clone({
        headers: headers
      })
    );
    
    return forwardRequest.pipe(
      catchError( 
        error => {
          
          console.log('error');

          if(error.status == 403)
          {
            let alert = this._alertController.create({
              header: 'Atenćão',
              message: 'Aplicativo não autenticado, por favor,faća novamente o login',
              buttons:[
                {
                  text: 'OK',
                  handler: () => {
                    this._router.navigate(['login']);
                  }
                }
              ]
            }).then(alert => {
              
              alert.present();

            });

            return next.handle(null);

          }
          else
          {
            throw error;
          }

        } 
      )
    );

    return forwardRequest;
  }
}
