import { Component, Input, OnInit } from '@angular/core';
import { TrousseauFail } from 'src/app/contants/trousseau-fail';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import Trousseau from 'src/app/models/trousseau';

@Component({
  selector: 'status-label',
  templateUrl: './status-label.component.html',
  styleUrls: ['./status-label.component.scss'],
})
export class StatusLabelComponent implements OnInit {

  @Input('trousseau') trousseau:Trousseau;
  
  constructor() { }

  get statusLabel() :string
  {
    return TrousseauStatus.getLabel(this.trousseau.status);
  }

  get statusFailLabel():string
  {
    return TrousseauFail.getLabel(this.trousseau.fail);
  }

  ngOnInit() 
  {
    
  }

}
