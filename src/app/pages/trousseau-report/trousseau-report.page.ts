import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Trousseau from 'src/app/models/trousseau';
import Item from 'src/app/models/item';
import { File } from '@ionic-native/file/ngx';

import html2pdf from 'html2pdf.js'
import FlatItem from 'src/app/dtos/flat-item';

@Component({
  selector: 'app-trousseau-report',
  templateUrl: './trousseau-report.page.html',
  styleUrls: ['./trousseau-report.page.scss'],
  providers: [File]
})
export class TrousseauReportPage implements OnInit {

  @ViewChild('report')
  report: ElementRef;
  
  private _trousseau:Trousseau;

  get trousseau():Trousseau
  {
    return this._trousseau;
  }

  public getTrousseauItem(item:Item):Item
  {
    let itensIterator = this._trousseau.itens.keys();

    let currentItem:Item = null;

    while((currentItem = itensIterator.next().value) )
    {
      if(item.itemCode == currentItem.itemCode)
      {
        return currentItem;
      }
    }

    return null;
  }

  public getQuantity(item:Item):number
  {
    
    let itensIterator = this._trousseau.itens.keys();

    let currentItem:Item = null;

    while((currentItem = itensIterator.next().value) )
    {
      if(item.itemCode == currentItem.itemCode)
      {
        return this._trousseau.itens.get(currentItem);
      }
    }
    
    return 0;
  }

  public getTotalValueItem(item:Item)
  {
    return item.value * this.getQuantity(item);
  }

  private _itens:FlatItem[];

  get itens():Item[]
  {
    return this._itens.map( flatItem => flatItem.item );
  }
  
  constructor(  private _route: ActivatedRoute,
                private _file: File)

  {
    this._trousseau = this._route.snapshot.data._trousseau
    this._itens     = this._route.snapshot.data._itens;
  }

  async print()
  {
    
    const storagePath = this._file.externalRootDirectory;
    
    html2pdf()
    .from(document.getElementById("report").innerHTML).set(
      {
        filename:`report.pdf`,
        image: { type: 'jpeg' },
        html2canvas:{allowTaint: true, useCORS: true}
      }
    ).toPdf().output('datauristring').then( async (pdfAsString) => {
      
      console.log('pdf generated')
      
      try
      {
        let pdfFile = await this._file.createFile(  `${this._file.externalRootDirectory}`, 
                                                    `canhoto-${this._trousseau.flat.code}.pdf`, 
                                                    true );
                                                    
        console.log('pdf file generated')
  
        pdfFile.createWriter((writer) => 
        {
          
          console.log('pdf file writer generated');
  
          let ajustedContent = pdfAsString.replace('data:application/pdf;filename=generated.pdf;base64,', '');
  
          fetch(pdfAsString)
          .then( res => res.blob() )
          .then( bytes => {
            writer.write(bytes);
            console.log('pdf file writed');
          })
          
        }, (e) => {
          
          console.log('error on create file writer');
  
          console.error(e);
  
        });
      }catch(e)
      {
        console.error(e);
      }


    });
  
    

  }

  ngOnInit() {
  }

}
