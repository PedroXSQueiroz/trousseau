import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations:[UpdatePasswordComponent]
})
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss'],
  providers: [FormBuilder]
})
export class UpdatePasswordComponent implements OnInit {

  public updatePasswordForm: FormGroup;

  public password:String;

  public confirmPassword:String;

  constructor(private _formBuilder: FormBuilder,
              private _authenticationService: AuthenticationService,
              private _modalController: ModalController) 
  {
    this.updatePasswordForm = this._formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/[!|@|#|$|%|^|&|*|\?]+/)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        (control:FormControl) => {
          
          if(this.password == '' || !this.password)
          {
            return null;
          }

          if( this.password == control.value )
          {
            return null;
          }
          
          return { passwordConfirmationValid: false };
          
        }
      ])
    })
  }

  async save()
  {
    await this._authenticationService.updatePassword(this.password);
    this._modalController.dismiss();
  }

  cancel()
  {
    this._modalController.dismiss();
  }

  ngOnInit() {}

}
