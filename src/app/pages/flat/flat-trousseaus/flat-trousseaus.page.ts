import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import Trousseau from 'src/app/models/trousseau';
import { TrousseausToFlatResolverService } from 'src/app/resolvers/trousseus-to-flat/trousseaus-to-flat-resolver.service';

@Component({
  selector: 'app-flat-trousseaus',
  templateUrl: './flat-trousseaus.page.html',
  styleUrls: ['./flat-trousseaus.page.scss'],
})
export class FlatTrousseausPage implements OnInit {


  private _trousseaus: Trousseau[];

  get trousseaus():Trousseau[]
  {
    return this._trousseaus;
  }

  private flatCode:string;

  constructor(
                private _route: ActivatedRoute,
                private _router: Router) 
  {
    this._trousseaus = this._route.snapshot.data._trousseaus;
    this.flatCode = this._router.url.match(/flat\/([0-9]+)\/flat-trousseaus/)[1];

    TrousseausToFlatResolverService.onReloadFlats.subscribe( (trousseaus:Trousseau[]) => 
    {   
      this._trousseaus = trousseaus;
    });
  }

  public getStatusLabel(status:TrousseauStatus):string
  {
    return TrousseauStatus.getLabel(status);
  }

  public isFinished(trousseau:Trousseau)
  {
    return TrousseauStatus.isFinished( trousseau.status );
  }

  ngOnInit() {
  }

}
