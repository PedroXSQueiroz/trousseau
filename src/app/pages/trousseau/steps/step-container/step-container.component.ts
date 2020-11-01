import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatStep, MatStepper } from '@angular/material/stepper';
import StepContent from '../step-content';

@Component({
  selector: 'step-container',
  templateUrl: './step-container.component.html',
  styleUrls: ['./step-container.component.scss']
})
export class StepContainerComponent implements OnInit {
  
  @Input() steps: MatStepper
  
  private _cancelCallback:() => Promise<void>;

  public async cancel()
  {
    await this._cancelCallback();
  }
  
  private _confirmCallback:() => Promise<void>;

  public async confirm()
  {
    await this._confirmCallback();

    this.next();
  }

  public next()
  {
    this.steps.next();
  }

  public back() 
  {
    this.steps.previous();
  }

  get showFinishButtons():boolean
  {
    return this._stepContent.showFinishButtons();
  }
  
  private _cancelLabel:string;

  get cancelButtonLabel():string
  {
    return this._cancelLabel;
  }
  
  private _confirmLabel:string;

  get confirmButtonLabel():string
  {
    return this._confirmLabel;
  }

  private _stepContent: StepContent;
  
  setConfirmLabel(confirmLabel: string) {
      this._confirmLabel = confirmLabel;
  }

  setCancelLabel(cancelLabel: string) {
      this._cancelLabel = cancelLabel;
  }

  setCancelCallback(cancelCallback:() => Promise<void>) {
    this._cancelCallback = cancelCallback;
  }

  setConfirCallback(confirmCallback:() => Promise<void>) {
      this._confirmCallback = confirmCallback; 
  }

  // setShowFinhishButtonsFlag(showFinishButtons: boolean) {
  //     this._showFinishButtons = showFinishButtons;
  // }

  constructor(private _changeDetector: ChangeDetectorRef) 
  {

  }
  
  registerStepContent(stepContent:StepContent)
  {
    this._stepContent = stepContent;
  }

  updateView()
  {
    this._changeDetector.detectChanges();
  }

  ngOnInit() 
  {

  }

}
