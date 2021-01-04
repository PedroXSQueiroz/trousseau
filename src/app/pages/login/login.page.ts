import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../services/authentication.service';
import  DtoToken  from '../../dtos/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[FormBuilder]
})
export class LoginPage implements OnInit {

  public loginForm:FormGroup;

  public email:string;

  public password:string;
  
  constructor(private _formBuilder:FormBuilder,
              private _authService: AuthenticationService,
              private _router: Router) 
  { 
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  async login()
  {
    await this._authService.authenticate(this.email, this.password);

    this._router.navigate(['home']);
  }

  ngOnInit() {
  }

}
