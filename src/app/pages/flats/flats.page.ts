import { Component, OnInit } from '@angular/core';
import { FlatService } from 'src/app/services/flat-service.service';
import Flat from 'src/app/models/flat';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-flats',
  templateUrl: './flats.page.html',
  styleUrls: ['./flats.page.scss'],
})
export class FlatsPage implements OnInit {

  private _flats: Flat[];
  
  get flats():Flat[]
  {
    return this._flats;
  }

  constructor( private _route: ActivatedRoute ) 
  { 
    this._flats = this._route.snapshot.data._flats;
  }

  ngOnInit() {
  
  
  }

}
