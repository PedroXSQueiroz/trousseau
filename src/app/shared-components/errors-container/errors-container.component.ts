import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MessagesUtils } from 'src/app/utils/messages-utils';

@Component({
  selector: 'errors-container',
  templateUrl: './errors-container.component.html',
  styleUrls: ['./errors-container.component.scss'],
})
export class ErrorsContainerComponent implements OnInit {

  @Input('form') formGroup: FormGroup;

  @Input('errors') errorsMessages: any;
  
  constructor() { }

  ngOnInit() {}

  get errors(): string[]
  {
    let messages: string[] = [];
    
    if(!this.formGroup)
    {
      return messages;
    }
    
    for( let controlName in this.formGroup.controls )
    {
      messages = messages.concat( 
                                  MessagesUtils.getMessageErrorForm(
                                                                      this.errorsMessages[controlName], 
                                                                      this.formGroup, 
                                                                      controlName, 
                                                                      true) 
                                                                    );
    }
     
    return messages;
  }

}
