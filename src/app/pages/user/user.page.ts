import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import User from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import UserService from 'src/app/services/user.service';
import { MessagesUtils } from 'src/app/utils/messages-utils';
import { UpdatePasswordComponent } from './update-password/update-password.component';

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

  public errorMessages = {
    name: [
      {type: 'required', message: 'O campo Nome é obrigatório!'}
    ],
    email:[
      {type: 'required', message: 'O campo Email é obrigatório!'},
      {type: 'email', message: 'O campo Email está preenchido de forma incorreta!'}
    ],
    password: [
      {type: 'required', message: 'O campo Senha é obrigatório!'},
      {type: 'pattern', message: 'Senha deve conter ao menos um dos os caracteres especiais'}
    ],
    confirmPassword: [
      {type: 'passwordConfirmationValid', message: 'Senhas não conferem!' }
    ]
  }
  
  constructor(private _route:                 ActivatedRoute,
              private _formsBuilder:          FormBuilder,
              private _userService:           UserService,
              private _alertController:       AlertController,
              private _router:                Router,
              private _navController:         NavController,
              private _modalController:       ModalController,
              private _authenticationService: AuthenticationService) 
  { 
    this.user = this._route.snapshot.data._loggedUser || new User();

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
      this.userForm.addControl( 'confirmPassword' ,new FormControl('', [
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

  async showPasswordUpdateModal()
  {
    let updatePasswordModal = await this._modalController.create({
      component: UpdatePasswordComponent,
      componentProps: {
        'userId': this.user.id
      }
    });

    updatePasswordModal.present();
  }

  async save()
  {
    
    try
    {
      if(this.isNew)
      {
        await this._userService.save(this.user);
        await this._authenticationService.authenticate(this.user.email, this.userForm.get('password').value);
      }
      else
      {
        await this._userService.update(this.user);
      }

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

  async logout()
  {
    await this._authenticationService.logout();
    this._router.navigate(['/login']);
  }

  async cancel()
  {
    this._navController.back();
  }

  async deleteAccount()
  {
    await this._userService.deleteAccount();
    await this._authenticationService.logout();
    this._router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
