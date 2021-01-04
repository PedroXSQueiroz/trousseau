import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import UserService from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  providers: [FormBuilder]
})
export class UserPage implements OnInit {

  public user:User;

  get isNew():boolean
  {
    return !this.user.id;
  }

  public userForm: FormGroup;
  
  constructor(private _route:           ActivatedRoute,
              private _formsBuilder:    FormBuilder,
              private _userService:     UserService,
              private _alertController: AlertController,
              private _router:          Router,
              private _navController:   NavController) 
  { 
    this.user = this._route.snapshot.data.user || new User();

    this.userForm = this._formsBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      name: new FormControl('', Validators.required),
    });

    if(this.isNew)
    {
      this.userForm.addControl( 'password' ,new FormControl('', [
        Validators.required,
        Validators.pattern(/[!|@|#|$|%|^|&|*|\?]+/)
      ]));
      this.userForm.addControl( 'confirm-password' ,new FormControl('', [
        Validators.required,
        (control:FormControl) => {
          
          if(this.userForm.get('password').value == control.value)
          {
            return null;
          }
          
          return { passwordConfirmationValid: false };
          
        }
      ]));
    }

  }

  async save()
  {
    
    try
    {
      await this._userService.save(this.user);
  
      ( 
        await this._alertController.create({
          header: 'Sucesso',
          message: this.isNew ? 'Usuário cadastrado com sucesso' : 'Usuário atualizado com sucesso',
          buttons:[
            {
              text:'OK',
              handler: async () => {
                this._router.navigate(['home']);
              }
            }
          ]
        }) 
      ).present();

    }catch(e)
    {
      ( 
        await this._alertController.create({
          header: 'Atencão',
          message: `Não foi possível ${this.isNew ? 'cadastrar' : 'atualizar'} usuário, ${e.message}`
        }) 
      ).present();
    }
    
  }

  async cancel()
  {
    this._navController.back();
  }

  ngOnInit() {
  }

}