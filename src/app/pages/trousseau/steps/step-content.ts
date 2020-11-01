import { AfterContentInit, AfterViewInit, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { StepContainerComponent } from './step-container/step-container.component';

export default abstract class StepContent implements AfterContentInit, OnChanges
{

    protected _container: StepContainerComponent;
    
    constructor(container:StepContainerComponent)
    {
        this._container = container;
        this._container.registerStepContent(this);
    }
    
    public setupStep(container: StepContainerComponent = this._container) {
        // container.setShowFinhishButtonsFlag(this.showFinishButtons());

        container.setConfirCallback(async () => {
            await this.confirm();
        });

        container.setCancelCallback(async () => {
            await this.cancel();
        });

        container.setCancelLabel(this.getCancelLabel());

        container.setConfirmLabel(this.getConfirmLabel());
    }

    ngAfterContentInit(): void {
        this.setupStep();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this._container.updateView();
    }

    abstract showFinishButtons():boolean;
    
    abstract confirm();

    abstract cancel();
    
    abstract getCancelLabel():string;

    abstract getConfirmLabel():string;

}