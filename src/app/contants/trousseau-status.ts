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
}