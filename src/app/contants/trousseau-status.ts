import { getLocaleNumberFormat, getLocaleNumberSymbol } from '@angular/common';

export enum TrousseauStatus 
{
    INITIAL         = 'INITIAL',
    SENT            = 'SENT',
    RETRIEVED       = 'RETRIEVED',
    OK              = 'OK',
    NOT_OK          = 'NOT_OK' 
}

export namespace TrousseauStatus
{
    export function getLabel(status: TrousseauStatus):string
    {
        switch(status)
        {
            case TrousseauStatus.INITIAL:
                return 'Pronto para envio';
            case TrousseauStatus.SENT:
                return 'Enviado';
            case TrousseauStatus.RETRIEVED:
                return 'Recebido';
            case TrousseauStatus.NOT_OK:
                return 'Incorreta';
            case TrousseauStatus.OK:
                return 'Finalizada';
            default: 
                return '';
        }
    }

    export function getPosition(status: TrousseauStatus): number
    {
        let position = {
            [TrousseauStatus.INITIAL] :     0,
            [TrousseauStatus.SENT]  :       1,
            [TrousseauStatus.RETRIEVED] :   2,
            [TrousseauStatus.OK] :          3,
            [TrousseauStatus.NOT_OK] :      3
        }[status] || -1;
        
        return position;
    }

    export function isFinished(status:TrousseauStatus):boolean
    {
        return status == TrousseauStatus.OK || status == TrousseauStatus.NOT_OK;
    }
}