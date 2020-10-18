import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Item from 'src/app/models/item';
import TypeUtils from 'src/app/utils/type-utils';

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
  
  constructor(private _route: ActivatedRoute) 
  { 
    this._itens = this._route.snapshot.data._itens;
  }

  ngOnInit() {
  }

}
