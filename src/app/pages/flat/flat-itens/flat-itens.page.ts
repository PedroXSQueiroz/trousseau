import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import Item from 'src/app/models/item';
import { FlatItemFormPage } from './flat-item-form/flat-item-form.page';


@Component({
  selector: 'app-flat-itens',
  templateUrl: './flat-itens.page.html',
  styleUrls: ['./flat-itens.page.scss'],
})
export class FlatItensPage implements OnInit {

  private _itens:Item[];

  get itens():Item[]
  {
    return this._itens;
  }

  public flatCode:string;
  
  constructor(
              private _route: ActivatedRoute,
              private _router: Router,
              private _modalController:ModalController) 
  { 
    this._itens = this._route.snapshot.data._itens;

    //FIXME: ISSO DEVERIA SER PASSADO POR PARÂMETRO.
    this.flatCode = this._router.url.match(/flat\/([0-9]+)\/flat-itens/)[1];

  }

  async showFlatItemForm()
  {
    let flatItemForm = await this._modalController.create({
      component: FlatItemFormPage,
      componentProps: {
        'flatCode': this.flatCode
      }
    });

    flatItemForm.present();
  }

  ngOnInit() {
  }

}
