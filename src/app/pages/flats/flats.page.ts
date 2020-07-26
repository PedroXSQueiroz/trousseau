import { Component, OnInit } from '@angular/core';
import { FlatService } from 'src/app/services/flat-service.service';
import Flat from 'src/app/models/flat';
import { ActivatedRoute } from '@angular/router';
import BuildingSpecs from 'src/app/contants/building-specs';

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

  private _currentPage;

  constructor(  private _route:       ActivatedRoute,
                private _flatService: FlatService ) 
  { 
    this._flats = this._route.snapshot.data._flats;
    this._currentPage = 0;
  }

  async loadFlats(event)
  {
    
    if(this._currentPage >= BuildingSpecs.FLOOR - 1)
    {
      event.target.complete();
      return;
    }

    let currentPageFlats:Flat[] = await this._flatService.listFlats(++this._currentPage);

    this._flats = this._flats.concat(currentPageFlats)

    event.target.complete();
  }

  ngOnInit() 
  {
  
  }

}
