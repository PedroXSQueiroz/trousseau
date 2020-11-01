import { HttpClient } from '@angular/common/http';
import { Injector, Input } from '@angular/core';
import { TrousseauStatus } from 'src/app/contants/trousseau-status';
import Trousseau from 'src/app/models/trousseau';
import { FlatService } from 'src/app/services/flat-service.service';
import { TrousseauService } from 'src/app/services/trousseau.service';
import { StepContainerComponent } from './step-container/step-container.component';
import StepContent from './step-content';

export default abstract class StepTrousseauContent extends StepContent
{
    private _initialStep:boolean;
    
    constructor(container: StepContainerComponent, private _innerTrousseauService: TrousseauService, initialStep:boolean = null)
    {
        super(container);

        this._initialStep = initialStep;
    }
    
    protected _trousseau: Trousseau;

    @Input()
    set trousseau(trousseau:Trousseau)
    {
        this._trousseau = trousseau;
    }

    get trousseau():Trousseau
    {
        return this._trousseau;
    }
    
    private _trousseauStatus:TrousseauStatus
    
    @Input()
    set status(trousseauStatus: TrousseauStatus)
    {
        this._trousseauStatus = trousseauStatus;
    }

    public setupStep(container: StepContainerComponent = this._container)
    {
        super.setupStep(container);

        this.forward();
    }
    
    private forward()
    {
        if( this._trousseauStatus && this._trousseau)
        {
            console.log(`trousseau and status`);
            
            if  (   this._trousseau.alreadyCompleted(this._trousseauStatus)
                    || (this._initialStep && this._trousseau.status && this._trousseau.status != this._trousseauStatus)
                )
            {
                
                setTimeout(() => {
                    this._container.next();
                    console.log('forward');
                }, 500);
            }
        }
    }

    async cancel()
    {
        if(this._trousseau.status == TrousseauStatus.INITIAL)
        {
            this._container.back();
        }else
        {
            await this.invalidateTrosseau();
        }
    }

    async invalidateTrosseau()
    {
        let invalidatedTrousseau = await this._innerTrousseauService.setStatus(this._trousseau.id, TrousseauStatus.NOT_OK);
        Object.assign(this._trousseau, invalidatedTrousseau);
    }

    
}