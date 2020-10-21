import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import FlatItem from 'src/app/dtos/flat-item';
import Item from 'src/app/models/item';
import { FlatService } from 'src/app/services/flat-service.service';
import { FlatItemFormPage } from './flat-item-form/flat-item-form.page';
import { FlatItensPageModule } from './flat-itens.module';

@Component({
  selector: 'app-flat-itens',
  templateUrl: './flat-itens.page.html',
  styleUrls: ['./flat-itens.page.scss'],
})
export class FlatItensPage implements OnInit {

  private _itens:FlatItem[];

  get itens():FlatItem[]
  {
    return this._itens;
  }

  public flatCode:string;
  
  constructor(
              private _route: ActivatedRoute,
              private _router: Router,
              private _modalController:ModalController,
              private _flatService: FlatService,
              private _alertController:AlertController) 
  { 
    this._itens = this._route.snapshot.data._itens;

    //FIXME: ISSO DEVERIA SER PASSADO POR PARÂMETRO.
    this.flatCode = this._router.url.match(/flat\/([0-9]+)\/flat-itens/)[1];

  }

  async showFlatItemForm(flatItem:FlatItem = null)
  {
    let flatItemForm = await this._modalController.create({
      component: FlatItemFormPage,
      componentProps: {
        'flatCode': this.flatCode,
        'flatItem': flatItem 
      }
    });

    flatItemForm.present();

    let newFLatItem:FlatItem = <FlatItem> ( await flatItemForm.onWillDismiss() ).data;

    if(newFLatItem)
    {
      
      if(flatItem)
      {
        let previousFlatItem = this._itens.find( currentFlatItem => currentFlatItem.item.name == flatItem.item.name )
        Object.assign( previousFlatItem, newFLatItem );
      }
      else
      {
        this._itens.push(newFLatItem);
      }

    }


  }

  async showFlatItemDeleteDialog(flatItem:FlatItem)
  {
    let alert = await this._alertController.create({
      header:'Atenção',
      message: `Tem certeza que deseja deletar o item ${flatItem.item.name}?`,
      buttons:[
        {
          text: 'SIM',
          handler: () => {
            
            this._flatService.removeItemFromFLat( this.flatCode, flatItem.item.name );

            let flatIndex = this._itens.findIndex(currentFlatItem => currentFlatItem.item.name == flatItem.item.name);
            this._itens.splice(flatIndex, 1);

          }
        },
        {
          text: 'CANCELAR',
          role: 'cancel'
        }
      ]
    });

    alert.present();
    
  }

  ngOnInit() {
  }

}
