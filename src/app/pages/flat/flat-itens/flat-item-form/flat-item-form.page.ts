import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import FlatItem from 'src/app/dtos/flat-item';
import Item from 'src/app/models/item';
import { FlatService } from 'src/app/services/flat-service.service';
import { MessagesUtils } from 'src/app/utils/messages-utils';

@Component({
  selector: 'app-flat-item-form',
  templateUrl: './flat-item-form.page.html',
  styleUrls: ['./flat-item-form.page.scss'],
  providers:[FormBuilder]
})
export class FlatItemFormPage implements OnInit {

  @Input("flatCode") 
  public flatCode: string;
  
  @Input("flatItem")
  public flatItem:FlatItem;
  
  public flatItemForm:FormGroup;

  private _preExistentItemName:string;
  
  private errorMessages = {
    name: [
      {type: 'required', message: 'Nome é obrigatório'}
    ],
    quantity: [
      {type: 'required', message: 'Quantidade é obrigatória'}
    ],
    value: [
      {type: 'required', message: 'Valor é obrigatório'}
    ]
  }

  constructor(
    private _flatService:FlatService,
    private _formBuilder:FormBuilder,
    private _modalController:ModalController)
  { 

    this.flatItemForm = this._formBuilder.group({
      name: new FormControl('', Validators.required),
      value: new FormControl('', Validators.required),
      quantity: new FormControl('', Validators.required)
    });

  }

  close()
  {
    this._modalController.dismiss();
  }

  async saveFlatItem()
  {
    
    if(this._preExistentItemName)
    {
      await this._flatService.updateItemOnFlat( this.flatCode, this._preExistentItemName, this.flatItem );
    }
    else
    {
      await this._flatService.createItemOnFlat( this.flatCode, this.flatItem );
    }
    
    await this._modalController.dismiss();

  }

  ngOnInit() {
  
    if(!this.flatItem)
    {
      this.flatItem = new FlatItem();
    }
    else
    {
      this._preExistentItemName = this.flatItem.item.name;
      
      let auxFlatItem = new FlatItem();
      Object.assign(auxFlatItem, this.flatItem);

      let auxItem = new Item();
      Object.assign(auxItem, auxFlatItem.item);
      auxFlatItem.item = auxItem;

      this.flatItem = auxFlatItem;
    }
  
  }

  getFieldErrors(fieldName:string):string[]
  {
    return MessagesUtils.getMessageErrorForm( this.errorMessages[fieldName], this.flatItemForm, fieldName, true );
  }

}
